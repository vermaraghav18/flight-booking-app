import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Divider, 
  Grid,
  styled 
} from '@mui/material';
import { CheckCircle, FlightTakeoff, Email, Print } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Using styled API instead of makeStyles
const PaddedContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const ConfirmationPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const ItineraryPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  textAlign: 'left',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const PassengerList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookingInfo } = useAuth();

  useEffect(() => {
    if (!bookingInfo || bookingInfo.bookingReference !== id) {
      navigate('/');
    }
  }, [bookingInfo, id, navigate]);

  if (!bookingInfo || bookingInfo.bookingReference !== id) {
    return null;
  }

  const { flight, passengers, bookingReference } = bookingInfo;

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    // In a real app, you would send an email
    console.log('Sending email with booking details');
  };

  return (
    <PaddedContainer maxWidth="md">
      <ConfirmationPaper elevation={2}>
        <CheckCircle sx={{ fontSize: '5rem', color: 'success.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Your flight has been successfully booked
        </Typography>
        <Typography variant="body1" gutterBottom>
          Booking Reference: <strong>{bookingReference}</strong>
        </Typography>
        <Typography variant="body1">
          We've sent a confirmation email with your booking details.
        </Typography>
        
        <ActionButtons>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Email />}
            onClick={handleEmail}
          >
            Resend Email
          </Button>
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Print Itinerary
          </Button>
        </ActionButtons>
      </ConfirmationPaper>
      
      <ItineraryPaper elevation={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          <FlightTakeoff fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Flight Itinerary
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Flight Details
            </Typography>
            <Divider />
            
            <Box mt={2}>
              <Typography variant="subtitle1">
                {flight.departure.iata} → {flight.arrival.iata}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {flight.airline} • Flight {flight.flightNumber}
              </Typography>
              
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body1">
                    {new Date(flight.departure.scheduled).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {flight.departure.airport} ({flight.departure.iata})
                  </Typography>
                  {flight.departure.terminal && (
                    <Typography variant="body2">
                      Terminal: {flight.departure.terminal}, Gate: {flight.departure.gate || 'TBD'}
                    </Typography>
                  )}
                </Box>
                
                <Box textAlign="center">
                  <Typography variant="body2" color="textSecondary">
                    {flight.duration}
                  </Typography>
                </Box>
                
                <Box textAlign="right">
                  <Typography variant="body1">
                    {new Date(flight.arrival.scheduled).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {flight.arrival.airport} ({flight.arrival.iata})
                  </Typography>
                  {flight.arrival.terminal && (
                    <Typography variant="body2">
                      Terminal: {flight.arrival.terminal}, Gate: {flight.arrival.gate || 'TBD'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Passenger Information
            </Typography>
            <Divider />
            
            <PassengerList>
              {passengers.map((passenger, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="subtitle1">
                    Passenger {index + 1}: {passenger.firstName} {passenger.lastName}
                  </Typography>
                  <Typography variant="body2">
                    Seat Preference: {passenger.seatPreference}
                  </Typography>
                  <Typography variant="body2">
                    Passport: {passenger.passportNumber}
                  </Typography>
                </Box>
              ))}
            </PassengerList>
          </Grid>
        </Grid>
        
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Booking Summary
          </Typography>
          <Divider />
          
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body1">Flight Price ({passengers.length} passengers)</Typography>
              <Typography variant="body1">${flight.price * passengers.length}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body1">Taxes & Fees</Typography>
              <Typography variant="body1">$0</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="h6">Total Paid</Typography>
              <Typography variant="h6">${flight.price * passengers.length}</Typography>
            </Box>
          </Box>
        </Box>
      </ItineraryPaper>
      
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </PaddedContainer>
  );
};

export default ConfirmationPage;