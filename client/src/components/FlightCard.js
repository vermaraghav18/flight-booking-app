import React from 'react';
import { Card, CardContent, Grid, Typography, Button, Divider, Box } from '@mui/material';
import { FlightTakeoff, FlightLand, Schedule, AttachMoney } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const FlightCard = ({ flight }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Box display="flex" alignItems="center">
              <FlightTakeoff sx={{ mr: 1, color: 'primary.main' }} />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Typography variant="body2">
                  {flight.departure.iata}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Box display="flex" alignItems="center">
              <FlightLand sx={{ mr: 1, color: 'primary.main' }} />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Typography variant="body2">
                  {flight.arrival.iata}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="body2">
              <Schedule fontSize="small" sx={{ verticalAlign: 'middle' }} /> {flight.duration}
            </Typography>
            <Typography variant="body2">
              {flight.aircraft?.model || 'Unknown'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="body1">
              {flight.airline.name}
            </Typography>
            <Typography variant="body2">
              Flight {flight.flight.number}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="h6">
              <AttachMoney fontSize="inherit" />{flight.price}
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Departure:
              </Typography>
              <Typography variant="body2">
                {flight.departure.airport}
                {flight.departure.terminal && `, Terminal ${flight.departure.terminal}`}
                {flight.departure.gate && `, Gate ${flight.departure.gate}`}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Button
              component={Link}
              to={`/flight/${flight.flight.iata}`}
              variant="outlined"
              color="primary"
              fullWidth
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;