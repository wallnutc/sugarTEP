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
import invert from 'invert-color';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LectureIcon from './iconsSVG/lectureIcon';

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
  const classes = useStyles();
  //console.log("Class", props.classes);
  const [value, setValue] = React.useState(0);
  const taughtLecturesSelectors = props.classes.filter((lecture) => new Date(lecture.date+'T'+lecture.end_time)< props.today
  ).map((lecture) =>
  <div style = {{margin:'8px 8px', color: lecture.date+lecture.start_time == props.inFocusID? 'black': invert(lecture.colour, true)}}>
  <Button fullWidth
  style = {{padding:0, height:'56px', borderRadius:'4px', border:'1px solid'+(lecture.date+lecture.start_time  == props.inFocusID? decreaseBrightness(lecture.colour,40): lecture.colour), backgroundColor: lecture.date+lecture.start_time  == props.inFocusID? decreaseBrightness(lecture.colour,40): lecture.colour }} onClick = { () =>  props.onClick(lecture.date+lecture.start_time)}  size = 'large'
  children={
    <div style={{width:'100%'}}>
      <div style ={{backgroundColor:'white',float:'left',borderRadius:'4px 0 0 4px',height:'54px',width:'50px'}}>
        <LectureIcon style = {{margin:'10px 7px',height:'36px',width:'36px',color:lecture.date+lecture.start_time  == props.inFocusID? decreaseBrightness(lecture.colour,40): lecture.colour }}/>
      </div>
      <div style = {{overflow:'hidden',padding:'11px 8px', margin:'auto',fontFamily: 'Rubik', fontStyle: 'normal', textTransform:'none',textAlign:'left'}}>
        <div>
          <div style = {{fontWeight: 'normal', fontSize: '14px', lineHeight: '17px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color: invert(lecture.colour, true)}}>
            {lecture.title}
          </div>
          <div style = {{fontWeight: 300, fontSize: '12px', lineHeight: '17px',color: invert(lecture.colour, true),whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} >
            <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px', color: invert(lecture.colour, true)}}/>
            <span style = {{color: invert(lecture.colour, true)}}>
              {" "+("0" + new Date(lecture.date+'T'+lecture.start_time).getDate()).slice(-2)+'/'+("0" + (parseInt(new Date(lecture.date+'T'+lecture.start_time).getMonth())+1).toString()).slice(-2)}
              {" | " + lecture.start_time.split('').slice(0,5).join("")+ ' - ' + lecture.end_time.split('').slice(0,5).join("")}
               </span>
          </div>
        </div>
      </div>
    </div>
    } />
  </div>
);

  const scheduledLecturesSelectors = props.classes.filter((lecture) => new Date(lecture.date+'T'+lecture.end_time)>= props.today
  ).map((lecture) =>
  <div style = {{margin:'8px 8px', color: lecture.date+lecture.start_time == props.inFocusID? 'black': invert(lecture.colour, true)}}>
    <Button fullWidth
    style = {{padding:0, height:'56px', borderRadius:'4px', border:'1px solid'+(lecture.date+lecture.start_time  == props.inFocusID? decreaseBrightness(lecture.colour,40): lecture.colour), backgroundColor: lecture.date+lecture.start_time  == props.inFocusID? decreaseBrightness(lecture.colour,40): lecture.colour }} onClick = { () =>  props.onClick(lecture.date+lecture.start_time)}  size = 'large'
    children={
      <div style={{width:'100%'}}>
        <div style ={{backgroundColor:'white',float:'left',borderRadius:'4px 0 0 4px',height:'54px',width:'50px'}}>
          <LectureIcon style = {{margin:'10px 7px',height:'36px',width:'36px',color:lecture.date+lecture.start_time  == props.inFocusID? decreaseBrightness(lecture.colour,40): lecture.colour }}/>
        </div>
        <div style = {{overflow:'hidden',padding:'11px 8px', margin:'auto',fontFamily: 'Rubik', fontStyle: 'normal', textTransform:'none',textAlign:'left'}}>
          <div>
            <div style = {{fontWeight: 'normal', fontSize: '14px', lineHeight: '17px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color: invert(lecture.colour, true)}}>
              {lecture.title}
            </div>
            <div style = {{fontWeight: 300, fontSize: '12px', lineHeight: '17px',color: invert(lecture.colour, true),whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} >
              <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px', color: invert(lecture.colour, true)}}/>
              <span style = {{color: invert(lecture.colour, true)}}>
                {" " + ("0" + new Date(lecture.date+'T'+lecture.start_time).getDate()).slice(-2)+'/'+("0" + (parseInt(new Date(lecture.date+'T'+lecture.start_time).getMonth())+1).toString()).slice(-2)}
                {" | " + lecture.start_time.split('').slice(0,5).join("")+ ' - ' + lecture.end_time.split('').slice(0,5).join("")}
                 </span>
            </div>
          </div>
        </div>
      </div>
      } />
  </div>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div  className={classes.root} style = {{height:'400px',borderRight: '1px solid #C4C4C4',}}>

      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label="Upcoming" style={{color: props.colour, marginLeft: '30px'}}/>
          <AntTab label="Past" style={{color: props.colour}}/>
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
  const inputStyle={fontFamily: 'Rubik',
                    fontStyle: 'normal',
                    fontWeight: '300',
                    fontSize: '14px',
                    color: '#000000'}
  const theme = useTheme();
  const classes = useStyles();
  const classesChips = useStylesChips();
  const [value, setValue] = React.useState(0);
  const [description,setDescription] = useState(props.lecture==undefined? "":props.lecture.description);
  const [activityType, setActivityType] = useState(props.lecture==undefined? null:props.lecture.activityType);
  const [title, setTitle] = useState(props.lecture==undefined? "":props.lecture.title);
  const [newNote, setNewNote] = useState(null);
  const [notes, setNotes] = useState(props.lecture==undefined? []:props.lecture.notes);
  const [date,setDate]=useState(props.lecture==undefined? "":props.lecture.date);
  const [linkedActivity,setLinkedActivity]=useState(props.lecture==undefined? []:props.lecture.linked_activities);
  const [feedback, setFeedback] = useState(props.lecture==undefined? []:props.lecture.feedback);
  const [lecturer,setLecturer] = useState(props.lecture==undefined? "":props.contributors.find((lecturer)=>lecturer.lecturer_name==props.lecture.lecturer));
  const [newFeedback, setNewFeedback] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const [newLinkedActivities, setNewLinkedActivities] = useState([]);
  //   const [classSuccessfullySaved,setClassSuccessfullySaved] = useState([false, false]);
  // if(classSuccessfullySaved[0]==true && classSuccessfullySaved[1]==true){
  //   alert("the changes were updated correctly");
  //   setClassSuccessfullySaved([false,false])
  // }
    useEffect(() => {
      setDescription(props.lecture==undefined? "":props.lecture.description);
      setActivityType(props.lecture==undefined? "":props.lecture.activityType);
      setTitle(props.lecture==undefined? "":props.lecture.title);
      setNewNote("");
      setNotes(props.lecture==undefined? []:props.lecture.notes);
      setDate(props.lecture==undefined? "":props.lecture.date);
      setLinkedActivity(props.lecture==undefined? []:props.lecture.linked_activities);
      setNewLinkedActivities([]);
      setFeedback(props.lecture==undefined? []:props.lecture.feedback);
      setNewFeedback([]);
      setLecturer(props.lecture==undefined? "":props.contributors.find((lecturer)=>lecturer.lecturer_name==props.lecture.lecturer));

    },[props.lecture]);

    const handleChangeActivity = (event) => {
      setNewLinkedActivities(event.target.value);
      //console.log("change activities");
      //console.log(event.target.value);
    };
    const handleChangeFeedback = (event) => {
      setNewFeedback(event.target.value);
      //console.log("change feedback");
      //console.log(event.target.value);
    };
  const findLecturer = (event) => {
    setLecturer(props.lecture==undefined? "":props.contributors.find((lecturer)=>lecturer.lecturer_name==event.target.value));
  }
  const deleteNotes= (text)=> {
  //console.log(notes);
  var index = -1
  var i;
  for (i=0;i<notes.length;i++){
    if(notes[i].text==text){
      index = i;
      break;
    }
  }
  //console.log(index);
  var tempNotes=[];
  for(i=0;i<index;i++){
    tempNotes.push(notes[i])
  }
  for(i=index+1;i<notes.length;i++){
    tempNotes.push(notes[i])
  }
  setNotes(tempNotes);
  }
  const saveClass = () => {
    let updatedCorrectly = false;
    let activities = [];
    let feedbackArray = [];
    linkedActivity.map((item)=> activities.push(item.activity_ID))
    newLinkedActivities.map((item)=>activities.push(item.activity_ID));
    feedback.map((item)=>feedbackArray.push(item.feedback_question_ID));
    newFeedback.map((item)=>feedbackArray.push(item.feedback_ID));
    //console.log("lecturer")
    //console.log(lecturer)

    var data = {
            classID:props.lecture.class_ID,
            moduleID: props.moduleID,
            name: title,
            description: description,
            date:props.lecture.date,
            activities: activities,
            lecturer: lecturer.lecturer_ID,
        };

    console.log(data);
    //console.log(data.activities);

        fetch("https://mvroso.pythonanywhere.com/updateClass", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(data),
                    headers: new Headers({"content-type": "application/json"})
                }).then(res => {
                    //console.log("Request complete! response:", res);
                    if(res.status==200){

                      //setClassSuccessfullySaved([true,classSuccessfullySaved[1]]);
                      updatedCorrectly=true;
                      props.setState();
                      alert("Your class has been updated");
                      setValue(0);
                    }
                    else{
                      updatedCorrectly=false;
                    }
                });
    //console.log('feedback ID');
    var fdata = {
      activityID: props.lecture.class_ID,
      type: 3,
      feedback: feedbackArray
    };
    //console.log(fdata);
    //console.log(feedbackArray);
    fetch("https://mvroso.pythonanywhere.com/setFeedback", {
                method: "POST",
                cache: "no-cache",
                body: JSON.stringify(fdata),
                headers: new Headers({"content-type": "application/json"})
            }).then(res => {
                if(res.status==200){
                  updatedCorrectly=true;
                  // props.setState();
                  // alert("the changes has been successfully updated");
                  // setValue(0);
                  //setClassSuccessfullySaved([classSuccessfullySaved[0],true]);
                }
                else{
                  updatedCorrectly=false;
                }
            });

}
const saveNote = () => {
  var x = document.getElementById("noteButton");
  x.style.display = "none";
  var allNotes = [];
  notes.map((note)=>allNotes.push(note.text));
  if(newNote!="") allNotes.push(newNote);
    var data = {
        classID: props.lecture.class_ID,
        date:props.lecture.date,
  			notes: allNotes
          };
      //console.log(data);
          fetch("https://mvroso.pythonanywhere.com/updateClassNotes", {
                      method: "POST",
                      cache: "no-cache",
                      body: JSON.stringify(data),
                      headers: new Headers({"content-type": "application/json"})
                  }).then(res => {
                      //console.log("Request complete! response:", res);
                      props.setState();
                      x.style.display = "inline-block";
                  });
  }
  const detailTab = () =>
    <div className = 'detailBox' style = {{color: props.colour}}>
    DETAIIILLL</div>
  if(props.lecture==undefined) return <div> All classes completed! </div>
  return (
    <div className={classes.root}>

        {new Date(props.lecture.date+'T'+props.lecture.end_time)< props.today ?
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
                    {props.edit > 0 ? <AntTab label="Edit"  style={{color: props.colour}}/> : null}

                    </AntTabs>
                  </div>

                }


{new Date(props.lecture.date+'T'+props.lecture.end_time)< props.today ?  <div>
      <TabPanel  value={value} index={0}>
        <div className = 'detailBox' style = {{color: props.colour}}>

          <div style = {{margin:'8px 0'}}>
{ props.lecture.feedback.length==0 ? <div> No Feedback Responses</div>:
  props.lecture.feedback.map((item)=> <FeedbackPanel colour={props.colour} activityID={props.lecture.class_ID} questionName={item.feedback_title} type='Class'/>)}

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
                        style: inputStyle
                      }}/>
                      {     <IconButton aria-label="delete" onClick={()=>deleteNotes(note.text)}>
                              <ClearRoundedIcon  />
                            </IconButton>}
                        </div>
                    )}

            <TextField InputProps={{style: inputStyle}} variant="outlined" fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
            <Button id = "noteButton" onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth
            style={{margin:'10px 0px', textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Save Notes </Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <div className = 'detailBox' style = {{color: props.colour}}>
        <div style={{display:'flex'}}>
        <div>
          <span> Title  </span><br/>
          <TextField
                  style={{}}
                  id="classroom"
                  value={ props.lecture.title}
                  style={{width:'250px',marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                  variant="outlined"
                  size='small'
                  InputProps={{
                    readOnly: true,
                    style: inputStyle
                  }}/>
          </div>
          <div style={{marginLeft:'16px'}}>
            <span> Lecturer  </span><br/>
            <TextField
                    style={{}}
                    id="classroom"
                    value={ props.lecture.lecturer}
                    style={{marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                    variant="outlined"
                    size='small'
                    InputProps={{
                      readOnly: true,
                      style: inputStyle
                    }}/>
            </div>
            <div style={{marginLeft:'16px'}}>
              <span> Class Type  </span><br/>
              <TextField
                      style={{}}
                      id="classroom"
                      value={ props.lecture.activityType}
                      style={{width:'100px',marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                      variant="outlined"
                      size='small'
                      InputProps={{
                        readOnly: true,
                        style: inputStyle
                      }}/>
              </div>
        </div>
        <div>
          <label For='description'> Content </label> <br/>
          {<TextField
            multiline
            id="description"
            style={{marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
            value={props.lecture.description}
            fullWidth
            variant="outlined"
            rows={5}
            InputProps={{
              readOnly: true,
              style:inputStyle
            }}/>}
        </div>
        <div>
          <label For='classroom'> Classroom </label><br/>
          <TextField
                  id="classroom"
                  fullWidth
                  value={props.lecture.location}
                  style={{width:"160px",marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                  variant="outlined"
                  size='small'
                  InputProps={{
                    readOnly: true,
                    style:inputStyle
                  }}
                />
        </div>
        <div style={{marginBottom:'4px'}}>
          Activities
        </div>
        <div>
        {props.lecture.linked_activities.length==0? <div style={{color:'#414141', fontSize:'12px',marginLeft:'8px'}}>No Activities Linked</div>:
          props.lecture.linked_activities.map((item)=>
          <BootstrapButton  size = 'large' startIcon ={<TodayIcon color='action' style={{margin:'8px',fontSize: 40 }} />}
          fullWidth
            children={<div>
                        <div style={{fontFamily: 'Rubik'}}>
                          {item.activity_name}
                        </div>
                        <div style={{fontWeight:'300',fontSize: '14px'}}>
                          <ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} />
                          <span style={{verticalAlign:'middle'}}>
                          {item.end.split('T')[0]} </span></div></div>} />
        )
        }
        <div style={{margin:'8px 0px 4px 0px'}}>
          Feedback Survey Topics
        </div>
        {props.lecture.feedback.length==0? <div style={{color:'#414141', fontSize:'12px'}}>No Feedback Set</div>:
          props.lecture.feedback.map((item)=>
            <div style={{margin:'5px',padding:'16px',background:'#efefef',borderRadius:'5px'}}>
              <div style={{float:'right'}}>
                <IconButton style={{padding:'2px'}} aria-label="delete"  onClick={()=>{setFeedback(feedback.filter((i)=>i.feedback_title!=item.feedback_title));}}>
                  <ClearRoundedIcon  style={{fontSize:'17px'}}/>
                </IconButton>
              </div>
              <div>
              <div style={{margin:'0'}}><b>{item.feedback_title}</b></div>
              <div style={{}}>{item.feedback_description}</div>
              </div>
            </div>
          )
        }
        </div>
          <div style = {{margin:'10px 0'}}>
          {notes.map((note) => <div style={{margin:'8px'}}><TextField
                      multiline
                      id="standard-read-only-input"
                      key = {note.text}
                      defaultValue={note.text}
                      style={{width:'85%', margin:'10px 0'}}
                      variant="outlined"
                      rows={5}
                      InputProps={{
                        readOnly: true,
                        style:inputStyle
                      }}/>
                      <IconButton aria-label="delete" onClick={()=>deleteNotes(note.text)}>
                              <ClearRoundedIcon  />
                            </IconButton>
                      </div>)
                    }

            <TextField variant="outlined" fullWidth label="New Note"  value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
            <Button id = "noteButton" onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth
            style={{margin: '10px 0px', textTransform: 'none',backgroundColor: props.colour, color: invert(props.colour, true)}}> Save Notes </Button>
          </div>
        </div>

      </TabPanel>
      </div> :
      <div>
      <TabPanel  value={value} index={0}>
        <div className = 'detailBox' style = {{color: props.colour}}>
        <div style={{display:'flex'}}>
        <div>
          <span> Title  </span><br/>
          <TextField
                  style={{}}
                  id="classroom"
                  value={ props.lecture.title}
                  style={{width:'250px',marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                  variant="outlined"
                  size='small'
                  InputProps={{
                    readOnly: true,
                    style: inputStyle
                  }}/>
          </div>
          <div style={{marginLeft:'16px'}}>
            <span> Lecturer  </span><br/>
            <TextField
                    style={{}}
                    id="classroom"
                    value={ props.lecture.lecturer}
                    style={{marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                    variant="outlined"
                    size='small'
                    InputProps={{
                      readOnly: true,
                      style: inputStyle
                    }}/>
            </div>
            <div style={{marginLeft:'16px'}}>
              <span> Class Type  </span><br/>
              <TextField
                      style={{}}
                      id="classroom"
                      value={ props.lecture.activityType}
                      style={{width:'100px',marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                      variant="outlined"
                      size='small'
                      InputProps={{
                        readOnly: true,
                        style: inputStyle
                      }}/>
              </div>
        </div>
        <div>
          <label For='description'> Content </label> <br/>
          {<TextField
            multiline
            id="description"
            style={{marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
            value={props.lecture.description}
            fullWidth
            variant="outlined"
            rows={5}
            InputProps={{
              readOnly: true,
              style:inputStyle
            }}/>}
        </div>
        <div>
          <label For='classroom'> Classroom </label><br/>
          <TextField
                  id="classroom"
                  fullWidth
                  value={props.lecture.location}
                  style={{width:"160px",marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                  variant="outlined"
                  size='small'
                  InputProps={{
                    readOnly: true,
                    style:inputStyle
                  }}
                />
        </div>
        <div style={{marginBottom:'4px'}}>
          Activities
        </div>
        <div>
        {props.lecture.linked_activities.length==0? <div style={{color:'#414141', fontSize:'12px',marginLeft:'8px'}}>No Activities Linked</div>:
          props.lecture.linked_activities.map((item)=>
          <BootstrapButton  size = 'large' startIcon ={<TodayIcon color='action' style={{margin:'8px',fontSize: 40 }} />}
          fullWidth
            children={<div>
                        <div style={{fontFamily: 'Rubik'}}>
                          {item.activity_name}
                        </div>
                        <div style={{fontWeight:'300',fontSize: '14px'}}>
                          <ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} />
                          <span style={{verticalAlign:'middle'}}>
                          {item.end.split('T')[0]} </span></div></div>} />
      )
        }
        <div style={{margin:'8px 0px 4px 0px'}}>
          Feedback Survey Topics
        </div>
        {props.lecture.feedback.length==0? <div style={{color:'#414141', fontSize:'12px'}}>No Feedback Set</div>:
          props.lecture.feedback.map((item)=>
            <div style={{margin:'5px',padding:'16px',background:'#efefef',borderRadius:'5px'}}>
              <div style={{float:'right'}}>
                <IconButton style={{padding:'2px'}} aria-label="delete"  onClick={()=>{setFeedback(feedback.filter((i)=>i.feedback_title!=item.feedback_title));}}>
                  <ClearRoundedIcon  style={{fontSize:'17px'}}/>
                </IconButton>
              </div>
              <div>
              <div style={{margin:'0'}}><b>{item.feedback_title}</b></div>
              <div style={{}}>{item.feedback_description}</div>
              </div>
            </div>
          )
        }
        </div>
        </div>
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <div className = 'detailBox' style = {{color: props.colour}}>
        <div style={{display:'flex'}}>

            <div style = {{}}>
            <span > Title </span> <br/>
            <TextField
              id="title"
              value={title}
              fullwidth
              size='small'
              variant="outlined"
              InputProps={{
                style:inputStyle
              }}
              style={{marginTop:'8px',marginBottom:'16px', width:'250px' }}
              onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div style={{marginLeft:'16px'}}>
              <span > Lecturer  </span> <br/>
              <TextField
                  size='small'
                  variant='outlined'
                  style={{marginTop:'8px'}}
                  id="activityType"
                  select
                  InputProps={{style: inputStyle}}
                  value={lecturer.lecturer_name}
                  onChange={findLecturer}
                >
                  {props.contributors.map((option) => (
                    <MenuItem key={option.lecturer_ID} value={option.lecturer_name}>
                      {option.lecturer_name}
                    </MenuItem>
                  ))}
                </TextField>
            </div>
            <div style={{marginLeft:'16px'}}>
              <span> Class Type  </span><br/>
              <TextField
                      style={{}}
                      id="classroom"
                      value={ props.lecture.activityType}
                      style={{width:'100px',marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                      InputProps={{style: inputStyle}}
                      variant="outlined"
                      size='small'
                      />
              </div>
          </div>
          <div>
            <span> Content </span> <br/>
            <TextField
              multiline
              id="content"
              size='small'
              value={description}
              fullWidth
              style={{marginTop:'8px',marginBottom:'16px'  }}
              variant="outlined"
              rows={5}
              InputProps={{
                style:inputStyle
              }}
              onChange={(e)=>setDescription(e.target.value)}/>
          </div>
          <div>
            <span> Classroom </span><br/>
            <TextField
                    id="classroom"
                    fullWidth
                    size='small'
                    value={props.lecture.location}
                    InputProps={{style: inputStyle}}
                    style={{width:'100px',marginTop:'8px',marginBottom:'16px',backgroundColor:'#f9f9f9'}}
                    variant="outlined"
                  />
          </div>
          <div style={{marginTop:'16px'}}>
            Activities
            <InputLabel style={{margin:'4px auto auto 17px', fontSize:'12px'}} id="select-activity">Link Activity</InputLabel>
            <Select
              style={{marginLeft:'17px'}}
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
          <BootstrapButton  size = 'large' startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />}
            children={<div>
                        <div style={{fontFamily: 'Rubik'}}>
                          {item.activity_name}
                        </div>
                        <div style={{fontWeight:'300',fontSize: '14px'}}>
                          <ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} />
                          <span style={{verticalAlign:'middle'}}>
                          {item.end.split('T')[0]} </span></div></div>} />
          <IconButton aria-label="delete" onClick={()=>{setLinkedActivity(linkedActivity.filter((act)=>act.activity_ID!=item.activity_ID));}}>
            <ClearRoundedIcon  />
          </IconButton>
            </span>
          )
          }
          <div style={{margin:'16px 0px 8px 0px'}}>
            Feedback Survey Topics
              <InputLabel style={{margin:'4px auto auto 17px', fontSize:'12px'}} id="select-feedback">Add Feedback</InputLabel>
              <Select
                style={{marginLeft:'17px'}}
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
            <div style={{margin:'5px',padding:'16px',background:'#efefef',borderRadius:'5px'}}>
            <div style={{float:'right'}}>
              <IconButton style={{padding:'2px'}} aria-label="delete"  onClick={()=>{setFeedback(feedback.filter((i)=>i.feedback_title!=item.feedback_title));}}>
                <ClearRoundedIcon  style={{fontSize:'17px'}}/>
              </IconButton>
            </div>
            <div>
            <div style={{margin:'0'}}><b>{item.feedback_title}</b></div>
            <div style={{}}>{item.feedback_description}</div>
            </div>
             </div>

          )
          }
          </div>
          <div style={{margin:'15px'}}>
          <Button fullWidth size = 'large' variant="contained" style = {{borderRadius:'70px',backgroundColor: props.colour, color: invert(props.colour, true), textTransform:'none'}} onClick={()=>saveClass()}> Save </Button>
          </div>
        </div>


      </TabPanel>
      </div> }

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
      //console.log("i = " + i);
      if(new Date(props.classes[i].date+'T'+props.classes[i].start_time)>=props.today){
        //console.log(new Date(props.classes[i].date+'T'+props.classes[i].start_time))
        //console.log(props.today)
        return (props.classes[i].date+props.classes[i].start_time);
        break;
      }

    }
    return null;
    });
    //console.log("lecture in focus ID");

    //console.log(focusID);
  const lectureInFocus = props.classes.find((lecture)=>lecture.date + lecture.start_time  == focusID);

  // //console.log("all lectures: ");
  //
  // //console.log(lectures);
  //
  //console.log("lecture in focus");

  //console.log(lectureInFocus);
  // //console.log(lectureInFocus.id);
//console.log("lectures tab");
//console.log(props.classes);

    function handleChange(newValue) {
      //console.log("changed! : " + newValue);
      setFocusID(newValue);
  }
  return (
    <div style = {{margin:0,padding:0, maxWidth:'906px'}}>
      <div  style = {{float:'left',height:'500px',width:'calc(100% - 608px)',}}>

        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '12px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Class Status </div>

      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox today={props.today} inFocusID={focusID} classes={props.classes} colour={props.colour} onClick = {handleChange} />
      </div>

      </div>
      <div className = 'detailBoxx'style = {{float:'left',height:'500px',width:'608px', }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '12px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>

          <DetailBox setState={props.setState} contributors={props.contributors} today={props.today} edit = {props.edit} activities={props.activities} lecture={lectureInFocus} colour = {props.colour} moduleID={props.moduleID} />
        </div>
      </div>
    </div>
  );
}

{/*boxShadow: '0 0 0 0.2rem rgba(207,207,207,.5)',*/}
