// client/src/components/Footer.js
import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Box,
  styled 
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

// Styled components using MUI v5's styled() API
const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
  variant: 'subtitle1',
  color: theme.palette.text.secondary,
}));

const SocialIconsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Company
            </Typography>
            <Box display="flex" flexDirection="column">
              <StyledLink href="#">
                About Us
              </StyledLink>
              <StyledLink href="#">
                Careers
              </StyledLink>
              <StyledLink href="#">
                Press
              </StyledLink>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Support
            </Typography>
            <Box display="flex" flexDirection="column">
              <StyledLink href="#">
                Help Center
              </StyledLink>
              <StyledLink href="#">
                Safety
              </StyledLink>
              <StyledLink href="#">
                Contact Us
              </StyledLink>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column">
              <StyledLink href="#">
                Privacy Policy
              </StyledLink>
              <StyledLink href="#">
                Terms of Service
              </StyledLink>
              <StyledLink href="#">
                Cookie Policy
              </StyledLink>
            </Box>
          </Grid>
        </Grid>
        <SocialIconsContainer>
          <SocialIcon component={Facebook} />
          <SocialIcon component={Twitter} />
          <SocialIcon component={Instagram} />
          <SocialIcon component={LinkedIn} />
        </SocialIconsContainer>
        <Box mt={3}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' SkyJourney. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;