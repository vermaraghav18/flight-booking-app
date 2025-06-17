// client/src/pages/HomePage.js
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import { FlightTakeoff, FlightLand, DateRange, People } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DestinationsSection from '../components/DestinationsSection';
import TestimonialsSection from '../components/TestimonialsSection';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginTop: theme.spacing(-8),
    position: 'relative',
    zIndex: 1,
  },
  searchPaper: {
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[10],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchButton: {
    height: 56,
    marginTop: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [searchData, setSearchData] = useState({
    departure: '',
    arrival: '',
    departureDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    passengers: 1,
    tripType: 'round',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setSearchData({ ...searchData, [field]: date });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      departure: searchData.departure,
      arrival: searchData.arrival,
      date: searchData.departureDate.toISOString().split('T')[0],
      returnDate: searchData.returnDate.toISOString().split('T')[0],
      passengers: searchData.passengers,
    });
    history.push(`/search?${queryParams}`);
  };

  return (
    <>
      <HeroSection />
      
      <Container maxWidth="lg" className={classes.searchContainer}>
        <Paper className={classes.searchPaper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <FlightTakeoff className={classes.icon} />
                <TextField
                  fullWidth
                  label="From"
                  variant="outlined"
                  name="departure"
                  value={searchData.departure}
                  onChange={handleChange}
                  placeholder="City or Airport"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <FlightLand className={classes.icon} />
                <TextField
                  fullWidth
                  label="To"
                  variant="outlined"
                  name="arrival"
                  value={searchData.arrival}
                  onChange={handleChange}
                  placeholder="City or Airport"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <DateRange className={classes.icon} />
                <DatePicker
                  fullWidth
                  variant="inline"
                  inputVariant="outlined"
                  label="Departure"
                  value={searchData.departureDate}
                  onChange={(date) => handleDateChange(date, 'departureDate')}
                  format="MMM dd, yyyy"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <DateRange className={classes.icon} />
                <DatePicker
                  fullWidth
                  variant="inline"
                  inputVariant="outlined"
                  label="Return"
                  value={searchData.returnDate}
                  onChange={(date) => handleDateChange(date, 'returnDate')}
                  format="MMM dd, yyyy"
                  disabled={searchData.tripType === 'oneway'}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Trip Type</InputLabel>
                <Select
                  name="tripType"
                  value={searchData.tripType}
                  onChange={handleChange}
                  label="Trip Type"
                >
                  <MenuItem value="round">Round Trip</MenuItem>
                  <MenuItem value="oneway">One Way</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <People className={classes.icon} />
                <TextField
                  fullWidth
                  label="Passengers"
                  variant="outlined"
                  type="number"
                  name="passengers"
                  value={searchData.passengers}
                  onChange={handleChange}
                  inputProps={{ min: 1, max: 10 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.searchButton}
                onClick={handleSearch}
              >
                Search Flights
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      <Container maxWidth="lg" style={{ marginTop: '80px' }}>
        <DestinationsSection />
        <TestimonialsSection />
      </Container>
    </>
  );
};

export default HomePage;