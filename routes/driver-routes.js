const express = require("express");
const {
  addDriver,
  getAllDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");

const router = express.Router();

router.post("/driver", addDriver);
router.get("/drivers", getAllDrivers);
router.get("/driver/:id", getDriver);
router.put("/driver/:id", updateDriver);
router.delete("/driver/:id", deleteDriver);

module.exports = {
  routes: router,
};
