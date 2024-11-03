const { Cars, Users } = require("../models");
const { Op } = require("sequelize");

const createCar = async (req, res) => {
  const { name, brand, year } = req.body;
  const userId = req.user.id;

  try {
    const newCar = await Cars.create({
      name,
      brand,
      year,
      createdBy: userId,
    });

    res.status(201).json({
      status: "Success",
      message: "Success create new Car",
      isSuccess: true,
      data: {
        newCar,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    } else if (error.name === "SequelizeDatabaseError") {
      return res.status(400).json({
        status: "Failed",
        message: error.message || "Database error",
        isSuccess: false,
        data: null,
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: "An unexpected error occurred",
        isSuccess: false,
        data: null,
      });
    }
  }
};

const getAllCars = async (req, res) => {
  try {
    const { name, brand, year, page, size } = req.query;

    const condition = {};
    if (name) condition.name = { [Op.iLike]: `%${name}%` };
    if (brand) condition.brand = { [Op.iLike]: `%${brand}%` };
    if (year) condition.year = year;

    const pageSize = parseInt(size) || 10;
    const pageNum = parseInt(page) || 1;
    const offset = (pageNum - 1) * pageSize;

    const totalCount = await Cars.count({
      where: condition,
    });

    const cars = await Cars.findAll({
      where: condition,
      limit: pageSize,
      offset,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      status: "Success",
      message: "Success get cars data",
      isSuccess: true,
      data: {
        totalData: totalCount,
        cars,
        pagination: {
          page: pageNum,
          size: pageSize,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getCarById = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Success get car data",
      isSuccess: true,
      data: {
        car,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateCar = async (req, res) => {
  const id = req.params.id;
  const { name, brand, year } = req.body;

  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    await Cars.update(
      {
        name,
        brand,
        year,
        updatedBy: userId,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success update car",
      isSuccess: true,
      data: {
        car: {
          id,
          name,
          brand,
          year,
        },
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteCar = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Car not found",
        isSuccess: false,
        data: null,
      });
    }

    await Cars.update({ deletedBy: userId }, { where: { id } });

    await Cars.destroy({
      where: { id },
    });

    res.status(200).json({
      status: "Success",
      message: "Success delete car",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
