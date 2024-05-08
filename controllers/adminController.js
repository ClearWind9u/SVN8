"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
const Trip = require("../models/trip");
const Admin = require("../models/admin");
const fireStore = firebase.firestore();

let check = true;
var ADMIN;

const getLoginAdmin = async (req, res, next) => {
    check = true;
    return res.render('admin/login_admin.ejs', {check : check});
};
const checkLoginAdmin = async (req, res, next) => {
    const data = req.body;
    let admin;
    const driver = await fireStore.collection("admin").where("phoneNumber", "==", data.phoneNumber).get();
    driver.forEach(doc => {
        admin = doc.data();
        admin.id = doc.id;
    });
    if (admin) {
        if (admin.password == data.password) {
            check = true;
            ADMIN = admin;
            return res.redirect("./admin_page");
        }
        else {
            check = false;
            return res.render('admin/login_admin.ejs', {check : check});
        }
    }
    else {
        check = false;
        return res.render('admin/login_admin.ejs', {check : check});
    }
}
const getPageAdmin = async (req, res, next) => {
    return res.render('admin/admin_page.ejs', { admin : ADMIN });
};
const getDriverAdmin = async (req, res, next) => {
    try {
        const drivers = await fireStore.collection("drivers");
        const data = await drivers.get();
        const driversArray = [];
        if (data.empty) {
            console.log("No driver record found");
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
        }
        return res.render('admin/admin_driver.ejs', { driversArray: driversArray, admin : ADMIN });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addDriverAdmin = async (req, res, next) => {
    return res.render('admin/admin_driver_add.ejs', { admin : ADMIN });
};
const getReportAdmin = async (req, res, next) => {
    return res.render('admin/admin_report.ejs', { admin : ADMIN });
};
const getTripAdmin = async (req, res, next) => {
    try {
        const trips = await fireStore.collection("trips");
        const data = await trips.get();
        const tripsArray = [];
        if (data.empty) {
            console.log("No trip record found");
        } else {
            data.forEach((doc) => {
                const trip = new Trip(
                    doc.id,
                    doc.data().arrivalTime,
                    doc.data().departure,
                    doc.data().departureTime,
                    doc.data().destination,
                    doc.data().driverId,
                    doc.data().tripStatus,
                    doc.data().vehicleId,
                    doc.data().fuelCost
                );
                tripsArray.push(trip);
            });
        }
        return res.render('admin/admin_trip.ejs', { tripsArray: tripsArray, admin : ADMIN });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addTripAdmin = async (req, res, next) => {
    return res.render('admin/admin_trip_add.ejs',{ check : true, checkDate : true, admin : ADMIN });
};
const getVehicleAdmin = async (req, res, next) => {
    try {
        const vehicles = await fireStore.collection("vehicles");
        const data = await vehicles.get();
        const vehiclesArray = [];
        if (data.empty) {
            console.log("No vehicle record found");
        } else {
            data.forEach((doc) => {
                const vehicle = new Vehicle(
                    doc.id,
                    doc.data().vehicleType,
                    doc.data().carManufacturer,
                    doc.data().dimension,
                    doc.data().licensePlate,
                    doc.data().loadCapacity,
                    doc.data().fuelType,
                    doc.data().vehicleCost,
                    doc.data().maintenanceHistory
                );
                vehiclesArray.push(vehicle);
            });
        }
        return res.render('admin/admin_vehicle.ejs', { vehiclesArray: vehiclesArray , admin : ADMIN });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addVehicleAdmin = async (req, res, next) => {
    return res.render('admin/admin_vehicle_add.ejs', { admin : ADMIN });
};

module.exports = {
    getLoginAdmin,
    checkLoginAdmin,
    getDriverAdmin,
    addDriverAdmin,
    getPageAdmin,
    getReportAdmin,
    getTripAdmin,
    addTripAdmin,
    getVehicleAdmin,
    addVehicleAdmin,
};
