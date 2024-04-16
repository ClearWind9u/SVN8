import express from "express";
//var express = require('express');

let configViewEngine = (app) => {
    app.use(express.static("./HeThongQuanLyDoiXe/public"));
    app.set("view engine", "ejs");
    app.set("views", "./HeThongQuanLyDoiXe/views");
}

export default configViewEngine;