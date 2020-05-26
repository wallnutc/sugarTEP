import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BarChartIcon from '@material-ui/icons/BarChart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomepageTab from './homepageTab';
import FeedbackTab from './feedbackTab';
import WorkloadTab from './workloadTab';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ComputerIcon from '@material-ui/icons/Computer';
import { createMuiTheme } from '@material-ui/core/styles';

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

export default function VerticalTabsCourse(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{borderRadius: '15px'}}>

      <div >
        <div style = {{maxWidth:'317px'}} >
        <Tabs
          style = {{float:'left',width:'317px',  position:'absolute', left:0}}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          indicatorColor={props.colour}
          textColor= {props.colour}
          TabIndicatorProps={{style: {background:props.colour}}}
        >

          <Tab fullWidth style = {{ height:'200px',maxWidth:'500px', textTransform: 'none', fontSize:18}} label={<div style={{marginLeft:'30px'}}>
            <ComputerIcon color='action'  style={{fontSize:"50px",verticalAlign:'middle', color: props.colour}}/> Homepage</div>} {...a11yProps(0)} />


          <Tab fullWidth style = {{ height:'200px',maxWidth:'500px', textTransform: 'none', fontSize:18}} label={<div style={{marginLeft:'30px'}}>
            <LocalLibraryIcon color='action' style={{fontSize:"50px",verticalAlign:'middle', color: props.colour}} /> Feedback</div>} {...a11yProps(1)} />


          <Tab fullWidth style = {{ height:'200px',maxWidth:'500px', textTransform: 'none', fontSize:18 }} label={<div style={{marginLeft:'30px'}}>
            <BarChartIcon color='action' style={{fontSize:"50px",verticalAlign:'middle', color: props.colour}} /> Workload</div>} {...a11yProps(2)} />


        </Tabs>
        </div>
        <div style = {{position:'relative', left:'317px',top:'-100px',float: 'right', width:'1183px', backgroundColor:'white', borderRadius:'0 8px 8px 0'}}>
        <TabPanel value={value} index={0}>
          <HomepageTab changeTab={setValue} colour={props.colour} setState={props.setState} course={props.course}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FeedbackTab setState={props.setState} colour={props.colour} today={props.today} course={props.course}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WorkloadTab setState={props.setState} colour={props.colour} today={props.today} course={props.course}/>
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
