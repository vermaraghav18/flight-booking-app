// client/src/components/FlightTimeline.js
import React from 'react';
import { Box, Typography, Divider, styled } from '@mui/material';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';

// Styled components replacing makeStyles
const TimelineContainer = styled(Box)({
  position: 'relative',
  padding: '0 16px', // theme.spacing(0, 2) = 16px
});

const TimelineItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px', // theme.spacing(2) = 16px
});

const TimelineContent = styled(Box)({
  flex: 1,
});

const TimelineIcon = styled(Box)(({ theme }) => ({
  margin: '0 16px', // theme.spacing(0, 2) = 0 16px
  color: theme.palette.primary.main,
}));

const TimelineDivider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: theme.palette.divider,
  transform: 'translateX(-50%)',
  zIndex: -1,
}));

const TimeText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
});

const LocationText = styled(Typography)({
  fontWeight: 'bold',
});

const DurationContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  margin: '16px 0', // theme.spacing(2, 0) = 16px 0
  color: theme.palette.text.secondary,
}));

const FlightTimeline = ({ departure, arrival, duration }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TimelineContainer>
      <TimelineDivider />
      
      <TimelineItem>
        <TimelineContent textAlign="right">
          <TimeText variant="body1">
            {formatTime(departure.scheduled)}
          </TimeText>
          <Typography variant="body2">
            {departure.airport} ({departure.iata})
          </Typography>
        </TimelineContent>
        <TimelineIcon>
          <FlightTakeoff fontSize="large" />
        </TimelineIcon>
        <TimelineContent>
          <LocationText variant="body1">
            Departure
          </LocationText>
          <Typography variant="body2">
            Terminal {departure.terminal || 'TBD'}, Gate {departure.gate || 'TBD'}
          </Typography>
        </TimelineContent>
      </TimelineItem>
      
      <DurationContainer>
        <Typography variant="body1">
          {duration}
        </Typography>
      </DurationContainer>
      
      <TimelineItem>
        <TimelineContent textAlign="right">
          <TimeText variant="body1">
            {formatTime(arrival.scheduled)}
          </TimeText>
          <Typography variant="body2">
            {arrival.airport} ({arrival.iata})
          </Typography>
        </TimelineContent>
        <TimelineIcon>
          <FlightLand fontSize="large" />
        </TimelineIcon>
        <TimelineContent>
          <LocationText variant="body1">
            Arrival
          </LocationText>
          <Typography variant="body2">
            Terminal {arrival.terminal || 'TBD'}, Gate {arrival.gate || 'TBD'}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </TimelineContainer>
  );
};

export default FlightTimeline;