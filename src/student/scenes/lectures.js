import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import {LecturePanel} from "../components/listRenderer";
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
import {ClassFeedbackPopup} from '../components/popups';

function Lectures (props) {
  window.scrollTo(0, 0);
    const headerContent = {title:"Lectures", imgPath: require("../images/icons/lectures.svg")};
    const batch = 5;
    const [selectedModule, setSelectedModule] = useState(props.filter.length == 0 ? "null": props.filter[0].value);
    const [selectedDate, setSelectedDate] = useState(new Date('2018-09-14T00:00:00'));
    const [classes,setClasses] = useState(()=>selectedModule=="All Modules" ? props.classes.filter(item => new Date(item.date)> selectedDate) : props.classes.filter( item => item.module_code==selectedModule).filter(item => new Date(item.date)> selectedDate))
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
        const tempClasses = props.classes.filter( item => item.module_code==selectedModule).filter(item => new Date(item.date)> date);
        setClasses(tempClasses);
        setclassesForRender(()=>tempClasses.length <=batch ? tempClasses: tempClasses.slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }
      else{
        setClasses(props.classes.filter(item => new Date(item.date)> date));
        setclassesForRender(()=>props.classes.length <=batch ? props.classes.filter(item => new Date(item.date)> date): props.classes.filter(item => new Date(item.date)> date).slice(0,batch));
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



    const handleChange = (event) => {
      setSelectedModule(event.target.value);
      // console.log("onChange:")
      // console.log(event.target.value);
      // console.log(event.target.value==null);
      if(event.target.value != "All Modules" ){
        const tempClasses = props.classes.filter( item => item.module_code==event.target.value).filter(item => new Date(item.date)> selectedDate);
        // console.log("atualizei:");
        setClasses(tempClasses);
        // console.log("quantidade total: " +　tempClasses.length);
        setclassesForRender(()=>tempClasses.length <=batch ? tempClasses: tempClasses.slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }
      else{
        setClasses(props.classes.filter(item => new Date(item.date)> selectedDate));
        setclassesForRender(()=>props.classes.length <=batch ? props.classes.filter(item => new Date(item.date)> selectedDate)
        : props.classes.filter(item => new Date(item.date)> selectedDate).slice(0,batch));
        setRenderIndex(batch);
        setHasMore(true);
        window.scrollTo(0, 0);
      }

    };

  if(props.filter.length > 0 && props.classes != undefined){
      return (
        <div >
          <div className="header">
            <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
          </div>

          <div className="filter">
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
            <ClassFeedbackPopup
                      class={popupClass}
                      closePopup={togglePopup}
            />  : null
            }
          </div>
          </div>

          <div className="main" >

          {
            classesForRender.length>0 ? <InfiniteScroll
              dataLength={classesForRender.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {
                classesForRender.map((i, index) =>{

                    if (newWeekIndexes.includes(index) ) {
                      return(

                      <div key={index}>
                        <div style={{
                          margin:'16px 0 0 24px',
                          fontFamily: 'Rubik',
                           fontStyle: 'normal',
                           fontSize: '17px'
                         }}> { weekTag[(new Date(i.date)).getDay()]} | {String(new Date(i.date).getDate()).padStart(2, '0')}/{String(new Date(i.date).getMonth() + 1).padStart(2, '0')} </div>
                        <LecturePanel onClick ={togglePopup} item={i} />
                      </div>
                    );}
                    else{
                      return(<div key={index}>
                        <LecturePanel onClick ={togglePopup} item={i} />
                      </div>);
                    }
                  }


                )
              }
            </InfiniteScroll>
            : <div style={{position:'fixed', top:'250px', left:'24px'}}> No classes found! </div>




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
