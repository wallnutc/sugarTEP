import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import LikertScale from './scale';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import { TimePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export function ClassFeedbackPopup (props) {
  const [feedback, setFeedback] = useState(props.class.feedback.length==0 ? true:false);
  let tempQuest = [];
  let tempAns = [];
  props.class.feedback.map((item)=>{tempQuest.push((item.feedback_ID).toString()); tempAns.push("0")});
  const [answers, setAnswers] = useState(tempAns);
  const [questions, setQuestions] = useState(tempQuest);
  //console.log("questions");
  //console.log(questions);
  //console.log("answers");
  //console.log(answers);
  const getFeedbackState = (ID, value) => {

    for(var i = 0; i < questions.length; i++) {
      if(questions[i] == ID) {
        const temp = answers.slice(0);
        temp[i]=value.toString();
        setAnswers(temp);
        break;
        }
    }
    //console.log("ID: " + ID + " value: " + value);
  }
  const submitFeedback = () => {
    const data = {
      questions: questions,
      answers: answers
    };
    //console.log(data);
    fetch("https://mvroso.pythonAnywhere.com/updateFeedback", {
                  method: "POST",
                  cache: "no-cache",
                  body: JSON.stringify(data),
                  headers: new Headers({"content-type": "application/json"})
              }).then(res => {
                  console.log("Request complete! response:", res);
              });

    setFeedback(true);

  }
return (
<div className='popup' style={{  position: 'fixed', width: '100%', height: '100%', top: 0,
  left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
  {!feedback ? <div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden',scrollbarWidth: 'none',position: 'absolute',left: '10%', maxWidth: '400px',
    right: '10%',   top: '20%', bottom: '20%',  margin: 'auto',borderRadius: '6px', background: 'white'}}>
  <div style= {{backgroundColor: props.class.colour}}>
    <IconButton onClick = {props.closePopup} size='small'
    style={{position:'relative', margin:'8px'}} aria-label="delete" color="primary">
        <ArrowBackIosIcon color='action'/>
    </IconButton>
  </div>
  {props.class.feedback.map((feedback)=> <div style={{margin:'8px',height: '120px',backgroundColor:'white',boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1)'}} > <LikertScale callback={getFeedbackState} feedback={feedback} /> </div>)}
  <div style={{margin:'24px'}}>
<Button fullWidth onClick={submitFeedback}
style={{lineHeight:0, height: '25px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.class.colour}} children ={<span style={{inlineHeight:'0'}}>Submit</span>}></Button>
</div>
</div>:

<div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden',scrollbarWidth: 'none',fontFamily: 'Rubik', position: 'absolute',left: '10%', maxWidth: '400px',
  right: '10%',   top: '35%', bottom: '35%',  margin: 'auto',borderRadius: '6px', background: 'white'}}>
  <div style={{display:'flex',justifyContent:'center',margin:'20px'}} >
  <CheckCircleOutlineRoundedIcon size='big' color={props.class.colour} style={{fontSize:'50px',textAlign: 'center', color: props.class.colour}} />
  </div>
<div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '18px', lineHeight: '21px'}}> You did it! </div>
<div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '12px', lineHeight: '14px'}}> Your progress has been saved </div>

<div style={{margin:'24px'}}>
<Button fullWidth onClick={props.closePopup}
style={{lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.class.colour,}} children ={<span style={{inlineHeight:'0'}}>Back</span>}></Button>
</div>
</div>


  }


</div>
);
}




