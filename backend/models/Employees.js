const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: {
    type: String,
    required: true,
    enum: ['Accountant', 'HR Staff', 'IT Technician', 'Staff'],
  },
  department: {
    type: String,
    required: true,
    enum: ['Finance', 'HR Dept', 'IT Dept'],
  },
  step: { type: String, required: true },
  status: { type: String, required: true, enum: ['Active', 'Inactive'] },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);