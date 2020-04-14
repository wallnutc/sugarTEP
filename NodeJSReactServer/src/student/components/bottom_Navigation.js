import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
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
      <BottomNavigationAction label="" icon={<RestoreIcon />} />
      <BottomNavigationAction label="" icon={<RestoreIcon />} />
      <BottomNavigationAction label="" icon={<CalendarTodayIcon />} />
      <BottomNavigationAction label="" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}
