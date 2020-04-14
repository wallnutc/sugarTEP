import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const labels = {
  1: 'Very Low',
  2: 'Low',
  3: 'Intermediate',
  4: 'High',
  5: 'Very High',
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontFamily: "Rubik",
    fontSize: 16,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

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

export default function CustomizedSlider(props) {
  const classes = useStyles();
  const [value,setvalue] = React.useState(props.value);
  const [hover,setValue] = React.useState(-1);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" align="center">
        <Grid item xs>
          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </Grid>
        <Grid item xs>
          <PrettoSlider step={props.step} aria-label="pretto slider" aria-labelledby="input-slider"
                defaultValue={props.value}
                min={1} max={5}
                onChange={handleSliderChange}/>
        </Grid>
      </Grid>
    </div>
  );
}
