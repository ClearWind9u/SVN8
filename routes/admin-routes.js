const express = require("express");
const {
    getDriverAdmin,
    getPageAdmin,
    getReportAdmin,
    addTripAdmin,
    getTripAdmin,
    getVehicleAdmin,
    getLoginAdmin,
    addDriverAdmin,
    addVehicleAdmin,
} = require("../controllers/adminController");

const {
    addDriver,
    deleteDriver,
    updateDriver,
} = require("../controllers/driverController");

const router = express.Router();

router.get("/login_admin", getLoginAdmin);
router.get("/admin_driver", getDriverAdmin);
router.get("/admin_driver_add", addDriverAdmin);
router.get("/admin_page", getPageAdmin);
router.get("/admin_report", getReportAdmin);
router.get("/admin_trip", getTripAdmin);
router.get("/admin_trip_add", addTripAdmin);
router.post("/create-new-driver", addDriver);
router.get("/admin_vehicle", getVehicleAdmin);
router.get("/admin_vehicle_add", addVehicleAdmin);
router.get("/delete-driver/:id", deleteDriver);
router.get("/edit-driver/:user", updateDriver);
module.exports = {
    routes: router,
};
