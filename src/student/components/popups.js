import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

export function ClassFeedbackPopup (props) {

return (
<div className='popup' style={{  position: 'fixed', width: '100%', height: '100%', top: 0,
  left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
<div className='popup\_inner' style={{  position: 'absolute',left: '25%',
  right: '25%',   top: '25%', bottom: '25%',  margin: 'auto',borderRadius: '20px', background: 'white'}}>
  <IOSSlider aria-label="ios slider" defaultValue={60} marks={marks} valueLabelDisplay="on" />
<h1> NOT DONE YET </h1>
<button onClick={props.closePopup}>close me</button>

</div>
</div>
);
}

export function ActivityProgressPopup (props) {
  const [timeSpent,setTimeSpent] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [finished, setFinished] = useState(false);
  const updateProgress = () =>{
    console.log("progress updated");
    var data = {
      studentID: props.student, 
      activityID: props.activity.activity_ID, 
      hours: timeSpent,
      submitted: 0
    };
    fetch("http://mvroso.pythonAnywhere.com/updateStudentProgress", {
                  method: "POST", 
                  cache: "no-cache",
                  body: JSON.stringify(data),
                  headers: new Headers({"content-type": "application/json"})
              }).then(res => {
                  console.log("Request complete! response:", res);
              });
    setUpdated(true);
  }
  const finishActivity = () =>{
    console.log("activity finished");
    var data = {
      studentID: props.student_ID, 
      activityID: props.activity.activity_ID, 
      hours: timeSpent,
      submitted: 1
    };
    fetch("http://mvroso.pythonAnywhere.com/updateStudentProgress", {
                  method: "POST", 
                  cache: "no-cache",
                  body: JSON.stringify(data),
                  headers: new Headers({"content-type": "application/json"})
              }).then(res => {
                  console.log("Request complete! response:", res);
              });
    setFinished(true);
  }
  const modify = (time) => {
      if(timeSpent+time>0)
      setTimeSpent(timeSpent+time);
      else
      setTimeSpent(0);
  }
return (
<div className='popup' style={{  position: 'fixed', width: '100%', height: '100%', top: 0,
  left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
  { !updated && !finished ?
    <div className='popup\_inner' style={{position: 'absolute',left: '10%',
      right: '10%',   top: '25%', bottom: '25%',  margin: 'auto',borderRadius: '20px', background: '#cccccc'}}>
      <div>update progress</div>
      <div style={{background: 'white'}}>
        <div> Time spent on {props.activity.title} </div>
        <div> {Math.floor(timeSpent/60)>10? Math.floor(timeSpent/60):'0'+Math.floor(timeSpent/60)}h{timeSpent%60}min</div>
        <div>
          <Button variant="contained" color="primary" disableElevation onClick={()=>modify(-30)}>
          -30min
          </Button>
          <Button variant="contained" color="primary" disableElevation onClick={()=>modify(30)}>
            +30min
          </Button>
      </div>
      </div>
      <Button fullWidth onClick={updateProgress}
      style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>Update progress</span>}></Button>
      <Button onClick={finishActivity}
      style={{width:'50%',lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#878787',}} children ={<span style={{inlineHeight:'0',color:'white'}}>Finish activity</span>}></Button>
    </div> : (updated ?
      <div className='popup\_inner' style={{  position: 'absolute',left: '10%',
          right: '10%',   top: '30%', bottom: '30%',  margin: 'auto',borderRadius: '20px', background: '#cccccc'}}>
        <h2>great</h2>
        <div>your progress was updated, keep going</div>
        <Button fullWidth onClick={props.closePopup}
        style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>cool!</span>}></Button>
        </div> :
        <div className='popup\_inner' style={{  position: 'absolute',left: '10%',
              right: '10%',   top: '30%', bottom: '30%',  margin: 'auto',borderRadius: '20px', background: '#cccccc'}}>
              <h2>You did it!</h2>
              <div>your progress has been saved.</div>
              <Button fullWidth onClick={props.closePopup}
              style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>Thanks!</span>}></Button>
            </div> )

  }

</div>
);
}

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);
