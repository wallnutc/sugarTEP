import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicButtonGroup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button><img src={require("../images/icons/lectures_disabled.png")} /></Button>
        <Button><img src={require("../images/icons/myAssignments_disabled.png")}  /></Button>
        <Button><img src={require("../images/icons/myProgress_disabled.png")}  /></Button>
      </ButtonGroup>
    </div>
  );
}
{/*<li style={liStyle}>
<button type="button"><img src={require("../images/icons/lectures_disabled.png")} /></button></li>
<li style={liStyle}><img src={require("../images/icons/myAssignments_disabled.png")}  /></li>
<li style={liStyle}><img src={require("../images/icons/myProgress_disabled.png")}  /></li>*/}
