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
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DatePick from './datePicker';
import {FeedbackPanel} from "./listRenderer";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
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
        {props.activities.filter((activity) => new Date(activity.due_date)>= props.today).map((activity) =>
          <div style = {{margin:'8px 0'}}>
          <BootstrapButton  size = 'large' fullWidth
          style = {{backgroundColor: activity.activity_ID == props.inFocusID? '#F1F1F1': activity.colour}}
          startIcon ={<AssignmentIcon style={{fontSize: 40, color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true) }} />}
          onClick={()=> props.onClick(activity.activity_ID)}
          children={
            <div>
            <div style={{fontFamily: 'Rubik', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}}>{activity.title}</div>
            <div style={{fontWeight:'300',fontSize: '14px', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}}><ScheduleIcon style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}} />
              <span style={{verticalAlign:'middle', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}}>{activity.due_date}</span>
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
        style = {{backgroundColor: activity.activity_ID == props.inFocusID? '#F1F1F1': activity.colour}}
        startIcon ={<AssignmentIcon style={{fontSize: 40, color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true) }} />}
        onClick={()=> props.onClick(activity.activity_ID)}
        children={
          <div>
          <div style={{fontFamily: 'Rubik', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}}>{activity.title}</div>
          <div style={{fontWeight:'300',fontSize: '14px', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}}><ScheduleIcon style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}} />
            <span style={{verticalAlign:'middle', color: activity.activity_ID == props.inFocusID? 'black': invert(activity.colour, true)}}>{activity.due_date}</span>
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
  const theme = useTheme();
  const classesChips = useStylesChips();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState(props.activity.title);
  const [startDate, setStartDate] = useState(new Date(props.activity.start_date));
  const [dueDate, setDueDate] = useState(new Date(props.activity.due_date));
  const [gradePercentage, setGradePercentage] = useState(props.activity.grade_percentage);
  const [gradingDescription, setGradingDescription] = useState(props.activity.grading_description);
  const [description, setDescription] = useState(props.activity.description);
  const [estimatedTime, setEstimatedTime] = useState(props.activity.estimated_time);
  const [feedback, setFeedback] = useState(props.activity.feedback);
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

