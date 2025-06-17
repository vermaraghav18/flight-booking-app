// server/controllers/flightController.js
const axios = require('axios');
const FlightBooking = require('../models/FlightBooking');

const API_KEY = '0b0ab613ff8d8bc9d20efb266758ead2';
const API_BASE_URL = 'http://api.aviationstack.com/v1';

exports.searchFlights = async (req, res) => {
  try {
    const { departure, arrival, date, returnDate, passengers } = req.query;
    
    const response = await axios.get(`${API_BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        dep_iata: departure,
        arr_iata: arrival,
        flight_date: date,
      }
    });

    const flights = response.data.data.map(flight => ({
      id: flight.flight.iata,
      airline: flight.airline.name,
      flightNumber: flight.flight.number,
      departure: {
        airport: flight.departure.airport,
        iata: flight.departure.iata,
        scheduled: flight.departure.scheduled,
        terminal: flight.departure.terminal,
        gate: flight.departure.gate
      },
      arrival: {
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        scheduled: flight.arrival.scheduled,
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate
      },
      aircraft: flight.aircraft?.model || 'Unknown',
      price: Math.floor(Math.random() * 500) + 200, // Mock price
      duration: calculateFlightDuration(
        flight.departure.scheduled,
        flight.arrival.scheduled
      )
    }));

    res.json(flights);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Failed to search flights' });
  }
};

exports.getFlightDetails = async (req, res) => {
  try {
    const { flightId } = req.params;
    
    const response = await axios.get(`${API_BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        flight_iata: flightId
      }
    });

    if (!response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    const flight = response.data.data[0];
    const flightDetails = {
      id: flight.flight.iata,
      airline: flight.airline.name,
      flightNumber: flight.flight.number,
      departure: {
        airport: flight.departure.airport,
        iata: flight.departure.iata,
        scheduled: flight.departure.scheduled,
        terminal: flight.departure.terminal,
        gate: flight.departure.gate
      },
      arrival: {
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        scheduled: flight.arrival.scheduled,
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate
      },
      aircraft: flight.aircraft?.model || 'Unknown',
      status: flight.flight_status,
      price: Math.floor(Math.random() * 500) + 200, // Mock price
      duration: calculateFlightDuration(
        flight.departure.scheduled,
        flight.arrival.scheduled
      )
    };

    res.json(flightDetails);
  } catch (error) {
    console.error('Error fetching flight details:', error);
    res.status(500).json({ error: 'Failed to fetch flight details' });
  }
};

exports.bookFlight = async (req, res) => {
  try {
    const { flightId, passengers, paymentInfo, contactInfo } = req.body;
    
    // In a real app, you would process payment here
    
    const booking = new FlightBooking({
      flightId,
      passengers,
      contactInfo,
      bookingDate: new Date(),
      status: 'confirmed',
      bookingReference: generateBookingReference()
    });

    await booking.save();
    
    res.json({
      success: true,
      bookingReference: booking.bookingReference,
      message: 'Flight booked successfully'
    });
  } catch (error) {
    console.error('Error booking flight:', error);
    res.status(500).json({ error: 'Failed to book flight' });
  }
};

function calculateFlightDuration(departureTime, arrivalTime) {
  const dep = new Date(departureTime);
  const arr = new Date(arrivalTime);
  const durationMs = arr - dep;
  
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

function generateBookingReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}