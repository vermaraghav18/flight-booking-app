// client/src/components/FilterPanel.js
import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Divider, 
  Slider, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  styled 
} from '@mui/material';
import { Close } from '@mui/icons-material';

// Styled components replacing makeStyles
const DrawerPaper = styled(Box)(({ theme }) => ({
  width: 300,
  padding: theme.spacing(3),
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const PriceSlider = styled(Slider)(({ theme }) => ({
  margin: theme.spacing(2, 1),
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const airlines = [
  'American Airlines',
  'Delta Air Lines',
  'United Airlines',
  'Lufthansa',
  'Emirates',
  'Qatar Airways',
  'British Airways',
];

const departureTimes = [
  { label: 'Early Morning (12am-6am)', value: 'earlyMorning' },
  { label: 'Morning (6am-12pm)', value: 'morning' },
  { label: 'Afternoon (12pm-6pm)', value: 'afternoon' },
  { label: 'Evening (6pm-12am)', value: 'evening' },
];

const FilterPanel = ({ filters, onFilterChange, onApply, mobileOpen, onClose }) => {
  const handlePriceChange = (event, newValue) => {
    onFilterChange('priceRange', newValue);
  };

  const handleAirlineChange = (airline) => {
    const updatedAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    onFilterChange('airlines', updatedAirlines);
  };

  const handleDepartureTimeChange = (time) => {
    const updatedTimes = filters.departureTimes.includes(time)
      ? filters.departureTimes.filter(t => t !== time)
      : [...filters.departureTimes, time];
    onFilterChange('departureTimes', updatedTimes);
  };

  const handleStopsChange = (event) => {
    onFilterChange('stops', event.target.value);
  };

  const handleSortChange = (event) => {
    onFilterChange('sortBy', event.target.value);
  };

  const content = (
    <DrawerPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        <Button onClick={onClose} startIcon={<Close />}>Close</Button>
      </Box>
      
      <Divider />
      
      <FilterSection>
        <FilterTitle variant="subtitle1">
          Price Range
        </FilterTitle>
        <PriceSlider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={1000}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">${filters.priceRange[0]}</Typography>
          <Typography variant="body2">${filters.priceRange[1]}</Typography>
        </Box>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle variant="subtitle1">
          Airlines
        </FilterTitle>
        <Box display="flex" flexDirection="column">
          {airlines.map((airline) => (
            <FormControlLabel
              key={airline}
              control={
                <Checkbox
                  checked={filters.airlines.includes(airline)}
                  onChange={() => handleAirlineChange(airline)}
                  name={airline}
                  color="primary"
                />
              }
              label={airline}
            />
          ))}
        </Box>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle variant="subtitle1">
          Departure Times
        </FilterTitle>
        <Box display="flex" flexDirection="column">
          {departureTimes.map((time) => (
            <FormControlLabel
              key={time.value}
              control={
                <Checkbox
                  checked={filters.departureTimes.includes(time.value)}
                  onChange={() => handleDepartureTimeChange(time.value)}
                  name={time.value}
                  color="primary"
                />
              }
              label={time.label}
            />
          ))}
        </Box>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle variant="subtitle1">
          Stops
        </FilterTitle>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="stops"
            name="stops"
            value={filters.stops}
            onChange={handleStopsChange}
          >
            <FormControlLabel value="any" control={<Radio />} label="Any number of stops" />
            <FormControlLabel value="nonstop" control={<Radio />} label="Nonstop only" />
            <FormControlLabel value="one" control={<Radio />} label="Up to 1 stop" />
          </RadioGroup>
        </FormControl>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle variant="subtitle1">
          Sort By
        </FilterTitle>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="price">Price (Low to High)</MenuItem>
            <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
            <MenuItem value="duration">Duration (Shortest)</MenuItem>
            <MenuItem value="departure">Departure Time (Earliest)</MenuItem>
          </Select>
        </FormControl>
      </FilterSection>
      
      <ApplyButton
        fullWidth
        variant="contained"
        color="primary"
        onClick={onApply}
      >
        Apply Filters
      </ApplyButton>
    </DrawerPaper>
  );

  if (mobileOpen) {
    return (
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 300,
            padding: 3
          }
        }}
      >
        {content}
      </Drawer>
    );
  }

  return content;
};

export default FilterPanel;