export function ActivityProgressPopup (props) {
  const [timeSpent,setTimeSpent] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState(props.activity.feedback.length==0 ? true:false);

  let tempQuest = [];
  let tempAns = [];
  props.activity.feedback.map((item)=>{tempQuest.push((item.feedback_ID).toString()); tempAns.push("0")});
  const [answers, setAnswers] = useState(tempAns);
  const [questions, setQuestions] = useState(tempQuest);

  // //console.log("questions");
  // //console.log(questions);
  // //console.log("answers");
  // //console.log(answers);
  const updateProgress = () =>{
     var data = {
       studentID: props.student.student_ID,
       activityID: props.activity.activity_ID,
       hours: timeSpent,
       submitted: 0
     };
     //console.log("UpdateProgress", props);
     fetch("https://mvroso.pythonAnywhere.com/updateStudentProgress", {
                   method: "POST",
                   cache: "no-cache",
                   body: JSON.stringify(data),
                   headers: new Headers({"content-type": "application/json"})
               }).then(res => {
                   props.setState();
                   //console.log("Request complete! response:", res);
               });
    setUpdated(true);
  }
  const finishActivity = () =>{
     var data = {
       studentID: props.student.student_ID,
       activityID: props.activity.activity_ID,
       hours: timeSpent,
       submitted: 0
     };
     //console.log("activity finished", data);
     fetch("https://mvroso.pythonAnywhere.com/updateStudentProgress", {
                   method: "POST",
                   cache: "no-cache",
                   body: JSON.stringify(data),
                   headers: new Headers({"content-type": "application/json"})
               }).then(res => {
                   props.setState();
                   console.log("Request complete! response:", res);
               });
    setFinished(true);
  }
  const submitFeedback = () => {
    const data = {
      questions: questions,
      answers: answers
    };
    //console.log(data);
    fetch("https://mvroso.pythonAnywhere.com/updateFeedback", {
                  method: "POST",
                  cache: "no-cache",
                  body: JSON.stringify(data),
                  headers: new Headers({"content-type": "application/json"})
              }).then(res => {
                  console.log("Request complete! response:", res);
              });

    setFeedback(true);

  }
  const getFeedbackState = (ID, value) => {

    for(var i = 0; i < questions.length; i++) {
      if(questions[i] == ID) {
        const temp = answers.slice(0);
        temp[i]=value.toString();
        setAnswers(temp);
        break;
        }
    }
    //console.log("ID: " + ID + " value: " + value);
  }
  const modify = (time) => {
      if(timeSpent+time>0)
      setTimeSpent(timeSpent+time);
      else
      setTimeSpent(0);
  }
return (
<div className='popup' style={{  position: 'fixed', width: '100%', height: '100%', top: 0,
  left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
  { !updated && !finished ?
    <div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden',scrollbarWidth: 'none',fontFamily: 'Rubik',position: 'absolute',left: '10%',  maxWidth: '400px',
      right: '10%',   top: '25%', bottom: '35%',  margin: 'auto',borderRadius: '6px', background: '#F6F7FA' }}>
      <IconButton onClick = {props.closePopup} size='small'
      style={{position:'relative', margin:'8px'}} aria-label="delete" color="primary">
          <ArrowBackIosIcon color='action'/>
      </IconButton>

      <div style={{background: 'white',margin:'5px',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'}}>
        <div style={{margin:'15px',display:'flex',justifyContent:'center', fontWeight: '700',fontSize: '15px', lineHeight: '17px'}}> Time spent on {props.activity.title} </div>
        <div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '18px', lineHeight: '21px'}}> {Math.floor(timeSpent/60)>10? Math.floor(timeSpent/60):'0'+Math.floor(timeSpent/60)}h{timeSpent%60>10 ? timeSpent%60:'0' +timeSpent%60 }min</div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <Button variant="contained" style={{margin:'10px',borderRadius:'30px',backgroundColor:props.activity.colour }} disableElevation onClick={()=>modify(-30)}>
          -30min
          </Button>
          <Button variant="contained" style={{margin:'10px',borderRadius:'30px', backgroundColor:props.activity.colour}} disableElevation onClick={()=>modify(30)}>
            +30min
          </Button>
      </div>
      </div>
      <div style={{margin:'24px'}}>
        <Button fullWidth onClick={updateProgress}
        style={{lineHeight:0, height: '25px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.activity.colour,}} children ={<span style={{inlineHeight:'0'}}>Save Progress</span>}></Button>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
      <Button onClick={finishActivity}
      style={{width:'50%',lineHeight:0, height: '18px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.activity.colour,}} children ={<span style={{inlineHeight:'0'}}>Finish Activity</span>}></Button>
      </div>
    </div> : (updated ?
      <div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden', fontFamily: 'Rubik', position: 'absolute',left: '10%', maxWidth: '400px',
          right: '10%',   top: '35%', bottom: '30%',  margin: 'auto',borderRadius: '6px', background: '#F6F7FA'}}>
          <div style={{display:'flex',justifyContent:'center',margin:'20px'}} >
          <CheckCircleOutlineRoundedIcon size='big' color='action' style={{fontSize:'50px',textAlign: 'center', color: props.activity.colour}} />
          </div>
        <div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '18px', lineHeight: '21px'}}> Great! </div>
        <div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '12px', lineHeight: '14px'}}> Your progress was successfully updated </div>

        <div style={{margin:'24px'}}>
        <Button fullWidth onClick={props.closePopup}
        style={{lineHeight:0, height: '25px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.activity.colour,}} children ={<span style={{inlineHeight:'0'}}>Back</span>}></Button>
        </div>
      </div> :(!feedback ?   <div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden', fontFamily: 'Rubik', overflowY:'scroll',overflowX:'hidden',position: 'absolute',left: '10%', maxWidth: '400px',
              right: '10%',   top: '20%', bottom: '20%',  margin: 'auto',borderRadius: '6px', background: '#F6F7FA'}}>
              <div style = {{backgroundColor : props.activity.colour}}>
              <IconButton onClick = {props.closePopup} size='small'
              style={{position:'relative', margin:'8px'}} aria-label="delete" color="primary">
                  <ArrowBackIosIcon color='action'/>
              </IconButton>
              </div>
              <div style={{margin:'5px', fontWeight: 'normal',fontSize: '14px', lineHeight: '17px', position: 'center'}}>Activity Feedback</div>
              {props.activity.feedback.map((feedback)=><div style={{margin:'8px',height: '120px',backgroundColor:'white',boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1)'}} > <LikertScale callback={getFeedbackState} feedback={feedback} /> </div>)}
              <div style={{margin:'24px'}}>
          <Button fullWidth onClick={submitFeedback}
          style={{lineHeight:0, height: '25px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.activity.colour,}} children ={<span style={{inlineHeight:'0'}}>Submit</span>}></Button>
          </div>
          </div>:

          <div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden', fontFamily: 'Rubik', position: 'absolute',left: '10%', maxWidth: '400px',
              right: '10%',   top: '35%', bottom: '30%',  margin: 'auto',borderRadius: '6px', background: '#F6F7FA'}}>
              <div style={{display:'flex',justifyContent:'center',margin:'20px'}} >
              <CheckCircleOutlineRoundedIcon size='big' color='action' style={{fontSize:'50px',textAlign: 'center', color: props.activity.colour}} />
              </div>
            <div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '18px', lineHeight: '21px'}}> You did it! </div>
            <div style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '12px', lineHeight: '14px'}}> Your progress has been saved </div>

            <div style={{margin:'24px'}}>
            <Button fullWidth onClick={props.closePopup}
            style={{lineHeight:0, height: '25px',borderRadius:'9px',textTransform: 'none', padding:0, backgroundColor:props.activity.colour,}} children ={<span style={{inlineHeight:'0'}}>Back</span>}></Button>
            </div>
          </div>

        )
        )

  }

