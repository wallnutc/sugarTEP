
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
import PersonIcon from '@material-ui/icons/Person';
import PieModule from './pieModuleComponent.js';
import TimelineModule from './timelineModuleComponent.js';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DatePick from './datePicker';
import {FeedbackPanel,FeedbackSelectorPanel} from "./listRenderer";
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
import Timeline from './timelineComponent.js';
import NestedPie from './nestedPieCourseComponent.js';
import FeedbackBarCourse from "./feedbackBarModuleComponent";

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
const classes = useStyles();
const [value, setValue] = React.useState(0);
const [courseExprience,setCourseExperience] = useState({});
const [isLoaded,setIsLoaded] = useState(false);
console.log("course object");
console.log(props.course)
console.log("feedbackInFocus")
console.log(props.feedbackInFocus);
useEffect(() => {
  var url = 'http://mvroso.pythonanywhere.com/activityTypePieChartsByCourse' + props.course.course_ID.toString();
  console.log(url);
  fetch(url)
     .then((response) => response.json())
     .then((responseJson) => {
       setCourseExperience(responseJson);
       setIsLoaded(true);
     })
     .catch((error) => {
       console.error(error);
     });
    },[]);

const handleChange = (event, newValue) => {
  setValue(newValue);
  props.tabChange(newValue);
};
return (
  <div  className={classes.root} style = {{height:'600px',borderRight: '1px solid #C4C4C4',}}>


    <div className={classes.demo1}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
        <AntTab label="Workload" style={{color: props.colour}}/>
        <AntTab label="Feedback" style={{color: props.colour}}/>
      </AntTabs>
    </div>


    <div>
    <TabPanel  value={value} index={0}>
        <div className = 'selectorBox' style={{height: '530px'}}>
          {isLoaded? <div style={{fontSize: 'small'}}>
            <h3 style ={{color:props.colour}}>Breakdown by Module</h3>
            {courseExprience.ByModule.map((item)=><div style={{margin:'5px',padding:'5px',border:'1px solid',borderColor: props.colour, borderRadius:'5px'}}><b style ={{color:props.colour}}>{item.label}</b><br/>{item.value} hours</div>) }
            <h3 style ={{color:props.colour}}>Breakdown by Activity Type</h3>
            {courseExprience.ByActivity.map((item)=><div style={{margin:'5px',padding:'5px',border:'1px solid',borderColor: props.colour, borderRadius:'5px'}}><b style ={{color:props.colour}}>{item.label}</b><br/>{item.value} hours</div>) }

            </div>:null}
        </div>
    </TabPanel>
    <TabPanel  value={value} index={1}>
        <div className = 'selectorBox' style={{height: '530px'}}>
          {isLoaded? <div style={{fontSize: 'small'}}>
            {props.course.modules.map((module) => {
              const moduleID=module.module_ID
              const moduleName=module.module_name
              return(<div> {module.activity_feedback.map((feedback) =>
                 <FeedbackSelectorPanel onClick={()=>props.selectFeedback(moduleID,feedback.feedback_question_ID,"activity")}
                 expanded={props.feedbackInFocus.moduleID==moduleID && props.feedbackInFocus.feedbackID==feedback.feedback_question_ID && props.feedbackInFocus.type=='activity' }
                 color={module.colour}
                 moduleName={moduleName} moduleID= {moduleID} questionName={feedback.feedback_title} type = "activity"/> )}

                 {module.class_feedback.map((feedback) =>
                    <FeedbackSelectorPanel onClick={() => props.selectFeedback(moduleID,feedback.feedback_question_ID,"class")}
                    expanded={props.feedbackInFocus.moduleID==moduleID && props.feedbackInFocus.feedbackID==feedback.feedback_question_ID && props.feedbackInFocus.type=='class' }
                    color={module.colour}
                    moduleName={moduleName} moduleID= {moduleID} questionName={feedback.feedback_title} type = "class"/> )}
                 </div>)

            })}
            {/*expanded={props.feedbackInFocus.moduleID==moduleID && props.feedbackInFocus.feedbackID==feedback.feedback_ID }
              <div>{"module:" + moduleID + " - " + moduleName + " - " + feedback.feedback_ID}</div>
              console.log("module:" + moduleID + " - " + moduleName);console.log(feedback);
              <FeedbackSelectorPanel moduleName={moduleName} moduleID= {moduleID} questionName={feedback.feedback_ID}/>*/}
          </div>:null}
        </div>
    </TabPanel>
    </div>
  </div>
);
}


