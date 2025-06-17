// client/src/components/HeroSection.js
import React from 'react';
import { Box, Typography, Button, Container, styled } from '@mui/material';
import { motion } from 'framer-motion';

// Styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  minHeight: '500px',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.common.white,
}));

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
  maxWidth: '600px',
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const CtaButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
}));

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title variant="h2" component="h1">
              Discover the World with Us
            </Title>
            <Subtitle variant="h5">
              Book your next adventure with our exclusive flight deals and experience the joy of travel.
            </Subtitle>
            <CtaButton
              variant="contained"
              color="primary"
              size="large"
              href="#search"
            >
              Explore Destinations
            </CtaButton>
          </motion.div>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;