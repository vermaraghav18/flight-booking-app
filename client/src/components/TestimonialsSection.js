// client/src/components/TestimonialsSection.js
import React from 'react';
import { Box, Typography, Grid, Avatar, Paper, styled } from '@mui/material';
import { Star } from '@mui/icons-material';

// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(6, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const TestimonialHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme => theme.spacing(2),
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginRight: theme.spacing(2),
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.warning.main,
  marginTop: theme.spacing(1),
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
  return (
    <SectionContainer>
      <SectionTitle variant="h4" component="h2">
        What Our Travelers Say
      </SectionTitle>
      
      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.id} xs={12} md={4}>
            <TestimonialCard elevation={2}>
              <TestimonialHeader>
                <StyledAvatar 
                  alt={testimonial.name} 
                  src={testimonial.avatar} 
                />
                <Box>
                  <Typography variant="subtitle1" component="h3">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {testimonial.location}
                  </Typography>
                  <RatingContainer>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} fontSize="small" />
                    ))}
                  </RatingContainer>
                </Box>
              </TestimonialHeader>
              <Typography variant="body1">
                "{testimonial.comment}"
              </Typography>
            </TestimonialCard>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default TestimonialsSection;