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

export function ClassFeedbackPopup (props) {
  const [feedback, setFeedback] = useState(props.class.feedback.length==0 ? true:false);

  let tempQuest = [];
  let tempAns = [];
  props.class.feedback.map((item)=>{tempQuest.push((item.feedback_ID).toString()); tempAns.push("0")});
  const [answers, setAnswers] = useState(tempAns);
  const [questions, setQuestions] = useState(tempQuest);
  console.log("questions");
  console.log(questions);
  console.log("answers");
  console.log(answers);
  const getFeedbackState = (ID, value) => {

    for(var i = 0; i < questions.length; i++) {
      if(questions[i] == ID) {
        const temp = answers.slice(0);
        temp[i]=value.toString();
        setAnswers(temp);
        break;
        }
    }
    console.log("ID: " + ID + " value: " + value);
  }
  const submitFeedback = () => {
    // const data = {
    //   questions: questions,
    //   answers: answers
    // };
    // console.log(data);
    // fetch("https://mvroso.pythonAnywhere.com/updateFeedback", {
    //               method: "POST",
    //               cache: "no-cache",
    //               body: JSON.stringify(data),
    //               headers: new Headers({"content-type": "application/json"})
    //           }).then(res => {
    //               console.log("Request complete! response:", res);
    //           });

    setFeedback(true);

  }
return (
<div className='popup' style={{  position: 'fixed', width: '100%', height: '100%', top: 0,
  left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
  {!feedback ? <div className='popup\_inner' style={{overflow:'scroll' ,position: 'absolute',left: '10%',
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

<div className='popup\_inner' style={{ fontFamily: 'Rubik', position: 'absolute',left: '10%',
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

  // console.log("questions");
  // console.log(questions);
  // console.log("answers");
  // console.log(answers);
  const updateProgress = () =>{
     var data = {
       studentID: props.student.student_ID,
       activityID: props.activity.activity_ID,
       hours: timeSpent,
       submitted: 0
     };
     console.log("UpdateProgress", props);
     fetch("https://mvroso.pythonAnywhere.com/updateStudentProgress", {
                   method: "POST",
                   cache: "no-cache",
                   body: JSON.stringify(data),
                   headers: new Headers({"content-type": "application/json"})
               }).then(res => {
                   props.setState();
                   console.log("Request complete! response:", res);
               });
    setUpdated(true);
  }
  const finishActivity = () =>{
     var data = {
       studentID: props.student.student_ID,
       activityID: props.activity.activity_ID,
       hours: timeSpent,
       submitted: 1
     };
     console.log("activity finished", data);
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
    // const data = {
    //   questions: questions,
    //   answers: answers
    // };
    // console.log(data);
    // fetch("https://mvroso.pythonAnywhere.com/updateFeedback", {
    //               method: "POST",
    //               cache: "no-cache",
    //               body: JSON.stringify(data),
    //               headers: new Headers({"content-type": "application/json"})
    //           }).then(res => {
    //               console.log("Request complete! response:", res);
    //           });

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
    console.log("ID: " + ID + " value: " + value);
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
    <div className='popup\_inner' style={{fontFamily: 'Rubik',position: 'absolute',left: '10%',
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
      <div className='popup\_inner' style={{ fontFamily: 'Rubik', position: 'absolute',left: '10%',
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
      </div> :(!feedback ?   <div className='popup\_inner' style={{ fontFamily: 'Rubik', overflow:'scroll',overflowX:'hidden',position: 'absolute',left: '10%',
              right: '10%',   top: '10%', bottom: '10%',  margin: 'auto',borderRadius: '6px', background: '#F6F7FA'}}>
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

          <div className='popup\_inner' style={{ fontFamily: 'Rubik', position: 'absolute',left: '10%',
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
