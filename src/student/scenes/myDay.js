import React ,{Component, useState} from 'react';
import Header from "../components/header";
import ListRenderer from "../components/listRenderer";
import {LecturePanel,ActivityPanel} from "../components/listRenderer";
import InfiniteScroll from "react-infinite-scroll-component";
import {ClassFeedbackPopup,ActivityProgressPopup,CalendarActivityPopup} from '../components/popups';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ScheduleWeekly from '../components/ScheduleWeekly';
import MyDayIcon from '../components/iconsSVG/myDayIcon';
const mainBlue = "#0061D2";
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.getWeek = function(){
 return [new Date(this.setDate(this.getDate()-this.getDay()))]
          .concat(
            String(Array(6)).split(',')
               .map ( function(){
                       return new Date(this.setDate(this.getDate()+1));
                     }, this )
          );
}
const scheduleActivities = [
  {
    id:1,
    name: 'Leslies Cube Lab - Physics',
    module: 'Activity',
    module_code: 'PY1E04',
    day: 1,
    start_time: '14:00',
    end_time: '17:00',
    colour: 'grey'
  },
  {
    id:2,
    name: 'Leslies Cube Lab - Physics',
    module: 'Activity',
    module_code: 'PY1E04',
    day: 3,
    start_time: '15:00',
    end_time: '16:00',
    colour: 'grey'
  },
  {
    id:3,
    name: 'Swimming',
    module: 'Personal',
    module_code: 'Hobby',
    day: 0,
    start_time: '15:00',
    end_time: '16:00',
    colour: 'red'
  },
  {
    id:4,
    name: 'Football Practice',
    module: 'Personal',
    module_code: 'Hobby',
    day: 2,
    start_time: '19:00',
    end_time: '21:00',
    colour: 'red'
  }
]

