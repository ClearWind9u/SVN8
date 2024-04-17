class Vehicle {
    constructor(
        id,
        vehicleType,
        carManufacturer,
        dimension,
        licensePlate,
        loadCapacity,
        fuelType,
        vehicleCost,
        maintenanceHistory,
    ) {
        this.id = id,
        this.vehicleType = vehicleType;
        this.carManufacturer = carManufacturer;
        this.dimension = dimension;
        this.licensePlate = licensePlate;
        this.loadCapacity = loadCapacity;
        this.fuelType = fuelType;
        this.vehicleCost = vehicleCost;
        this.maintenanceHistory = maintenanceHistory;
    }
}

module.exports = Vehicle;
