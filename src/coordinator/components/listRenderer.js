import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GradeIcon from '@material-ui/icons/Grade';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import FeedbackDial from "./feedbackDialComponent";
import FeedbackBar from "./feedbackBarComponent";
import FeedbackDialCourse from "./feedbackDialModuleComponent";
import FeedbackDialHomepage from "./feedbackDialCourseComponent";
import FeedbackBarCourse from "./feedbackBarModuleComponent";
import invert from 'invert-color';
import LectureIcon from './iconsSVG/lectureIcon';
import AcitvitiesIcon from './iconsSVG/activitiesIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  img: {
    margin: 1,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const ProgressBar = withStyles({
  root: {
    height:'12px'
  },
  barColorPrimary:{
    borderRadius:'6px',
    backgroundColor:'#414141'
  },
  colorPrimary:{
    borderRadius:'6px',
    backgroundColor:'transparent',
  }
})(LinearProgress);



export function LecturePanel(props) {
  if(props.item == undefined){
    return (<div style={{color: '#7E7E7E',padding:'7px 24px'}}>All classes completed !</div>);
  }
  const date = new Date(props.item.date+'T'+props.item.start_time);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  //
  const start = props.item.start_time.split(':');
  const end = props.item.end_time.split(':');
  return (
    <div style={{padding:'7px 24px'}}>
    <ExpansionPanel style={{border:'1px solid '+props.item.colour, backgroundColor:props.item.colour, color: 'white', opacity: new Date(props.item.date+'T00:00:00') < props.today? 0.5:1}} >
        <ExpansionPanelSummary  style = {{height:'56px',padding:0,alignItems:'normal'}}>
          <div style = {{width:'100%'}}>
            <div style = {{float:'left',position:'relative',left: 0,height:'100%', width:'56px',margin:0, borderRadius:'8px 0 0 8px',backgroundColor:'white'}}>
              <LectureIcon color='action' style={{fontSize:'45px', margin:'6px',color: props.item.colour}} />
            </div>
          <div style = {{overflow:'hidden',padding:'5px 16px', margin:'auto',fontFamily: 'Rubik', fontStyle: 'normal'}}>
            <div>
              <div style = {{fontWeight: 'normal', fontSize: '16px', lineHeight: '16px', margin:'4px 0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color: invert(props.item.colour, true)}}>
                {props.item.title}
              </div>
              <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '10px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color: invert(props.item.colour, true)}} >
                <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px', color: invert(props.item.colour, true)}}/>
                <span style = {{color: invert(props.item.colour, true)}}>
                  {" "+("0" + new Date(props.item.date+'T'+props.item.start_time).getDate()).slice(-2)+'/'+("0" + (parseInt(new Date(props.item.date+'T'+props.item.start_time).getMonth())+1).toString()).slice(-2)}
                  {" | " + props.item.start_time.split('').slice(0,5).join("")+ ' - ' + props.item.end_time.split('').slice(0,5).join("")}
                   </span>
              </div>
            </div>
          </div>
        </div>
        </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style={{width:'100%', color: invert(props.item.colour, true)}} >
            <span style={{marginRight:'16px',float:'right'}}><LocationOnOutlinedIcon color='action' style={{fontSize:'14px',color: invert(props.item.colour, true)}}/> {props.item.location}</span>
            <div style = {{margin:'8px',fontWeight:'normal', fontSize: '12px', lineHeight: '15px'}}>
              Description
            </div>
            <div style = {{margin:'8px 8px 16px 8px',fontWeight: 300, fontSize: '10px', lineHeight: '15px'}}>
              {props.item.description}
            </div>
            {
              <div>
                <Button fullWidth onClick={()=>{props.changeTab(1);}}
                style={{lineHeight:0,float:'right',height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:invert(props.item.colour, true),}} children ={<span style={{inlineHeight:'0',color:props.item.colour}}>Check Details</span>}></Button>
              </div>
              }

        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}

export function ActivityPanel(props) {
  if(props.item == undefined){
    return (<div style={{color: '#7E7E7E', padding:'7px 24px'}}>All activities completed</div>);
  }
  const dueDate = new Date(Date.parse(props.item.due_date));
  const dueDateDay = String(dueDate.getDate()).padStart(2, '0');
  const dueDateMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  const dueDateYear = dueDate.getFullYear();

  const startDate = new Date(Date.parse(props.item.start_date));
  const startDateDay = String(dueDate.getDate()).padStart(2, '0');
  const startDateMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  const startDateYear = dueDate.getFullYear();
  return (
    <div style={{padding:'7px 24px'}}>
    <ExpansionPanel style={{border:'1px solid '+props.item.colour  ,backgroundColor: props.item.colour, color: 'white'}}>
        <ExpansionPanelSummary  style = {{height:'56px',padding:0,alignItems:'normal'}}>
          <div style={{width:'100%'}}>
          <div style = {{float:'left',position:'relative',left: 0,height:'100%', width:'56px',margin:'0', borderRadius:'8px 0 0 8px',backgroundColor:'white'}}>
            <AcitvitiesIcon style={{fontSize:'45px', margin:'6px',color: props.item.colour}}/>
          </div>

        <div style = {{overflow:'hidden', padding:'5px 16px', fontFamily: 'Rubik', fontStyle: 'normal', color:invert(props.item.colour, true)}}>
          <div style = {{fontWeight: 'normal', fontSize: '16px', lineHeight: '16px', margin:'4px 0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',}}>
            {props.item.title}
          </div>
          <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '10px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} >
            <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px',color:  invert(props.item.colour, true)}}/>
            <span style={{verticalAlign:'middle', }}>
              { "  " + ("0" + new Date(props.item.due_date).getDate()).slice(-2)+'/'+("0" + (parseInt(new Date(props.item.due_date).getMonth())+1).toString()).slice(-2) + ' | ' + ("0" + new Date(props.item.due_date).getHours()).slice(-2) + ':' + ("0" + new Date(props.item.due_date).getMinutes()).slice(-2)
              }
            </span>
          </div>

        <div>
        </div>
        </div>
        </div>
        </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style = {{textAlign: 'justify', fontWeight: 'normal', fontSize: '11px', lineHeight: '17px',width: '100%', color: invert(props.item.colour, true)}}>
          <div style = {{fontWeight: 'normal'}}>
            Start date - {startDateDay + '/' + startDateMonth + '/' + startDateYear}
          </div>
          <div style = {{margin:'12px 0', fontWeight: 'normal'}}>
            Grade percentage - {props.item.grade_percentage}%
          </div>
          <div>
            Estimated worktime - {props.item.estimated_time} hours
          </div>



          <div style={{margin:'17px 0'}}>
            <span > Description </span>
            <div style = {{fontWeight: 300}}> {props.item.description} </div>
          </div>

          <div style={{margin:'17px 0'}}>
            <span > Grading description </span>
            <div style = {{fontWeight: 300}}> {props.item.grading_description} </div>
          </div>
          <div style={{margin:'17px 0'}}>
            {
              <Button fullWidth onClick={()=>{props.changeTab(2);props.selectActivity(props.item.activity_ID)}}
              style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:invert(props.item.colour, true),}} children ={<span style={{inlineHeight:'0',color:props.item.colour}}>Check Details</span>}></Button>

            }
            </div>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}

export function FeedbackPanel(props) {
  // const date = new Date(props.item.date);
  //
  //console.log("Feedback Panel");
  //console.log(props);

  //***************needed Props: activityID, activity type (Class or Activity), questionName

  // const day = String(date.getDate()).padStart(2, '0');
  // const month = String(date.getMonth() + 1).padStart(2, '0');
  // const year = date.getFullYear();
  //
  // const start = props.item.start_time.split(':');
  // const end = props.item.end_time.split(':');
  return (
    <div style={{padding:'7px 24px'}}>
      <ExpansionPanel >
          <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
          <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal'}}>
            <div style = {{float:'left', padding:'0 20px ',height:'100%'}}>
              <MenuBookIcon color='action' style={{fontSize:'45px', color:props.colour}} />
            </div>
            <div>
              <div style = {{fontWeight: 'normal', fontSize: '18px', lineHeight: '47px', position: 'relative', height:75, width:200, float: "left"}}>{props.questionName}</div>
              <div style = {{position: 'relative', height:75, width:100, float: "left"}}><FeedbackDial activityID= {props.activityID} questionName={props.questionName} type={props.type}/></div>
            </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style={{width:'100%', height: 300}} >
        <FeedbackBar activityID= {props.activityID} questionName={props.questionName}type={props.type}/>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}

export function FeedbackSelectorPanel(props) {
  //***************needed Props: activityID, activity type (Class or Activity), color, questionName
  return (
    <div style={{padding:'7px 0px'}}>
      <ExpansionPanel expanded={props.expanded} TransitionProps={{ unmountOnExit: true }}>
          <ExpansionPanelSummary onClick={props.onClick}
          style = {{height:'56px',backgroundColor: props.color, borderRadius:'8px', padding:'0 0 0 0'}}>
          <div style = {{width:'100%'}}>
            <div style = {{float:'left',position:'relative',left: 0,height:'100%', width:'56px',margin:0, borderRadius:'8px 0 0 8px',backgroundColor:'white'}}>
              <LectureIcon color='action' style={{fontSize:'45px', margin:'6px',color: props.color}} />
            </div>
          <div style = {{overflow:'hidden',height:'100%',padding:'8px 16px', margin:'auto',fontFamily: 'Rubik', fontStyle: 'normal',color:  invert(props.color, true)}}>
            <div style = {{fontWeight: 'normal', fontSize: '14px', lineHeight: '17px', position: 'relative',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color:  invert(props.color, true)}}>
                <b>{props.moduleName}</b>
            </div>
            <div style = {{position: 'relative',fontSize: '12px', lineHeight: '24px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',color:  invert(props.color, true)}}>
              {props.questionName}
            </div>
          </div>
        </div>

          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style={{width:'100%', height: 150}} >
        <FeedbackDialHomepage moduleID = {props.moduleID} questionName={props.questionName} type={props.type} height='150'/>
        {/*<FeedbackDialCourse moduleID= {props.moduleID} questionName={props.questionName} type={props.type}/>
          <FeedbackBarCourse moduleID= {props.moduleID} questionName={props.questionName} type={props.type}/>
          */}

        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}

export function FeedbackPanelCourse(props) {
  //***************needed Props: activityID, activity type (Class or Activity), questionName
  return (
    <div style={{padding:'7px 24px'}}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }} >
          <ExpansionPanelSummary  style = {{ padding:'0 0 0 0'}}>
          <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal'}}>
            <div style = {{float:'left', padding:'0 20px ',height:'100%'}}>
              <MenuBookIcon color='action' style={{fontSize:'45px', color:props.colour}} />
            </div>
            <div style={{overflow:'hidden',padding:'11px 8px', margin:'auto',fontFamily: 'Rubik', fontStyle: 'normal', textTransform:'none',textAlign:'left'}}>
              <div style = {{fontWeight: 'normal', fontSize: '18px', lineHeight: '47px', position: 'relative',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                {props.questionName}
              </div>
              <div style = {{position: 'relative', height:75, width:100, float: "right",whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',}}><FeedbackDialCourse moduleID= {props.moduleID} questionName={props.questionName} type={props.type}/></div>
            </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style={{width:'100%', height: 300, position:'relative'}} >
          <div style = {{fontWeight: 'normal', fontStyle:'italic', fontSize: '16px', position: 'relative', width:'100%', padding:'10px'}} >"{props.description}"</div>
          <FeedbackBarCourse moduleID= {props.moduleID} questionName={props.questionName} height='270' type={props.type}/>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}
//export default ListSummary;
{/*

<LinearProgress style={{height:'12px',width:'70%',color:'black',backgroundColor: 'transparent',borderRadius: '6px', verticalAlign:'middle'}} variant="determinate" value={props.item.assignment_suggested} />
  <div>
    {props.renderContent.map((item)=>{
      switch (item.activityType) {
        case 'lecture':
          return <LectureRenderer item = {item}/>
        case 'assignment':
          return <AssignmentRenderer item = {item}/>
        case 'selfGuidedStudy':
          return <SelfGuidedStudyRenderer item = {item}/>

      }
    })
  }
  </div>

  */}
