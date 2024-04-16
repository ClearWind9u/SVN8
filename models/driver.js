class Driver {
  constructor(
    id,
    name,
    address,
    drivingLicenseClass,
    drivingLicenseNumber,
    identityCardNumber,
    phoneNumber,
    yearOfExperience,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.drivingLicenseClass = drivingLicenseClass;
    this.drivingLicenseNumber = drivingLicenseNumber;
    this.identityCardNumber = identityCardNumber;
    this.phoneNumber = phoneNumber;
    this.yearOfExperience = yearOfExperience;
  }
}

module.exports = Driver;
