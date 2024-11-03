const router = require("express").Router();

const { carController } = require("../controllers");
// const authenticate = require("../middlewares/authenticate");

router.post("", carController.createCar);
router.get("", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.patch("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
