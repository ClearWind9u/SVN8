"use strict";

const firebase = require("../db");
const Trip = require("../models/trip");
const fireStore = firebase.firestore();

const addTrip = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.driverId;
        const driver = await fireStore.collection("drivers").doc(id);
        const driverData = await driver.get();
        if (!driverData.exists) {
            return res.render("admin/admin_trip_add.ejs",{check : false, checkDate : true});
        } 
        if (data.departureTime > data.arrivalTime){
            return res.render("admin/admin_trip_add.ejs",{check : true, checkDate : false});
        }
        
        await fireStore.collection("trips").doc().set(data);
        return res.redirect("./admin_trip");
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllTrips = async (req, res, next) => {
    try {
        const trips = await fireStore.collection("trips");
        const data = await trips.get();
        const tripsArray = [];
        if (data.empty) {
            res.status(404).send("No trip record found");
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
            res.send(tripsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTrip = async (req, res, next) => {
    try {
        const id = req.params.id;
        const trip = await fireStore.collection("trips").doc(id);
        const data = await trip.get();
        if (!data.exists) {
            res.status(404).send("Trip with the given ID not found");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateTrip = async (req, res, next) => {
    try {
        let user = decodeURIComponent(req.params.user);
        user = JSON.parse(user);
        const id = user.id;
        delete user.id;
        const trip = await fireStore.collection("trips").doc(id);
        await trip.update(user);
        return res.redirect("../admin_trip");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteTrip = async (req, res, next) => {
    try {
        const id = req.params.id;
        await fireStore.collection("trips").doc(id).delete();
        return res.redirect("../admin_trip");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addTrip,
    getAllTrips,
    getTrip,
    updateTrip,
    deleteTrip,
};
