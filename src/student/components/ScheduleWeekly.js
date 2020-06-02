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

export default function ScheduleWeekly (props){
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

//console.log(props.events[0]==undefined);
//console.log(props.events[0].start_time.split(':'));
// const testTop = (45 + 41*(parseInt(props.events[0].start_time.split(':')[0]) + (parseInt(props.events[0].start_time.split(':')[1]))/60)).toString();
// const testLeft = weekDayPosition[new Date(props.events[0].date).getDay()];
// const testInterval =getInterval(props.events[0].start_time,props.events[0].end_time);
// var testHeight =0;
// if(interval>2){
//   testHeight = 37+(testInterval)*39+(testInterval-2)*(testInterval-1)/2;
// }
// else{
//   testHeight = 37+(testInterval)*39;
// }
// //console.log(testTop);
// //console.log(testLeft);
// //console.log(testHeight);
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
    {/*

      */}
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
    {/*
      <div style={{backgroundColor:'red',borderRadius:'5px', width:'11%',position:'absolute', top:testTop+'px',left:testLeft}}>
        <CustomizedMenus height={testHeight+'px'}/>
      </div>
      <div style={{backgroundColor:'red',borderRadius:'5px', width:'11%',position:'absolute', top:'168px',left:'8%'}}>
        <CustomizedMenus height='76px'/>
      </div>
      <div style={{backgroundColor:'blue',borderRadius:'5px',width:'11%',position:'absolute', top:'60px',left:'21%'}}>
        <CustomizedMenus height='140px'/>
      </div>
      <div style={{backgroundColor:'blue',borderRadius:'5px',width:'11%',position:'absolute', top:'159px',left:'34.5%'}}>
        <CustomizedMenus height='50px'/>
      </div>
      <div style={{backgroundColor:'blue',borderRadius:'5px',width:'11%',position:'absolute', top:'159px',left:'48%'}}>
        <CustomizedMenus height='50px'/>
      </div>
      <div style={{backgroundColor:'blue',borderRadius:'5px',width:'11%',position:'absolute', top:'159px',left:'61.2%'}}>
        <CustomizedMenus height='50px'/>
      </div>
      <div style={{backgroundColor:'blue',borderRadius:'5px',width:'11%',position:'absolute', top:'159px',left:'74.5%'}}>
        <CustomizedMenus height='50px'/>
      </div>
      <div style={{backgroundColor:'blue',borderRadius:'5px',width:'11%',position:'absolute', top:'159px',left:'87.7%'}}>
        <CustomizedMenus height='50px'/>
      </div>
      */}

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

        style={{minWidth:'0',height:props.height, backgroundColor:props.event.colour }}
        children={<div><LectureIcon style={{fontSize:'16px', margin:'0'}} /><span style={{fontSize:'8px'}}> {props.event.module_code}</span></div>}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
