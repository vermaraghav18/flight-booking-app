// client/src/components/TestimonialsSection.js
import React from 'react';
import { Box, Typography, Grid, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Star } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(6, 0),
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  testimonialCard: {
    padding: theme.spacing(3),
    height: '100%',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  testimonialHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.warning.main,
    marginTop: theme.spacing(1),
  },
}));

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'Booking with SkyJourney was seamless! Found the perfect flight at a great price. Will definitely use them again for my next trip.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    rating: 4,
    comment: 'Excellent customer service when I had to change my flight last minute. The app is user-friendly and makes booking a breeze.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'London, UK',
    rating: 5,
    comment: 'I travel frequently for work and SkyJourney always has the best options. Love the price alerts feature!',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
];

const TestimonialsSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.section}>
      <Typography variant="h4" component="h2" className={classes.sectionTitle}>
        What Our Travelers Say
      </Typography>
      
      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.id} xs={12} md={4}>
            <Paper elevation={2} className={classes.testimonialCard}>
              <Box className={classes.testimonialHeader}>
                <Avatar 
                  alt={testimonial.name} 
                  src={testimonial.avatar} 
                  className={classes.avatar}
                />
                <Box>
                  <Typography variant="subtitle1" component="h3">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {testimonial.location}
                  </Typography>
                  <Box className={classes.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} fontSize="small" />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Typography variant="body1">
                "{testimonial.comment}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;