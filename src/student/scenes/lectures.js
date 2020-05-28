import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/header";
import {LecturePanel} from "../components/listRenderer";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {ClassFeedbackPopup} from '../components/popups';
import FilterMenu,{DateFilter} from '../components/filterMenu';
const mainBlue = "#0061D2";

function Lectures (props) {

    const headerContent = {title:"Classes", imgPath: require("../images/icons/lectures.svg")};
    const batch = 5;
    const [selectedModule, setSelectedModule] = useState(props.filter.length == 0 ? "null": props.filter[0].value);
    const [selectedDate, setSelectedDate] = useState(props.today);
    console.log("Selected Date", selectedDate);
    const [classes,setClasses] = useState(()=>selectedModule=="All Modules" ? props.classes.filter(item => new Date(item.date+'T00:00:00')>= selectedDate) : props.classes.filter( item => item.module_code==selectedModule).filter(item => new Date(item.date+'T00:00:00')>= selectedDate))
    const [classesForRender,setclassesForRender] = useState(()=>classes.length <=batch ? classes: classes.slice(0,batch))
    const [renderIndex, setRenderIndex] = useState(batch);
    const [hasMore,setHasMore] =  useState(true);

    const [popupClass,setPopupClass] = useState({})
    const [showPopup,setShowPopup] = useState(false);
    const togglePopup = (lecture) => {
      if(!showPopup) setPopupClass(lecture);
      setShowPopup(!showPopup);
    }
    console.log("classes");
    console.log(classes);
    const handleDateChange = (date) => {
      setSelectedDate(date);
      if(selectedModule != "All Modules" ){
        const tempClasses = props.classes.filter( item => item.module_code==selectedModule).filter(item => new Date(item.date+'T'+'00:00:00')>= date);
        setClasses(tempClasses);
        setclassesForRender(()=>tempClasses.length <=batch ? tempClasses: tempClasses.slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }
      else{
        setClasses(props.classes.filter(item => new Date(item.date+'T'+'00:00:00')>= date));
        setclassesForRender(()=>props.classes.length <=batch ? props.classes.filter(item => new Date(item.date+'T'+'00:00:00')>= date): props.classes.filter(item => new Date(item.date+'T'+'00:00:00')>= date).slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }
    };

    const weekTag = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const newWeekIndexes = []
    newWeekIndexes.push(0);
    var i;
    for (i=0; i< classesForRender.length-1; i++){
      if(classesForRender[i].date != classesForRender[i+1].date)
        newWeekIndexes.push(i+1);
    }


    const fetchMoreData = () => {
    var end = renderIndex + batch;
    if(classes.length < renderIndex + batch){
      end = classes.length;
      setHasMore(false);
    }
    setclassesForRender(classesForRender.concat(classes.slice(renderIndex, end)));
    setRenderIndex(end);
  };



    const handleChange = (module_code) => {
      setSelectedModule(module_code);
      // console.log("onChange:")
      // console.log(event.target.value);
      // console.log(event.target.value==null);
      if(module_code != "All Modules" ){
        const tempClasses = props.classes.filter( item => item.module_code==module_code).filter(item => new Date(item.date+'T00:00:00')>= selectedDate);
        // console.log("atualizei:");
        setClasses(tempClasses);
        // console.log("quantidade total: " +　tempClasses.length);
        setclassesForRender(()=>tempClasses.length <=batch ? tempClasses: tempClasses.slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }
      else{
        setClasses(props.classes.filter(item => new Date(item.date)>= selectedDate));
        setclassesForRender(()=>props.classes.length <=batch ? props.classes.filter(item => new Date(item.date+'T00:00:00')>= selectedDate)
        : props.classes.filter(item => new Date(item.date)>= selectedDate).slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }

    };

  if(props.filter.length > 0 && props.classes != undefined){
      return (
        <div >
          <div className="header">
          <div>
        <div style={{left: "0",right:"0",position: 'fixed',backgroundColor: "white",top:'55px', zIndex: 1}}>
        <MenuBookIcon style={{margin:'15px 0px 10px 20px', height:'40px', width: '46px',float:'left', zIndex: 2, color:mainBlue}}/>
          <h2 style={{fontFamily: 'Rubik',fontStyle: 'normal',fontWeight: '500',fontSize: '20px',float:'left',lineHeight: '41px',padding: '15px',color: mainBlue}}>My Classes</h2>
        </div>
      </div>
          </div>

          <div className="filter">
          <div style={{padding:"0 16px", display:'flex', color: mainBlue}}>
            <span style={{margin:'16px 8px'}}><FilterMenu default={selectedModule=="All Modules"? true:false} callback={handleChange} label='Modules' options={props.filter}/> </span>
            <span style={{margin:'16px 8px'}}><DateFilter default={selectedDate.getTime()===props.today.getTime()? true:false} label='Date' callback={handleDateChange} date={selectedDate}/></span>
          </div>
            {showPopup ?
            <ClassFeedbackPopup
                      class={popupClass}
                      closePopup={togglePopup}
                      setState={props.setState}
            />  : null
            }

          </div>

          <div className="main" >

          {
            classesForRender.length>0 ? <InfiniteScroll
              dataLength={classesForRender.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4 style={{color:mainBlue}}>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center", color:mainBlue}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {
                classesForRender.map((i, index) =>{

                    if (newWeekIndexes.includes(index) ) {
                      return(

                      <div key={i.module_code+i.date+i.start_time}>
                        <div style={{
                          margin:'16px 0 0 24px',
                          fontFamily: 'Rubik',
                           fontStyle: 'normal',
                           fontSize: '17px',
                           color: mainBlue
                         }}> { weekTag[(new Date(i.date+'T00:00:00')).getDay()]} | {String(new Date(i.date+'T00:00:00').getDate()).padStart(2, '0')}/{String(new Date(i.date+'T00:00:00').getMonth() + 1).padStart(2, '0')} </div>
                        <LecturePanel onClick ={togglePopup} item={i} setState={props.setState} />
                      </div>
                    );}
                    else{
                      return(<div key={i.module_code+i.date+i.start_time}>
                        <LecturePanel onClick ={togglePopup} item={i} setState={props.setState}/>
                      </div>);
                    }
                  }


                )
              }
            </InfiniteScroll>
            : <div style={{position:'fixed', top:'250px', left:'24px', color: mainBlue}}> No classes found! </div>




          }

          </div>
        </div>
      );
  }
  else {
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>

        <div className="filter">

        </div>

        <div className="main" >

        </div>
      </div>
    );
  }

}

export default Lectures;
