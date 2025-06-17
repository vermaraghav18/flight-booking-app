// client/src/pages/SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  Chip, 
  Box, 
  CircularProgress,
  styled 
} from '@mui/material';
import { FlightTakeoff, FlightLand, Schedule, AttachMoney, Star, FilterList } from '@mui/icons-material';
import axios from 'axios';
import FlightCard from '../components/FlightCard';
import FilterPanel from '../components/FilterPanel';

const PREFIX = 'SearchResultsPage';

const classes = {
  root: `${PREFIX}-root`,
  header: `${PREFIX}-header`,
  resultsCount: `${PREFIX}-resultsCount`,
  filterButton: `${PREFIX}-filterButton`,
  loadingContainer: `${PREFIX}-loadingContainer`,
  noResults: `${PREFIX}-noResults`
};

const Root = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: theme.spacing(4, 0),
  },
  [`& .${classes.header}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.resultsCount}`]: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  [`& .${classes.filterButton}`]: {
    marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  [`& .${classes.loadingContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  [`& .${classes.noResults}`]: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

const SearchResultsPage = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    airlines: [],
    priceRange: [0, 1000],
    departureTimes: [],
    stops: 'any',
    sortBy: 'price',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/flights/search`, {
          params: {
            departure: searchParams.get('departure'),
            arrival: searchParams.get('arrival'),
            date: searchParams.get('date'),
            returnDate: searchParams.get('returnDate'),
            passengers: searchParams.get('passengers'),
          },
        });
        setFlights(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch flights');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.search]);

  const applyFilters = () => {
    console.log('Applying filters:', filters);
    setMobileFiltersOpen(false);
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const searchParams = new URLSearchParams(location.search);
  const departure = searchParams.get('departure');
  const arrival = searchParams.get('arrival');
  const date = new Date(searchParams.get('date')).toLocaleDateString();
  const returnDate = searchParams.get('returnDate') 
    ? new Date(searchParams.get('returnDate')).toLocaleDateString() 
    : null;
  const passengers = searchParams.get('passengers');

  return (
    <Root maxWidth="lg" className={classes.root}>
      <Box display="flex" alignItems="center" className={classes.header}>
        <Typography variant="h4" component="h1">
          {departure} to {arrival}
        </Typography>
        <Typography variant="body1" className={classes.resultsCount}>
          {flights.length} flights found
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          className={classes.filterButton}
          onClick={() => setMobileFiltersOpen(true)}
        >
          Filters
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={applyFilters}
            mobileOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={0}>
            <Box p={2}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1">
                  {returnDate ? 'Departure · ' + date : date}
                </Typography>
                {returnDate && (
                  <>
                    <Typography variant="subtitle1" style={{ margin: '0 8px' }}>
                      ·
                    </Typography>
                    <Typography variant="subtitle1">
                      Return · {returnDate}
                    </Typography>
                  </>
                )}
                <Chip
                  label={`${passengers} ${passengers === '1' ? 'passenger' : 'passengers'}`}
                  size="small"
                  style={{ marginLeft: 'auto' }}
                />
              </Box>
              <Divider />
            </Box>

            {loading ? (
              <Box className={classes.loadingContainer}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box className={classes.noResults}>
                <Typography variant="h6" color="error">
                  {error}
                </Typography>
                <Typography variant="body1">
                  Please try again later or modify your search.
                </Typography>
              </Box>
            ) : flights.length === 0 ? (
              <Box className={classes.noResults}>
                <Typography variant="h6">
                  No flights found for your search criteria
                </Typography>
                <Typography variant="body1">
                  Try adjusting your filters or search dates
                </Typography>
              </Box>
            ) : (
              flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Root>
  );
};

export default SearchResultsPage;