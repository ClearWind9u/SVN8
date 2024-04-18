"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const driverRoutes = require("./routes/driver-routes");
const tripRoutes = require("./routes/trip-routes");
const vehicleRoutes = require("./routes/vehicle-routes");
const webRoutes = require("./routes/web-routes");
const adminRoutes = require("./routes/admin-routes");
const userRoutes = require('./routes/user-routes');
const adminAccountRoutes = require("./routes/admin-account-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./views/'));
app.use(express.urlencoded({ extended: true }));
app.use("/api", driverRoutes.routes);
app.use("/api", tripRoutes.routes);
app.use("/api", vehicleRoutes.routes);
app.use("/admin", adminRoutes.routes);
app.use("/user", userRoutes.routes);
app.use("/api", adminAccountRoutes.routes);
app.use("", webRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);