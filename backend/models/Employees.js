const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  province: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  barangay: { type: String, required: true },
}, { _id: false });

const EmployeeSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  extension: { type: String },
  civilStatus: { type: String, required: true, enum: ['Single', 'Married', 'Widowed', 'Separated', 'Other/s'] },
  citizenship: { type: String, required: true, enum: ['Filipino', 'Dual Citizenship'] },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  address: { type: AddressSchema, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);