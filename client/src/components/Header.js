import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Flight as FlightIcon, AccountCircle, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
});

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledLink to="/">
            <FlightIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5" component="h1">
              SkyJourney
            </Typography>
          </StyledLink>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/" color="inherit">
              Flights
            </Button>
            <Button component={Link} to="/" color="inherit">
              My Trips
            </Button>
            
            {user ? (
              <Button 
                startIcon={<AccountCircle />} 
                color="inherit"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                startIcon={<AccountCircle />} 
                color="inherit"
              >
                Login
              </Button>
            )}
            
            <Button 
              startIcon={<ShoppingCart />} 
              color="inherit"
            >
              Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;