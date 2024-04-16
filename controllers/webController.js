"use strict";

const firebase = require("../db");
//const fireStore = firebase.firestore();

const getAlertPage = async (req, res, next) => {
    return res.render('login_alert.ejs');
};
const getHomePage = async (req, res, next) => {
    return res.render('index.ejs');
};
const getLoginPage = async (req, res, next) => {
    return res.render('login_role.ejs');
};
module.exports = {
    getHomePage,
    getLoginPage,
    getAlertPage,
};
