"use strict";

const firebase = require("../db");
const Admin = require("../models/admin");
const fireStore = firebase.firestore();


const addAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    await fireStore.collection("admin").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await fireStore.collection("admin");
    const data = await admins.get();
    const adminsArray = [];
    if (data.empty) {
      res.status(404).send("No admin record found");
    } else {
      data.forEach((doc) => {
        const admin = new Admin(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().fatherName,
          doc.data().class,
          doc.data().age,
          doc.data().phoneNumber,
          doc.data().subject,
          doc.data().year,
          doc.data().semester,
          doc.data().status
        );
        adminsArray.push(admin);
      });
      res.send(adminsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = await fireStore.collection("admin").doc(id);
    const data = await admin.get();
    if (!data.exists) {
      res.status(404).send("Admin with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const admin = await fireStore.collection("admin").doc(id);
    await admin.update(data);
    res.send("Admin record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    await fireStore.collection("admin").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
