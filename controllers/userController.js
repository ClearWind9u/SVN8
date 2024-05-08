"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
const Trip = require("../models/trip");
const fireStore = firebase.firestore();

let check = true;
var USER;

const getLoginUser = async (req, res, next) => {
    check = true;
    return res.render('user/login_user.ejs', {check : check});
};
const checkLoginUser = async (req, res, next) => {
    const data = req.body;
    let user;
    const driver = await fireStore.collection("drivers").where("phoneNumber", "==", data.phoneNumber).get();
    driver.forEach(doc => {
        user = doc.data();
        user.id = doc.id;
    });
    if (user) {
        if (user.password == data.password) {
            check = true;
            USER = user;
            return res.redirect('./user_page');
        }
        else {
            check = false;
            return res.render('user/login_user.ejs', {check : check});
        }
    }
    else {
        check = false;
        return res.render('user/login_user.ejs', {check : check});
    }
}
const getPageUser = async (req, res, next) => {
    return res.render('user/user_page.ejs', { user : USER });
};
const getProfileUser = async (req, res, next) => {
    return res.render('user/user_profile.ejs', { user : USER });
};
const editProfileUser = async (req, res, next) => {
    try {
        const data = req.body;
        let id = USER.id;
        USER = data;
        const driver = await fireStore.collection("drivers").doc(id);
        await driver.update(USER);
        return res.redirect('./user_profile');
    } catch (error) {
        res.status(400).send("error");
    }
};
const getDriverUser = async (req, res, next) => {
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
        return res.render('user/user_driver.ejs', { driversArray: driversArray, user : USER});
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getReportUser = async (req, res, next) => {
    return res.render('user/user_report.ejs', { user : USER });
};
const getTripUser = async (req, res, next) => {
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
        return res.render('user/user_trip.ejs', { tripsArray: tripsArray , user : USER});
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getVehicleUser = async (req, res, next) => {
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
        return res.render('user/user_vehicle.ejs', { vehiclesArray: vehiclesArray , user : USER });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getLoginUser,
    checkLoginUser,
    getDriverUser,
    getPageUser,
    getProfileUser,
    editProfileUser,
    getReportUser,
    getTripUser,
    getVehicleUser,
};
