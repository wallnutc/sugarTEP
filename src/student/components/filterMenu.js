import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../styles/filter.css';

export default function FilterMenu(props) {
  //console.log(props.options);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = (optionID) => {
    setAnchorEl(null);
    console.log("handleClose");
    console.log(typeof optionID);
    if(typeof optionID == 'string')
    props.callback(optionID);
  };
  return (
    <div>
    <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}
    style={{lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: props.default? '#F6F7FA':"#0153B4",}}
    children ={<span style={{marginLeft:'10px',lineHeight:'0',color: props.default? '#0061D2':"#FFFFFF"}}>{props.label} <ArrowDropDownRoundedIcon style={{margin:0,verticalAlign:'middle'}}/> </span>}></Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {props.options.map((option) => <MenuItem onClick={() =>handleClose(option.value)}>{option.label}</MenuItem>)}
      </Menu>
    </div>
  );
}

export function DateFilter(props) {
  //console.log(props.options);
      const [selectedDate, setSelectedDate] = useState(new Date('2019-03-18T00:00:00'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("date:");
    console.log(date);
    props.callback(date);
    handleClose();
  };

  return (
    <div>
    <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}
    style={{lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: props.default? '#F6F7FA':"#0153B4",}}
    children ={<span style={{marginLeft:'10px',lineHeight:'0',color: props.default? '#0061D2':"#FFFFFF"}}> Date <ArrowDropDownRoundedIcon style={{margin:0,verticalAlign:'middle'}}/> </span>}></Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        style={{color: 'blue'}}
      >
      <MenuItem disableGutters={true} dense={true} disableRipple={true} style={{backgroundColor:'red',padding:0}}>      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker variant="static" value={props.date} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>        </MenuItem>

      {/*
        */}

      </Menu>
    </div>
  );
}