const [activityTypeID, setActivityTypeID] = useState((typeList.find((item)=>item.label==props.activity.activityType)).value);


  const [newFeedback, setNewFeedback] = useState([]);
    useEffect(() => {
      console.log("use effect");
      console.log(props.activity);
      setTitle(props.activity.title);
      setStartDate(new Date(props.activity.start_date));
      setDueDate(new Date(props.activity.due_date));
      setGradePercentage(props.activity.grade_percentage);
      setGradingDescription(props.activity.grading_description);
      setDescription(props.activity.description==null? props.activity.description: "None");
      setEstimatedTime(props.activity.estimated_time);
      setActivityTypeID(typeList.find((item)=>item.label==props.activity.activityType).value);
      setFeedback(props.activity.feedback);
    },[props.activity]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveActivity = () => {
    let feedbackArray = []
    const start = startDate.getFullYear()+'-'+("0" + (parseInt(startDate.getMonth())+1).toString()).slice(-2) + '-' + ("0" + startDate.getDate()).slice(-2) +' 00:00:00';
    const end = dueDate.getFullYear()+'-'+("0" + (parseInt(dueDate.getMonth())+1).toString()).slice(-2) + '-' + ("0" + dueDate.getDate()).slice(-2) +' 00:00:00';
    feedback.map((item)=>feedbackArray.push(item.feedback_ID));
    newFeedback.map((item)=>feedbackArray.push(item.feedback_ID));

    var data = {
      activityID:props.activity.activity_ID,
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
  if (props.edit > 0) {
    return (
      <div className={classes.root}>
      {new Date(props.activity.due_date)< props.today ?
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                  <AntTab label="Feedback" style={{color: props.colour}}/>
                  <AntTab label="Details" style={{color: props.colour}}/>
                  </AntTabs>
                </div>
                  :
                  <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                      <AntTab label="Details" style={{color: props.colour}}/>
                      <AntTab label="Edit"style={{color: props.colour}}/>
                    </AntTabs>
                </div>

              }

        {new Date(props.activity.due_date) >= props.today ?
          <div>
          <TabPanel  value={value} index={0}>
          <div className = 'detailBox' style = {{color: props.colour}}>
          <div style={{margin:'5px'}}>
          <label For="title">Activity Title</label><br/>
            <TextField
                id="title"
                fullWidth
                value={props.activity.title}
                variant="outlined"
                />
          </div>
            <div style={{display:'flex',margin:'5px'}} >
            <div>
              <label For="start">Start Date</label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.start_date}
                  variant="outlined"
                  />
            </div>
            <div>
              <label For="end" >End Date </label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.due_date}
                  variant="outlined"
                  />
            </div>
            <div>
            <label For="dedicationTime" > Dedication Time </label><br/>
                <TextField
                    id="dedicationTime"
                    value={props.activity.estimated_time}
                    variant="outlined"
                    />
            </div>

            </div>
            <div>
            <span> Description </span> <br/>
            <TextField
              multiline
              id="standard-read-only-input"
              value={props.activity.description==null? "":props.activity.description}
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>
            </div>
            <div>
              <span> Grade Percentage </span><br/>
              <TextField
                      id="outlined-select-currency"
                      value={props.activity.grade_percentage}
                      variant="outlined"
                    />

            </div>
            <div>
              <span> Grading Description </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={props.activity.grading_description}
                fullWidth
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
            <div>
              <span> Assignment Type </span><br/>
              <TextField
                      id="outlined-select-currency"
                      fullWidth
                      value={props.activity.activityType}
                      variant="outlined"
                    />

            </div>
            <div style={{margin:'5px 0px'}}>
              Feedback Questions
            </div>
            {props.activity.feedback.length==0? <div>No Feedback Set</div>:
              props.activity.feedback.map((item)=>
              <div style={{margin:'5px',padding:'5px',border:'1px solid gray',borderRadius:'5px'}}> <b>{item.feedback_title}</b> <br/>{item.feedback_description}
               </div>

            )
            }
            {/*
              <div>
                Activities
              </div>
              <div>
                <BootstrapButton  size = 'large' fullWidth startIcon ={<AssignmentIcon color='action' style={{fontSize: 40, fill: '#4A006E' }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
              </div>

              */
            }


          </div>

          </TabPanel>
          <TabPanel  value={value} index={1}>
            <div className = 'detailBox' style = {{color: props.colour}}>
            <div style={{margin:'5px'}}>
            <label For="title">Activity Title</label><br/>
              <TextField
                  id="title"
                  fullWidth
                  value={title}
                  variant="outlined"
                  onChange={(e)=>setTitle(e.target.value)}
                  />
            </div>
              <div style={{display:'flex',margin:'5px'}} >
              <div>
                <label For="startDate">Start Date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="startDate"
                        label="start date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                  </MuiPickersUtilsProvider>

              </div>
              <div>
                <label For="dueDate" >End Date </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="dueDate"
                        label="due date"
                        value={dueDate}
                        onChange={(date) => setDueDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                  </MuiPickersUtilsProvider>

              </div>
              <div>
              <label For="dedicationTime" >Dedication Time </label><br/>
                  <TextField
                      id="dedicationTime"
                      value={estimatedTime}
                      variant="outlined"
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      />
              </div>

              </div>
              <div>
                <span> Description </span> <br/>
                <TextField
                  multiline
                  id="description"
                  value={description}
                  fullWidth
                  variant="outlined"
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
              <div>
                <span> Grade Percentage </span><br/>
                <TextField
                        id="outlined-select-currency"
                        value={gradePercentage}
                        variant="outlined"
                        onChange={(e) => setGradePercentage(e.target.value)}
                      />

              </div>
              <div>
                <span> Grading Description </span> <br/>
                <TextField
                  multiline
                  id="standard-read-only-input"
                  value={gradingDescription}
                  fullWidth
                  variant="outlined"
                  rows={5}
                  onChange={(e)=>setGradingDescription(e.target.value)}
                  />
              </div>
              <div>
                <span> Assignment Type </span><br/>
                <InputLabel id="select-assignment-type">Select Type</InputLabel>
                <TextField
                    id="activityType"
                    select
                    value={activityTypeID}
                    onChange={(e)=>setActivityTypeID(e.target.value)}
                  >
                    {typeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

              </div>
              {/*
                <div>
                  Linked to lectures
                  <IconButton aria-label="delete">
                    <AddBoxIcon />
                  </IconButton>
                </div>
                <div>
                  <BootstrapButton  size = 'large' fullWidth startIcon ={<AssignmentIcon color='action' style={{fontSize: 40, fill: '#4A006E' }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
                </div>
                */}

            <div style={{margin:'10px 0px'}}>
              Feedback Questions
              <InputLabel id="select-feedback">Add Feedback</InputLabel>
              <Select
                labelId="select-feedback"
                id="selectFeedback"
                multiple
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
            <Button fullWidth size = 'large' variant="contained" onClick={()=>saveActivity()} style={{ backgroundColor: props.colour, color: invert(props.colour, true)}}> SAVE </Button>
            </div>
            </div>

          </TabPanel>
          </div>

        :
        <div>
        <TabPanel  value={value} index={0}>
          <div className = 'detailBox' style = {{color: props.colour}}>

            <div style = {{margin:'8px 0'}}>
            {props.activity.feedback.map((item)=> <FeedbackPanel activityID={props.activity.activity_ID} questionName={item.feedback_title} type='Activity'/>)}

  {/*<FeedbackPanel activityID={props.activity.activity_ID} questionName='Speed' type='Activity'/>
    <FeedbackPanel activityID='2' questionName='Clarity' type='Activity'/>
            <FeedbackPanel activityID='2' questionName='Relation To Module' type='Activity'/> */}
            </div>

            <div style = {{margin:'10px 0'}}>
              <MultilineTextFields />
              <Button type='submit' variant="contained" color="default" disableElevation fullWidth style={{textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Add Note </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <div className = 'detailBox' style = {{color: props.colour}}>
          <div style={{margin:'5px'}}>
          <label For="title">Activity Title</label><br/>
            <TextField
                id="title"
                fullWidth
                value={props.activity.title}
                variant="outlined"
                />
          </div>
            <div style={{display:'flex',margin:'5px'}} >
            <div>
              <label For="start">Start Date</label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.start_date}
                  variant="outlined"
                  />
            </div>
            <div>
              <label For="end" >End Date </label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.due_date}
                  variant="outlined"
                  />
            </div>
            <div>
            <label For="dedicationTime" >Dedication Time </label><br/>
                <TextField
                    id="dedicationTime"
                    value={props.activity.estimated_time}
                    variant="outlined"
                    />
            </div>

            </div>
            <div>
            <span> Description </span> <br/>
            <TextField
              multiline
              id="standard-read-only-input"
              value={props.activity.description==null? "":props.activity.description}
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>
            </div>
            <div>
              <span> Grade Percentage </span><br/>
              <TextField
                      id="outlined-select-currency"
                      value={props.activity.grade_percentage}
                      variant="outlined"
                    />

            </div>
            <div>
              <span> Grading Description </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={props.activity.grading_description}
                fullWidth
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
            <div>
              <span> Assignment Type </span><br/>
              <TextField
                      id="outlined-select-currency"
                      fullWidth
                      value={props.activity.activityType}
                      variant="outlined"
                    />

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
              <Button type='submit' variant="contained" color="default" disableElevation fullWidth style={{textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Add Note </Button>
            </div>
          </div>

        </TabPanel>
        </div>}

      </div>
    );
  }
  else {
    return (
      <div className={classes.root}>
      {new Date(props.activity.due_date)< props.today ?
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                  <AntTab label="Feedback" style={{color: props.colour}}/>
                  <AntTab label="Details" style={{color: props.colour}}/>
                  </AntTabs>
                </div>
                  :
                  <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                      <AntTab label="Details" style={{color: props.colour}}/>
                    </AntTabs>
                </div>

              }

        {new Date(props.activity.due_date) >= props.today ?
          <div>
          <TabPanel  value={value} index={0}>
          <div className = 'detailBox' style = {{color: props.colour}}>
          <div style={{margin:'5px'}}>
          <label For="title">Activity Title</label><br/>
            <TextField
                id="title"
                fullWidth
                value={props.activity.title}
                variant="outlined"
                />
          </div>
            <div style={{display:'flex',margin:'5px'}} >
            <div>
              <label For="start">Start Date</label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.start_date}
                  variant="outlined"
                  />
            </div>
            <div>
              <label For="end" >End Date </label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.due_date}
                  variant="outlined"
                  />
            </div>
            <div>
            <label For="dedicationTime" > Dedication Time </label><br/>
                <TextField
                    id="dedicationTime"
                    value={props.activity.estimated_time}
                    variant="outlined"
                    />
            </div>

            </div>
            <div>
            <span> Description </span> <br/>
            <TextField
              multiline
              id="standard-read-only-input"
              value={props.activity.description==null? "":props.activity.description}
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>
            </div>
            <div>
              <span> Grade Percentage </span><br/>
              <TextField
                       id="outlined-select-currency"
                       value={props.activity.grade_percentage}
                       variant="outlined"
                     />

            </div>
            <div>
              <span> Grading Description </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={props.activity.grading_description}
                fullWidth
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
            <div>
              <span> Assignment Type </span><br/>
              <TextField
                       id="outlined-select-currency"
                       fullWidth
                       value={props.activity.activityType}
                       variant="outlined"
                     />

            </div>
            {/*
              <div>
                Activities
              </div>
              <div>
                <BootstrapButton  size = 'large' fullWidth startIcon ={<AssignmentIcon color='action' style={{fontSize: 40, fill: '#4A006E' }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
              </div>

              */
            }


          </div>

          </TabPanel>
          <TabPanel  value={value} index={1}>
            <div className = 'detailBox' style = {{color: props.colour}}>
            <div style={{margin:'5px'}}>
            <label For="title">Activity Title</label><br/>
              <TextField
                  id="title"
                  fullWidth
                  value={title}
                  variant="outlined"
                  onChange={(e)=>setTitle(e.target.value)}
                  />
            </div>
              <div style={{display:'flex',margin:'5px'}} >
              <div>
                <label For="startDate">Start Date</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                       <KeyboardDatePicker
                         disableToolbar
                         variant="inline"
                         format="MM/dd/yyyy"
                         margin="normal"
                         id="startDate"
                         label="start date"
                         value={startDate}
                         onChange={(date) => setStartDate(date)}
                         KeyboardButtonProps={{
                           'aria-label': 'change date',
                         }}
                       />
                   </MuiPickersUtilsProvider>

              </div>
              <div>
                <label For="dueDate" >End Date </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                       <KeyboardDatePicker
                         disableToolbar
                         variant="inline"
                         format="MM/dd/yyyy"
                         margin="normal"
                         id="dueDate"
                         label="due date"
                         value={dueDate}
                         onChange={(date) => setDueDate(date)}
                         KeyboardButtonProps={{
                           'aria-label': 'change date',
                         }}
                       />
                   </MuiPickersUtilsProvider>

              </div>
              <div>
              <label For="dedicationTime" >Dedication Time </label><br/>
                  <TextField
                      id="dedicationTime"
                      value={estimatedTime}
                      variant="outlined"
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      />
              </div>

              </div>
              <div>
                <span> Description </span> <br/>
                <TextField
                  multiline
                  id="description"
                  value={description}
                  fullWidth
                  variant="outlined"
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
              <div>
                <span> Grade Percentage </span><br/>
                <TextField
                         id="outlined-select-currency"
                         value={gradePercentage}
                         variant="outlined"
                         onChange={(e) => setGradePercentage(e.target.value)}
                       />

              </div>
              <div>
                <span> Grading Description </span> <br/>
                <TextField
                  multiline
                  id="standard-read-only-input"
                  value={gradingDescription}
                  fullWidth
                  variant="outlined"
                  rows={5}
                  onChange={(e)=>setGradingDescription(e.target.value)}
                  />
              </div>
              <div>
                <span> Assignment Type </span><br/>
                <TextField
                    id="activityType"
                    select
                    value={activityTypeID}
                    onChange={(e)=>setActivityTypeID(e.target.value)}
                  >
                    {typeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

              </div>
              {/*
                <div>
                  Linked to lectures
                  <IconButton aria-label="delete">
                    <AddBoxIcon />
                  </IconButton>
                </div>
                <div>
                  <BootstrapButton  size = 'large' fullWidth startIcon ={<AssignmentIcon color='action' style={{fontSize: 40, fill: '#4A006E' }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
                </div>
                */}


            <div style={{margin:'15px'}}>
            <Button fullWidth size = 'large' variant="contained" onClick={()=>saveActivity()} style={{ backgroundColor: props.colour, color: invert(props.colour, true)}}> SAVE </Button>
            </div>
            </div>

          </TabPanel>
          </div>

        :
        <div>
        <TabPanel  value={value} index={0}>
          <div className = 'detailBox' style = {{color: props.colour}}>

            <div style = {{margin:'8px 0'}}>
            {props.activity.feedback.map((item)=> <FeedbackPanel activityID={props.activity.activity_ID} questionName={item.feedback_title} type='Activity'/>)}

  {/*<FeedbackPanel activityID={props.activity.activity_ID} questionName='Speed' type='Activity'/>
     <FeedbackPanel activityID='2' questionName='Clarity' type='Activity'/>
            <FeedbackPanel activityID='2' questionName='Relation To Module' type='Activity'/> */}
            </div>

            <div style = {{margin:'10px 0'}}>
              <MultilineTextFields />
              <Button type='submit' variant="contained" color="default" disableElevation fullWidth style={{textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Add Note </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <div className = 'detailBox' style = {{color: props.colour}}>
          <div style={{margin:'5px'}}>
          <label For="title">Activity Title</label><br/>
            <TextField
                id="title"
                fullWidth
                value={props.activity.title}
                variant="outlined"
                />
          </div>
            <div style={{display:'flex',margin:'5px'}} >
            <div>
              <label For="start">Start Date</label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.start_date}
                  variant="outlined"
                  />
            </div>
            <div>
              <label For="end" >End Date </label>
              <TextField
                  id="dedicationTime"

                  value={props.activity.due_date}
                  variant="outlined"
                  />
            </div>
            <div>
            <label For="dedicationTime" >Dedication Time </label><br/>
                <TextField
                    id="dedicationTime"
                    value={props.activity.estimated_time}
                    variant="outlined"
                    />
            </div>

            </div>
            <div>
            <span> Description </span> <br/>
            <TextField
              multiline
              id="standard-read-only-input"
              value={props.activity.description==null? "":props.activity.description}
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>
            </div>
            <div>
              <span> Grade Percentage </span><br/>
              <TextField
                       id="outlined-select-currency"
                       value={props.activity.grade_percentage}
                       variant="outlined"
                     />

            </div>
            <div>
              <span> Grading Description </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={props.activity.grading_description}
                fullWidth
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
            <div>
              <span> Assignment Type </span><br/>
              <TextField
                       id="outlined-select-currency"
                       fullWidth
                       value={props.activity.activityType}
                       variant="outlined"
                     />

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
              <Button type='submit' variant="contained" color="default" disableElevation fullWidth style={{textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Add Note </Button>
            </div>
          </div>

        </TabPanel>
        </div>}

      </div>
    );
  }
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
      const [focusID, setFocusID] = React.useState(() => {
        var i;
        for(i=0;i<props.activities.length;i++){
          if(new Date(props.activities[i].due_date)>=props.today){
            return (props.activities[i].activity_ID);
            break;
          }
        }
        return null;

      });
  const activityInFocus = props.activities.find((activity)=>activity.activity_ID  == props.focusID);
  console.log("activity in focus");



  function handleChange(newValue) {
    console.log("changed! : " + newValue);
    setFocusID(newValue);
  }
  return (
    <div style = {{margin:0,padding:0}}>
      <div  style = {{float:'left',height:'500px',width:'32.5%',}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Activity Status </div>
      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox today={props.today} inFocusID={props.focusID} colour= {props.colour} activities={props.activities} onClick = {props.handleChange}/>
      </div>

      </div>
      <div className = 'detailBox' style = {{float:'left',height:'500px',width:'67%'}}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
          <DetailBox today={props.today} activity={activityInFocus} colour= {props.colour} edit = {props.edit} moduleID={props.moduleID}/>
        </div>
      </div>
    </div>
  );
}
