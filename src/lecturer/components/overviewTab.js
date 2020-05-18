import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import '../styles/lecturesTab.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TextField from '@material-ui/core/TextField';
import StackedColumnChart from './stackedColumnChart';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TimelineModuleComponent from "../components/timelineModuleComponent";
import FeedbackBarComponent from "../components/feedbackBarComponent";
import FeedbackDialComponent from "../components/feedbackDialComponent";
import PieModuleComponent from '../components/pieModuleComponent';
import {LecturePanel,ActivityPanel,FeedbackPanel} from "./listRenderer";

const BootstrapButton = withStyles({
  root: {
    justifyContent: 'left',
    textAlign:'left',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px ',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#F1F1F1',
    borderColor: 'transparent',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#b5b5b5',
      borderColor: '#b5b5b5',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'red',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '#9A9A9A',

    },
  },
})(Button);








function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'black',
    },
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'black',
      opacity: 1,
    },
    '&$selected': {
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'black',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  }
}));

function SelectorBox(props) {
  console.log(props.classes);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const nextClass=props.classes.find((lecture) => new Date(lecture.date+'T'+lecture.end_time)>= props.today);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div  className={classes.root} style = {{height:'400px'}}>

      <div className={classes.demo1}>
      </div>
      <div className = 'selectorBox' style={{margin:'8px', borderRadius:'8px'}} >
        <div style={{fontStyle:"normal", fontFamily:"Rubik", color:"#666"}}>
        Next Lecture
        </div>
        {
        <div style = {{margin:'8px 0'}}>
          <LecturePanel changeTab={props.changeTab} item = {nextClass} />
        </div>
      }
      <div style={{fontStyle:"normal", fontFamily:"Rubik", color:"#666"}}>
      Next Activities
      </div>
      {props.activities.filter((activity) => new Date(activity.due_date)>= props.today).map((activity) =>
        <div style = {{margin:'8px 0'}}>
        <ActivityPanel selectActivity={props.selectActivity} changeTab={props.changeTab} item={activity} />
              </div>)}
        </div>
    </div>
  );
}
function getClass(classes, date, specification){
  var i;
  for(i=0; i<classes.length;i++){
    if(new Date(classes[i].date+'T'+classes[i].end_time)>= date){
      switch (specification) {
        case "previous":
            if(i!=0) return(classes[i-1]);
            else return null;
          break;
        case "next":
          return(classes[i]);
          break;
      }
    }
  }
  return null;
}
function getActivity(activities, date, specification){
  var i;
  for(i=0; i<activities.length;i++){
    if(new Date(activities[i].due_date)>= date){
      switch (specification) {
        case "previous":
            if(i!=0) return(activities[i-1]);
            else return null;
          break;
        case "next":
          return(activities[i]);
          break;
      }
    }
  }
  return null;
}
function DetailBox(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const previousClass=getClass(props.classes, props.today,"previous");
  const previousActivity=getActivity(props.activities, props.today,"previous");
  console.log(previousClass);
  console.log(previousActivity);
  //const previousActivity=props.classes.find((lecture) => new Date(lecture.date+'T'+lecture.end_time)>= props.today);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <div className={classes.demo1}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                <AntTab label="General Breakdown" />
                <AntTab label="Latest Feedback " />
                </AntTabs>
              </div>

              <TabPanel  value={value} index={0}>
                <div className = 'detailBox' style = {{height: '1000'}}>

                  <div style = {{margin:'8px 0'}}>
                  <div style = {{position: 'relative', height:350,width:260, float: "left"}}> <PieModuleComponent moduleID = {props.moduleID} label = {props.module_name} type = "hours"/> </div>
                  <div style = {{position: 'relative', height:350,width:260, float: "left"}}> <PieModuleComponent moduleID = "9" label = {props.module_name} type = "grade"/> </div>
                  </div>

                  <div style = {{margin:'10px 0'}}>
                  {/*props.lecture.notes.map((note) => <TextField
                              multiline
                              id="standard-read-only-input"
                              defaultValue={note}
                              fullWidth
                              variant="outlined"
                              rows={5}
                              InputProps={{
                                readOnly: true,
                              }}/>)*/}

                    <MultilineTextFields />
                    <Button type='submit' variant="contained" color="default" disableElevation fullWidth style={{textTransform: 'none'}}> Add Note </Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel  value={value} index={1}>
                <div className = 'detailBox'>
                {previousClass!=null? <div>
                  Previous Class - {previousClass.title} - {previousClass.date + ' | ' + previousClass.start_time +'- '+previousClass.end_time }
                  {previousClass.feedback.length==0 ? <div> No Feedback For This Class</div>:
                    previousClass.feedback.map((item)=> <FeedbackPanel activityID={previousClass.class_ID} questionName={item.feedback_title} type='Class'/>)}

                  </div>: <div>No classes taught yet.</div>}

                {previousActivity!=null? <div>
                  Previous Activity - {previousActivity.title } - {previousActivity.due_date }
                  {previousActivity.feedback.map((item)=> <FeedbackPanel activityID={previousActivity.activity_ID} questionName={item.feedback_title} type='Activity'/>)}
                   </div>:<div>No past activities yet.</div>}
                </div>
              </TabPanel>
    </div>
  );
}

const useStylesTextField = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '100%',
      margin: '11px 0'
    },
  },
}));
function MultilineTextFields() {
  const classes = useStylesTextField();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-textarea"
          label="New Note"
          placeholder=""
          multiline
          variant="outlined"
        />
      </div>
    </form>
  );
}





export default function OverviewTab(props) {


  const [focusID, setFocusID] = React.useState(props.classes[0].date+props.classes[0].start_time);
  const lectureInFocus = props.classes.find((lecture)=>lecture.date + lecture.start_time  == focusID);

    function handleChange(newValue) {
      console.log("changed! : " + newValue);
      //setFocusID(newValue);
  }
  return (
    <div style = {{margin:0,padding:0}}>
      <div  style = {{float:'left',height:'500px',width:'32.5%',}}>

        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Upcoming </div>

      <div style = {{ position:'relative', top:'87px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox selectActivity={props.selectActivity} changeTab={props.changeTab} today={props.today} inFocusID={focusID} activities={props.activities} classes={props.classes}　onClick = {handleChange} />
      </div>

      </div>
      <div className = 'detailBoxx'style = {{float:'left',height:'500px',width:'67%', }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Summaries </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>

          <DetailBox today={props.today} activities={props.activities} classes={props.classes} moduleID = {props.module_ID} module_name = {props.module_name} />
        </div>
      </div>
    </div>
  );
}

{/*boxShadow: '0 0 0 0.2rem rgba(207,207,207,.5)',*/}
