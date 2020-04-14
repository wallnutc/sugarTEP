import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const labels = {
  1: 'There is something really wrong',
  2: 'Could be better',
  3: 'Okay',
  4: 'Good',
  5: 'Awesome!',
};

const StyledRating = withStyles({
  iconFilled: {
    color: '#414141',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    fontFamily: "Rubik",
    fontSize: 16,
  },
});

export default function HoverRating(props) {
  const [value, setValue] = React.useState(props.initialValue);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" align="center" spacing={1}>
        <Grid item xs>
          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </Grid>
        <Grid item xs>
          <StyledRating
            name="hover-feedback"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
