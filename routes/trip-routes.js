const express = require("express");
const {
    addTrip,
    getAllTrips,
    getTrip,
    updateTrip,
    deleteTrip,
} = require("../controllers/tripController");

const router = express.Router();

router.post("/trip", addTrip);
router.get("/trips", getAllTrips);
router.get("/trip/:id", getTrip);
router.put("/trip/:id", updateTrip);
router.delete("/trip/:id", deleteTrip);

module.exports = {
    routes: router,
};
