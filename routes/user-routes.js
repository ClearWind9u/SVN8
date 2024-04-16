const express = require("express");
const {
    getDriverUser,
    getPageUser,
    getReportUser,
    addTripUser,
    getTripUser,
    getVehicleUser,
    getLoginUser,
    addDriverUser,
    addVehicleUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/login_user", getLoginUser);
router.get("/user_driver", getDriverUser);
router.get("/user_driver_add", addDriverUser);
router.get("/user_page", getPageUser);
router.get("/user_report", getReportUser);
router.get("/user_trip", getTripUser);
router.get("/user_trip_add", addTripUser);
router.get("/user_vehicle", getVehicleUser);
router.get("/user_vehicle_add", addVehicleUser);

module.exports = {
    routes: router,
};
