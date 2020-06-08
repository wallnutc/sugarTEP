import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import AssessmentIcon from '@material-ui/icons/Assessment';
import myDayIcon from '../images/icons/myDay.svg';
import LectureIcon from '../components/iconsSVG/lectureIcon';
import AcitvitiesIcon from '../components/iconsSVG/activitiesIcon';
import MyDayIcon from '../components/iconsSVG/myDayIcon';
import ModulesIcon from '../components/iconsSVG/modulesIcon';
import StatisticsIcon from '../components/iconsSVG/statisticsIcon';

const mainBlue = "#0061D2";
const useStyles = makeStyles({
  root: {
    height:'72px',
    maxWidth: '500px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    margin: 'auto'
  },
});



export default function SimpleBottomNavigation({coreScene})  {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        coreScene(newValue);
      }}
      showLabels
      className={classes.root}
      style={{color:mainBlue}}
    >
      <BottomNavigationAction style={{minWidth:0, color:value==0? mainBlue:'#999999'}} label="Classes" icon={<LectureIcon style={{margin:'8px',fontSize:'24px', color:value==0? mainBlue:'#999999'}} />} />
      <BottomNavigationAction style={{minWidth:0, color:value==1? mainBlue:'#999999'}} label="Activities" icon={<AcitvitiesIcon style={{margin:'8px',fontSize:'24px', color:value==1? mainBlue:'#999999'}} />} />
      <BottomNavigationAction style={{minWidth:0, color:value==2? mainBlue:'#999999'}} label="Schedule" icon={<MyDayIcon style={{margin:'8px',fontSize:'24px', color:value==2? mainBlue:'#999999' }}/>} />
      <BottomNavigationAction style={{minWidth:0, color:value==3? mainBlue:'#999999'}} label="Modules" icon={<ModulesIcon style={{margin:'8px',fontSize:'24px', color:value==3? mainBlue:'#999999'}}/>} />
      <BottomNavigationAction style={{minWidth:0, color:value==4? mainBlue:'#999999'}} label="Statistics" icon={<StatisticsIcon style={{margin:'8px',fontSize:'24px', color:value==4? mainBlue:'#999999'}}/>} />
    </BottomNavigation>
  );
}
{/*function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}*/}
