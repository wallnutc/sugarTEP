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

const useStyles = makeStyles({
  root: {
    height:'72px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
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
    >
      <BottomNavigationAction style={{minWidth:0}} label="Classes" icon={<MenuBookIcon style={{fontSize:'35px'}} />} />
      <BottomNavigationAction style={{minWidth:0}} label="Activities" icon={<AssignmentIcon style={{fontSize:'35px'}} />} />
      <BottomNavigationAction style={{minWidth:0}} label="Schedule" icon={<CalendarTodayIcon style={{fontSize:'35px'}}/>} />
      <BottomNavigationAction style={{minWidth:0}} label="Modules" icon={<SchoolIcon style={{fontSize:'35px'}}/>} />
      <BottomNavigationAction style={{minWidth:0}} label="Statistics" icon={<AssessmentIcon style={{fontSize:'35px'}}/>} />
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
