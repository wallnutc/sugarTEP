import React,{useState,useEffect} from 'react';
import Header from "../components/header";
import ListRenderer,{ActivityPanel} from "../components/listRenderer";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import ActivityIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {ActivityProgressPopup} from '../components/popups';
import FilterMenu,{DateFilter} from '../components/filterMenu';
import AcitvitiesIcon from '../components/iconsSVG/activitiesIcon';

const mainBlue = "#0061D2";
function MyActivities (props) {
  console.log("Student",props);
  const batch = 25;
  const headerContent = {title:"My Activities", imgPath: require("../images/icons/myActivities.svg")};
  const [selectedDate, setSelectedDate] = useState(props.today);
  const [selectedModule, setSelectedModule] = useState(props.filter.length == 0 ? "null": props.filter[0].value);
  const [activities, setActivities] = useState(()=>selectedModule=="All Modules" ? props.activities.filter(item => new Date(item.due_date)>= selectedDate) : props.activities.filter( item => item.module_code==selectedModule).filter(item => new Date(item.due_date)>= selectedDate));
  const [activitiesForRender,setActivitiesForRender] = useState(()=> activities.length <=batch ? activities: activities.slice(0,batch))
  const [renderIndex, setRenderIndex] = useState(batch);
  const [hasMore,setHasMore] =  useState(true);
  const [popupActivity,setPopupActivity] = useState({})

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
//console.log(newWeekIndexes);

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
//console.log("entrei");
if(selectedModule != "All Modules" ){

  const tempActivities = props.activities.filter( item => item.module_code==selectedModule).filter(item => new Date(item.due_date)>= date);
  setActivities(tempActivities);
  setActivitiesForRender(()=>tempActivities.length <=batch ? tempActivities: tempActivities.slice(0,batch));
  setRenderIndex(batch);
  setHasMore(true);
  window.scrollTo(0, 0);
}
else{

  setActivities(props.activities.filter(item => new Date(item.due_date)>= date));
  setActivitiesForRender(()=>props.activities.length <=batch ? props.activities.filter(item => new Date(item.due_date)>= date): props.activities.filter(item => new Date(item.due_date)>= date).slice(0,batch));
  setRenderIndex(batch);
  setHasMore(true);
  window.scrollTo(0, 0);
}
};
const handleChange = (module_code) => {
  setSelectedModule(module_code);
  // //console.log("onChange:")
  // //console.log(module_code);
  // //console.log(module_code==null);
  if(module_code != "All Modules" ){
    const tempActivities = props.activities.filter( item => item.module_code==module_code).filter(item => new Date(item.due_date)>= selectedDate);
    // //console.log("atualizei:");
    setActivities(tempActivities);
    // //console.log("quantidade total: " +　tempActivities.length);
    setActivitiesForRender(()=>tempActivities.length <=batch ? tempActivities: tempActivities.slice(0,batch));
    setRenderIndex(batch);
    setHasMore(true);
    window.scrollTo(0, 0);
  }
  else{
    setActivities(props.activities.filter(item => new Date(item.due_date)>= selectedDate));
    setActivitiesForRender(()=>props.activities.length <=batch ? props.activities.filter(item => new Date(item.due_date)>= selectedDate)
    : props.activities.filter(item => new Date(item.due_date)>= selectedDate).slice(0,batch));
    setRenderIndex(batch);
    setHasMore(true);
    window.scrollTo(0, 0);
  }

};

    return (
      <div >
        <div className="header"  style= {{width: '450px', margin: 'auto'}}>
        <div>

        <AcitvitiesIcon style={{height:'40px', width: '40px',float:'left', zIndex: 2, color:mainBlue}}/>
          <div style={{fontFamily: 'Rubik',fontStyle: 'normal',fontWeight: '500',fontSize: '20px',float:'left',lineHeight: '40px',marginLeft:'16px',color: mainBlue}}>My Activities</div>
      </div>
        </div>
        <div className="filter">
          <div>

          <div style={{padding:"0 16px", display:'flex', color: mainBlue}}>
            <span style={{margin:'16px 8px'}}><FilterMenu default={selectedModule=="All Modules"? true:false} callback={handleChange} label='Modules' options={props.filter}/> </span>
            <span style={{margin:'16px 8px'}}><DateFilter default={selectedDate.getTime()===props.today.getTime()? true:false} callback={handleDateChange} label='Date' date={selectedDate}/></span>
          </div>
            {showPopup ?
            <ActivityProgressPopup
                      activity={popupActivity}
                      student={props.student}
                      setState={props.setState}
                      closePopup={togglePopup}
            />  : null
            }
          </div>
        </div>

        <div className="main" style={{}}>
        <div style={{backgroundColor:'#F6F7FA', borderRadius:'6px', margin:'16px', padding:'8px',boxShadow:' 0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
        <InfiniteScroll
          dataLength={activitiesForRender.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: "center", color: mainBlue}}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center",color: mainBlue }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            activitiesForRender.map((i, index) =>{

                if (newWeekIndexes.includes(index) ) {
                  return(

                  <div key={i.module_code+i.due_date} >
                    <div style={{
                      fontFamily: 'Rubik',
                       fontStyle: 'normal',
                       fontSize: '14px',
                       color: "#565656"
                     }}> <b>{ weekTag[(new Date(i.due_date)).getDay()]}</b> | {String(new Date(i.due_date).getDate()).padStart(2, '0')}/{String(new Date(i.due_date).getMonth() + 1).padStart(2, '0')} </div>
                     <div style={{margin:'8px 0'}}>
                    <ActivityPanel onClick={togglePopup} item={i} setState={props.setState} />
                    </div>
                  </div>
                );}
                else{
                  return(<div key={i.module_code+i.due_date} >
                    <div style={{margin:'8px 0'}}>
                      <ActivityPanel onClick={togglePopup} item={i} setState={props.setState} />
                    </div>
                  </div>);
                }
              }


            )
}
        </InfiniteScroll>
        </div>
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
