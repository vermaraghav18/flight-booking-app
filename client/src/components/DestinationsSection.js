// client/src/components/DestinationsSection.js
import React from 'react';
import { Container, Typography, Grid, styled } from '@mui/material';
import DestinationCard from './DestinationCard';

const PREFIX = 'DestinationsSection';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  cardContainer: `${PREFIX}-cardContainer`
};

const Root = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.background.default,
  },
  [`& .${classes.title}`]: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  [`& .${classes.cardContainer}`]: {
    marginTop: theme.spacing(4),
  },
}));

const DestinationsSection = () => {
  const popularDestinations = [
    {
      id: 1,
      city: 'New York',
      country: 'United States',
      image: '/images/new-york.jpg',
      price: 500,
    },
    {
      id: 2,
      city: 'Paris',
      country: 'France',
      image: '/images/paris.jpg',
      price: 400,
    },
    {
      id: 3,
      city: 'Tokyo',
      country: 'Japan',
      image: '/images/tokyo.jpg',
      price: 800,
    },
    {
      id: 4,
      city: 'London',
      country: 'United Kingdom',
      image: '/images/london.jpg',
      price: 350,
    },
  ];

  return (
    <Root className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.title}>
        Popular Destinations
      </Typography>
      <Typography variant="subtitle1" className={classes.title}>
        Explore these amazing destinations
      </Typography>
      <Grid container spacing={4} className={classes.cardContainer}>
        {popularDestinations.map((destination) => (
          <Grid item xs={12} sm={6} md={3} key={destination.id}>
            <DestinationCard destination={destination} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default DestinationsSection;