function DetailBox(props) {
    const classes = useStyles();
    const [newNote, setNewNote] = useState([]);
    useEffect(() => {
      setNewNote("");
      setNotes(props.module==undefined? []:props.module.notes);
    },[props.module]);

    const [notes, setNotes] = useState(props.module==undefined? []:props.module.notes);
    const [pieType, setPieType] = useState("hours");
    const [timeType, setTimeType] = useState("Month");
    const [timeMode, setTimeMode] = useState("Module");
    const deleteNotes= (text)=> {
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

  const saveNote = () => {
    var x = document.getElementById("noteButton");
    x.style.display = "none";
    var allNotes = [];
    notes.map((note)=>allNotes.push(note.text));
    if(newNote!="") allNotes.push(newNote);
      var data = {
          courseID: props.course.course_ID,
          notes: allNotes
            };
        console.log(data);
            fetch("http://mvroso.pythonanywhere.com/updateCourseNotes", {
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
  return (
      <div className={classes.root}>
    {props.workload == 0 ?
    <div>
          <div className={classes.demo1}>
            <AntTabs value={props.value} onChange={props.handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                <AntTab label="Overview" style={{color: props.colour}}/>
                <AntTab label="Time Series" style={{color: props.colour}}/>
            </AntTabs>
          </div>

        <TabPanel  value={props.value} index={0}>
          <div className = 'detailBoxCourse' style = {{color: props.colour}}>

            <div style = {{margin:'8px 0', height: '100%',position:'relative'}}>
                <NestedPie courseID={props.course.course_ID} label={props.course.course_name}/>
            </div>
            <div style = {{margin:'10px 0',position:'relative'}}>
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
              style={{margin:'10px 0px', textTransform: 'none', backgroundColor: props.colour, color: 'white'}}> Save Notes </Button>
            </div>

          </div>
        </TabPanel>
        <TabPanel  value={props.value} index={1}>
        <div className = 'detailBoxCourse' style = {{color: props.colour}}>
        <div style={{padding:"0 16px",}}>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeMode=="Module" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeMode("Module");}} children={
                <div style={{color:timeMode=="Module" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '10px'}}>
                Modules
                </div>} />
              </span>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeMode=="Activity Type" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeMode("Activity Type");}} children={
                <div style={{color:timeMode=="Activity Type" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px', display: 'inline-block', lineHeight: '10px'}}>
                Activity Type
                  </div>} />
              </span>
            </div>
            <div style={{padding:"0 16px",}}>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Week" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Week");}} children={
                <div style={{color:timeType=="Week" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '10px'}}>
                Week
                </div>} />
              </span>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Month" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Month");}} children={
                <div style={{color:timeType=="Month" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px', display: 'inline-block', lineHeight: '10px'}}>
                Month
                  </div>} />
              </span>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Semester" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Semester");}} children={
                <div style={{color:timeType=="Semester" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '10px'}}>
                Semester
                  </div>} />
              </span>
            </div>

            <div style = {{margin:'8px 0', height: '52%',position:'relative'}}>
              <Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={timeMode} bin={timeType}/>
            </div>
            <div style = {{margin:'10px 0', position:'relative'}}>
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
              style={{margin:'10px 0px', textTransform: 'none', backgroundColor: props.colour, color: 'white'}}> Save Notes </Button>
            </div>
          </div>
        </TabPanel>
    </div>
    :<div style={{margin : '30px'}}>
        <div style = {{margin:'10px 0', position:'relative', height: 500}}>
          <div style = {{fontWeight: 'normal', fontStyle:'italic', fontSize: '16px', position: 'relative', width:'100%', padding:'10px'}} >"{props.feedbackSelected.feedback_description}"</div>
          <FeedbackBarCourse moduleID= {props.feedbackSelected.moduleID} questionName={props.feedbackSelected.feedback_title} type={props.feedbackSelected.type} height= '470'/>
        </div>
        <div style = {{margin:'10px 0', position:'relative'}}>
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
          </div>
              <div style = {{margin:'10px 0', position:'relative'}}>
              <TextField variant="outlined" fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
              <Button id = "noteButton" onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth
              style={{margin:'10px 0px', textTransform: 'none', backgroundColor: props.colour, color: 'white'}}> Save Notes </Button>
              </div>
        </div>

  }
    </div>
    );
}

