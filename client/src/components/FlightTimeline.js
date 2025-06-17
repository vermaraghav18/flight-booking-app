// client/src/components/FlightTimeline.js
import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FlightTakeoff, FlightLand } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  timeline: {
    position: 'relative',
    padding: theme.spacing(0, 2),
  },
  timelineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  timelineContent: {
    flex: 1,
  },
  timelineIcon: {
    margin: theme.spacing(0, 2),
    color: theme.palette.primary.main,
  },
  timelineDivider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: theme.palette.divider,
    transform: 'translateX(-50%)',
    zIndex: -1,
  },
  time: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  location: {
    fontWeight: 'bold',
  },
  duration: {
    textAlign: 'center',
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
}));

const FlightTimeline = ({ departure, arrival, duration }) => {
  const classes = useStyles();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box className={classes.timeline}>
      <Box className={classes.timelineDivider} />
      
      <Box className={classes.timelineItem}>
        <Box className={classes.timelineContent} textAlign="right">
          <Typography variant="body1" className={classes.time}>
            {formatTime(departure.scheduled)}
          </Typography>
          <Typography variant="body2">
            {departure.airport} ({departure.iata})
          </Typography>
        </Box>
        <FlightTakeoff className={classes.timelineIcon} fontSize="large" />
        <Box className={classes.timelineContent}>
          <Typography variant="body1" className={classes.location}>
            Departure
          </Typography>
          <Typography variant="body2">
            Terminal {departure.terminal || 'TBD'}, Gate {departure.gate || 'TBD'}
          </Typography>
        </Box>
      </Box>
      
      <Box className={classes.duration}>
        <Typography variant="body1">
          {duration}
        </Typography>
      </Box>
      
      <Box className={classes.timelineItem}>
        <Box className={classes.timelineContent} textAlign="right">
          <Typography variant="body1" className={classes.time}>
            {formatTime(arrival.scheduled)}
          </Typography>
          <Typography variant="body2">
            {arrival.airport} ({arrival.iata})
          </Typography>
        </Box>
        <FlightLand className={classes.timelineIcon} fontSize="large" />
        <Box className={classes.timelineContent}>
          <Typography variant="body1" className={classes.location}>
            Arrival
          </Typography>
          <Typography variant="body2">
            Terminal {arrival.terminal || 'TBD'}, Gate {arrival.gate || 'TBD'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightTimeline;