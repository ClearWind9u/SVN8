const express = require("express");
const {
    getHomePage,
    getLoginPage,
    getAlertPage,
} = require("../controllers/webController");

const router = express.Router();

router.get("/", getHomePage);
router.get("/login_role", getLoginPage);
router.get("/login_alert", getAlertPage);

module.exports = {
    routes: router,
};
