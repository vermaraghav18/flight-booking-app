import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  styled 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FlightTakeoff, FlightLand, DateRange, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DestinationsSection from '../components/DestinationsSection';
import TestimonialsSection from '../components/TestimonialsSection';

// Styled components
const SearchContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(-8),
  position: 'relative',
  zIndex: 1,
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
}));

const SearchButton = styled(Button)(({ theme }) => ({
  height: 56,
  marginTop: theme.spacing(2),
}));

const FormIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
}));

const HomePage = () => {
  const navigate = useNavigate();
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
    navigate(`/search?${queryParams}`);
  };

  return (
    <>
      <HeroSection />
      
      <SearchContainer maxWidth="lg">
        <SearchPaper elevation={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <FormIcon>
                  <FlightTakeoff />
                </FormIcon>
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
                <FormIcon>
                  <FlightLand />
                </FormIcon>
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
                <FormIcon>
                  <DateRange />
                </FormIcon>
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
                <FormIcon>
                  <DateRange />
                </FormIcon>
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
                <FormIcon>
                  <People />
                </FormIcon>
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
              <SearchButton
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSearch}
              >
                Search Flights
              </SearchButton>
            </Grid>
          </Grid>
        </SearchPaper>
      </SearchContainer>
      
      <ContentContainer maxWidth="lg">
        <DestinationsSection />
        <TestimonialsSection />
      </ContentContainer>
    </>
  );
};

export default HomePage;