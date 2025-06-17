// client/src/pages/FlightDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Button, Divider, Box, CircularProgress, Stepper, Step, StepLabel, Chip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FlightTakeoff, FlightLand, Schedule, AttachMoney, AirlineSeatReclineNormal, Luggage } from '@material-ui/icons';
import axios from 'axios';
import FlightTimeline from '../components/FlightTimeline';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
  },
  flightHeader: {
    marginBottom: theme.spacing(4),
  },
  flightInfo: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  priceSection: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
  airlineLogo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  bookButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  detailIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const FlightDetailsPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleBookFlight = () => {
    history.push(`/book/${id}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Box className={classes.loadingContainer}>
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
      <Box display="flex" alignItems="center" className={classes.flightHeader}>
        <Typography variant="h4" component="h1">
          Flight Details
        </Typography>
        <Chip
          label={flight.status}
          color={
            flight.status === 'scheduled' ? 'default' : 
            flight.status === 'active' ? 'primary' : 
            flight.status === 'landed' ? 'secondary' : 'default'
          }
          style={{ marginLeft: 16 }}
        />
      </Box>

      <Paper elevation={2} className={classes.flightInfo}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar 
            src={`https://logo.clearbit.com/${flight.airline.toLowerCase().replace(/\s/g, '')}.com`} 
            className={classes.airlineLogo}
          />
          <Box>
            <Typography variant="h5">{flight.airline}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Flight #{flight.flightNumber} • {flight.aircraft}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <FlightTimeline 
              departure={flight.departure} 
              arrival={flight.arrival} 
              duration={flight.duration}
            />

            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Flight Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.detailItem}>
                    <FlightTakeoff className={classes.detailIcon} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Departure Airport
                      </Typography>
                      <Typography variant="body1">
                        {flight.departure.airport} ({flight.departure.iata})
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.detailItem}>
                    <Schedule className={classes.detailIcon} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Scheduled Departure
                      </Typography>
                      <Typography variant="body1">
                        {new Date(flight.departure.scheduled).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  {flight.departure.terminal && (
                    <Box className={classes.detailItem}>
                      <AirlineSeatReclineNormal className={classes.detailIcon} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Terminal/Gate
                        </Typography>
                        <Typography variant="body1">
                          {flight.departure.terminal}/{flight.departure.gate || 'TBD'}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.detailItem}>
                    <FlightLand className={classes.detailIcon} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Arrival Airport
                      </Typography>
                      <Typography variant="body1">
                        {flight.arrival.airport} ({flight.arrival.iata})
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.detailItem}>
                    <Schedule className={classes.detailIcon} />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Scheduled Arrival
                      </Typography>
                      <Typography variant="body1">
                        {new Date(flight.arrival.scheduled).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  {flight.arrival.terminal && (
                    <Box className={classes.detailItem}>
                      <AirlineSeatReclineNormal className={classes.detailIcon} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Terminal/Gate
                        </Typography>
                        <Typography variant="body1">
                          {flight.arrival.terminal}/{flight.arrival.gate || 'TBD'}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={classes.priceSection}>
              <Typography variant="h6" gutterBottom>
                Pricing
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoney fontSize="large" color="primary" />
                <Typography variant="h4" style={{ marginLeft: 8 }}>
                  {flight.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
                  per passenger
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Includes all taxes and fees
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.bookButton}
                onClick={handleBookFlight}
              >
                Book Now
              </Button>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary">
                  <Luggage fontSize="small" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  Free carry-on bag included
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FlightDetailsPage;