"use strict";

const firebase = require("../db");
const Vehicle = require("../models/vehicle");
const fireStore = firebase.firestore();

const addVehicle = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.licensePlate;
        await fireStore.collection("vehicles").doc(id).set(data);
        return res.redirect("./admin_vehicle");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllVehicles = async (req, res, next) => {
    try {
        const vehicles = await fireStore.collection("vehicles");
        const data = await vehicles.get();
        const vehiclesArray = [];
        if (data.empty) {
            res.status(404).send("No vehicle record found");
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
            res.send(vehiclesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getVehicle = async (req, res, next) => {
    try {
        const id = req.params.id;
        const vehicle = await fireStore.collection("vehicles").doc(id);
        const data = await vehicle.get();
        if (!data.exists) {
            res.status(404).send("Vehicle with the given ID not found");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateVehicle = async (req, res, next) => {
    try {
        let user = decodeURIComponent(req.params.user);
        user = JSON.parse(user);
        const id = user.id;
        delete user.id;
        const vehicle = await fireStore.collection("vehicles").doc(id);
        await vehicle.update(user);
        return res.redirect("../admin_vehicle");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteVehicle = async (req, res, next) => {
    try {
        const id = req.params.id;
        await fireStore.collection("vehicles").doc(id).delete();
        return res.redirect("../admin_vehicle");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
};
