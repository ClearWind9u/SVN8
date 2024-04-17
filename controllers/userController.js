"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
const Trip = require("../models/trip");
const fireStore = firebase.firestore();

const getLoginUser = async (req, res, next) => {
    return res.render('user/login_user.ejs');
};
const getPageUser = async (req, res, next) => {
    return res.render('user/user_page.ejs');
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
        return res.render('user/user_driver.ejs', { driversArray: driversArray });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addDriverUser = async (req, res, next) => {
    return res.render('user/user_driver_add.ejs');
};
const getReportUser = async (req, res, next) => {
    return res.render('user/user_report.ejs');
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
        return res.render('user/user_trip.ejs', { tripsArray: tripsArray });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addTripUser = async (req, res, next) => {
    return res.render('user/user_trip_add.ejs');
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
        return res.render('user/user_vehicle.ejs', { vehiclesArray: vehiclesArray });
    } catch (error) {
        res.status(400).send(error.message);
    }
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
