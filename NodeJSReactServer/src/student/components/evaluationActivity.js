import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import GenericSlider from './genericSlider';
import TimeSlider from './timeSlider';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import icon_star_grey from '@material-ui/icons/StarBorder';

const difficultyLabels = {
  1: 'Very Easy',
  2: 'Easy',
  3: 'Neutral',
  4: 'Hard',
  5: 'Very Hard',
};

const PrettoSlider = withStyles({
  root: {
    color: '#414141',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    fontFamily: "Rubik",
    fontSize: 16,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#ffffff",
    width: '100%',
    background: '#414141',
  },
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column" alignItems="center" justify="center">
        <Grid item xs container direction="column" justify="center" alignItems="center">
          <Paper className={classes.paper} square>
            <Box>
              Rate your experience with the {props.activity.title} Assignment
            </Box>
          </Paper>
        </Grid>
        <Grid item xs container direction="column" justify="center" alignItems="center" spacing={3}>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Expected Difficulty Level
              </Box>
            </Grid>
            <Grid item xs>
              <GenericSlider step={0} value={props.activity.expectedDifficulty}/>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Input Real Diffficulty Level
              </Box>
            </Grid>
            <Grid item xs>
              <GenericSlider step={1} value={2}/>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Expected Time Spent
              </Box>
            </Grid>
            <Grid item xs>
              <TimeSlider step={0} value={props.activity.expectedTime}/>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Real Time Spent
              </Box>
            </Grid>
            <Grid item xs>
              <TimeSlider step={0} value={props.activity.realTime}/>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Input More Time
              </Box>
            </Grid>
            <Grid item xs>
              <TimeSlider step={0.5} value={0}/>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Button>
            <Box className={classes.paper} borderRadius={8}>
                Send
            </Box>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
