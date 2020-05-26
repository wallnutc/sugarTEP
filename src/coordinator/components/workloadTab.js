
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
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div  className={classes.root} style = {{height:'600px',borderRight: '1px solid #C4C4C4',}}>
  
  
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
            <AntTab label="Modules" style={{color: props.colour}}/>
          </AntTabs>
        </div>


        <div>
        <TabPanel value={value} index={0}>
        <div className = 'selectorBox' style={{height: '530px'}}>
        {props.modules.map((module) =>
          <div style = {{margin:'8px 0'}}>
          <BootstrapButton  size = 'large' fullWidth
          style = {{backgroundColor: module.module_ID == props.inFocusID? decreaseBrightness(module.colour,40): module.colour}}
          startIcon ={<AssignmentIcon style={{fontSize: 40, color: 'white' }} />}
          onClick={()=> {props.onClick(module.module_ID); handleChange("module_selected", 0);}}
          children={
            <div>
            <div style={{fontFamily: 'Rubik', color: 'white'}}>{module.module_name}</div>
            <div style={{fontWeight:'300',fontSize: '14px', color: 'white'}}>
            <PersonIcon style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px', color: 'white'}} />
            <span style={{verticalAlign:'middle', color: 'white'}}>{module.module_lecturer}</span>
            </div>
            </div>} />
                </div>)}
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
          moduleID: props.module.module_ID,
          notes: allNotes
            };
        console.log(data);
            fetch("https://mvroso.pythonanywhere.com/updateModuleNotes", {
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
          <div className={classes.demo1}>
            <AntTabs value={props.value} onChange={props.handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                <AntTab label="Overview" style={{color: props.colour}}/>
                <AntTab label="Time Series" style={{color: props.colour}}/>
            </AntTabs>
          </div>
  
        <TabPanel  value={props.value} index={0}>
          <div className = 'detailBoxCourse' style = {{color: props.colour}}>
            <div style={{padding:"0 16px",}}>
              <span >
              <BootstrapButton style = {{margin:'16px 8px' ,height: '24px',backgroundColor: pieType=="hours" ? props.colour:'#F6F7FA'}} onClick={()=>{setPieType("hours");}} children={
                <div style={{color:pieType=="hours" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '10px'}}>
                By Hours
                </div>} />
              </span>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: pieType=="grade" ? props.colour:'#F6F7FA'}} onClick={()=>{setPieType("grade");}} children={
                <div style={{color:pieType=="grade" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '10px'}}>
                By Grade
                  </div>} />
              </span>
            </div>
            <div style = {{margin:'8px 0', height: '62%',position:'relative'}}><PieModule moduleID = {props.module.module_ID} type = {pieType}/>




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

            <div style = {{margin:'8px 0', height: '62%',position:'relative'}}>
              <TimelineModule moduleID = {props.module.module_ID} label = {props.module.module_name} bin = {timeType}/>
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
    );

}

 

export default function WorkloadTab(props) {


  const [FocusID,setFocusID] = React.useState(()=>{return props.course.modules[0].module_ID});
  const [detailBoxValue, setDetailBoxValue] = useState(0);
  function handleChange(newValue) {
      setFocusID(newValue);
  }
  function handleChangeDetailBox(event, newValue) {
    setDetailBoxValue(newValue);
  }
  const moduleInFocus = props.course.modules.find((module)=>module.module_ID  == FocusID); 
  return (
    <div style = {{margin:0,padding:0}}>

      <div  style = {{float:'left',height:'700px',width:'32.5%',}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >List </div>
          <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
            <SelectorBox handleChange= {handleChangeDetailBox} today={props.today} inFocusID={FocusID} modules={props.course.modules} colour={props.colour} onClick = {handleChange} />
          </div>
      </div>

      <div className = 'detailBoxCourse' style = {{float:'left',height:'700px',width:'67%'}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px', lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
          <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
            <DetailBox  value={detailBoxValue} handleChange= {handleChangeDetailBox} setState={props.setState} today={props.today} module={moduleInFocus} colour = {props.colour} />
          </div>
      </div>
    </div>
  );
}

 