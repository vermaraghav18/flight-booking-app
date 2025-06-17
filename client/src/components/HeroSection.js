// client/src/components/HeroSection.js
import React from 'react';
import { Box, Typography, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  hero: {
    position: 'relative',
    height: '80vh',
    minHeight: '500px',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  ctaButton: {
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
  },
}));

const HeroSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.hero}>
      <Container maxWidth="lg">
        <Box className={classes.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" className={classes.title}>
              Discover the World with Us
            </Typography>
            <Typography variant="h5" className={classes.subtitle}>
              Book your next adventure with our exclusive flight deals and experience the joy of travel.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.ctaButton}
              href="#search"
            >
              Explore Destinations
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;