</div>
);
}

export function CalendarActivityPopup (props) {
  console.log("sdasdasd a")
  console.log(props.activity);
  const [weekDay,setWeekDay] = useState(props.activity.day);
  const [start,setStart] = useState(new Date("2018-01-01T"+props.activity.start_time+":00"));
  const [end, setEnd] = useState(new Date("2018-01-01T"+props.activity.end_time+":00"));

  const updateActivitySlot = () =>{
    const startTime=('0'+start.getHours()).slice(-2)+':'+('0'+start.getMinutes()).slice(-2)
    const endTime=('0'+end.getHours()).slice(-2)+':'+('0'+end.getMinutes()).slice(-2)
    console.log("update activity slot " + startTime + ' ' + endTime);
    let data = {
      id:props.activity.id,
      name: props.activity.name,
      module:props.activity.module,
      module_code: props.activity.module_code,
      day: weekDay,
      start_time: startTime,
      end_time: endTime,
      colour: props.activity.colour
    }
    props.setActivity(data);
    props.closePopup(false);
  }


  // const modifyStartTime = (time) => {
  //   if(start[1]+time<60){
  //     setStart([start[0],start[1]+time])
  //   }
  //   else{
  //     setStart([start[0]+1,(start[1]+time)%60])
  //   }
  // }
  // const modifyEndTime = (time) => {
  // }
return (
  <div>
    <div className='popup' style={{  position: 'fixed', width: '100%', height: '100%', top: 0,
      left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
        <div className='ScrollBar' style={{overflowY:'scroll', overflowX:'hidden',scrollbarWidth: 'none',fontFamily: 'Rubik',position: 'absolute',left: '8%',  maxWidth: '400px',
          right: '8%',   top: '18%', bottom: '20%',  margin: 'auto',borderRadius: '6px', background: '#F6F7FA' }}>
          <IconButton onClick = {()=>props.closePopup()} size='small'
          style={{position:'relative', margin:'8px'}} aria-label="delete" color="primary">
              <ArrowBackIosIcon color='action'/>
          </IconButton>

          <div style={{background: 'white',margin:'5px',padding:'8px',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'}}>
            <div style={{margin:'15px',display:'flex',justifyContent:'center', fontWeight: '700',fontSize: '15px', lineHeight: '17px'}}> Edit Activity Slot </div>

            <div style={{margin:'16px 0', }}>
            <Button variant="contained" style={{color:weekDay==0? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==0? "#0153B4":'#F6F7FA',boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)', textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(0)}>
              Sun
            </Button>
            <Button variant="contained" style={{color:weekDay==1? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==1? "#0153B4":'#F6F7FA',boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)', textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(1)}>
              Mon
            </Button>
            <Button variant="contained" style={{color:weekDay==2? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==2? "#0153B4":'#F6F7FA', boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)',textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(2)}>
              Tue
            </Button>
            <Button variant="contained" style={{color:weekDay==3? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==3? "#0153B4":'#F6F7FA', boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)',textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(3)}>
              Wed
            </Button>
            <Button variant="contained" style={{color:weekDay==4? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==4? "#0153B4":'#F6F7FA', boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)',textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(4)}>
              Thu
            </Button>
            <Button variant="contained" style={{color:weekDay==5? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==5? "#0153B4":'#F6F7FA', boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)',textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(5)}>
              Fri
            </Button>
            <Button variant="contained" style={{color:weekDay==6? "#FFFFFF":'#0061D2',margin:'4px',height: '24px',borderRadius:'12px',textTransform: 'none', padding:0,backgroundColor:weekDay==6? "#0153B4":'#F6F7FA', boxShadow:'0px 1px 4px rgba(0, 97, 210, 0.15)',textTransform:'none'}} disableElevation
            onClick={()=>setWeekDay(6)}>
              Sat
            </Button>
            </div>
            <div style={{marginLeft:'8px'}}>Start</div>
            <div style={{display:'flex',justifyContent:'center', marginBottom:'16px'}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                value={start}
                onChange={setStart}
              />
              </MuiPickersUtilsProvider>
            </div>

            <div style={{marginLeft:'8px'}}>End</div>
            <div style={{marginBottom:'16px',display:'flex',justifyContent:'center'}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                value={end}
                onChange={setEnd}
              />
              </MuiPickersUtilsProvider>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>

          </div>
          </div>
          <div style={{margin:'24px'}}>
            <Button fullWidth onClick={updateActivitySlot}
            style={{color:'white',lineHeight:0, height: '25px',borderRadius:'50px',textTransform: 'none', padding:0, backgroundColor:'#414141',}} children ={<span style={{inlineHeight:'0'}}>Save</span>}></Button>
          </div>
        </div>

    </div>
    </div>
);
}