export default function HomepageTab(props){
    const [detailBoxValue, setDetailBoxValue] = useState(0);
    const [workloadTabSelected, setWorkloadTabSelected] = useState(0);
    const [feedbackInFocus,setFeedbackInFocus] = useState(()=>{
      const nonEmptyModule = props.course.modules.find((module)=>module.activity_feedback.length>0 || module.class_feedback.length>0)
      if (nonEmptyModule != undefined){
        if (nonEmptyModule.activity_feedback.length>0){
          return({
            moduleID:nonEmptyModule.module_ID,
            feedbackID:nonEmptyModule.activity_feedback[0].feedback_question_ID,
            type:'activity'
          })
        }
        else{
          return({
            moduleID:nonEmptyModule.module_ID,
            feedbackID:nonEmptyModule.class_feedback[0].feedback_question_ID,
            type:'class'
          })
        }
      }
      else{
        return ({})
      }

    })

    var feedbackForDetailBox;
    var moduleID;
    var moduleName;
    for(var i=0;i<props.course.modules.length;i++){
      moduleID=props.course.modules[i].module_ID
      moduleName=props.course.modules[i].module_name
      if(feedbackInFocus.type=='activity'){
        var temp = props.course.modules[i].activity_feedback.find((feedback) => feedbackInFocus.moduleID==moduleID && feedbackInFocus.feedbackID==feedback.feedback_question_ID )
        temp = {...temp, type:"activity"}
      }
      else if (feedbackInFocus.type=='class') {
        var temp = props.course.modules[i].class_feedback.find((feedback) => feedbackInFocus.moduleID==moduleID && feedbackInFocus.feedbackID==feedback.feedback_question_ID )
        temp = {...temp, type:"class"}
      }
      if (temp != undefined){
        feedbackForDetailBox = {...temp,
              moduleName:props.course.modules[i].module_name,
              moduleID:props.course.modules[i].module_ID
        };
        break;
      }
      //<div style = {{fontWeight: 'normal', fontStyle:'italic', fontSize: '16px', position: 'relative', width:'100%', padding:'10px'}} >"{props.feedbackSelected.feedback_description}"</div>
      //<FeedbackBarCourse moduleID= {props.feedbackSelected.moduleID} questionName={props.feedbackSelected.feedback_title} type={props.feedbackSelected.type} height= '470'/>
    }


    console.log("feedbackbox");
    console.log(feedbackForDetailBox);

    function handleChangeDetailBox(event, newValue) {
      setDetailBoxValue(newValue);
    }
    function handleChangeFeedback(moduleID, feedbackID,type) {
      setFeedbackInFocus(
        {moduleID: moduleID,
        feedbackID: feedbackID,
        type: type,
        })
    }
    return (
    <div style = {{margin:0,padding:0}}>
        <div  style = {{float:'left',height:'700px',width:'32.5%',}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >List </div>
          <div style = {{ position:'relative',top:'30px',marginRight:'auto', marginLeft:'auto'}}>
            <SelectorBox selectFeedback={handleChangeFeedback} feedbackInFocus={feedbackInFocus} course={props.course} colour={props.colour} tabChange={setWorkloadTabSelected}/>
          </div>
        </div>

        <div className = 'detailBoxCourse' style = {{float:'left',height:'700px',width:'67%'}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px', lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
            <DetailBox  feedbackSelected={feedbackForDetailBox} value={detailBoxValue} handleChange= {handleChangeDetailBox} workload={workloadTabSelected}  setState={props.setState} course={props.course} colour = {props.colour} />
        </div>
        </div>
    </div>


    );
}

{/*            <div style={{height:'80%', width:'80%',position: 'relative'}}><NestedPie courseID={props.course.course_ID} label={props.course.course_name}/></div>
            <div style={{height:'50%', width:'100%',position: 'relative'}}><Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={"Module"} bin={"Month"}/></div>
            <div style={{height:'50%', width:'100%',position: 'relative'}}><Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={"Module"} bin={"Week"}/></div>
            <div style={{height:'50%', width:'100%',position: 'relative'}}><Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={"Module"} bin={"Semester"}/></div>
            <div style={{height:'50%', width:'100%',position: 'relative'}}><Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={"Activity Type"} bin={"Month"}/></div>
            <div style={{height:'50%', width:'100%',position: 'relative'}}><Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={"Activity Type"} bin={"Week"}/></div>
            <div style={{height:'50%', width:'100%',position: 'relative'}}><Timeline courseID={props.course.course_ID} label={props.course.course_name} mode={"Activity Type"} bin={"Semester"}/></div>



*/}
