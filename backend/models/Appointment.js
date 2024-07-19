const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  summary: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
