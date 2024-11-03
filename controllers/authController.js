const { Superadmin, Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginSuperadmin = async (req, res) => {
  const { email, password } = req.body;
  const superadmin = await Superadmin.findOne({ where: { email } });

  if (!superadmin || !(await bcrypt.compare(password, superadmin.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: superadmin.id, role: "superadmin" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({ token });
};

const addAdmin = async (req, res) => {
  const { name, age, address } = req.body;
  const newAdmin = await Users.create({ name, age, address, role: "admin" });
  res.status(201).json({ newAdmin });
};

const registerMember = async (req, res) => {
  const { name, age, address } = req.body;
  const newUser = await Users.create({ name, age, address, role: "member" });
  res.status(201).json({ newUser });
};

const getCurrentUser = (req, res) => {
  res.json(req.user);
};

module.exports = {
  loginSuperadmin,
  addAdmin,
  registerMember,
  getCurrentUser,
};
