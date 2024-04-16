"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const fireStore = firebase.firestore();

const getLoginAdmin = async (req, res, next) => {
    return res.render('admin/login_admin.ejs');
};
const getPageAdmin = async (req, res, next) => {
    return res.render('admin/admin_page.ejs');
};
const getDriverAdmin = async (req, res, next) => {
    try {
        const drivers = await fireStore.collection("drivers");
        const data = await drivers.get();
        const driversArray = [];
        if (data.empty) {
            res.status(404).send("No driver record found");
        } else {
            data.forEach((doc) => {
                const driver = new Driver(
                    doc.id,
                    doc.data().name,
                    doc.data().address,
                    doc.data().drivingLicenseClass,
                    doc.data().drivingLicenseNumber,
                    doc.data().identityCardNumber,
                    doc.data().phoneNumber,
                    doc.data().yearOfExperience
                );
                driversArray.push(driver);
            });
            //res.send(driversArray);
        }
        return res.render('admin/admin_driver.ejs', { driversArray: driversArray });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addDriverAdmin = async (req, res, next) => {
    return res.render('admin/admin_driver_add.ejs');
};
const getReportAdmin = async (req, res, next) => {
    return res.render('admin/admin_report.ejs');
};
const getTripAdmin = async (req, res, next) => {
    return res.render('admin/admin_trip.ejs');
};
const addTripAdmin = async (req, res, next) => {
    return res.render('admin/admin_trip_add.ejs');
};
const getVehicleAdmin = async (req, res, next) => {
    return res.render('admin/admin_vehicle.ejs');
};
const addVehicleAdmin = async (req, res, next) => {
    return res.render('admin/admin_vehicle_add.ejs');
};

module.exports = {
    getLoginAdmin,
    getDriverAdmin,
    addDriverAdmin,
    getPageAdmin,
    getReportAdmin,
    getTripAdmin,
    addTripAdmin,
    getVehicleAdmin,
    addVehicleAdmin,
};
