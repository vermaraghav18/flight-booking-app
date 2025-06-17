// client/src/components/DestinationCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const DestinationCard = ({ destination }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={destination.image}
        alt={destination.city}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {destination.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {destination.country}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          ${destination.price}
        </Typography>
        <Button size="small" variant="contained">
          Book Now
        </Button>
      </Box>
    </Card>
  );
};

export default DestinationCard;