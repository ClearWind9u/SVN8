"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
const Trip = require("../models/trip");
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
        return res.render('admin/admin_trip.ejs', { tripsArray: tripsArray });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
const addTripAdmin = async (req, res, next) => {
    return res.render('admin/admin_trip_add.ejs');
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
        return res.render('admin/admin_vehicle.ejs', { vehiclesArray: vehiclesArray });
    } catch (error) {
        res.status(400).send(error.message);
    }
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
