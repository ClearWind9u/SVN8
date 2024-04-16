class Vehicle {
    constructor(
        carManufacturer,
        dimension,
        fuelCost,
        fuelType,
        licensePlate,
        loadCapacity,
        maintenanceHistory,
        vehicleCost,
        vehicleType,
    ) {
        this.carManufacturer = carManufacturer;
        this.dimension = dimension;
        this.fuelCost = fuelCost;
        this.fuelType = fuelType;
        this.licensePlate = licensePlate;
        this.loadCapacity = loadCapacity;
        this.maintenanceHistory = maintenanceHistory;
        this.vehicleCost = vehicleCost;
        this.vehicleType = vehicleType;
    }
}

module.exports = Vehicle;
