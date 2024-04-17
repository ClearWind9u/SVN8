class Trip {
    constructor(
        id,
        arrivalTime,
        departure,
        departureTime,
        destination,
        driverId,
        tripStatus,
        vehicleId,
        fuelCost,
    ) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.departure = departure;
        this.departureTime = departureTime;
        this.destination = destination;
        this.driverId = driverId;
        this.tripStatus = tripStatus;
        this.vehicleId = vehicleId;
        this.fuelCost = fuelCost;
    }
}

module.exports = Trip;