function MyDay (props) {
  const batch = 25;
  const activeActivities = props.activities.filter((item) => new Date(item.due_date) >= props.today  && item.submitted != 1 ); //&& new Date(item.start_date) <= new Date(today2)
  const [activities,setActivities] = useState(()=>activeActivities.length <=batch ? activeActivities:activeActivities.slice(0,batch))
  const [fakeActivities, setFakeActivities] = useState(scheduleActivities);
  const [renderIndex, setRenderIndex] = useState(batch);
  const [hasMore,setHasMore] =  useState(true);
  const [setup,setSetup] = useState(true);
  const [popupActivity,setPopupActivity] = useState({});
  const [filterState, setFilterState] = useState(1);
  const thisWeek= new Date('2019-03-14T00:00:00').getWeek();
  const thisWeekClasses = props.classes.filter((item) => new Date(item.date+'T00:00:00')>=thisWeek[0]&&new Date(item.date+'T00:00:00')<=thisWeek[6] );
  const weekTag = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayClasses = props.classes.filter((item) =>new Date(item.date+'T00:00:00').getTime() == props.today.getTime());

  if(activeActivities.length>0 && setup){
        setActivities(()=>activeActivities.length <=batch ? activeActivities:activeActivities.slice(0,batch));
        setSetup(false);
  }
  const fetchMoreData = () => {
    var end = renderIndex + batch;
    if(activeActivities.length < renderIndex + batch){
      end = activeActivities.length;
      setHasMore(false);
    }

    setActivities(activities.concat(activeActivities.slice(renderIndex, end)));
    setRenderIndex(end);
  };


const [popupClass,setPopupClass] = useState({})
const [showPopupA,setShowPopupA] = useState(false);
const [showPopupC,setShowPopupC] = useState(false);
const [showPopupActSlot,setShowPopupActSlot] = useState(false);
const [popupScheduleAct,setPopupScheduleAct] = useState({})
const togglePopupClass = (lecture) => {
  if(!showPopupC) setPopupClass(lecture);
  setShowPopupC(!showPopupC);
}
const togglePopupActivity = (activity) => {
  if(!showPopupA) setPopupActivity(activity);
  setShowPopupA(!showPopupA);
}

const togglePopupScheduleActivity = (activity) => {
  if(!showPopupActSlot) setPopupScheduleAct(activity);
  setShowPopupActSlot(!showPopupActSlot);
}

const updateFakeActivities = (newActivity) => {
  let tempAct = [];
  fakeActivities.map((activity)=>{if(activity.id==newActivity.id){tempAct.push(newActivity)} else {tempAct.push(activity)} })
  setFakeActivities(tempAct);
}
return (
  <div >
    <div className="header" style= {{width: '450px', margin: 'auto'}}>
      <div>
          <MyDayIcon style={{height:'40px', width: '40px',float:'left', zIndex: 2, color:mainBlue}}/>
          <div style={{fontFamily: 'Rubik',fontStyle: 'normal',fontWeight: '500',fontSize: '20px',float:'left',lineHeight: '40px',marginLeft:'16px',color: mainBlue}}>My Day</div>
      </div>
    </div>
    <div className="filter">
      <div>
      <div style={{padding:"0 16px",}}>
        <span >
        <BootstrapButton style = {{margin:'16px 0',width:'51px' ,height: '24px',backgroundColor: filterState==1 ? '#0153B4':'#F6F7FA'}} onClick={()=>{setFilterState(1);window.scrollTo(0, 0);}} children={
          <div style={{color:filterState==1 ? '#FFFFFF':'#0061D2', fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '14px'}}>
          Day
            </div>} />
        </span>
        <span >
        <BootstrapButton style = {{margin:'16px 8px',width:'51px' ,height: '24px',backgroundColor: filterState==2 ? '#0153B4':'#F6F7FA'}} onClick={()=>{setFilterState(2);window.scrollTo(0, 0);}} children={
          <div style={{color:filterState==2 ? '#FFFFFF':'#0061D2', fontFamily: 'Rubik',fontStyle: 'normal', fontWeight: '300',fontSize: '12px',lineHeight: '14px'}}>
          Week
            </div>} />
        </span>
      </div>

        {showPopupC ?
        <ClassFeedbackPopup
                  class={popupClass}
                  closePopup={togglePopupScheduleActivity}
        />  : null
        }
        {showPopupA ?
        <ActivityProgressPopup
                  activity={popupActivity}
                  student={props.student}
                  setState={props.setState}
                  closePopup={togglePopupActivity}
        />  : null
        }
        {showPopupActSlot ?
          <CalendarActivityPopup
                  activity={popupScheduleAct}
                  setActivity={props.updateFakeActivities}
                  closePopup={setShowPopupActSlot}
          />: null

        }

      </div>
    </div>
    <div className="main" >
    {filterState==1 ?

      <div>
      <div style={{backgroundColor:'#F6F7FA', borderRadius:'6px', margin:'16px', padding:'8px',boxShadow:' 0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <div style={{
        fontFamily: 'Rubik',
         fontStyle: 'normal',
         fontSize: '14px',
         color: '#565656'
       }}> <b>Today</b> | {weekTag[props.today.getDay()]+' '}{String(props.today.getDate()).padStart(2, '0')}/{String(props.today.getMonth() + 1).padStart(2, '0')}
       <br/>{todayClasses.length==0? <div style={{margin:'16px 0 8px 0'}}>No classes today, take a break !</div>:<div style={{margin:'16px 0 8px 0'}}>Classes</div>}
    </div>

      {todayClasses.length==0? null: todayClasses.map((item)=>
        <div key={item.module_code+item.date+item.start_time} style={{margin:'8px 0'}}>
          <LecturePanel onClick ={togglePopupClass} item = {item} />
        </div> )}
      </div>
      <div style={{backgroundColor:'#F6F7FA', borderRadius:'6px', margin:'16px', padding:'8px',boxShadow:' 0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <div style={{
        fontFamily: 'Rubik',
         fontStyle: 'normal',
         fontSize: '14px',
         color: '#565656'
       }}> Activities backlog
    </div>
      {
        activities.length==0? <div style={{margin:'16px 0 8px 0',fontFamily: 'Rubik', fontStyle: 'normal',fontSize: '14px', color: '#565656'}}>
                                You're done with all your activities for now!
                              </div>:
        <InfiniteScroll
          dataLength={activities.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: "center", color: mainBlue }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center", color: mainBlue }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {activities.map((i, index) => (
            <div key={i.module_code+i.due_date} style={{margin:'8px 0'}}>
              <ActivityPanel onClick={togglePopupActivity} item={i} />
            </div>
          ))}
        </InfiniteScroll>
      }

      </div>
      </div>
      :<div style={{margin:'8px'}}>
      {thisWeekClasses.length>0 ? <ScheduleWeekly events={thisWeekClasses}week={thisWeek} activities={props.fakeActivities} toggleActPopup={togglePopupScheduleActivity}/> : null}

      </div>




    }

    </div>
  </div>
);

}

