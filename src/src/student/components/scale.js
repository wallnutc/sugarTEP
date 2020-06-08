import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles  } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import '../styles/likert.css';


export default function LikertScale (props) {
  const [selectedValue, setSelectedValue] = React.useState(0);
  //console.log('selected value: ' + selectedValue);
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  const selectRadio = (value) => {
    ////console.log("ID: " + props.feedback.feedback_ID + " value: " + value);
    setSelectedValue(value);
    props.callback(props.feedback.feedback_ID,value);
  }
  return(
    <div className="wrap" style={{margin:'8px',fontFamily: 'Rubik'}}>

  <h1 style={{margin:'8px',display:'flex',justifyContent:'center', fontWeight: '500',fontSize: '14px', lineHeight: '17px'}}>{props.feedback.feedback_title}</h1>
  <form action="">
    <label style={{display:'flex',justifyContent:'center', fontWeight: '300',fontSize: '12px', lineHeight: '14px'}} >{props.feedback.feedback_description}</label>
    <div style={{width: '100%'}}>
    <ul className='likert' >
      <li>
        <input type="radio" name="likert" value="strong_disagree" onClick={()=>selectRadio(1)}/>
        <label>Strongly disagree</label>
      </li>
      <li>
        <input type="radio" name="likert" value="2" onClick={()=>selectRadio(2)}/>

      </li>
      <li>
        <input type="radio" name="likert" value="Neutral" onClick={()=>selectRadio(3)}/>
        <label>Neutral</label>
      </li>
      <li>
        <input type="radio" name="likert" value="4" onClick={()=>selectRadio(4)}/>

      </li>
      <li>
        <input type="radio" name="likert" value="strong_agree" onClick={()=>selectRadio(5)}/>
        <label>Strongly agree</label>
      </li>
    </ul>
    </div>
  </form>
</div>
);
}
{/*
  <StyledRadio />
  <Radio
      checked={selectedValue === 'a'}
      onChange={handleChange}
      value="a"
      name="radio-button-demo"
      inputProps={{ 'aria-label': 'A' }}
    />
    <Radio
      checked={selectedValue === 'b'}
      onChange={handleChange}
      value="b"
      name="radio-button-demo"
      inputProps={{ 'aria-label': 'B' }}
    />
    <div style={{height:'2px',width:'2px'}}>
    <GreenRadio
      checked={selectedValue === 'c'}
      onChange={handleChange}
      value="c"
      name="radio-button-demo"
      inputProps={{ 'aria-label': 'C' }}
      size="small"
    />
    </div>*/}
