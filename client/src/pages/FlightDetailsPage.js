import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  Box, 
  CircularProgress, 
  Stepper, 
  Step, 
  StepLabel, 
  Chip, 
  Avatar,
  styled 
} from '@mui/material';
import { 
  FlightTakeoff, 
  FlightLand, 
  Schedule, 
  AttachMoney, 
  AirlineSeatReclineNormal, 
  Luggage 
} from '@mui/icons-material';
import axios from 'axios';
import FlightTimeline from '../components/FlightTimeline';

// Styled components
const PaddedContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const FlightInfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PriceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

const AirlineLogo = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginRight: theme.spacing(2),
}));

const BookButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
});

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const DetailIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const FlightDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    navigate(`/book/${id}`);
  };

  if (loading) {
    return (
      <PaddedContainer maxWidth="lg">
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </PaddedContainer>
    );
  }

  if (error) {
    return (
      <PaddedContainer maxWidth="lg">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </PaddedContainer>
    );
  }

  if (!flight) {
    return null;
  }

  return (
    <PaddedContainer maxWidth="lg">
      <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
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
          sx={{ ml: 2 }}
        />
      </Box>

      <FlightInfoPaper elevation={2}>
        <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
          <AirlineLogo 
            src={`https://logo.clearbit.com/${flight.airline.toLowerCase().replace(/\s/g, '')}.com`} 
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

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Flight Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DetailItem>
                    <DetailIcon>
                      <FlightTakeoff />
                    </DetailIcon>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Departure Airport
                      </Typography>
                      <Typography variant="body1">
                        {flight.departure.airport} ({flight.departure.iata})
                      </Typography>
                    </Box>
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon>
                      <Schedule />
                    </DetailIcon>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Scheduled Departure
                      </Typography>
                      <Typography variant="body1">
                        {new Date(flight.departure.scheduled).toLocaleString()}
                      </Typography>
                    </Box>
                  </DetailItem>
                  {flight.departure.terminal && (
                    <DetailItem>
                      <DetailIcon>
                        <AirlineSeatReclineNormal />
                      </DetailIcon>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Terminal/Gate
                        </Typography>
                        <Typography variant="body1">
                          {flight.departure.terminal}/{flight.departure.gate || 'TBD'}
                        </Typography>
                      </Box>
                    </DetailItem>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailItem>
                    <DetailIcon>
                      <FlightLand />
                    </DetailIcon>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Arrival Airport
                      </Typography>
                      <Typography variant="body1">
                        {flight.arrival.airport} ({flight.arrival.iata})
                      </Typography>
                    </Box>
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon>
                      <Schedule />
                    </DetailIcon>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Scheduled Arrival
                      </Typography>
                      <Typography variant="body1">
                        {new Date(flight.arrival.scheduled).toLocaleString()}
                      </Typography>
                    </Box>
                  </DetailItem>
                  {flight.arrival.terminal && (
                    <DetailItem>
                      <DetailIcon>
                        <AirlineSeatReclineNormal />
                      </DetailIcon>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Terminal/Gate
                        </Typography>
                        <Typography variant="body1">
                          {flight.arrival.terminal}/{flight.arrival.gate || 'TBD'}
                        </Typography>
                      </Box>
                    </DetailItem>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <PriceSection>
              <Typography variant="h6" gutterBottom>
                Pricing
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <AttachMoney fontSize="large" color="primary" />
                <Typography variant="h4" sx={{ ml: 1 }}>
                  {flight.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                  per passenger
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Includes all taxes and fees
              </Typography>
              <BookButton
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBookFlight}
              >
                Book Now
              </BookButton>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  <Luggage fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  Free carry-on bag included
                </Typography>
              </Box>
            </PriceSection>
          </Grid>
        </Grid>
      </FlightInfoPaper>
    </PaddedContainer>
  );
};

export default FlightDetailsPage;