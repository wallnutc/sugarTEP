import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import '../styles/lecturesTab.css';
import {makeStyles, withStyles} from '@material-ui/core/styles';
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
import PersonIcon from '@material-ui/icons/Person';
import DatePick from './datePicker';
import TimelineModuleComponent from "../components/timelineModuleComponent";
import StudentPieComponent from "../components/studentPieComponent";
import FeedbackBarComponent from "../components/feedbackBarComponent";
import FeedbackDialComponent from "../components/feedbackDialComponent";
import TimelineComponent from "../components/timelineComponent";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import invert from 'invert-color'
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';


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
      opacity: 1,
    },
    '&$selected': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
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
function FilterMenu(props) {
  ////console.log(props.options);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //console.log("props.options");
  //console.log(props.options);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = (optionID) => {
    setAnchorEl(null);
    //console.log("handleClose");
    //console.log(typeof optionID);
    if(typeof optionID == 'number')
      props.callback(optionID);
  };
  return (
    <div>
    <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}
    style={{lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: props.default? '#F6F7FA':props.colour,}}
    children ={<span style={{marginLeft:'10px',lineHeight:'0',color: props.default? props.colour:"#FFFFFF"}}>{props.label} <ArrowDropDownRoundedIcon style={{margin:0,verticalAlign:'middle'}}/> </span>}></Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {props.options.map((option) => <MenuItem key={option.value} onClick={() =>handleClose(option.value)}>{option.label}</MenuItem>)}
      </Menu>
    </div>
  );
}

let filterOptions = [];
function SelectorBox(props) {
  const [moduleExprience,setModuleExperience] = useState({});
  const [students,setStudents] = useState({});
  const [isLoaded,setIsLoaded] = useState(false);

  useEffect(() => {
    var url = 'https://mvroso.pythonanywhere.com/activityTypePieChartsByModule' + props.module_ID.toString();
    //console.log(url);
    fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {
         setModuleExperience(responseJson);
         setIsLoaded(true);

       })
       .catch((error) => {
         console.error(error);
       });
     fetch('https://mvroso.pythonanywhere.com/studentsByModule' + props.module_ID.toString())
        .then((response) => response.json())
        .then((responseJson) => {
          setStudents(responseJson);
          filterOptions = [{value:-1,label:'All Cohorts'}];
          responseJson.Students.map((student)=>{
              if(filterOptions.find((option)=>option.value==student.course_ID)==undefined)
                {filterOptions.push({value:student.course_ID, label:student.course_name})}
              })
          //console.log(filterOptions);
        })
        .catch((error) => {
          console.error(error);
        });
  },[]);
  //console.log(moduleExprience);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    //console.log(newValue);
    setValue(newValue);
    props.tabChange(newValue);
  };
  return (
    <div  className={classes.root} style = {{height:'400px',borderRight: '1px solid #C4C4C4'}}>


      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label={"Summary"} onClick={()=>props.selectStudent({})} style ={{color:props.colour, marginLeft: '30px'}}/>
          <AntTab label="My Class" style ={{color:props.colour}}/>
        </AntTabs>
      </div>
      <div>

      <TabPanel  value={value} index={0}>
        <div className = 'selectorBox' >
          {isLoaded? <div style={{fontSize: 'small'}}>
            <h3 style ={{color:props.colour}}>Breakdown by hours</h3>
            {moduleExprience.ByHours.map((item)=><div style={{margin:'5px',padding:'5px',border:'1px solid',borderColor: props.colour, borderRadius:'5px'}}><b style ={{color:props.colour}}>{item.label}</b><br/>{item.value} hours</div>) }
            <h3 style ={{color:props.colour}}>Breakdown by grade</h3>
            {moduleExprience.ByGrade.map((item)=><div style={{margin:'5px',padding:'5px',border:'1px solid',borderColor: props.colour, borderRadius:'5px'}}><b style ={{color:props.colour}}>{item.label}</b><br/>{item.value}%</div>) }

            </div>:null}

        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className = 'selectorBox' >
      {Object.keys(students).length === 0 && students.constructor === Object? null:
        <div>
        <FilterMenu colour = {props.colour} label={props.filterState == -1 ? "Cohort":(filterOptions.find((option)=>option.value==props.filterState)).label}
          options={filterOptions} callback={props.setFilterState} default={props.filterState==-1}/>
        {props.filterState == -1 ? students.Students.map((student)=>
          <div style = {{margin:'8px 0',color: 'white'}}>
          <BootstrapButton style = {{backgroundColor: student == props.studentInFocus? decreaseBrightness(props.colour,40):props.colour}}  onClick={()=>props.selectStudent(student)}
          size = 'large' fullWidth startIcon ={<PersonIcon color='action' style={{fontSize: 40, color: 'white' }}/>} children={
            <div style={{color: 'black'}}>
              <div style={{fontFamily: 'Rubik', color: 'white',fontSize: '12px'}}>{student.course_name}<br/>{student.student_name}</div>
              <div style={{fontWeight:'300',fontSize: '12px', color: 'white'}}>
                <span style={{verticalAlign:'middle', color: 'white'}}>{student.student_number}</span>
              </div>
            </div>} />
        </div>) :
        students.Students.filter((student)=>student.course_ID==props.filterState).map((student)=>
          <div style = {{margin:'8px 0',color: 'white'}}>
          <BootstrapButton style = {{backgroundColor: student == props.studentInFocus? decreaseBrightness(props.colour,40):props.colour}}  onClick={()=>props.selectStudent(student)}
          size = 'large' fullWidth startIcon ={<PersonIcon color='action' style={{fontSize: 40, color: 'white' }}/>} children={
            <div style={{color: 'black'}}>
              <div style={{fontFamily: 'Rubik', color: 'white'}}>{student.course_name}<br/>{student.student_name}</div>
              <div style={{fontWeight:'300',fontSize: '12px', color: 'white'}}>
                <span style={{verticalAlign:'middle', color: 'white'}}>{student.student_number}</span>
              </div>
            </div>} />
        </div>)}
        </div>}
              </div>
        </TabPanel>
      </div>
    </div>
  );
}