export default MyDay;
const BootstrapButton = withStyles({
  root: {
    borderRadius:'12px',
    minWidth:'51px',
    justifyContent: 'middle',
    verticalAlign:'middle',
    textAlign:'center',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '0',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#F1F1F1',
    borderColor: 'transparent',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#b5b5b5',
      borderColor: '#b5b5b5',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'red',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '#9A9A9A',

    },
  },
})(Button);

{/*
  {
    activityType:"assignment",
    module_code: "3E2",
    module_name: "Accountability",
    module_lecturer: "Juliana Lima",
    title: "Depreciation",
    begin: "6:50 PM",
    finish: "7:20 PM",
    study_hour: "7:15 AM",
    study_suggested: 50,
    study_real: 20
  },
<ListRenderer renderContent={myDay.myDay} />
  function MyDay () {
    const headerContent = {title:"My Day", imgPath: require("../images/icons/myDay.svg")};
    var data = {myDay:[
      {
        activityType:"assignment",
        module_code: "3E7",
        module_name: "Engineering Math",
        module_lecturer: "Prof. Marilda Fernandes",
        title: "Linear Algebra Assignment",
        begin: "5:40 PM",
        finish: "6:25 PM",
        assinment_hour: "7:15 AM",
        assignment_suggested: 50,
        assignment_real: 25
      },
      {
        activityType:"selfGuidedStudy",
        module_code: "3E2",
        module_name: "Accountability",
        module_lecturer: "Juliana Lima",
        title: "Depreciation",
        begin: "6:50 PM",
        finish: "7:20 PM",
        study_hour: "7:15 AM",
        study_suggested: 50,
        study_real: 20
      },
      { activityType:"lecture",
        module_code: "3E2",
        module_name: "Accountability",
        module_lecturer: "Juliana Lima",
        title: "Depreciation",
        begin: "7:30 AM",
        finish: "9:45 AM",
        lecture_description: "Depreciation is an accounting method of allocating the cost of a tangible or physical asset"},
    {
      activityType:"lecture",
      module_code: "3E9",
      module_name: "Chemical Processes",
      module_lecturer: "Marcio Silva",
      title: "Balancing Chemical Equations",
      begin: "10:30 AM",
      finish: "11:45 AM",
      lecture_description: "A chemical equation is a written symbolic representation of a chemical reaction"
    },
    {
      activityType:"lecture",
      module_code: "3E7",
      module_name: "Engineering Math",
      module_lecturer: "Marilda Fernandes",
      title: "Modular Inequalities",
      begin: "1:30 PM",
      finish: "3:55 PM",
      lecture_description: "If you are talking about what engineers use on a daily basis, well pretty much all of engineering"
    }
  ]

  };

      return (
        <div >
          <div className="header">
            <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
          </div>
          <div className="filter">
            <div>
              <FilterSelector />
            </div>
          </div>
          <div className="main" >
            <ListRenderer renderContent={data.myDay}/>
          </div>
        </div>
      );
  }
*/}
