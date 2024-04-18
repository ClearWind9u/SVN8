const express = require("express");
const {
    getPageAdmin,
    getReportAdmin,
    getLoginAdmin,
    checkLoginAdmin,

    getDriverAdmin,
    addDriverAdmin,

    getVehicleAdmin,
    addVehicleAdmin,

    getTripAdmin,
    addTripAdmin,
} = require("../controllers/adminController");

const {
    addDriver,
    deleteDriver,
    updateDriver,
} = require("../controllers/driverController");

const { addVehicle, deleteVehicle, updateVehicle } = require("../controllers/vehicleController");

const { addTrip, deleteTrip, updateTrip } = require("../controllers/tripController");

const router = express.Router();

router.get("/login_admin", getLoginAdmin);
router.get("/admin_page", getPageAdmin);
router.post("/check-login-admin", checkLoginAdmin);
router.get("/admin_report", getReportAdmin);

router.get("/admin_driver", getDriverAdmin);
router.get("/admin_driver_add", addDriverAdmin);
router.post("/create-new-driver", addDriver);
router.get("/delete-driver/:id", deleteDriver);
router.get("/edit-driver/:user", updateDriver);

router.get("/admin_vehicle", getVehicleAdmin);
router.get("/admin_vehicle_add", addVehicleAdmin);
router.post("/create-new-vehicle", addVehicle);
router.get("/delete-vehicle/:id", deleteVehicle);
router.get("/edit-vehicle/:user", updateVehicle);

router.get("/admin_trip", getTripAdmin);
router.get("/admin_trip_add", addTripAdmin);
router.post("/create-new-trip", addTrip);
router.get("/delete-trip/:id", deleteTrip);
router.get("/edit-trip/:user", updateTrip);

module.exports = {
    routes: router,
};
