const express = require("express");
const {
    addVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

router.post("/vehicle", addVehicle);
router.get("/vehicles", getAllVehicles);
router.get("/vehicle/:id", getVehicle);
router.put("/vehicle/:id", updateVehicle);
router.delete("/vehicle/:id", deleteVehicle);

module.exports = {
    routes: router,
};
