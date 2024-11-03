const router = require("express").Router();

const { carController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

router.post("", authenticate.authenticateToken, authenticate.authenticateAdmin, carController.createCar);
router.get("", carController.getAllCars);
router.get("/:id", authenticate.authenticateToken, authenticate.authenticateAdmin, carController.getCarById);
router.patch("/:id", authenticate.authenticateToken, authenticate.authenticateAdmin, carController.updateCar);
router.delete("/:id", authenticate.authenticateToken, authenticate.authenticateAdmin, carController.deleteCar);

module.exports = router;
