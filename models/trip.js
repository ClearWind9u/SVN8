class Trip {
    constructor(
        arrivalTime,
        departure,
        departureTime,
        destination,
        driverId,
        tripStatus,
        vehicleId,
    ) {
        this.arrivalTime = arrivalTime;
        this.departure = departure;
        this.departureTime = departureTime;
        this.destination = destination;
        this.driverId = driverId;
        this.tripStatus = tripStatus;
        this.vehicleId = vehicleId;
    }
}

module.exports = Trip;
