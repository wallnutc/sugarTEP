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
import Rating from './rating'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import icon_star_grey from './icons/icon_star_grey.svg';

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
    fontFamily: 'Rubik',
    fontSize: '16 px',
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
          <Paper className={classes.paper} >
            <Box fontFamily="Rubik">
              How was {props.lecture.module_name} with Prof. {props.lecture.module_lecturer} {props.lecture.lecture_day}?
            </Box>
          </Paper>
        </Grid>
        <Grid item xs container direction="column" justify="center" alignItems="center" spacing={3}>

          <Grid item xs container direction="column" justify="center" alignItems="center" spacing={1}>
            <Rating initialValue={3}/>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700" fontFamily="Rubik">
                Explanation speed
              </Box>
            </Grid>
            <Grid item xs>
              <GenericSlider step={1} value={3}/>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Clarity and Objectivity
              </Box>
            </Grid>
            <Grid item xs>
              <GenericSlider step={1} value={3}/>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Box fontWeight="700">
                Correlation with real world aplication
              </Box>
            </Grid>
            <Grid item xs>
              <GenericSlider step={1} value={3}/>
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
