import React ,{Component} from 'react';
import TopMenuBar from './components/menu';
import './styles/mainFrame.css';
import ExpansionPanel from './components/ExpaMod.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const mainBlue = "#0061D2";

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
    }
    tempModules.push(tempModule);
  } )
  console.log("made a copy");
  console.log(tempModules);
  return tempModules;
}

class Lecturer extends Component  {
  constructor(props) {
  super(props);
  this.state = {
    isLoaded: false,
    modules:[],
    contmodules:[],
    today:new Date("2019-03-14T00:00:00"),
    value: 0,
    };
}

saveClass(){
  console.log("wooo")
  fetch('http://mvroso.pythonanywhere.com/modulesByStaff9')
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          modules: sortModules(result.myModules),
          contmodules: sortModules(result.contributedModules),
          //student: result.student
        });
        //sortModules(this.state.modules);
        //console.log("-before");
        console.log(this.state.contmodules);
        //console.log(this.state.today);
        //this.state.modules.map((item) => {sortClasses(item.classes); sortActivities(item.activities);});
        //this.state.contmodules.map((item) => {sortClasses(item.classes); sortActivities(item.activities);});
        //console.log("-after");
        console.log(this.state.modules);
        //console.log("-modules len");
        //console.log(this.state.modules.length);
        console.log("hooo")
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
    fetch('http://mvroso.pythonanywhere.com/modulesByStaff9')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            modules: sortModules(result.myModules),
            contmodules: sortModules(result.contributedModules),
            //student: result.student
          });
          // console.log("before");
          // console.log(this.state.contmodules);
          // console.log(this.state.today);
          // this.state.modules.map((item) => {sortClasses(item.classes); sortActivities(item.activities);});
          // this.state.contmodules.map((item) => {sortClasses(item.classes); sortActivities(item.activities);});
          // console.log("after");
          // console.log(this.state.modules);
          // console.log("modules len");
          // console.log(this.state.modules.length);
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
        <div className = 'Menubar' style={{backgroundColor: mainBlue}}>
          <TopMenuBar />
        </div>
        <div style={{position:'fixed',top:'100px'}}>

          </div>
            <div className = 'title' style= {{color: mainBlue}}>
              <p> My Modules</p>
            </div>
            <div className = 'moduleBox'>
            {this.state.isLoaded ? this.state.modules.map((module)=> <div style ={{margin:'50px 0px'}}>
                      <ExpansionPanel  today={this.state.today} module={module} setState={this.saveClass.bind(this)}/>
                      </div>)
                      :null }

            </div>



            <div className='title' style= {{color: mainBlue}}>
              <p> My Contributed Modules</p>
            </div>

            <div className = 'moduleBox'>
            {this.state.isLoaded ? this.state.contmodules.map((module)=> <div style ={{margin:'50px 0px'}}>

                      <ExpansionPanel  today={this.state.today} module={module} setState={this.saveClass.bind(this)}/>
                      </div>)
                      :null }
            </div>


            <div style={{position:'absolute',top:'2000px',height:'500px',width:'500px'}}>
          </div>
        </div>

      );

    }


}

  export default Lecturer;
