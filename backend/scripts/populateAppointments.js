const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
require('dotenv').config();

// MongoDB URI configuration
const mongoURI = process.env.MONGODB_URI;

// Dummy data for appointments
const dummyAppointments = [
  {
    summary: 'Therapy Session',
    description: 'Individual therapy session for stress management.',
    location: '123 Main St, Virtual',
    startDateTime: new Date('2024-07-16T10:00:00Z'),
    endDateTime: new Date('2024-07-16T11:00:00Z'),
  },
  {
    summary: 'Group Music Therapy',
    description: 'Group therapy using music to explore emotions.',
    location: '456 Oak Ave, Studio A',
    startDateTime: new Date('2024-07-17T15:00:00Z'),
    endDateTime: new Date('2024-07-17T16:00:00Z'),
  },
  // Add more appointments as needed
];

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');

    // Insert dummy appointments
    Appointment.insertMany(dummyAppointments)
      .then(() => {
        console.log('Dummy appointments inserted successfully.');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error inserting dummy appointments:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
