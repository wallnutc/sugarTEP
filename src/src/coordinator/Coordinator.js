import React ,{Component} from 'react';
import TopMenuBar from './components/menu';
import './styles/mainFrame.css';
import Button from '@material-ui/core/Button';
import ExpansionPanel from './components/ExpaMod.js';
import ExpansionPanelCourse from './components/ExpaCourse.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
const mainBlue = "#003EAA";
//const mainBlue = "red";

function setTheme(val){
  return 1;
}


function sortActivities(activities){
  activities.sort((a,b) => (new Date(a.due_date) > new Date(b.due_date)) ? 1 : ((new Date(b.due_date) > new Date(a.due_date)) ? -1 : 0));
}
function sortClasses(classes){

  classes.sort((a,b) => (new Date(a.date+'T'+a.start_time) > new Date(b.date+'T'+b.start_time)) ? 1 : ((new Date(b.date+'T'+b.start_time) > new Date(a.date+'T'+a.start_time)) ? -1 : 0));
}

function sortModules(modules){
  let tempModules = [];
  modules.map((module)=>{
    let tempActivities = module.activities.slice(0);
    sortActivities(tempActivities)
    let tempClasses = module.classes.slice(0);
    sortClasses(tempClasses)

    const tempModule = {
      module_ID: module.module_ID,
      module_code: module.module_code,
      module_name: module.module_name,
      module_lecturer: module.module_lecturer,
      module_lecturer_ID: module.module_lecturer_ID,
      module_lecturer_email: module.module_lecturer_email,
      credits: module.credits,
      edit: module.edit,
      contributors: module.contributors,
      colour: module.colour,
      courses: module.courses,
      total_students: module.total_students,
      activities: tempActivities,
      classes: tempClasses,
      notes: module.notes,
      activity_feedback: module.activity_feedback,
      class_feedback: module.class_feedback
    }
    tempModules.push(tempModule);
  } )
  return tempModules;
}

function sortCourses(courses, modules, contmodules){
  let tempCourses = [];
  let tempModules = [];
  tempModules=sortModules(modules).concat(sortModules(contmodules));
  courses.map((course)=>{
    const tempCourse = {
      course_ID: course.course_ID,
      course_name: course.course_name,
      course_lecturer: course.course_lecturer,
      course_lecturer_ID: course.course_lecturer_ID,
      course_lecturer_email: course.course_lecturer_email,
      total_students: course.total_students,
      notes: course.notes,
      modules: tempModules
    }
    tempCourses.push(tempCourse);
  } )
  //console.log("Course Final",tempCourses);
  return tempCourses;
}

class Coordinator extends Component  {
  constructor(props) {
  super(props);
  this.state = {
    isLoaded: false,
    modules:[],
    contmodules:[],
    course:[],
    today:new Date("2019-03-14T00:00:00"),
    value: 0,
    selectedModule:null,
    };
}

saveClass(){
  //console.log("wooo")
  fetch('https://mvroso.pythonanywhere.com/courseByCoordinator1')
    .then(res => res.json())
    .then(
      (result) => {
        //console.log(result);
        this.setState({
          isLoaded: true,
          modules: sortModules(result.myModules),
          contmodules: sortModules(result.contributedModules),
          courses: sortCourses(result.myCourse, result.myModules, result.contributedModules)
        });

      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
}


  componentDidMount() {
    fetch('https://mvroso.pythonanywhere.com/courseByCoordinator1')
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            modules: sortModules(result.myModules),
            contmodules: sortModules(result.contributedModules),
            courses: sortCourses(result.myCourse, result.myModules, result.contributedModules)
          });

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    }

    changePanel(moduleCode){
      //console.log("changed to " + moduleCode);
      this.setState({
        selectedModule: this.state.selectedModule==moduleCode? null: moduleCode,
      });
    }

    renderContent = () => {
      if (isMobile) {
          return(
            <div className="App">
              <div className="CourseLogo1" style={{width:'150px', height:'155px'}}>
                <img src={require('../images/cc.png')} style={{width:'150px', height:'150px'}}/>
              </div>
              <h2 className="StaffTitle1">ModuleM</h2>
              <div style={{margin:'auto'}}>
                <div style={{color:mainBlue, fontSize:40, textAlign:'center', position:'relative'}}>Oops !</div>
                <div style={{color:mainBlue, fontSize:20, textAlign:'center', width: "80%", position:'relative', margin:'auto'}}> This portion of the website is only available in desktop view. Please switch back to desktop view by pressing Ctrl+Shift+M on your desktop browser and refresh the page !</div>
              </div>
            </div>
          );
      }
      return (
        <div >
          <div className = 'Menubar' style={{backgroundColor: mainBlue}}><TopMenuBar /></div>
          {/*
            <div style={{position:'fixed',top:'100px'}}></div>
            <span className="CourseLogo1" style={{width:'150px', height:'155px', marginTop:'40px'}}>
            <img src={require('./images/cc.png')} style={{width:'150px', height:'150px'}}/>
            </span>
            <span><h2 className="StaffTitle1" style = {{fontSize:30}}>ModuleM</h2></span>
            */}

            {this.state.isLoaded ? this.state.courses.map((course)=>  <div className = 'title' style= {{color: mainBlue, marginTop: '117px',marginLeft: '5%'}}>
                <p>{course.course_name}</p>
            </div>) :null}


              <div className = 'moduleBox'>
              {this.state.isLoaded ? this.state.courses.map((course)=> <div style ={{margin:'50px 0px'}}>
                        <ExpansionPanelCourse  today={this.state.today} colour={mainBlue} course={course} setState={this.saveClass.bind(this)}/>
                        </div>)
                        :null }

              </div>

            {this.state.isLoaded ? <div className = 'title' style= {{color: mainBlue,marginLeft: '5%', marginTop:'60px'}}><p>Modules</p></div>
            :<div className = 'title' style= {{color: mainBlue}}><p>Loading Modules... </p></div>}

            <div className = 'moduleBox'>
              {this.state.isLoaded ? this.state.modules.map((module)=> <div style ={{margin:'24px 0px'}}>
                        <ExpansionPanel changePanel={this.changePanel.bind(this)} selectedModule={this.state.selectedModule} today={this.state.today} colour={mainBlue} module={module} setState={this.saveClass.bind(this)}/>
                        </div>)
                        :null }

            </div>

            <div className = 'moduleBox'>
              {this.state.isLoaded ? this.state.contmodules.map((module)=> <div style ={{margin:'24px 0px'}}>

                        <ExpansionPanel changePanel={this.changePanel.bind(this)} selectedModule={this.state.selectedModule} today={this.state.today} colour={mainBlue} module={module} setState={this.saveClass.bind(this)}/>
                        </div>)
                        :null }
            </div>

        </div>

        );
    }
    render(){
      return this.renderContent();
    }

}

  export default Coordinator;
