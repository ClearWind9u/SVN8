"use strict";

const firebase = require("../db");
const Driver = require("../models/driver");
const fireStore = firebase.firestore();

var strID = (length) => {
    let pre = "";
    let len = 4 - length;
    for (let i = 0; i < len; i++){
        pre += "0";
    }
    return pre;
};

const addDriver = async (req, res, next) => {
    try {
        const data = req.body;
        // Lấy ID mới dạng số thứ tự tăng dần
        const querySnapshot = await fireStore
            .collection("drivers")
            .orderBy("id", "desc")
            .limit(1)
            .get();
        let newId = 1;
  
        if (!querySnapshot.empty) {
            const lastDocument = querySnapshot.docs[0].data();
            newId = parseInt(lastDocument.id, 0) + 1;
        }
  
      // Thêm trường 'id' với giá trị số thứ tự tăng dần
        data.id = strID(newId.toString().length) + newId.toString();
  
      // Thêm tài liệu mới với ID được tạo tự động
        await fireStore.collection("drivers").doc(strID(newId.toString().length) + newId.toString()).set(data);
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
