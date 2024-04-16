"use strict";

const firebase = require("../db");
//const fireStore = firebase.firestore();
const getLoginUser = async (req, res, next) => {
    return res.render('user/login_user.ejs');
};
const getPageUser = async (req, res, next) => {
    return res.render('user/user_page.ejs');
};
const getDriverUser = async (req, res, next) => {
    return res.render('user/user_driver.ejs');
};
const addDriverUser = async (req, res, next) => {
    return res.render('user/user_driver_add.ejs');
};
const getReportUser = async (req, res, next) => {
    return res.render('user/user_report.ejs');
};
const getTripUser = async (req, res, next) => {
    return res.render('user/user_trip.ejs');
};
const addTripUser = async (req, res, next) => {
    return res.render('user/user_trip_add.ejs');
};
const getVehicleUser = async (req, res, next) => {
    return res.render('user/user_vehicle.ejs');
};
const addVehicleUser = async (req, res, next) => {
    return res.render('user/user_vehicle_add.ejs');
};

module.exports = {
    getLoginUser,
    getDriverUser,
    addDriverUser,
    getPageUser,
    getReportUser,
    getTripUser,
    addTripUser,
    getVehicleUser,
    addVehicleUser,
};
