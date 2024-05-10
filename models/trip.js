class Trip {
    constructor(
        id,
        arrivalTime,
        departure,
        departureTime,
        destination,
        driverId,
        vehicleId,
        fuelCost,
    ) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.departure = departure;
        this.departureTime = departureTime;
        this.destination = destination;
        this.driverId = driverId;
        this.vehicleId = vehicleId;
        this.fuelCost = fuelCost;
    }
}

module.exports = Trip;
