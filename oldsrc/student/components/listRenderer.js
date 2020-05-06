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
import icon_lecture_bold from '../images/icons/lectures.svg';
import icon_assignment_bold from '../images/icons/myActivities.svg';
import icon_study_bold from '../images/icons/lectures_disabled.png';
import IconLecture from '../images/icons/lectures.svg';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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


function LectureRenderer(props) {
  return (
    <div >
          <div style = {{fontWeight: 300, fontSize: '13px', lineHeight: '15px', lineHeight: '15px', color:'#7E7E7E'}}>
            {props.item.lecture_description}
          </div>
          <div style = {{margin:'14px 0',font:'Rubik',textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
            no feedback yet <span style={{float:'right'}}><GradeIcon color='action'/> <GradeIcon color='action'/><GradeIcon color='action'/><GradeIcon color='action'/><GradeIcon color='action'/></span>
          </div>
          <div>
            <Button fullWidth style={{lineHeight:0,float:'right',height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>give feedback</span>}></Button>
          </div>
      </div>
);
}

function AssignmentRenderer(props) {

  return (
    <div style = {{textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
      <div style = {{fontWeight: 'normal'}}>
        Due date - {props.item.due_date}
      </div>
      <div style = {{margin:'12px 0', fontWeight: 'normal'}}>
        Grade percentage - {props.item.grade_percentage}
      </div>
      <div>
        Estimated worktime
      </div>
      <div style={{width:'100%',verticalAlign:'middle',display: 'inline-block' }}>
        <div style={{position:'relative',top:'5px',width:'80%', float:'left', verticalAlign:'middle'}}>
          <ProgressBar variant="determinate" value ='50' />
        </div>
        <div style={{float:'right'}}> {props.item.estimated_time} hours</div>
      </div>

      <div>
        Accumulated worktime
      </div>
      <div style={{width:'100%',verticalAlign:'middle',display: 'inline-block' }}>
        <div style={{position:'relative',top:'5px',width:'80%', float:'left', verticalAlign:'middle'}}>
          <ProgressBar variant="determinate" value={props.item.time_spent} />
        </div>
        <div style={{float:'right'}}> {props.item.time_spent} hours</div>
      </div>
      <div style={{margin:'17px 0'}}>
        <Button fullWidth style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>Update progress</span>}></Button>
      </div>

      <div style={{margin:'17px 0'}}>
        <span > Detail </span>
        <div style = {{fontWeight: 300}}> {props.item.detail} </div>
      </div>

      <div style={{margin:'17px 0'}}>
        <span > Grading description </span>
        <div style = {{fontWeight: 300}}> {props.item.grading_description} </div>
      </div>
    </div>
  );
}


function ListSummary(props) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  console.log(today);

  return (
    <div style={{padding:'7px 24px'}}>
      <ExpansionPanel >
          <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
          <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal'}}>
          <div style = {{float:'left', padding:'0 20px '}}>
            <img alt="complex" src={IconLecture} />
          </div>
          <div>
            <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '12px'}} >
              {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
            </div>
            <div style = {{fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
              {props.item.title}
            </div>
            <div style = {{fontWeight: 300, fontSize: '14px', lineHeight: '17px',color:'#4d4d4d'}} >
              <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px'}}/> <span style = {{color:'#4d4d4d'}}>{props.item.scheduled.find(element => element.date == "2020-4-29").begin} - {props.item.scheduled.find(element => element.date == "2020-4-29").finish} </span>
            </div>
          </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
      {(()=>{
        switch (props.item.activityType) {
          case 'lecture':
            return <LectureRenderer item = {props.item}/>
          case 'assignment':
            return <AssignmentRenderer item = {props.item}/>

        }
      })()
      }
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}
export function LecturePanel(props) {
  const date = new Date(props.item.date);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  //
  const start = props.item.start_time.split(':');
  const end = props.item.end_time.split(':');
  return (
    <div style={{padding:'7px 24px'}}>
      <ExpansionPanel >
          <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
          <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal'}}>
            <div style = {{float:'left', padding:'0 20px ',height:'100%'}}>
              <MenuBookIcon color='action' style={{fontSize:'45px'}} />
            </div>
            <div>
              <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '12px'}} >
                {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
              </div>
              <div style = {{fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
                {props.item.title}
              </div>
              <div style = {{fontWeight: 300, fontSize: '14px', lineHeight: '17px',color:'#4d4d4d'}} >
                <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px'}}/> <span style = {{color:'#4d4d4d'}}>{start[0]+':'+start[1]} - {end[0]+':'+end[1]} - {day + '/' + month + '/' + year}</span>
              </div>
            </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style={{width:'100%'}} >
            <div style = {{fontWeight: 300, fontSize: '13px', lineHeight: '15px', lineHeight: '15px', color:'#7E7E7E'}}>
              {props.item.description}
            </div>
            <div style = {{margin:'14px 0',font:'Rubik',textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
              no feedback yet <span style={{float:'right'}}><GradeIcon color='action'/> <GradeIcon color='action'/><GradeIcon color='action'/><GradeIcon color='action'/><GradeIcon color='action'/></span>
            </div>
            <div>
              <Button fullWidth style={{lineHeight:0,float:'right',height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>give feedback</span>}></Button>
            </div>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}

export function ActivityPanel(props) {
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
      <ExpansionPanel >
          <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
          <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal'}}>
          <div style = {{float:'left',height:'100%', padding:'0 20px '}}>
          <AssignmentIcon color='action' style={{fontSize:'45px'}}/>

          </div>
          <div>
            <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '12px'}} >
              {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
            </div>
            <div style = {{fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
              {props.item.title}
            </div>
            <div style = {{fontWeight: 300, fontSize: '14px', lineHeight: '17px',color:'#4d4d4d'}} >
              <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px'}}/> <span style = {{color:'#4d4d4d'}}> Due date: {dueDateDay + '/' + dueDateMonth + '/' + dueDateYear} </span>
            </div>
          </div>
          <div>
          </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style = {{textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px',width: '100%'}}>
          <div style = {{fontWeight: 'normal'}}>
            Start date - {startDateDay + '/' + startDateMonth + '/' + startDateYear}
          </div>
          <div style = {{margin:'12px 0', fontWeight: 'normal'}}>
            Grade percentage - {props.item.grade_percentage}%
          </div>
          <div>
            Estimated worktime
          </div>
          <div style={{width:'100%',verticalAlign:'middle',display: 'inline-block' }}>
            <div style={{position:'relative',top:'5px',width:'80%', float:'left', verticalAlign:'middle'}}>
              <ProgressBar variant="determinate" value ={50} />
            </div>
            <div style={{float:'right'}}> {props.item.estimated_time} hours</div>
          </div>

          <div style={{marginTop:'10px'}}>
            Accumulated worktime
          </div>
          <div style={{width:'100%',verticalAlign:'middle',display: 'inline-block' }}>
            <div style={{position:'relative',top:'5px',width:'80%', float:'left', verticalAlign:'middle'}}>
              <ProgressBar variant="determinate" value={5} />
            </div>
            <div style={{float:'right'}}> {props.item.time_spent} hours</div>
          </div>
          <div style={{margin:'17px 0'}}>
            <Button fullWidth style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0',color:'white'}}>Update progress</span>}></Button>
          </div>

          <div style={{margin:'17px 0'}}>
            <span > Description </span>
            <div style = {{fontWeight: 300}}> {props.item.description} </div>
          </div>

          <div style={{margin:'17px 0'}}>
            <span > Grading description </span>
            <div style = {{fontWeight: 300}}> {props.item.grading_description} </div>
          </div>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}
export default ListSummary;
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
