"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const fireStore = firebase.firestore();

const addDriver = async (req, res, next) => {
    try {
        const data = req.body;
        await fireStore.collection("drivers").doc().set(data);
        return res.redirect("./admin_driver");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllDrivers = async (req, res, next) => {
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
            res.send(driversArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        const driver = await fireStore.collection("drivers").doc(id);
        const data = await driver.get();
        if (!data.exists) {
            res.status(404).send("Driver with the given ID not found");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateDriver = async (req, res, next) => {
    try {
        let user = decodeURIComponent(req.params.user);
        user = JSON.parse(user);
        const id = user.id;
        delete user.id;
        // const data = req.body;
        const driver = await fireStore.collection("drivers").doc(id);
        await driver.update(user);
        return res.redirect("../admin_driver");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        await fireStore.collection("drivers").doc(id).delete();
        return res.redirect("../admin_driver");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addDriver,
    getAllDrivers,
    getDriver,
    updateDriver,
    deleteDriver,
};
