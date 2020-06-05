import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LecturesTab from './lecturesTab';
import OverviewTab from './overviewTab';
import StudentExperienceTab from './studentExperienceTab';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import ActivitiesTab from './activitiesTab';
import BarChartIcon from '@material-ui/icons/BarChart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ComputerIcon from '@material-ui/icons/Computer';
import { createMuiTheme } from '@material-ui/core/styles';
import LectureIcon from './iconsSVG/lectureIcon';
import AcitvitiesIcon from './iconsSVG/activitiesIcon';
import MyDayIcon from './iconsSVG/myDayIcon';
import ModulesIcon from './iconsSVG/modulesIcon';
import StatisticsIcon from './iconsSVG/statisticsIcon';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent:'left',
    textAlign:'left',
  },
  tabs: {

    borderRight: `1px solid ${theme.palette.divider}`,
  },
    iconS: {
        verticalAlign: 'middle',
        paddingBottom: '2px',
    },


}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  var contributors =[{lecturer_ID:props.module.module_lecturer_ID,
                      lecturer_name:props.module.module_lecturer,
                      lecturer_email:props.module.module_lecturer_email
                        }]
  props.module.contributors.map((item)=> contributors.push(item));
  //console.log("module code = "  + props.module.module_code)
  //console.log(props.module.activities)
  const [focusAcitivityID, setFocusAcitivityID] = React.useState(() => {
    var i;

    // for(i=0;i<props.module.activities.length;i++){
    //     //console.log(i+' -> '+props.module.activities[i].title)
    // }
    // props.module.activities.map((item,index)=>//console.log(index+' ->> '+item.title))
    for(i=0;i<props.module.activities.length;i++){
      if(new Date(props.module.activities[i].due_date)>=props.today){
        //console.log(i + ' -- ' + props.module.activities[i].title);
        return (props.module.activities[i].activity_ID);
        break;
      }
    }
    //if(new Date(props.module.activities[0].due_date)>=props.today) return props.module.activities[0].activity_ID
    return null;

  });
  //console.log("vertical tabs modules", props.module);
  //console.log(focusAcitivityID);

  function handleFocusAcitivityIDChange(newValue) {
    //console.log("changed! : " + newValue);
    setFocusAcitivityID(newValue);
  }

  return (
    <div className={classes.root} style={{borderRadius: '15px'}}>

      <div style={{width:'100%'}}>
        <div style = {{maxWidth:'317px'}} >
        <Tabs
          style = {{float:'left',  position:'absolute', left:0, width:'25%'}}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          indicatorColor={props.module.colour}
          textColor= {props.module.colour}
          TabIndicatorProps={{style: {background:props.module.colour}}}
        >

          <Tab fullWidth style = {{ height:'100px',maxWidth:'500px', textTransform: 'none', fontSize:16}} label={
            <div style={{marginLeft:'30px', color:value==0? props.module.colour:'#B3B3B3'}}>
              <MyDayIcon color='action'  style={{fontSize:"50px",height:'40px',width:'40px',verticalAlign:'middle', color:value==0? props.module.colour:'#B3B3B3'}}/>
              <span style={{marginLeft:'16px'}}>Homepage</span>
            </div>} {...a11yProps(0)} />


          <Tab fullWidth style = {{ height:'100px',maxWidth:'500px', textTransform: 'none', fontSize:16}} label={
            <div style={{marginLeft:'30px', color:value==1? props.module.colour:'#B3B3B3'}}>
              <LectureIcon color='action' style={{fontSize:"50px",height:'40px',width:'40px',verticalAlign:'middle', color:value==1? props.module.colour:'#B3B3B3'}} />
              <span style={{marginLeft:'16px'}}>Classes</span>
            </div>} {...a11yProps(1)} />


          <Tab fullWidth style = {{ height:'100px',maxWidth:'500px', textTransform: 'none', fontSize:16}} label={
            <div style={{marginLeft:'30px', color:value==2? props.module.colour:'#B3B3B3'}}>
              <AcitvitiesIcon color='action' style={{fontSize:"50px",height:'40px',width:'40px',verticalAlign:'middle', color:value==2? props.module.colour:'#B3B3B3'}} />
              <span style={{marginLeft:'16px'}}>Activities</span>
            </div>} {...a11yProps(2)} />

          <Tab fullWidth style = {{ height:'100px',maxWidth:'500px', textTransform: 'none', fontSize:16}} label={
            <div style={{marginLeft:'30px', color:value==3? props.module.colour:'#B3B3B3'}}>
              <StatisticsIcon color='action' style={{fontSize:"50px",height:'40px',width:'40px',verticalAlign:'middle', color:value==3? props.module.colour:'#B3B3B3'}} />
              <span style={{marginLeft:'16px'}}> Student Experience</span>
            </div>} {...a11yProps(4)} />


        </Tabs>
        </div>
        <div style = {{position:'relative', left:'25%',top:'-100px',height: '500px',float: 'left', width:'75%', backgroundColor:'white', borderRadius:'0 8px 8px 0'}}>
        <TabPanel value={value} index={0}>
          <OverviewTab selectActivity={handleFocusAcitivityIDChange}changeTab={setValue} setState={props.setState} colour = {props.module.colour} module_notes={props.module.notes} today={props.today} activities={props.module.activities} classes={props.module.classes} module_ID = {props.module.module_ID} module_name = {props.module.module_name}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LecturesTab setState={props.setState} today={props.today} activities={props.module.activities} colour = {props.module.colour} classes={props.module.classes} edit={props.module.edit} moduleID = {props.module.module_ID} contributors={contributors}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ActivitiesTab setState={props.setState} handleChange={handleFocusAcitivityIDChange} focusID={focusAcitivityID} colour = {props.module.colour} today={props.today} activities={props.module.activities} courses={props.module.courses} edit={props.module.edit} moduleID = {props.module.module_ID}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <StudentExperienceTab moduleCode={props.module.module_code} colour = {props.module.colour} module_ID = {props.module.module_ID} module_name = {props.module.module_name}/>
        </TabPanel>
        </div>
      </div>

    </div>
  );
}

{/*<div style = {{ position:'relative', height: '100px', width:'317px', backgroundColor:'#414141', borderRadius: '8px 0px 0px 0px',fontFamily: 'Rubik', fontStyle: 'normal'}}>
 <p style = {{position:'relative',top:'24',left:'29px', fontWeight: '500', fontSize: '18px', display: 'flex', alignItems: 'center', color: '#FFFFFF'}}> 3E7 - Engineering Math </p>

 <Typography style={{position:'relative', verticalAlign:'middle' , left:'29px', float:'left', fontSize: '15px', fontWeight:'500', color: 'white', paddingBottom: '0.5px'}}> <PersonIcon className={classes.iconS} style={{ fontSize: 22 }} /> 35 &nbsp; <b>ECTS</b> 10</Typography>

</div>
style = {{height:'500px',position:'relative', width:'1223px', top:'-100px',borderStyle:'dashed'}}

*/}
