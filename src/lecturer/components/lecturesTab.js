import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import '../styles/lecturesTab.css';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
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
import AddBoxIcon from '@material-ui/icons/AddBox';
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
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

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
function getStyles(name, newLinkedActivities, theme) {
  return {
    fontWeight:
      newLinkedActivities.indexOf(name) === -1
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
  const now = new Date("2019-02-01T00:00:00");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const taughtLecturesSelectors = props.classes.filter((lecture) => new Date(lecture.date+'T'+lecture.end_time)< props.today
  ).map((lecture) =>
  <div style = {{margin:'8px 0'}}>
    <BootstrapButton style = {{backgroundColor: lecture.date+lecture.start_time == props.inFocusID? '#9A9A9A': '#F1F1F1'}} onClick = { () =>  props.onClick(lecture.date+lecture.start_time)}  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }}/>} children={
      <div>
        <div style={{fontFamily: 'Rubik'}}>{lecture.title}</div>
        <div style={{fontWeight:'300',fontSize: '14px'}}>
          <ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} />
          <span style={{verticalAlign:'middle'}}>{lecture.date}</span>
        </div>
      </div>} />
  </div>
);

  const scheduledLecturesSelectors = props.classes.filter((lecture) => new Date(lecture.date+'T'+lecture.end_time)>= props.today
  ).map((lecture) =>
  <div style = {{margin:'8px 0'}}>
    <BootstrapButton style = {{backgroundColor: lecture.date+lecture.start_time  == props.inFocusID? '#9A9A9A': '#F1F1F1'}} onClick = { () =>  props.onClick(lecture.date+lecture.start_time)}  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }}/>} children={
      <div>
        <div style={{fontFamily: 'Rubik'}}>{lecture.title}</div>
        <div style={{fontWeight:'300',fontSize: '14px'}}>
          <ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} />
          <span style={{verticalAlign:'middle'}}>{lecture.date}</span>
        </div>
      </div>} />
  </div>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div  className={classes.root} style = {{height:'400px',borderRight: '1px solid #C4C4C4',}}>

      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label="Scheduled" />
          <AntTab label="Taught" />
        </AntTabs>
      </div>
      <div>


      <TabPanel  value={value} index={0} >
        <div className = 'selectorBox' >
        {scheduledLecturesSelectors}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className = 'selectorBox'>
          {taughtLecturesSelectors}

        </div>
        </TabPanel>
      </div>
    </div>
  );
}
const feedbackOptions = [
    {
        feedback_ID: 1,
        feedback_title: "Pace",
        feedback_description: "The pace of the lecture was good."
    },
    {
        feedback_ID: 2,
        feedback_title: "Enthusiasm",
        feedback_description: "The lecturer was enthusiastic."
    },
    {
        feedback_ID: 3,
        feedback_title: "Delivery",
        feedback_description: "The lecturer presented the lecture materials in an effective manner."
    },
    {
        feedback_ID: 4,
        feedback_title: "Materials",
        feedback_description: "Lecture materials are made available."
    },
    {
        feedback_ID: 5,
        feedback_title: "Relevance",
        feedback_description: "The professor made it clear how the topic fit the course "
    },
    {
        feedback_ID: 6,
        feedback_title: "Value",
        feedback_description: "I saw the value/purpose of this lecture."
    },
    {
        feedback_ID: 7,
        feedback_title: "Interest",
        feedback_description: "My interest in the field (the specific topic) has been stimulated."
    },
    {
        feedback_ID: 8,
        feedback_title: "Engagement",
        feedback_description: "I felt I was engaged in this class. I was encouraged to participate and ask questions."
    },
    {
        feedback_ID: 9,
        feedback_title: "Expectation",
        feedback_description: "I understood what was expected in preparation for the class."
    },
    {
        feedback_ID: 10,
        feedback_title: "Preparation",
        feedback_description: "I was well prepared for the class."
    }
]
function DetailBox(props) {
  const theme = useTheme();
  const classes = useStyles();
  const classesChips = useStylesChips();
  const [value, setValue] = React.useState(0);
  const [description,setDescription] = useState(props.lecture.description);
  const [activityType, setActivityType] = useState(props.lecture.activityType);
  const [title, setTitle] = useState(props.lecture.title);
  const [newNote, setNewNote] = useState(null);
  const [notes, setNotes] = useState(props.lecture.notes);
  const [date,setDate]=useState(props.lecture.date);
  const [linkedActivity,setLinkedActivity]=useState(props.lecture.linked_activities);
  const [feedback, setFeedback] = useState(props.lecture.feedback);

  const [newFeedback, setNewFeedback] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const [newLinkedActivities, setNewLinkedActivities] = useState([]);


    useEffect(() => {
      console.log("use effect");
      console.log(props.lecture);
      setDescription(props.lecture.description);
      setActivityType(props.lecture.activityType);
      setTitle(props.lecture.title);
      setNewNote("");
      setNotes(props.lecture.notes);
      setDate(props.lecture.date);
      setLinkedActivity(props.lecture.linked_activities);
      setNewLinkedActivities([]);
      setFeedback(props.lecture.feedback);
      setNewFeedback([]);
    },[props.lecture]);

    const handleChangeActivity = (event) => {
      setNewLinkedActivities(event.target.value);
      console.log("change activities");
      console.log(event.target.value);
    };
    const handleChangeFeedback = (event) => {
      setNewFeedback(event.target.value);
      console.log("change feedback");
      console.log(event.target.value);
    };
    console.log("notes");
  console.log(notes);
  console.log(props.lecture.notes)

  const saveClass = () => {
    let activities = [];
    let feedbackArray = [];
    linkedActivity.map((item)=> activities.push(item.activity_ID))
    newLinkedActivities.map((item)=>activities.push(item.activity_ID));
    feedback.map((item)=>feedbackArray.push(item.feedback_ID));
    newFeedback.map((item)=>feedbackArray.push(item.feedback_ID));
    var data = {
            classID:props.lecture.class_ID,
            moduleID: props.moduleID,
            name: title,
            description: description,
            date:props.lecture.date,
            activities: activities,
            lecturer: 9
        };
    console.log(data);
        fetch("http://mvroso.pythonanywhere.com/updateClass", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(data),
                    headers: new Headers({"content-type": "application/json"})
                }).then(res => {
                    console.log("Request complete! response:", res);
                });

    var fdata = {
      activityID: props.lecture.class_ID,
      type: 3,
      feedback: feedbackArray
    };
    console.log(fdata);
    fetch("http://mvroso.pythonanywhere.com/setFeedback", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(fdata),
                headers: new Headers({"content-type": "application/json"})
            }).then(res => {
                console.log("Request complete! response:", res);
            });
}
const saveNote = () => {
    var data = {
        classID: props.lecture.class_ID,
        date:props.lecture.date,
  			note: newNote==""? null:newNote
          };
      console.log(data);
          fetch("http://mvroso.pythonanywhere.com/updateClassNotes", {
                      method: "POST",
                      cache: "no-cache",
                      body: JSON.stringify(data),
                      headers: new Headers({"content-type": "application/json"})
                  }).then(res => {
                      console.log("Request complete! response:", res);
                  });
  }
  if (props.edit > 0) {
    return (
      <div className={classes.root}>

          {new Date(props.lecture.date+'T'+props.lecture.end_time)< props.today ?
          <div className={classes.demo1}>
            <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                      <AntTab label="Feedback" />
                      <AntTab label="Details" />
                      </AntTabs>
                    </div>
                      :
                      <div className={classes.demo1}>
                        <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                      <AntTab label="Details" />
                      <AntTab label="Edit" />
                      </AntTabs>
                    </div>

                  }


  {new Date(props.lecture.date+'T'+props.lecture.end_time)< props.today ?  <div>
        <TabPanel  value={value} index={0}>
          <div className = 'detailBox'>

            <div style = {{margin:'8px 0'}}>
  { props.lecture.feedback.length==0 ? <div> No Feedback Responses</div>:
    props.lecture.feedback.map((item)=> <FeedbackPanel activityID={props.lecture.class_ID} questionName={item.feedback_title} type='Class'/>)}

            </div>

            <div style = {{margin:'10px 0'}}>
            {notes.map((note,index) => <div><TextField
                        multiline
                        id="standard-read-only-input"
                        key={note.text}
                        defaultValue={note.text}
                        fullWidth
                        variant="outlined"
                        rows={5}
                        InputProps={{
                          readOnly: true,
                        }}/>
                        { /*                  <IconButton aria-label="delete" onClick={()=>{setNotes(notes.splice(index,1));}}>
                                              <ClearRoundedIcon  />
                                            </IconButton>*/}
                          </div>
                      )}

              <TextField variant="outlined" fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
              <Button onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth style={{margin:'10px 0px', textTransform: 'none'}}> Add Note </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <div className = 'detailBox'>
            <div>

              <span>{ props.lecture.title}</span>
              <span> {props.lecture.time} </span>
            </div>
            <div>
              <span>Class Type: { props.lecture.activityType}</span>
            </div>
            <div>
              <span> Content </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={props.lecture.description}
                fullWidth
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
            <div>
              <span> Classroom </span><br/>
              <TextField
                      id="classroom"
                      value={props.lecture.location}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}/>

            </div>
            <div>
              Activities
            </div>
            <div>
              {props.lecture.linked_activities.length==0? <div>No Activities Linked</div>:
                props.lecture.linked_activities.map((item)=>
              <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>{item.activity_name}</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>{item.start} - {item.end} </span></div></div>} />
              )
              }

            </div>

            <div style = {{margin:'10px 0'}}>
            {notes.map((note) => <TextField
                        multiline
                        id="standard-read-only-input"
                        key = {note.text}
                        defaultValue={note.text}
                        fullWidth
                        variant="outlined"
                        rows={5}
                        InputProps={{
                          readOnly: true,
                        }}/>)}

              <TextField variant="outlined" fullWidth label="New Note"  value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
              <Button onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth style={{margin: '10px 0px', textTransform: 'none'}}> Add Note </Button>
            </div>
          </div>

        </TabPanel>
        </div> :
        <div>
        <TabPanel  value={value} index={0}>
          <div className = 'detailBox'>

          <div>
            <span> {props.lecture.title} | </span>
            <span> {props.lecture.date} </span>
          </div>
          <div>
            <span>Class Type: { props.lecture.activityType}</span>
          </div>
          <div>
            <span> Content </span> <br/>
            {<TextField
              multiline
              id="standard-read-only-input"
              value={props.lecture.description}
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>}
          </div>
          <div>
            <span> Classroom </span><br/>
            <TextField
                    id="classroom"
                    fullWidth
                    value={props.lecture.location}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
          </div>
          <div>
            Activities
          </div>
          <div>
          {props.lecture.linked_activities.length==0? <div>No Activities Linked</div>:
            props.lecture.linked_activities.map((item)=>
          <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>{item.activity_name}</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>{item.start} - {item.end} </span></div></div>} />
          )
          }
          <div style={{margin:'5px 0px'}}>
            Feedback Questions
          </div>
          {props.lecture.feedback.length==0? <div>No Feedback Set</div>:
            props.lecture.feedback.map((item)=>
            <div style={{margin:'5px',padding:'5px',border:'1px solid gray',borderRadius:'5px'}}> <b>{item.feedback_title}</b> <br/>{item.feedback_description}  </div>
          )
          }
          </div>

          </div>
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <div className = 'detailBox'>
            <div style = {{margin:'8px'}}>
            <TextField
              id="standard-read-only-input"
              value={title}
              label="Title"
              variant="outlined"
              onChange={(e)=>setTitle(e.target.value)}
              />
              {props.lecture.date}
            </div>
            <div style = {{margin:'8px'}}>
              Class Type: {props.lecture.activityType}
              </div>
            <div>
              <span> Content </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={description}
                fullWidth
                variant="outlined"
                rows={5}
                onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
              <span> Classroom </span><br/>
              <TextField
                      id="classroom"
                      fullWidth
                      value={props.lecture.location}
                      variant="outlined"
                    />
            </div>
            <div>
              Activities
              <InputLabel id="select-activity">Link Activity</InputLabel>
              <Select
                labelId="select-activity"
                id="selectActivity"
                multiple
                value={newLinkedActivities}
                onChange={handleChangeActivity}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classesChips.chips}>
                    {selected.map((value) => (
                      <Chip key={value.activity_ID} label={value.title} className={classesChips.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {props.activities.map((item) => (
                  <MenuItem key={item.activity_ID} value={item} style={getStyles(item.title, newLinkedActivities, theme)}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
            {linkedActivity.length==0? <div></div>:
              linkedActivity.map((item)=> <span>
            <BootstrapButton  size = 'large' startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>{item.activity_name}</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>{item.start} - {item.end} </span></div></div>} />
            <IconButton aria-label="delete" onClick={()=>{setLinkedActivity(linkedActivity.filter((act)=>act.activity_ID!=item.activity_ID));}}>
              <ClearRoundedIcon  />
            </IconButton>
              </span>
            )
            }
            <div style={{margin:'5px 0px'}}>
              Feedback Questions
                <InputLabel id="select-feedback">Add Feedback</InputLabel>
                <Select
                  labelId="select-feedback"
                  id="selectFeedback"
                  multiple
                  value={newFeedback}
                  onChange={handleChangeFeedback}
                  input={<Input id="select-multiple-chip-feedback" />}
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
            </div>
            <div style={{margin:'15px'}}>
            <Button fullWidth size = 'large' variant="contained" onClick={()=>saveClass()}> SAVE </Button>
            </div>
          </div>


        </TabPanel>
        </div> }

      </div>
    );
  }
  else {
    return (
      <div className={classes.root}>

          {new Date(props.lecture.date+'T'+props.lecture.end_time)< props.today ?
          <div className={classes.demo1}>
            <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                      <AntTab label="Feedback" />
                      <AntTab label="Details" />
                      </AntTabs>
                    </div>
                      :
                      <div className={classes.demo1}>
                        <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                      <AntTab label="Details" />
                      </AntTabs>
                    </div>

                  }


  {new Date(props.lecture.date+'T'+props.lecture.end_time)< props.today ?  <div>
        <TabPanel  value={value} index={0}>
          <div className = 'detailBox'>

            <div style = {{margin:'8px 0'}}>
  { props.lecture.feedback.length==0 ? <div> No Feedback Responses</div>:
    props.lecture.feedback.map((item)=> <FeedbackPanel activityID={props.lecture.class_ID} questionName={item.feedback_title} type='Class'/>)}

            </div>

            <div style = {{margin:'10px 0'}}>
            {notes.map((note,index) => <div><TextField
                        multiline
                        id="standard-read-only-input"
                        key={note.text}
                        defaultValue={note.text}
                        fullWidth
                        variant="outlined"
                        rows={5}
                        InputProps={{
                          readOnly: true,
                        }}/>
                        { /*                  <IconButton aria-label="delete" onClick={()=>{setNotes(notes.splice(index,1));}}>
                                              <ClearRoundedIcon  />
                                            </IconButton>*/}
                          </div>
                      )}

              <TextField variant="outlined" fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
              <Button onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth style={{margin: '10px 0px', textTransform: 'none'}}> Add Note </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <div className = 'detailBox'>
            <div>

              <span>{ props.lecture.title}</span>
              <span> {props.lecture.time} </span>
            </div>
            <div>
              <span>Class Type: { props.lecture.activityType}</span>
            </div>
            <div>
              <span> Content </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={props.lecture.description}
                fullWidth
                variant="outlined"
                rows={5}
                InputProps={{
                  readOnly: true,
                }}/>
            </div>
            <div>
              <span> Classroom </span><br/>
              <TextField
                      id="classroom"
                      value={props.lecture.location}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}/>

            </div>
            <div>
              Activities
            </div>
            <div>
              {props.lecture.linked_activities.length==0? <div>No Activities Linked</div>:
                props.lecture.linked_activities.map((item)=>
              <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>{item.activity_name}</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>{item.start} - {item.end} </span></div></div>} />
              )
              }

            </div>

            <div style = {{margin:'10px 0'}}>
            {notes.map((note) => <TextField
                        multiline
                        id="standard-read-only-input"
                        key = {note.text}
                        defaultValue={note.text}
                        fullWidth
                        variant="outlined"
                        rows={5}
                        InputProps={{
                          readOnly: true,
                        }}/>)}

              <TextField variant="outlined" fullWidth label="New Note"  value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
              <Button onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth style={{margin: '10px 0px', textTransform: 'none'}}> Add Note </Button>
            </div>
          </div>

        </TabPanel>
        </div> :
        <div>
        <TabPanel  value={value} index={0}>
          <div className = 'detailBox'>

          <div>
            <span> {props.lecture.title} | </span>
            <span> {props.lecture.date} </span>
          </div>
          <div>
            <span>Class Type: { props.lecture.activityType}</span>
          </div>
          <div>
            <span> Content </span> <br/>
            {<TextField
              multiline
              id="standard-read-only-input"
              value={props.lecture.description}
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>}
          </div>
          <div>
            <span> Classroom </span><br/>
            <TextField
                    id="classroom"
                    fullWidth
                    value={props.lecture.location}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
          </div>
          <div>
            Activities
          </div>
          <div>
          {props.lecture.linked_activities.length==0? <div>No Activities Linked</div>:
            props.lecture.linked_activities.map((item)=>
          <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>{item.activity_name}</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>{item.start} - {item.end} </span></div></div>} />
          )
          }

          </div>

          </div>
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <div className = 'detailBox'>
            <div style = {{margin:'8px'}}>
            <TextField
              id="standard-read-only-input"
              value={title}
              label="Title"
              variant="outlined"
              onChange={(e)=>setTitle(e.target.value)}
              />
              {props.lecture.date}
            </div>
            <div style = {{margin:'8px'}}>
              Class Type: {props.lecture.activityType}
              </div>
            <div>
              <span> Content </span> <br/>
              <TextField
                multiline
                id="standard-read-only-input"
                value={description}
                fullWidth
                variant="outlined"
                rows={5}
                onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
              <span> Classroom </span><br/>
              <TextField
                      id="classroom"
                      fullWidth
                      value={props.lecture.location}
                      variant="outlined"
                    />
            </div>
            <div>
              Activities
              <InputLabel id="select-activity">Link Activity</InputLabel>
              <Select
                labelId="select-activity"
                id="selectActivity"
                multiple
                value={newLinkedActivities}
                onChange={handleChangeActivity}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classesChips.chips}>
                    {selected.map((value) => (
                      <Chip key={value.activity_ID} label={value.title} className={classesChips.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {props.activities.map((item) => (
                  <MenuItem key={item.activity_ID} value={item} style={getStyles(item.title, newLinkedActivities, theme)}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
            {linkedActivity.length==0? <div>No Activities Linked</div>:
              linkedActivity.map((item)=> <span>
            <BootstrapButton  size = 'large' startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>{item.activity_name}</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>{item.start} - {item.end} </span></div></div>} />
            <IconButton aria-label="delete" onClick={()=>{setLinkedActivity(linkedActivity.filter((act)=>act.activity_ID!=item.activity_ID));}}>
              <ClearRoundedIcon  />
            </IconButton>
              </span>
            )
            }
            </div>
            <div style={{margin:'15px'}}>
            <Button fullWidth size = 'large' variant="contained" onClick={()=>saveClass()}> SAVE </Button>
            </div>
          </div>


        </TabPanel>
        </div> }

      </div>
    );
  }
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
          label="Lecture 3 note"
          placeholder=""
          multiline
          variant="outlined"
        />
      </div>
    </form>
  );
}





export default function LecturesTab(props) {


  const [focusID, setFocusID] = React.useState(()=>{
    var i;
    for(i=0;i<props.classes.length;i++){
      if(new Date(props.classes[i].date+'T'+props.classes[i].start_time)>=props.today){
        return (props.classes[i].date+props.classes[i].start_time);
        break;
      }
    }
    return null;
    });

  const lectureInFocus = props.classes.find((lecture)=>lecture.date + lecture.start_time  == focusID);

  // console.log("all lectures: ");
  //
  // console.log(lectures);
  //
  console.log("lecture in focus");

  console.log(lectureInFocus);
  // console.log(lectureInFocus.id);
console.log("lectures tab");
console.log(props.classes);
console.log("ID TEST");
console.log(props.classes[0].date+props.classes[0].start_time);
    function handleChange(newValue) {
      console.log("changed! : " + newValue);
      setFocusID(newValue);
  }
  return (
    <div style = {{margin:0,padding:0}}>
      <div  style = {{float:'left',height:'500px',width:'32.5%',}}>

        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Class Status </div>

      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox today={props.today} inFocusID={focusID} classes={props.classes}　onClick = {handleChange} />
      </div>

      </div>
      <div className = 'detailBoxx'style = {{float:'left',height:'500px',width:'67%', }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>

          <DetailBox today={props.today} edit = {props.edit} activities={props.activities} lecture={lectureInFocus} moduleID={props.moduleID} />
        </div>
      </div>
    </div>
  );
}

{/*boxShadow: '0 0 0 0.2rem rgba(207,207,207,.5)',*/}