function DetailBox(props) {
  const classes = useStyles();
  const [timeType, setTimeType] = useState("Month");
  const [timeMode, setTimeMode] = useState("Activity Type");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
    <div className={classes.demo1}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
          <AntTab label="Visualize" style={{color: props.colour}}/>
      </AntTabs>
    </div>

    <div>
    <TabPanel  value={value} index={0}>
    <div className = 'detailBox' style={{position:'absolute', overflowX: 'visible', color: props.colour}}>
      <div>
      {Object.keys(props.student).length === 0 && props.student.constructor === Object?
        null:<div style={{position:'absolute', zIndex:'1',height:'100%',width:'100%',backgroundColor:'white', color: props.colour}}>
        <div style={{display:'flex'}}>
        <IconButton onClick = {()=>props.back({})}
        style={{position:'relative',margin:'9px 8px', color: props.colour}} aria-label="delete">
            <ArrowBackIosIcon color='action'/>
        </IconButton>

        <h3>{props.student.student_name} - {props.student.course_name}</h3>
        </div>
        <div style={{padding:"0 16px"}}>
        <span >
        <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeMode=="Module" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeMode("Module");}} children={
          <div style={{color:timeMode=="Module" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px',lineHeight: '10px'}}>
          Module
          </div>} />
        </span>
        <span >
        <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeMode=="Activity Type" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeMode("Activity Type");}} children={
          <div style={{color:timeMode=="Activity Type" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px', display: 'inline-block', lineHeight: '10px'}}>
          Activity Type
            </div>} />
        </span>
        </div>
        <div style={{padding:"0 16px",}}>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Week" ? props.colour :'#F6F7FA'}} onClick={()=>{setTimeType("Week");}} children={
                <div style={{color:timeType=="Week" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px',lineHeight: '10px'}}>
                Week
                </div>} />
              </span>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Month" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Month");}} children={
                <div style={{color:timeType=="Month" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px', display: 'inline-block', lineHeight: '10px'}}>
                Month
                  </div>} />
              </span>
              <span >
              <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Semester" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Semester");}} children={
                <div style={{color:timeType=="Semester" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px',lineHeight: '10px'}}>
                Semester
                  </div>} />
              </span>
            </div>

            <div style = {{margin:'8px 0', height: '60%', width: '90%', position:'relative'}}>
              <TimelineComponent courseID = {props.student.course_ID} label = {props.student.course_name} bin = {timeType} mode = {timeMode}/>
            </div>
        </div>
      }
      {props.myClass ==0 ?
      <div>
        <div style={{padding:"0 16px"}}>
        <span >
        <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Week" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Week");}} children={
          <div style={{color:timeType=="Week" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px',lineHeight: '10px'}}>
          Week
          </div>} />
        </span>
        <span >
        <BootstrapButton style = {{margin:'16px 8px',height: '24px',backgroundColor: timeType=="Month" ? props.colour:'#F6F7FA'}} onClick={()=>{setTimeType("Month");}} children={
          <div style={{color:timeType=="Month" ? '#FFFFFF':props.colour, fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '11px', display: 'inline-block', lineHeight: '10px'}}>
          Month
            </div>} />
        </span>
        </div>
        <div style = {{margin:'8px 0', height: '350px', width: '600px', position:'relative'}}>
          <TimelineModuleComponent moduleID = {props.module_ID} label = {props.module_name} bin = {timeType} />
        </div>
      </div>
      :<StudentPieComponent moduleID = {props.module_ID}/>
    }



      <br/>
      </div>
    </div>
    </TabPanel>
    </div>

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





export default function StudentExeperienceTab(props) {

  const [filterState,setFilteredState]=useState(-1);
  const [myClassTabSelected, setMyClassTabSelected] = useState(0);
  const [studentInFocus,setStudentInFocus] = useState({});
  return (
    <div style = {{margin:0,padding:0, maxWidth: '906px'}}>
      <div  style = {{float:'left',height:'100%',width:'calc(100% - 608px)',}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '12px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Module Status </div>
      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox  setFilterState={setFilteredState} filterState={filterState} studentInFocus={studentInFocus}selectStudent={setStudentInFocus} colour={props.colour} moduleCode ={props.moduleCode} module_ID = {props.module_ID} tabChange={setMyClassTabSelected}/>
      </div>

      </div>
      <div className = 'detailBox' style = {{float:'left',height:'500px',width:'608px' }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '12px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
          <DetailBox back={setStudentInFocus} student={studentInFocus}myClass={myClassTabSelected} colour={props.colour} module_ID = {props.module_ID} module_name = {props.module_name}/>
        </div>
      </div>
    </div>
  );
}
