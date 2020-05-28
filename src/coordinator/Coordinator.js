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
const mainBlue = "#0061D2";
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
  console.log("Course Final",tempCourses);
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
    };
}

saveClass(){
  console.log("wooo")
  fetch('https://mvroso.pythonanywhere.com/courseByCoordinator1')
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
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
          console.log(result);
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



    render(){
      return (
      <div >
        <div className = 'Menubar' style={{backgroundColor: mainBlue}}><TopMenuBar /></div>
        <div style={{position:'fixed',top:'100px'}}></div>
      

          {this.state.isLoaded ? this.state.courses.map((course)=> <div className = 'title' style= {{color: mainBlue}}>
              <p>{course.course_name}</p>
          </div>) :null}
          

            <div className = 'moduleBox'>
            {this.state.isLoaded ? this.state.courses.map((course)=> <div style ={{margin:'50px 0px'}}>
                      <ExpansionPanelCourse  today={this.state.today} colour={mainBlue} course={course} setState={this.saveClass.bind(this)}/>
                      </div>)
                      :null }

            </div>

          {this.state.isLoaded ? <div className = 'title' style= {{color: mainBlue}}><p>Modules</p></div> 
          :<div><p>Loading ... </p></div>}
          
          <div className = 'moduleBox'>
            {this.state.isLoaded ? this.state.modules.map((module)=> <div style ={{margin:'50px 0px'}}>
                      <ExpansionPanel  today={this.state.today} colour={mainBlue} module={module} setState={this.saveClass.bind(this)}/>
                      </div>)
                      :null }

          </div>

          <div className = 'moduleBox'>
            {this.state.isLoaded ? this.state.contmodules.map((module)=> <div style ={{margin:'50px 0px'}}>

                      <ExpansionPanel  today={this.state.today} colour={mainBlue} module={module} setState={this.saveClass.bind(this)}/>
                      </div>)
                      :null }
          </div>

      </div>

      );

    }


}

  export default Coordinator;
