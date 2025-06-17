// client/src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Button, Stepper, Step, StepLabel, Divider, Box, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Person, CreditCard, FlightTakeoff, ContactMail, Payment } from '@material-ui/icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  section: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    width: '100%',
  },
  passengerForm: {
    marginTop: theme.spacing(3),
  },
  paymentMethods: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  paymentMethod: {
    flex: '1 1 200px',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.selected': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.action.selected,
    },
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1, 0),
  },
  totalPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  bookButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
  },
}));

const steps = ['Passenger Details', 'Payment', 'Confirmation'];

const BookingPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { user, saveBookingInfo } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengers, setPassengers] = useState([
    {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      passportNumber: '',
      seatPreference: 'window',
    },
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/flights/${id}`);
        setFlight(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch flight details');
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        passportNumber: '',
        seatPreference: 'window',
      },
    ]);
  };

  const handleRemovePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    }
  };

  const handleContactInfoChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setContactInfo({
        ...contactInfo,
        [parent]: {
          ...contactInfo[parent],
          [child]: value,
        },
      });
    } else {
      setContactInfo({
        ...contactInfo,
        [field]: value,
      });
    }
  };

  const handlePaymentDetailsChange = (field, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        flightId: id,
        passengers,
        contactInfo,
        paymentInfo: {
          method: paymentMethod,
          details: paymentMethod === 'creditCard' ? paymentDetails : null,
        },
      };

      const response = await axios.post('/api/flights/book', bookingData);
      saveBookingInfo({
        ...response.data,
        flight,
        passengers,
      });
      history.push(`/confirmation/${response.data.bookingReference}`);
    } catch (err) {
      setError(err.message || 'Failed to complete booking');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!flight) {
    return null;
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} className={classes.section}>
            {activeStep === 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  <Person fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Passenger Information
                </Typography>
                <Divider />
                
                {passengers.map((passenger, index) => (
                  <Box key={index} className={classes.passengerForm}>
                    <Typography variant="subtitle1" gutterBottom>
                      Passenger {index + 1}
                      {passengers.length > 1 && (
                        <Button 
                          color="secondary" 
                          size="small" 
                          style={{ marginLeft: 16 }}
                          onClick={() => handleRemovePassenger(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First Name"
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                          className={classes.formControl}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Last Name"
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                          className={classes.formControl}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Date of Birth"
                          type="date"
                          value={passenger.dateOfBirth}
                          onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                          className={classes.formControl}
                          InputLabelProps={{ shrink: true }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Passport Number"
                          value={passenger.passportNumber}
                          onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                          className={classes.formControl}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Seat Preference</InputLabel>
                          <Select
                            value={passenger.seatPreference}
                            onChange={(e) => handlePassengerChange(index, 'seatPreference', e.target.value)}
                          >
                            <MenuItem value="window">Window</MenuItem>
                            <MenuItem value="aisle">Aisle</MenuItem>
                            <MenuItem value="middle">Middle</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                
                <Box mt={2}>
                  <Button variant="outlined" onClick={handleAddPassenger}>
                    Add Another Passenger
                  </Button>
                </Box>
                
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    <ContactMail fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Contact Information
                  </Typography>
                  <Divider />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => handleContactInfoChange('email', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        value={contactInfo.phone}
                        onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Street Address"
                        value={contactInfo.address.street}
                        onChange={(e) => handleContactInfoChange('address.street', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="City"
                        value={contactInfo.address.city}
                        onChange={(e) => handleContactInfoChange('address.city', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="State/Province"
                        value={contactInfo.address.state}
                        onChange={(e) => handleContactInfoChange('address.state', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="ZIP/Postal Code"
                        value={contactInfo.address.zipCode}
                        onChange={(e) => handleContactInfoChange('address.zipCode', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        value={contactInfo.address.country}
                        onChange={(e) => handleContactInfoChange('address.country', e.target.value)}
                        className={classes.formControl}
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            
            {activeStep === 1 && (
              <>
                <Typography variant="h6" gutterBottom>
                  <Payment fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Payment Method
                </Typography>
                <Divider />
                
                <Box className={classes.paymentMethods}>
                  <Paper 
                    elevation={0} 
                    className={`${classes.paymentMethod} ${paymentMethod === 'creditCard' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('creditCard')}
                  >
                    <Typography variant="subtitle1">Credit Card</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Visa, Mastercard, Amex
                    </Typography>
                  </Paper>
                  
                  <Paper 
                    elevation={0} 
                    className={`${classes.paymentMethod} ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <Typography variant="subtitle1">PayPal</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Secure online payments
                    </Typography>
                  </Paper>
                  
                  <Paper 
                    elevation={0} 
                    className={`${classes.paymentMethod} ${paymentMethod === 'bankTransfer' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('bankTransfer')}
                  >
                    <Typography variant="subtitle1">Bank Transfer</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Direct bank payment
                    </Typography>
                  </Paper>
                </Box>
                
                {paymentMethod === 'creditCard' && (
                  <Box mt={4}>
                    <Typography variant="subtitle1" gutterBottom>
                      Credit Card Details
                    </Typography>
                    
                    <TextField
                      label="Card Number"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => handlePaymentDetailsChange('cardNumber', e.target.value)}
                      className={classes.formControl}
                      required
                    />
                    
                    <TextField
                      label="Name on Card"
                      value={paymentDetails.cardName}
                      onChange={(e) => handlePaymentDetailsChange('cardName', e.target.value)}
                      className={classes.formControl}
                      required
                    />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => handlePaymentDetailsChange('expiryDate', e.target.value)}
                          className={classes.formControl}
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="CVV"
                          value={paymentDetails.cvv}
                          onChange={(e) => handlePaymentDetailsChange('cvv', e.target.value)}
                          className={classes.formControl}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                <Box mt={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="I agree to the terms and conditions and privacy policy"
                  />
                </Box>
              </>
            )}
            
            {activeStep === 2 && (
              <>
                <Typography variant="h6" gutterBottom>
                  <FlightTakeoff fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Booking Summary
                </Typography>
                <Divider />
                
                <Box mt={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Flight Details
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">
                      {flight.departure.iata} → {flight.arrival.iata}
                    </Typography>
                    <Typography variant="body1">
                      {new Date(flight.departure.scheduled).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="textSecondary">
                      {flight.airline} • {flight.flightNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Departure: {new Date(flight.departure.scheduled).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Box mt={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Passenger Information
                  </Typography>
                  {passengers.map((passenger, index) => (
                    <Box key={index} mb={2}>
                      <Typography variant="body1">
                        {passenger.firstName} {passenger.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Passport: {passenger.passportNumber} • Seat: {passenger.seatPreference}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                
                <Box mt={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography variant="body1">{contactInfo.email}</Typography>
                  <Typography variant="body1">{contactInfo.phone}</Typography>
                </Box>
              </>
            )}
          </Paper>
          
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && (
                  passengers.some(p => !p.firstName || !p.lastName || !p.dateOfBirth || !p.passportNumber) ||
                  !contactInfo.email || !contactInfo.phone || 
                  !contactInfo.address.street || !contactInfo.address.city ||
                  !contactInfo.address.state || !contactInfo.address.zipCode || 
                  !contactInfo.address.country
                )) ||
                (activeStep === 1 && !termsAccepted) ||
                (activeStep === 1 && paymentMethod === 'creditCard' && (
                  !paymentDetails.cardNumber || !paymentDetails.cardName || 
                  !paymentDetails.expiryDate || !paymentDetails.cvv
                ))
              }
            >
              {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} className={classes.section}>
            <Typography variant="h6" gutterBottom>
              Price Summary
            </Typography>
            <Divider />
            
            <Box mt={2}>
              {passengers.map((_, index) => (
                <Box key={index} className={classes.summaryItem}>
                  <Typography variant="body1">
                    Passenger {index + 1} (Adult)
                  </Typography>
                  <Typography variant="body1">
                    ${flight.price}
                  </Typography>
                </Box>
              ))}
              
              <Box className={classes.summaryItem}>
                <Typography variant="body1">Taxes & Fees</Typography>
                <Typography variant="body1">$0</Typography>
              </Box>
              
              <Divider />
              
              <Box className={classes.summaryItem}>
                <Typography variant="body1" className={classes.totalPrice}>
                  Total
                </Typography>
                <Typography variant="body1" className={classes.totalPrice}>
                  ${flight.price * passengers.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper elevation={2} className={classes.section}>
            <Typography variant="h6" gutterBottom>
              Flight Itinerary
            </Typography>
            <Divider />
            
            <Box mt={2}>
              <Typography variant="subtitle1">
                {flight.departure.iata} → {flight.arrival.iata}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {flight.airline} • {flight.flightNumber}
              </Typography>
              
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body1">
                    {new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {flight.departure.iata}
                  </Typography>
                </Box>
                
                <Box textAlign="center">
                  <Typography variant="body2" color="textSecondary">
                    {flight.duration}
                  </Typography>
                </Box>
                
                <Box textAlign="right">
                  <Typography variant="body1">
                    {new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {flight.arrival.iata}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingPage;