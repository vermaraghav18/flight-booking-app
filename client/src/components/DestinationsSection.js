// client/src/components/DestinationsSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(6, 0),
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  destinationCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  },
  cardMedia: {
    height: 200,
  },
  cardContent: {
    flexGrow: 1,
  },
  exploreButton: {
    marginTop: theme.spacing(2),
  },
}));

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'The city of love and lights',
    price: '$299',
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Where tradition meets innovation',
    price: '$599',
  },
  {
    id: 3,
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    description: 'The city that never sleeps',
    price: '$199',
  },
  {
    id: 4,
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1523428096881-5bd79d043006?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Stunning harbor and beaches',
    price: '$699',
  },
];

const DestinationsSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.section}>
      <Typography variant="h4" component="h2" className={classes.sectionTitle}>
        Popular Destinations
      </Typography>
      
      <Grid container spacing={4}>
        {destinations.map((destination) => (
          <Grid item key={destination.id} xs={12} sm={6} md={3}>
            <Card className={classes.destinationCard} elevation={4}>
              <CardMedia
                className={classes.cardMedia}
                image={destination.image}
                title={destination.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h3">
                  {destination.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {destination.description}
                </Typography>
                <Typography variant="h6" component="p" style={{ marginTop: 8 }}>
                  From {destination.price}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className={classes.exploreButton}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DestinationsSection;