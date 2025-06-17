// server/models/FlightBooking.js
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  passportNumber: { type: String, required: true },
  seatPreference: { type: String, enum: ['window', 'aisle', 'middle'] }
});

const contactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  }
});

const flightBookingSchema = new mongoose.Schema({
  flightId: { type: String, required: true },
  passengers: [passengerSchema],
  contactInfo: contactInfoSchema,
  bookingDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'confirmed' 
  },
  bookingReference: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('FlightBooking', flightBookingSchema);