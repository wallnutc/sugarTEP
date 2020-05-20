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
import DatePick from './datePicker';
import TimelineModuleComponent from "../components/timelineModuleComponent";
import StudentPieComponent from "../components/studentPieComponent";
import FeedbackBarComponent from "../components/feedbackBarComponent";
import FeedbackDialComponent from "../components/feedbackDialComponent";
import TimelineComponent from "../components/timelineComponent";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
var response = {
  "labels": "Teaching 1,Teaching 2,Teaching 3,Teaching 4,Teaching 5,Teaching 6,Teaching 7,Teaching 8,Teaching 9,Teaching 10,Teaching 11,Teaching 12,Revision 1,Exams 1,Christmas 1,Christmas 2,Christmas 3,Christmas 4,Christmas 5,Teaching 13,Teaching 14,Teaching 15,Teaching 16,Teaching 17,Teaching 18,Teaching 19,Teaching 20,Teaching 21,Teaching 22,Teaching 23,Teaching 24,Revision 2,Exams 2",
  "datasets": [
        {
        "label": "Engineering Design II",
        "data": "4.0,6.1,7.8,7.8,7.6,6.9,1.9,6.5,7.9,6.9,6.3,4.6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        },
        {
        "label": "Mechanics",
        "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.0,4.0,7.7,5.7,9.2,5.5,1.5,5.5,4.0,4.0,4.0,4.0,12.0,12.0"
        },
        {
        "label": "Electrical Engineering",
        "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.8,8.2,6.2,8.2,6.2,6.7,1.0,4.7,4.7,4.7,4.7,7.7,9,2"
        },
        {
        "label": "Chemistry",
        "data": "3.7,8.7,5.7,5.7,4.7,8.7,2.0,9.7,5.7,9.7,5.7,9.7,5.0,7.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        },
        {
        "label": "Physics",
        "data": "2.5,3.5,3.5,3.5,3.5,3.5,1.0,3.5,3.5,3.5,3.5,12.5,10.0,10.0,0,0,0,0,0,0,4.3,1.3,5.6,1.3,5.6,1.3,5.6,1.3,5.6,1.3,1.3,0,2"
        },
        {
        "label": "Engineering Maths II",
        "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5.5,6.5,6.5,6.5,6.5,6.2,0.7,6.2,6.5,6.5,5.5,9.5,7.5,9.5"
        },
        ],
  "startAxis": "Teaching 1",
  "endAxis": "Exams 2"
};


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

function SelectorBox(props) {
  const [moduleExprience,setModuleExperience] = useState({});
  const [students,setStudents] = useState({});
  const [isLoaded,setIsLoaded] = useState(false);
  useEffect(() => {
    var url = 'http://mvroso.pythonanywhere.com/activityTypePieChartsByModule' + props.module_ID.toString();
    console.log(url);
    fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {
         setModuleExperience(responseJson);
         setIsLoaded(true);

       })
       .catch((error) => {
         console.error(error);
       });
     fetch('http://mvroso.pythonanywhere.com/studentsByModule' + props.module_ID.toString())
        .then((response) => response.json())
        .then((responseJson) => {
          setStudents(responseJson);

        })
        .catch((error) => {
          console.error(error);
        });
  },[]);
  console.log(moduleExprience);
  const now = new Date("2018-10-25T00:00:00");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    props.tabChange(newValue);
  };
  return (
    <div  className={classes.root} style = {{height:'400px',borderRight: '1px solid #C4C4C4',}}>


      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label={props.moduleCode} onClick={()=>props.selectStudent({})} style ={{color:props.colour}}/>
          <AntTab label="My Class" style ={{color:props.colour}}/>
        </AntTabs>
      </div>
      <div>

      <TabPanel  value={value} index={0}>
        <div className = 'selectorBox' >
          {isLoaded? <div>
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
        {students.Students.map((student)=>
          <div style = {{margin:'8px 0'}}>
          <BootstrapButton style = {{backgroundColor: student == props.studentInFocus? '#F1F1F1':props.colour}}  onClick={()=>props.selectStudent(student)}
          size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }}/>} children={
            <div style={{color: 'black'}}>
              <div style={{fontFamily: 'Rubik'}}>{student.course_name}<br/>{student.student_name}</div>
              <div style={{fontWeight:'300',fontSize: '14px'}}>
                <span style={{verticalAlign:'middle'}}>{student.student_number}</span>
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
  const now = new Date("2018-10-25T00:00:00");
  const classes = useStyles();
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
        null:<div style={{position:'absolute', zIndex:'2',height:'100%',width:'100%',backgroundColor:'white', color: props.colour}}>
        <div style={{display:'flex'}}>
        <IconButton onClick = {()=>props.back({})}
        style={{position:'relative',margin:'9px 8px', color: props.colour}} aria-label="delete">
            <ArrowBackIosIcon color='action'/>
        </IconButton>

        <h3>{props.student.student_name} - {props.student.course_name}</h3>
        </div>
        <div>
        <TimelineComponent courseID = {props.student.course_ID} label = {props.student.course_name}/>
        </div>
        </div>
      }
      {props.myClass ==0 ? <TimelineModuleComponent moduleID = {props.module_ID} label = {props.module_name}/>:
        <StudentPieComponent moduleID = {props.module_ID}/>
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


  const [myClassTabSelected, setMyClassTabSelected] = useState(0);
  const [studentInFocus,setStudentInFocus] = useState({});
  return (
    <div style = {{margin:0,padding:0}}>
      <div  style = {{float:'left',height:'500px',width:'32.5%',}}>
        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Activity Status </div>
      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox  studentInFocus={studentInFocus}selectStudent={setStudentInFocus} colour={props.colour} moduleCode ={props.moduleCode} module_ID = {props.module_ID} tabChange={setMyClassTabSelected}/>
      </div>

      </div>
      <div className = 'detailBox' style = {{float:'left',height:'1000px',width:'67%', }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
          <DetailBox back={setStudentInFocus} student={studentInFocus}myClass={myClassTabSelected} colour={props.colour} module_ID = {props.module_ID} module_name = {props.module_name}/>
        </div>
      </div>
    </div>
  );
}