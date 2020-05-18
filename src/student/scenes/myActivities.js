import React,{useState,useEffect} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import ListRenderer,{ActivityPanel} from "../components/listRenderer";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {ActivityProgressPopup} from '../components/popups';

function MyActivities (props) {
  const batch = 5;
  const headerContent = {title:"My Activities", imgPath: require("../images/icons/myActivities.svg")};
  const [selectedDate, setSelectedDate] = useState(new Date('2018-09-14T00:00:00'));
  const [selectedModule, setSelectedModule] = useState(props.filter.length == 0 ? "null": props.filter[0].value);
  const [activities, setActivities] = useState(()=>selectedModule=="All Modules" ? props.activities.filter(item => new Date(item.due_date)> selectedDate) : props.activities.filter( item => item.module_code==selectedModule).filter(item => new Date(item.due_date)> selectedDate));
  const [activitiesForRender,setActivitiesForRender] = useState(()=> activities.length <=batch ? activities: activities.slice(0,batch))
  const [renderIndex, setRenderIndex] = useState(batch);
  const [hasMore,setHasMore] =  useState(true);
  const [popupActivity,setPopupActivity] = useState({})
  console.log("activities");
  console.log(activities);
  console.log("selected activity:");
  console.log(popupActivity);
  const [showPopup,setShowPopup] = useState(false);
  const togglePopup = (activity) => {
    if(!showPopup) setPopupActivity(activity);
    setShowPopup(!showPopup);
  }


const weekTag = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const newWeekIndexes = []
newWeekIndexes.push(0);
var i;
for (i=0; i< activitiesForRender.length-1; i++){
  if(activitiesForRender[i].due_date != activitiesForRender[i+1].due_date)
    newWeekIndexes.push(i+1);

}
console.log(newWeekIndexes);

const fetchMoreData = () => {
var end = renderIndex + batch;
if(activities.length < renderIndex + batch){
  end = activities.length;
  setHasMore(false);
}
setActivitiesForRender(activitiesForRender.concat(activities.slice(renderIndex, end)));
setRenderIndex(end);
};

const handleDateChange = (date) => {
setSelectedDate(date);
if(selectedModule != "All Modules" ){
  const tempActivities = props.activities.filter( item => item.module_code==selectedModule).filter(item => new Date(item.due_date)> date);
  setActivities(tempActivities);
  setActivitiesForRender(()=>tempActivities.length <=batch ? tempActivities: tempActivities.slice(0,batch));
  setRenderIndex(batch);
  setHasMore(true);
  window.scrollTo(0, 0);
}
else{
  setActivities(props.activities.filter(item => new Date(item.due_date)> date));
  setActivitiesForRender(()=>props.activities.length <=batch ? props.activities.filter(item => new Date(item.due_date)> date): props.activities.filter(item => new Date(item.due_date)> date).slice(0,batch));
  setRenderIndex(batch);
  setHasMore(true);
  window.scrollTo(0, 0);
}
};
const handleChange = (event) => {
  setSelectedModule(event.target.value);
  // console.log("onChange:")
  // console.log(event.target.value);
  // console.log(event.target.value==null);
  if(event.target.value != "All Modules" ){
    const tempActivities = props.activities.filter( item => item.module_code==event.target.value).filter(item => new Date(item.due_date)> selectedDate);
    // console.log("atualizei:");
    setActivities(tempActivities);
    // console.log("quantidade total: " +　tempActivities.length);
    setActivitiesForRender(()=>tempActivities.length <=batch ? tempActivities: tempActivities.slice(0,batch));
    setRenderIndex(batch);
    setHasMore(true);
    window.scrollTo(0, 0);
  }
  else{
    setActivities(props.activities.filter(item => new Date(item.due_date)> selectedDate));
    setActivitiesForRender(()=>props.activities.length <=batch ? props.activities.filter(item => new Date(item.due_date)> selectedDate)
    : props.activities.filter(item => new Date(item.due_date)> selectedDate).slice(0,batch));
    setRenderIndex(batch);
    setHasMore(true);
    window.scrollTo(0, 0);
  }

};

    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>
        <div className="filter">
          <div>
          <div style={{display: 'flex',justifyContent: 'center'}}>
          <TextField
            id="native-filter"
            select
            label=""
            value={selectedModule}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText=""
          >
            {props.filter.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          </div>
          <div style={{display: 'flex',justifyContent: 'center'}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label=""
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            {showPopup ?
            <ActivityProgressPopup
                      activity={popupActivity}
                      student={props.student_ID}
                      closePopup={togglePopup}
            />  : null
            }
          </div>
          </div>
        </div>

        <div className="main" >

        <InfiniteScroll
          dataLength={activitiesForRender.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            activitiesForRender.map((i, index) =>{

                if (newWeekIndexes.includes(index) ) {
                  return(

                  <div key={index}>
                    <div style={{
                      margin:'16px 0 0 24px',
                      fontFamily: 'Rubik',
                       fontStyle: 'normal',
                       fontSize: '17px'
                     }}> { weekTag[(new Date(i.due_date)).getDay()]} | {String(new Date(i.due_date).getDate()).padStart(2, '0')}/{String(new Date(i.due_date).getMonth() + 1).padStart(2, '0')} </div>
                    <ActivityPanel onClick={togglePopup} item={i} />
                  </div>
                );}
                else{
                  return(<div key={index}>
                    <ActivityPanel onClick={togglePopup} item={i} />
                  </div>);
                }
              }


            )
}
        </InfiniteScroll>
        {

        }
        {/*state.assignments.map((item)=>{
          return <ListRenderer item = {item} />
<ListRenderer code = {props.modules[0].module_code} item = {props.modules[0].activities[0]} />
        })*/
      }

        {/*
          <div style = {{position:"fixed", top:0,textAlign:'center', width: '100%', height: '100%', zIndex:3}}>
            <div style = {{ borderRadius:'5%',margin:'auto', background: 'white', width: '328px',height: '608px'}}>
              <EvaluationActivity activity = {state.assignments[0]}/>
            </div>
          </div>
          */}
        </div>
      </div>
    );
}

export default MyActivities;
