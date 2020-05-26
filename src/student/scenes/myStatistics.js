import React ,{Components} from 'react';
import Header from "../components/header";
import TimelineComponent from "../components/graph_components/timelineComponent";
import PieCourseComponent from "../components/graph_components/pieCourseComponent";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BarIcon from '@material-ui/icons/Assessment';
const mainBlue = "#0061D2";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function MyStatistics (props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props.student.label);
  const headerContent = {title:"My Statistics", imgPath: require("../images/icons/myStatistics.svg")};
  if(props.student != undefined){
    return (
      <div >
        <div className="header">
        <div>
        <div style={{left: "0",right:"0",position: 'fixed',backgroundColor: "white",top:'55px', zIndex: 1}}>
        <BarIcon style={{margin:'15px 0px 10px 20px', height:'40px', width: '46px',float:'left', zIndex: 2, color:mainBlue}}/>
          <h2 style={{fontFamily: 'Rubik',fontStyle: 'normal',fontWeight: '500',fontSize: '20px',float:'left',lineHeight: '41px',padding: '15px',color: mainBlue}}>My Statistics</h2>
        </div>
      </div>
        </div>
        <div className="main" style = {{textAlign: 'center'}}>

          <div style = {{fontWeight: 300, width:'90%', height: '100%', textAlign: 'justify', display: 'inline-block', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}> Overview of the expected workload for your entire year, divided by module, activity type, hourly contribution and grade contribution.</div>
          <div style = {{margin:'12px 0 0 5% ',padding:'10px', fontWeight: 300, color:'#AFAFAF',textAlign: 'justify' }}> breakdown by: </div>
          <div className={classes.root} style = {{width: '100%', margin:'0px ',padding:'0px'}}>
          <AppBar position="static">
            <Tabs style={{backgroundColor:"white"}} indicatorColor="primary"
                textColor="primary" value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab style={{width:'25%',textTransform:'none',}} wrapped label="Module (Total)" {...a11yProps(0)} />
              <Tab style={{width:'25%',textTransform:'none'}} wrapped label="Activity Type (Hours)" {...a11yProps(1)} />
              <Tab style={{width:'25%',textTransform:'none'}} wrapped label="Activity Type (Grade)" {...a11yProps(2)} />
              <Tab style={{width:'25%',textTransform:'none'}} wrapped label="Modules (Time Series)" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div style = {{display: 'inline-block', position: 'relative', height: 700}}>
            <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "module"/></div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style = {{display: 'inline-block',position: 'relative', height: 700}}>
            <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "activity"/></div>

          </TabPanel>
          <TabPanel value={value} index={2}>
            <div style = {{display: 'inline-block', position: 'relative', height: 700}}>
            <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "grade"/></div>

          </TabPanel>
          <TabPanel value={value} index={3}>
            <div style = {{position: 'relative', height: 400, width: "100%"}}>
            <TimelineComponent courseID = {props.student.course_ID} label = {props.student.label}/></div>

          </TabPanel>
          </div>




        </div>

      </div>
    );
  }
  else return <h4 style={{textAlign: "center"}}>Loading...</h4>
}

export default MyStatistics;
{/*//<TimelineComponent courseID = "1" label = "Engineering year 2"/>
<canvas ref='canvas2' className="canvas2" style= {{position: 'fixed',top:'150px',width: '100%'}} ></canvas>
  <div className="filter">
    <div style={{}}>
      <FilterSelector />
    </div>
  </div>
  <div className="main" >
    <Items_list/>
  </div>
*/}
