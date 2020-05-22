import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import '../styles/lecturesTab.css';
import {makeStyles, withStyles, useTheme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import StackedColumnChart from './stackedColumnChart';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DatePick from './datePicker';
import {FeedbackPanel} from "./listRenderer";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import invert from 'invert-color';
import Switch from '@material-ui/core/Switch';
function decreaseBrightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

        return '#' +
           ((0|(1<<8) + r  * (1-percent / 100)).toString(16)).substr(1) +
           ((0|(1<<8) + g  * (1-percent / 100)).toString(16)).substr(1) +
           ((0|(1<<8) + b  * (1-percent / 100)).toString(16)).substr(1);
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, newFeedback, theme) {
  return {
    fontWeight:
      newFeedback.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const useStylesChips = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const BootstrapButton = withStyles({
  root: {
    justifyContent: 'left',
    textAlign:'left',
    boxShadow: 'none',
    textTransform: 'none',
      color: 'white',
    fontSize: 16,
    padding: '6px 12px ',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#C389DB',
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
      backgroundColor: '#C389DB',
      borderColor: '#C389DB',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#C389DB',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '#4A006E',

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
      backgroundColor: '#4A006E',
    },
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
      fontSize: '16px',
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
      color: '#4A006E',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#4A006E',
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
  console.log("activity tab");
  console.log(props.activities);
  const now = new Date("2018-10-25T00:00:00");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div  className={classes.root} style = {{height:'400px',borderRight: '1px solid #C4C4C4',}}>


      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label="Scheduled" style={{color: props.colour}}/>
          <AntTab label="Delivered" style={{color: props.colour}} />
        </AntTabs>
      </div>
      <div>


      <TabPanel  value={value} index={0} >
        <div className = 'selectorBox' >
        {props.edit>0?
          <div style = {{margin:'8px 0',display:'flex',justifyContent:'center'}}>
          <BootstrapButton  size = 'small'
            style = {{backgroundColor:'#F6F7FA', height:'32px',borderRadius:'16px',borderColor:props.colour}}
            startIcon ={<AddCircleRoundedIcon style={{fontSize: 14, color:props.colour }} />}
            onClick={()=> props.handleChange("add_activity",1)}
            children={
              <div>
              <div style={{fontFamily: 'Rubik', fontWeight:'300',fontSize: '14px',color: props.colour}}>
                create new activity
              </div>

              </div>} />
                </div>
                : null
        }


        {props.activities.filter((activity) => new Date(activity.due_date)>= props.today).map((activity) =>
          <div style = {{margin:'8px 0'}}>
          <BootstrapButton  size = 'large' fullWidth
          style = {{backgroundColor: activity.activity_ID == props.inFocusID? decreaseBrightness(activity.colour,40): activity.colour}}
          startIcon ={<AssignmentIcon style={{fontSize: 40, color:invert(activity.colour, true) }} />}
          onClick={()=> {props.onClick(activity.activity_ID);props.handleChange("activity_selected", 0)}}
          children={
            <div>
            <div style={{fontFamily: 'Rubik', color:  invert(activity.colour, true)}}>{activity.title}</div>
            <div style={{fontWeight:'300',fontSize: '14px', color:invert(activity.colour, true)}}>
              <ScheduleIcon style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px', color:  invert(activity.colour, true)}} />
              <span style={{verticalAlign:'middle', color: invert(activity.colour, true)}}>
                { "  " + ("0" + new Date(activity.due_date).getDate()).slice(-2)+("0" +'/'+ (parseInt(new Date(activity.due_date).getMonth())+1).toString()).slice(-2)
                }
              </span>
            </div>
            </div>} />
                </div>)}

        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className = 'selectorBox' >
      {props.activities.filter((activity) => new Date(activity.due_date)< props.today).map((activity) =>
        <div style = {{margin:'8px 0'}}>
        <BootstrapButton  size = 'large' fullWidth
        style = {{backgroundColor: activity.activity_ID == props.inFocusID? decreaseBrightness(activity.colour,40): activity.colour}}
        startIcon ={<AssignmentIcon style={{fontSize: 40, color: invert(activity.colour, true) }} />}
        onClick={()=> {props.onClick(activity.activity_ID);props.handleChange("activity_selected", 0);}}
        children={
          <div>
          <div style={{fontFamily: 'Rubik', color: invert(activity.colour, true)}}>{activity.title}</div>
          <div style={{fontWeight:'300',fontSize: '14px', color: invert(activity.colour, true)}}>
          <ScheduleIcon style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px', color: invert(activity.colour, true)}} />
          <span style={{verticalAlign:'middle', color: invert(activity.colour, true)}}>
            { "  " + ("0" + new Date(activity.due_date).getDate()).slice(-2)+("0" +'/'+ (parseInt(new Date(activity.due_date).getMonth())+1).toString()).slice(-2)
            }
          </span>
          </div>
          </div>} />
              </div>)}
              </div>
        </TabPanel>
      </div>
    </div>
  );
}

const feedbackOptions = [
  {
      feedback_ID: 11,
      feedback_title: "Workload - Modules",
      feedback_description: "The workload for this assessment was manageable."
  },
  {
      feedback_ID: 12,
      feedback_title: "Workload - Program",
      feedback_description: "The timing of this assessment deadline was different to the deadlines of my other modules."
  },
  {
      feedback_ID: 13,
      feedback_title: "Criteria ",
      feedback_description: "I was given criteria to follow."
  },
  {
      feedback_ID: 14,
      feedback_title: "Criteria - Understanding",
      feedback_description: "I understood the criteria"
  },
  {
      feedback_ID: 15,
      feedback_title: "Rubrics",
      feedback_description: "I was given rubrics to follow"
  },
  {
      feedback_ID: 16,
      feedback_title: "Rubrics - Understanding",
      feedback_description: "I understood the rubrics"
  },
  {
      feedback_ID: 17,
      feedback_title: "Knowledge",
      feedback_description: "The assessment methods allow me to demonstrate my knowledge."
  },
  {
      feedback_ID: 18,
      feedback_title: "Skills",
      feedback_description: "The assessment methods allow me to demonstrate my skills and competencies"
  },
  {
      feedback_ID: 19,
      feedback_title: "Learning Outcomes",
      feedback_description: "The assessment aligned with the Learning/Programme Outcomes"
  },
  {
      feedback_ID: 20,
      feedback_title: "Reflection",
      feedback_description: "The assessment methods encouraged me to self-reflect"
  },
  {
      feedback_ID: 21,
      feedback_title: "Relevance",
      feedback_description: "The assessment methods assessed relevance to real life skills "
  }
]

function DetailBox(props) {
  const inputStyle={fontFamily: 'Rubik',
                    fontStyle: 'normal',
                    fontWeight: '300',
                    fontSize: '14px',
                    color: '#000000'}
  const [graded,setGraded] = useState(props.activity==undefined? false :(props.activity.grade_percentage==0? false:true))
  const theme = useTheme();
  const classesChips = useStylesChips();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState(props.activity==undefined? null:props.activity.title);
  const [startDate, setStartDate] = useState(props.activity==undefined? null:new Date(props.activity.start_date));
  const [dueDate, setDueDate] = useState(props.activity==undefined? null:new Date(props.activity.due_date));
  const [newNote, setNewNote] = useState(null);
  const [notes, setNotes] = useState(props.activity==undefined? []:props.activity.notes);
  const [gradePercentage, setGradePercentage] = useState(props.activity==undefined? "":props.activity.grade_percentage);
  const [gradingDescription, setGradingDescription] = useState(props.activity==undefined? "":props.activity.grading_description);
  const [description, setDescription] = useState(props.activity==undefined? "":props.activity.description);
  const [estimatedTime, setEstimatedTime] = useState(props.activity==undefined? "":props.activity.estimated_time);
  const [feedback, setFeedback] = useState(props.activity==undefined? []:props.activity.feedback);

  const typeList = [
  {
    value: 1,
    label: 'Examination',
  },
  {
    value: 2,
    label: 'MCQ',
  },
  {
    value: 3,
    label: 'Report',
  },
  {
    value: 4,
    label: 'Homework Question',
  },
  {
    value: 5,
    label: 'Performance',
  },
  {
    value: 6,
    label: 'Software',
  },
  {
    value: 7,
    label: 'Presentation',
  },
  {
    value: 8,
    label: 'Other',
  },
  {
    value: 9,
    label: 'Artefact',
  },
  {
    value: 10,
    label: 'Lab Report',
  },
  {
    value: 11,
    label: 'Poster',
  },
  {
    value: 12,
    label: 'Simulation',
  },
  {
    value: 13,
    label: 'Lecture',
  },
  {
    value: 14,
    label: 'Tutorial',
  },
  {
    value: 15,
    label: 'Laboratory',
  },
  {
    value: 16,
    label: 'Self-Directed Study',
  },
];

const [activityTypeID, setActivityTypeID] = useState(props.activity==undefined? null:(typeList.find((item)=>item.label==props.activity.activityType)).value);


  const [newFeedback, setNewFeedback] = useState([]);
    useEffect(() => {
      console.log("use effect");
      console.log(props.activity);
      console.log(props.newActivityFlag);
      if(props.newActivityFlag==false){
        setTitle(props.activity==undefined? "":props.activity.title);
        setNewNote("");
        setNotes(props.activity==undefined? []:props.activity.notes);
        setStartDate(props.activity==undefined? null:new Date(props.activity.start_date));
        setDueDate(props.activity==undefined? null:new Date(props.activity.due_date));
        setGradePercentage(props.activity==undefined? "":props.activity.grade_percentage);
        setGradingDescription(props.activity==undefined? "":props.activity.grading_description);
        setDescription(props.activity==undefined? "":(props.activity.description==null? props.activity.description: "None"));
        setEstimatedTime(props.activity==undefined? "":props.activity.estimated_time);
        setActivityTypeID(props.activity==undefined? null:typeList.find((item)=>item.label==props.activity.activityType).value);
        setFeedback(props.activity==undefined? []:props.activity.feedback);
      }
      else{
        setTitle("");
        setNewNote("");
        setNotes([]);
        setStartDate(props.today);
        setDueDate(props.today);
        setGradePercentage("");
        setGradingDescription("");
        setDescription("");
        setEstimatedTime("");
        setActivityTypeID("not set");
        setFeedback([]);
      }
    },[props.activity,props.newActivityFlag]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteNotes= (text)=> {
    console.log("notes");
    console.log(notes);
    var index = -1
    var i;
    notes.map((note)=>console.log(note));
    for (i=0;i<notes.length;i++){
      if(notes[i].text==text){
        index = i;
        break;
      }
    }
    console.log(index);
    for(i=0;i<notes.length;i++){
      console.log("i = "+ i+" text: "+notes[i].text);
    }
    var tempNotes=[];
    for(i=0;i<index;i++){
      tempNotes.push(notes[i])
    }
    for(i=index+1;i<notes.length;i++){
      tempNotes.push(notes[i])
    }
    setNotes(tempNotes);
    }

  const saveActivity = () => {
    let feedbackArray = []
    const start = startDate.getFullYear()+'-'+("0" + (parseInt(startDate.getMonth())+1).toString()).slice(-2) + '-' + ("0" + startDate.getDate()).slice(-2) +' 00:00:00';
    const end = dueDate.getFullYear()+'-'+("0" + (parseInt(dueDate.getMonth())+1).toString()).slice(-2) + '-' + ("0" + dueDate.getDate()).slice(-2) +' 00:00:00';
    feedback.map((item)=>feedbackArray.push(item.feedback_question_ID));
    newFeedback.map((item)=>feedbackArray.push(item.feedback_ID));
    console.log("Date Format", start);
    var data = {
      activityID:props.newActivityFlag? 0: props.activity.activity_ID,
      moduleID:props.moduleID,
      start: start,
			end: end,
			hours: estimatedTime,
			grade: gradePercentage,
			type: typeList.find((item)=>item.value==activityTypeID).label,
			title: title,
			description: description,
      gradingDescription: gradingDescription,
    };
    fetch("http://mvroso.pythonanywhere.com/updateActivity", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(data),
                headers: new Headers({"content-type": "application/json"})
            }).then(res => {
                console.log("Request complete! response:", res);
                if(res.status==200){
                  props.setState();

                  props.handleChange("event placeholder",0);

                  if(props.newActivityFlag){
                    alert("New activity was created");
                  }
                  else{
                    alert("Your activity has been update");
                  }

                }

              });
    var fdata = {
      activityID: props.activity.activity_ID,
      type: 2,
      feedback: feedbackArray
    };
    console.log("Update Feedback", fdata);
    fetch("http://mvroso.pythonanywhere.com/setFeedback", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(fdata),
                headers: new Headers({"content-type": "application/json"})
            }).then(res => {
                console.log("Request complete! response:", res);
              });
  }

  const deleteActivity = () => {

    if(window.confirm("Do you really want to delete this activity?")){
      var data = {
        activityID:props.newActivityFlag? 0: props.activity.activity_ID,
      };
      fetch("http://mvroso.pythonanywhere.com/deleteActivity", {
                  method: "POST",
                  cache: "no-cache",
                  body: JSON.stringify(data),
                  headers: new Headers({"content-type": "application/json"})
              }).then(res => {
                  console.log("Request complete! response:", res);
                  if(res.status==200){
                    alert("Activity deleted successfully");
                    props.setState();
                    props.handleChange("event placeholder",0);
                  }

                });
    }

  }
  const saveNote = () => {
    var x = document.getElementById("noteButton");
    x.style.display = "none";
    var allNotes = [];
    notes.map((note)=>allNotes.push(note.text));
    if(newNote!="") allNotes.push(newNote);
      var data = {
          activityID: props.activity.activity_ID,
          notes: allNotes
            };
        console.log(data);
            fetch("http://mvroso.pythonanywhere.com/updateActivityNotes", {
                        method: "POST",
                        cache: "no-cache",
                        body: JSON.stringify(data),
                        headers: new Headers({"content-type": "application/json"})
                    }).then(res => {
                        console.log("Request complete! response:", res);
                        props.setState();
                        x.style.display = "inline-block";
                    });
    }
    if(props.activity == undefined){
        return(<div>All classes completed !</div>)
    }

    return (
      <div className={classes.root}>
      {props.newActivityFlag ||new Date(props.activity.due_date)> props.today ?
        <div className={classes.demo1}>
          <AntTabs value={props.value} onChange={props.handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
            <AntTab label="Details" disabled={props.newActivityFlag} style={{color: props.colour}}/>
            {props.edit > 0 ? <AntTab label="Edit"  style={{color: props.colour}}/> : null}

          </AntTabs>
      </div>
  :
      <div className={classes.demo1}>
        <AntTabs value={props.value} onChange={props.handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                  <AntTab label="Feedback" style={{color: props.colour}}/>
                  <AntTab label="Details" style={{color: props.colour}}/>
                  </AntTabs>
                </div>


              }

        {new Date(props.activity.due_date) >= props.today ?
          <div>
          <TabPanel  value={props.value} index={0}>
          <div className = 'detailBox' style = {{color: props.colour}}>
          <div style={{margin:'5px',display:'flex'}}>
            <div>
              <label For="title">Activity Title</label>
                <TextField
                    id="title"
                    style={{width:"351px",marginTop:'8px',marginBottom:'16px'  }}
                    InputProps={{style: inputStyle}}
                    value={props.activity.title}
                    variant="outlined"
                    size='small'
                    />
            </div>
            <div style={{marginLeft:'24px'}}>
              <label For="type"> Assignment Type </label>
              <TextField
                      id="type"
                      style={{width:"160px",marginTop:'8px',marginBottom:'16px',}}
                      InputProps={{style: inputStyle}}
                      value={props.activity.activityType}
                      variant="outlined"
                      size='small'

                    />
            </div>
          </div>
            <div style={{display:'flex',margin:'5px'}} >
              <div>
                <label For="start">Start Date</label><br/>
                <TextField
                    id="start"
                    style={{width:"122px",marginTop:'8px',marginBottom:'16px'}}
                    InputProps={{style: inputStyle}}
                    size='small'
                    value={
                      ("0" + new Date(props.activity.start_date).getDate()).slice(-2)+'/' +("0" + (parseInt(new Date(props.activity.start_date).getMonth())+1).toString()).slice(-2) + '/' + new Date(props.activity.start_date).getFullYear()
                      }
                    variant="outlined"

                    />
              </div>
              <div style={{marginLeft:'24px'}}>
                <label For="end" >End Date </label><br/>
                <TextField
                    id="end"
                    style={{width:"122px",marginTop:'8px',marginBottom:'16px'}}
                    InputProps={{style: inputStyle}}
                    size='small'
                    value={
                    ("0" + new Date(props.activity.due_date).getDate()).slice(-2)+'/'+("0" + (parseInt(new Date(props.activity.due_date).getMonth())+1).toString()).slice(-2) + '/' + new Date(props.activity.due_date).getFullYear()
                    }
                    variant="outlined"
                    />
              </div>
              <div style={{marginLeft:'8px'}}>
              <label For="end_hours" > </label><br/>
                <TextField
                    id="end_hours"
                    style={{width:"70px",marginTop:'8px',marginBottom:'16px'}}
                    InputProps={{style: inputStyle}}
                    size='small'
                    value={
                    ("0" + new Date(props.activity.due_date).getHours()).slice(-2)+':'+("0" + new Date(props.activity.due_date).getMinutes()).slice(-2)
                    }
                    variant="outlined"
                    />
              </div>
              <div style={{marginLeft:'40px'}}>
              <label For="dedicationTime" > Dedication Time </label><br/>
                <div style={{verticalAlign:'middle', display:'flex'}}>
                    <span style= {inputStyle} style= {{...inputStyle, lineHeight:'55px',marginRight:'4px'}}>around</span>
                    <TextField
                        id="dedicationTime"
                        style={{width:"56px",marginTop:'8px',marginBottom:'16px',}}
                        InputProps={{style: {...inputStyle,borderRadius:'4px 0 0 4px'}}}
                        size='small'
                        value={props.activity.estimated_time}
                        variant="outlined"
                        />
                    <span style={{...inputStyle, marginTop:'8px',lineHeight:'37px',height:'37px',padding:'0 4px',borderRadius:'0 8px 8px 0',backgroundColor:props.colour,color:"black"}}>hours</span>
                </div>
              </div>
            </div>
            <div style={{display:'flex',margin:'5px'}} >
              <div>
                <label For='graded'> Graded </label><br/>
                <Switch
                  checked={!(props.activity.grade_percentage==0)}
                  style={{color:props.colour}}
                  name="graded"
                />
                </div>
                <div>
                <label For='grade_percentage'> % </label><br/>
                <TextField
                        id="grade_percentage"
                        style={{width:"60px",marginTop:'8px',marginBottom:'16px'}}
                        InputProps={{style: inputStyle}}
                        size='small'
                        value={props.activity.grade_percentage}
                        variant="outlined"
                      />
              </div>
              <div style={{marginLeft:'24px'}}>
                <label For="grading_description"> Grading Description </label> <br/>
                <TextField
                  id="grading_description"
                  InputProps={{style: inputStyle}}
                  size='small'
                  value={props.activity.grading_description}
                  style={{width:"384px",marginTop:'8px',marginBottom:'16px'}}
                  variant="outlined"
                  rows={5}
                  InputProps={{
                    readOnly: true,
                  }}/>
              </div>
            </div>
            <div>
              <label For="description"> Activity Description </label> <br/>
              <TextField
                multiline
                id="description"
                InputProps={{style: inputStyle}}
                size='small'
                value={props.activity.description==null? "":props.activity.description}
                style={{width: '531px',marginTop:'8px',marginBottom:'16px'}}
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>

            {props.activity.lecture==null ?
              <div style={{marginTop:'16px', marginDown:'16px'}}> Not linked to a lecture </div>:
              <div>
                <label For="linked_lecture"> Linked to lecture  </label> <br/>
                <TextField
                  id="linked_lecture"
                  InputProps={{style: inputStyle}}
                  size='small'
                  value={props.activity.lecture}
                  style={{width:"70%"}}
                  variant="outlined"
                  />
                </div>}
            <div>


            </div>

            {props.activity.feedback.length==0? <div style={{marginTop:'16px', marginDown:'16px'}}>No Feedback Set</div>:
              <div>
              <div style={{margin:'5px 0px'}}>
                Feedback Questions
              </div>
              {
                props.activity.feedback.map((item) =>
                <div style={{margin:'5px',padding:'5px',border:'1px solid gray',borderRadius:'5px'}}>
                  <b>{item.feedback_title}</b> <br/> {item.feedback_description}
                 </div>
                )
              }

              </div>
            }
          </div>
          </TabPanel>

          <TabPanel  value={props.value} index={1}>
            <div className = 'detailBox' style = {{color: props.colour}}>
            <div style={{margin:'5px',display:'flex'}}>
              <div>
                <label For="title">Activity Title</label>
                  <TextField
                      id="title"
                      style={{width:"351px",marginTop:'8px',marginBottom:'16px'  }}
                      InputProps={{style: inputStyle}}
                      variant="outlined"
                      size='small'
                      value={title}
                      variant="outlined"
                      onChange={(e)=>setTitle(e.target.value)}
                      />
              </div>
              <div style={{marginLeft:'24px'}}>
                <label For="type"> Assignment Type </label>
                <TextField
                    id="type"
                    select
                    size='small'
                    style={{width:"160px",marginTop:'8px',marginBottom:'16px',}}
                    value={activityTypeID}
                    InputProps={{style: inputStyle}}
                    variant="outlined"
                    onChange={(e)=>setActivityTypeID(e.target.value)}
                  >
                    {typeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
              </div>
            </div>
            <div style={{display:'flex',margin:'5px'}} >
              <div style={{width:'122px'}}>
                <label For="startDate">Start Date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="startDate"
                        style={{width:"135px",marginTop:'8px',marginBottom:'16px'}}
                        InputProps={{style: inputStyle}}

                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                  </MuiPickersUtilsProvider>
                </div>
                <div style={{marginLeft:'24px'}}>
                  <label For="dueDate" >End Date </label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="dueDate"
                          style={{width:"135px",marginTop:'8px',marginBottom:'16px'}}
                          InputProps={{style: inputStyle}}

                          value={dueDate}
                          onChange={(date) => setDueDate(date)}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div style={{marginLeft:'8px'}}>
                  <label For="end_hours" > </label><br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker
                          clearable
                          ampm={false}
                          value={dueDate}
                          onChange={setDueDate}
                          InputProps={{style: inputStyle}}

                          variant="outlined"
                          style={{width:"49px",marginTop:'8px',marginBottom:'16px'}}
                        />
                        </MuiPickersUtilsProvider>

                  </div>
                  <div style={{marginLeft:'40px'}}>
                  <label For="dedicationTime" > Dedication Time </label><br/>
                    <div style={{verticalAlign:'middle', display:'flex'}}>
                        <span style= {inputStyle} style= {{...inputStyle, lineHeight:'55px',marginRight:'4px'}}>around</span>
                        <TextField
                            id="dedicationTime"
                            style={{width:"56px",marginTop:'8px',marginBottom:'16px',}}
                            InputProps={{style: {...inputStyle,borderRadius:'4px 0 0 4px'}}}
                            size='small'
                            value={estimatedTime}
                            variant="outlined"
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            />
                        <span style={{...inputStyle, marginTop:'8px',lineHeight:'37px',height:'37px',padding:'0 4px',borderRadius:'0 8px 8px 0',backgroundColor:props.colour,color:"black"}}>hours</span>
                    </div>
                  </div>

              </div>
              <div style={{display:'flex',margin:'5px'}} >
                <div>
                  <label For='graded'> Graded </label><br/>
                  <Switch
                    checked={graded}
                    style={{color:props.colour}}
                    name="graded"
                    onChange={()=>setGraded(!graded)}

                  />
                  </div>
                  <div>
                  <label For='grade_percentage'> % </label><br/>
                  <TextField
                          id="grade_percentage"
                          style={{width:"60px",marginTop:'8px',marginBottom:'16px'}}
                          InputProps={{style: inputStyle}}
                          size='small'
                          value={graded? gradePercentage:"0"}
                          disabled={!graded}
                          variant="outlined"
                          onChange={(e) => setGradePercentage(e.target.value)}
                        />
                </div>
                <div style={{marginLeft:'24px'}}>
                  <label For="grading_description"> Grading Description </label> <br/>
                  <TextField
                    id="grading_description"
                    InputProps={{style: inputStyle}}
                    size='small'
                    value={gradingDescription}
                    style={{width:"384px",marginTop:'8px',marginBottom:'16px'}}
                    variant="outlined"
                    onChange={(e)=>setGradingDescription(e.target.value)}
                    />
                </div>
              </div>
              <div>
              <label For="description"> Activity Description </label> <br/>
              <TextField
                multiline
                id="description"
                InputProps={{style: inputStyle}}
                size='small'
                value={description}
                style={{width: '531px',marginTop:'8px',marginBottom:'16px'}}
                variant="outlined"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                />
              </div>

            <div style={{margin:'10px 0px'}}>
              <label For="select-feedback" style={{marginBottom:'8px'}}>Feedback Questions </label> <br/>
              <Select
                labelId="select-feedback"
                id="selectFeedback"
                multiple
                variant="outlined"
                lable="Add Feedback"
                value={newFeedback}
                onChange={(e)=>setNewFeedback(e.target.value)}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classesChips.chips}>
                    {selected.map((value) => (
                      <Chip key={value.feedback_ID} label={value.feedback_title} className={classesChips.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {feedbackOptions.map((item) => (
                  <MenuItem key={item.feedback_ID} value={item} style={getStyles(item.feedback_title, newFeedback, theme)}>
                    {item.feedback_title}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {feedback.length==0? <div></div>:
              feedback.map((item)=>
              <div style={{margin:'5px',padding:'5px',border:'1px solid gray',borderRadius:'5px'}}> <b>{item.feedback_title}</b> <br/>{item.feedback_description}
              <IconButton aria-label="delete"  onClick={()=>{setFeedback(feedback.filter((i)=>i.feedback_title!=item.feedback_title));}}>
                <ClearRoundedIcon  />
              </IconButton>
               </div>

            )
            }
            <div style={{margin:'15px'}}>
            <Button fullWidth size = 'large' variant="contained" onClick={()=>saveActivity()} style={{ borderRadius:'20px',backgroundColor: props.colour, color: invert(props.colour, true),textTransform:'none'}}> {props.newActivityFlag? <span>Create</span>:<span>Save</span>} </Button>
            </div>
            {props.newActivityFlag? null:
              <div style={{margin:'15px'}}>
              <Button size = 'small' variant="contained" onClick={()=>deleteActivity()} style={{ borderRadius:'20px',backgroundColor: 'transparent',textTransform:'none', float: 'right'}}> <u style={{color:'#C4C4C4'}}>Delete</u> </Button>
              </div>
            }

            </div>

          </TabPanel>
          </div>

        :
        <div>
        <TabPanel  value={props.value} index={0}>
          <div className = 'detailBox' style = {{color: props.colour}}>

            <div style = {{margin:'8px 0'}}>
            { props.activity.feedback.length==0 ? <div> No Feedback Responses</div>:
            props.activity.feedback.map((item)=> <FeedbackPanel activityID={props.activity.activity_ID} questionName={item.feedback_title} type='Activity'/>)}

            </div>

            <div style = {{margin:'10px 0'}}>
            {notes.map((note,index) => <div><TextField
                        multiline
                        id="standard-read-only-input"
                        key={note.text}
                        defaultValue={note.text}
                        style={{width:'85%', margin:'10px 0'}}
                        variant="outlined"
                        rows={5}
                        InputProps={{
                          readOnly: true,
                        }}/>
                        {     <IconButton aria-label="delete" onClick={()=>deleteNotes(note.text)}>
                                <ClearRoundedIcon  />
                              </IconButton>}
                          </div>
                      )}

              <TextField variant="outlined" fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
              <Button id = "noteButton" onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth
              style={{margin:'10px 0px', textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Save Notes </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel  value={props.value} index={1}>
        <div className = 'detailBox' style = {{color: props.colour}}>
        <div style={{margin:'5px',display:'flex'}}>
          <div>
            <label For="title">Activity Title</label>
              <TextField
                  id="title"
                  style={{width:"351px",marginTop:'8px',marginBottom:'16px'  }}
                  InputProps={{style: inputStyle}}
                  value={props.activity.title}
                  variant="outlined"
                  size='small'
                  />
          </div>
          <div style={{marginLeft:'24px'}}>
            <label For="type"> Assignment Type </label>
            <TextField
                    id="type"
                    style={{width:"160px",marginTop:'8px',marginBottom:'16px',}}
                    InputProps={{style: inputStyle}}
                    value={props.activity.activityType}
                    variant="outlined"
                    size='small'

                  />
          </div>
        </div>
          <div style={{display:'flex',margin:'5px'}} >
            <div>
              <label For="start">Start Date</label><br/>
              <TextField
                  id="start"
                  style={{width:"122px",marginTop:'8px',marginBottom:'16px'}}
                  InputProps={{style: inputStyle}}
                  size='small'
                  value={
                    ("0" + new Date(props.activity.start_date).getDate()).slice(-2)+'/' +("0" + (parseInt(new Date(props.activity.start_date).getMonth())+1).toString()).slice(-2) + '/' + new Date(props.activity.start_date).getFullYear()
                    }
                  variant="outlined"

                  />
            </div>
            <div style={{marginLeft:'24px'}}>
              <label For="end" >End Date </label><br/>
              <TextField
                  id="end"
                  style={{width:"122px",marginTop:'8px',marginBottom:'16px'}}
                  InputProps={{style: inputStyle}}
                  size='small'
                  value={
                  ("0" + new Date(props.activity.due_date).getDate()).slice(-2)+'/'+("0" + (parseInt(new Date(props.activity.due_date).getMonth())+1).toString()).slice(-2) + '/' + new Date(props.activity.due_date).getFullYear()
                  }
                  variant="outlined"
                  />
            </div>
            <div style={{marginLeft:'8px'}}>
            <label For="end_hours" > </label><br/>
              <TextField
                  id="end_hours"
                  style={{width:"70px",marginTop:'8px',marginBottom:'16px'}}
                  InputProps={{style: inputStyle}}
                  size='small'
                  value={
                  ("0" + new Date(props.activity.due_date).getHours()).slice(-2)+':'+("0" + new Date(props.activity.due_date).getMinutes()).slice(-2)
                  }
                  variant="outlined"
                  />
            </div>
            <div style={{marginLeft:'40px'}}>
            <label For="dedicationTime" > Dedication Time </label><br/>
              <div style={{verticalAlign:'middle', display:'flex'}}>
                  <span style= {inputStyle} style= {{...inputStyle, lineHeight:'55px',marginRight:'4px'}}>around</span>
                  <TextField
                      id="dedicationTime"
                      style={{width:"56px",marginTop:'8px',marginBottom:'16px',}}
                      InputProps={{style: {...inputStyle,borderRadius:'4px 0 0 4px'}}}
                      size='small'
                      value={props.activity.estimated_time}
                      variant="outlined"
                      />
                  <span style={{...inputStyle, marginTop:'8px',lineHeight:'37px',height:'37px',padding:'0 4px',borderRadius:'0 8px 8px 0',backgroundColor:props.colour,color:"black"}}>hours</span>
              </div>
            </div>
          </div>
          <div style={{display:'flex',margin:'5px'}} >
            <div>
              <label For='graded'> Graded </label><br/>
              <Switch
                checked={!(props.activity.grade_percentage==0)}
                style={{color:props.colour}}
                name="graded"
              />
              </div>
              <div>
              <label For='grade_percentage'> % </label><br/>
              <TextField
                      id="grade_percentage"
                      style={{width:"60px",marginTop:'8px',marginBottom:'16px'}}
                      InputProps={{style: inputStyle}}
                      size='small'
                      value={props.activity.grade_percentage}
                      variant="outlined"
                    />
            </div>
            <div style={{marginLeft:'24px'}}>
              <label For="grading_description"> Grading Description </label> <br/>
              <TextField
                id="grading_description"
                InputProps={{style: inputStyle}}
                size='small'
                value={props.activity.grading_description}
                style={{width:"384px",marginTop:'8px',marginBottom:'16px'}}
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
          </div>
          <div>
            <label For="description"> Activity Description </label> <br/>
            <TextField
              multiline
              id="description"
              InputProps={{style: inputStyle}}
              size='small'
              value={props.activity.description==null? "":props.activity.description}
              style={{width: '531px',marginTop:'8px',marginBottom:'16px'}}
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>
          </div>

          {props.activity.lecture==null ?
            <div style={{marginTop:'16px', marginDown:'16px'}}> Not linked to a lecture </div>:
            <div>
              <label For="linked_lecture"> Linked to lecture  </label> <br/>
              <TextField
                id="linked_lecture"
                InputProps={{style: inputStyle}}
                size='small'
                value={props.activity.lecture}
                style={{width:"70%"}}
                variant="outlined"
                />
              </div>}
          <div>


          </div>

          {props.activity.feedback.length==0? <div style={{marginTop:'16px', marginDown:'16px'}}>No Feedback Set</div>:
            <div>
            <div style={{margin:'5px 0px'}}>
              Feedback Questions
            </div>
            {
              props.activity.feedback.map((item) =>
              <div style={{margin:'5px',padding:'5px',border:'1px solid gray',borderRadius:'5px'}}>
                <b>{item.feedback_title}</b> <br/> {item.feedback_description}
               </div>
              )
            }

            </div>
          }
        </div>

        </TabPanel>
        </div>}

      </div>
    );

}

const useStylesTextField = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '100%',
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
          label="Lecture 3 note"
          placeholder=""
          multiline
          variant="outlined"
        />
      </div>
    </form>
  );
}





export default function ActivityTab(props) {
      // const [focusID, setFocusID] = React.useState(() => {
      //   var i;
      //   for(i=0;i<props.activities.length;i++){
      //     if(new Date(props.activities[i].due_date)>=props.today){
      //       return (props.activities[i].activity_ID);
      //       break;
      //     }
      //   }
      //   return null;
      //
      // });
  const [newActivityFlag, setNewActivityFlag] = useState(false);
  const [detailBoxValue, setDetailBoxValue] = useState(0);
  function handleChangeDetailBox(event, newValue) {
    setDetailBoxValue(newValue);
    console.log("change value function");
    if(typeof event == 'string' ){
      console.log("eh string simm");
      if(event == 'add_activity'){
        setNewActivityFlag(true);
      }
      if(event == 'activity_selected'){
        setNewActivityFlag(false);
      }
    }
    else{
      console.log("n eh string");
      if(newActivityFlag==true){
        setNewActivityFlag(false);
      }
    }
  }
  const activityInFocus = props.activities.find((activity)=>activity.activity_ID  == props.focusID);
  console.log("activity in focus");
  // function handleChange(newValue) {
  //   console.log("changed! : " + newValue);
  //   setFocusID(newValue);
  // }
  return (
    <div style = {{margin:0,padding:0}}>
      <div  style = {{float:'left',height:'500px',width:'32.5%',}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Activity Status </div>
      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox handleChange= {handleChangeDetailBox} today={props.today} inFocusID={props.focusID} colour= {props.colour} activities={props.activities} onClick = {props.handleChange}/>
      </div>

      </div>
      <div className = 'detailBox' style = {{float:'left',height:'500px',width:'67%'}}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
          <DetailBox newActivityFlag={newActivityFlag} value={detailBoxValue} handleChange= {handleChangeDetailBox} setState={props.setState} today={props.today} activity={activityInFocus} colour= {props.colour} edit = {props.edit} moduleID={props.moduleID}/>
        </div>
      </div>
    </div>
  );
}
