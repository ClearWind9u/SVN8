const express = require("express");
const {
    getPageUser,
    getReportUser,
    getLoginUser,
    checkLoginUser,

    getDriverUser,

    getVehicleUser,

    getTripUser,
    
    getProfileUser,
    editProfileUser,
} = require("../controllers/userController");


const router = express.Router();

router.get("/login_user", getLoginUser);
router.post("/check-login-user", checkLoginUser);
router.get("/user_page", getPageUser);

router.get("/user_profile", getProfileUser);
router.post("/edit-user-profile", editProfileUser);

router.get("/user_report", getReportUser);

router.get("/user_driver", getDriverUser);

router.get("/user_vehicle", getVehicleUser);

router.get("/user_trip", getTripUser);

module.exports = {
    routes: router,
};
