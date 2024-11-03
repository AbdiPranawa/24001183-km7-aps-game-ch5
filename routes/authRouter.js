const express = require("express");
const { authController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login-superadmin", authController.loginSuperadmin);
router.post("/add-admin", authenticate.authenticateToken, authenticate.authenticateSuperAdmin, authController.addAdmin);
router.post("/register-member", authController.registerMember);
router.get("/me", authenticate.authenticateToken, authController.getCurrentUser);

module.exports = router;
