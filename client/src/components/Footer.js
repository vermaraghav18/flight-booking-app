// client/src/components/Footer.js
import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Facebook, Twitter, Instagram, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    marginTop: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  icon: {
    margin: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justify="space-evenly">
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Company
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                About Us
              </Link>
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Careers
              </Link>
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Press
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Support
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Help Center
              </Link>
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Safety
              </Link>
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Privacy Policy
              </Link>
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Terms of Service
              </Link>
              <Link href="#" variant="subtitle1" color="textSecondary" className={classes.link}>
                Cookie Policy
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5} className={classes.socialIcons}>
          <Facebook className={classes.icon} />
          <Twitter className={classes.icon} />
          <Instagram className={classes.icon} />
          <LinkedIn className={classes.icon} />
        </Box>
        <Box mt={3}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' SkyJourney. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;