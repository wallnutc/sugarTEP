import React,{useState,useEffect} from 'react';
import '../styles/scheduleWeekly.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LectureIcon from '../components/iconsSVG/lectureIcon';
import ActivityIcon from '../components/iconsSVG/activitiesIcon';
import DayIcon from '../components/iconsSVG/myDayIcon';

export default function ScheduleWeekly (props){
  console.log(props.activities);
  console.log(props.events);
  const offset = 6;
  const block =[];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
  const weekDayPosition = ['8%','21%','34.5%','48%','61.2%','74.5%','87.7%'];
  const startDay = String(props.week[0].getDate()).padStart(2, '0');
  const startMonth = monthNames[props.week[0].getMonth()];
  const endDay = String(props.week[6].getDate()).padStart(2, '0');
  const endMonth = monthNames[props.week[6].getMonth()];

function getInterval(start, end){
  const startArray=start.split(':');
  const endArray=end.split(':');
  var intervalHours=0;

  if(parseInt(endArray[1])>=parseInt(startArray[1])){
    intervalHours=(parseInt(endArray[1])-parseInt(startArray[1]))/60;
    intervalHours=intervalHours+parseInt(endArray[0])-parseInt(startArray[0]);

  }
  else{
    intervalHours=(parseInt(endArray[1])+60-parseInt(startArray[1]))/60;
    intervalHours=intervalHours+parseInt(endArray[0])-1-parseInt(startArray[0]);
  }
  //console.log("interval = "+intervalHours)
  if( intervalHours>=0){
    return intervalHours;
  }
  else{
    return null;
  }
}
  var i;
  for (i = 0; i< ((24-offset)*8) ; i++){
    block.push(i);
  }
  const block2 =[1,2,3,4,5,6,7]
  return(
    <div>
    <div className="weekHeader">{startMonth+' '+startDay+' - '+endMonth+' '+endDay}</div>
  <div className="scheduleContainer" >
    <div className="grid-container">
    <div className="hourTag">h</div>
    <div className="weekDay">S</div>
    <div className="weekDay">M</div>
    <div className="weekDay">T</div>
    <div className="weekDay">W</div>
    <div className="weekDay">T</div>
    <div className="weekDay">F</div>
    <div className="weekDay">S</div>
    {props.week.map((i)=><div className="days">{String(i.getDate()).padStart(2, '0')}</div>)}
    </div>
    <div className="grid-container">

    {block.map((i,index)=>index%8==0? <div className="hours">{(i/8)+offset<10? '0':null}{(i/8)+offset}</div>:<div className="grid-item"></div>)}

    </div>
    {props.events.map((item)=>{
      const top = (45 + 41*((parseInt(item.start_time.split(':')[0])-offset) + (parseInt(item.start_time.split(':')[1]))/60)).toString();
      const left = weekDayPosition[new Date(item.date+'T00:00:00').getDay()];
      const interval = getInterval(item.start_time,item.end_time);
      var height =0;
      if(interval<=0) return null;
      if(interval>2){
        height = 37+(interval-1)*39+(interval-2)*(interval-1)/2;
      }
      else {
        height = 37+(interval-1)*39;
      }

      return    <div style={{backgroundColor:'red',borderRadius:'5px', width:'11%',position:'absolute', top:top+'px',left:left}}>
            <CustomizedMenus event={item} height={height+'px'}/>
          </div>
    })}

    {props.activities.map((activity)=>{
      console.log('Activity', activity.start_time, typeof(activity));
      const top = (45 + 41*((parseInt(activity.start_time.split(':')[0])-offset) + (parseInt(activity.start_time.split(':')[1]))/60)).toString();
      const left = weekDayPosition[activity.day];
      const interval = getInterval(activity.start_time,activity.end_time);
      var height =0;
      if(interval<=0) return null;
      if(interval>2){
        height = 37+(interval-1)*39+(interval-2)*(interval-1)/2;
      }
      else {
        height = 37+(interval-1)*39;
      }

      return    <div style={{backgroundColor:'red',borderRadius:'5px', width:'11%',position:'absolute', top:top+'px',left:left}}>
            <CustomizedActivityMenus editSchedule={props.toggleActPopup}event={activity} height={height+'px'}/>
          </div>
    })}

    </div>
    </div>
);
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'white',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#565656',
      },
    },
  },
}))(MenuItem);

function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
      fullWidth
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}

        style={{minWidth:'0',height:props.height, backgroundColor:'blue', margin:'0' }}
        children={<div style={{height:'60%', marginTop: '20%', fontSize: 0}}><LectureIcon style={{fontSize:'16px'}} /><span style={{fontSize:'8px'}}> {props.event.module_code}</span></div>}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{zIndex:4000}}
      >
        <StyledMenuItem>
          <ListItemText>
          <div style={{height:'70px'}}>
          <div >{props.event.module_name}</div>
          <div>{props.event.start_time.split(':')[0]+':'+props.event.start_time.split(':')[1]} - {props.event.end_time.split(':')[0]+':'+props.event.end_time.split(':')[1]}</div>
          <div>{props.event.location}</div>
          </div>
          </ListItemText>
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}

function CustomizedActivityMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleActivityClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
      fullWidth
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleActivityClick}

        style={{minWidth:'0',height:props.height, backgroundColor:props.event.colour, margin:'0' }}
  children={<div> {props.module != 'Personal'?
    <div style={{height:'60%', marginTop: '20%', fontSize: 0}}><ActivityIcon style={{fontSize:'16px'}} /><span style={{fontSize:'8px'}}> {props.event.module_code}</span></div> :
    <div style={{height:'60%', marginTop: '20%', fontSize: 0}}><DayIcon style={{fontSize:'16px'}} /><span style={{fontSize:'8px'}}>{props.module_code}</span></div>}
  </div>}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{zIndex:4000}}
      >
        <StyledMenuItem>
          <ListItemText>
          <div style={{height:'70px'}}>
          <div >{props.event.module}</div>
          <div >{props.event.name}</div>
          <div>{props.event.start_time.split(':')[0]+':'+props.event.start_time.split(':')[1]} - {props.event.end_time.split(':')[0]+':'+props.event.end_time.split(':')[1]}</div>
          </div>
          <div style={{margin:'5px'}}>
              <Button size = 'small' variant="contained" onClick={()=>{handleClose();props.editSchedule(props.event)}} style={{ borderRadius:'20px',backgroundColor: '#0061D2',textTransform:'none', float: 'right'}}> <u style={{color:'white'}}>Edit</u> </Button>
              </div>
          </ListItemText>
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}
