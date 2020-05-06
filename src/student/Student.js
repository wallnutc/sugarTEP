import React ,{Component} from 'react';
import './styles/mainFrame.css';
import TopMenuBar from './components/menu';
import FilterSelector from './components/FilterSelector';
import SimpleBottomNavigation from './components/bottom_Navigation';

import Lectures from "./scenes/lectures";
import MyActivities from "./scenes/myActivities";
import MyDay from "./scenes/myDay";
import MyModules from './scenes/myModules';
import MyStatistics from './scenes/myStatistics';



function CoreSceneRenderer (props){

  switch(props.coreScene) {
    case 'lectures':
      return (<Lectures classes={props.modules.classes}/>);
    case 'myActivities':
      return (<MyActivities activities={props.modules.activities}/>);
    case 'myDay':
      return (<MyDay activities={props.modules.activities} classes={props.modules.classes}/>);
    case 'myModules':
      return (<MyModules modules={props.modules.modules}/>);
    case 'myStatistics':
      return (<MyStatistics />);
    default:
      return (<MyDay />);
  }
}

function sortActivities(activities){
  activities.sort((a,b) => (a.due_date > b.due_date) ? 1 : ((b.due_date > a.due_date) ? -1 : 0));
}

function sortClasses(classes){
  //new Date(a.date) > new Date(b.date))&&(parseInt(a.start_time.split(':')[0]) > parseInt(b.start_time.split(':')[0])) ? 1 : ((new Date(a.date) == new Date(b.date))&&(parseInt(a.start_time.split(':')[0]) == parseInt(b.start_time.split(':'))[0]) ? 0 : -1)

  function compare (a,b) {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    const aStart = a.start_time.split(':');
    const bStart = b.start_time.split(':');
    const aDay = String(aDate.getDate()).padStart(2, '0');
    const aMonth = String(aDate.getMonth() + 1).padStart(2, '0');
    const aYear = aDate.getFullYear();
    const bDay = String(bDate.getDate()).padStart(2, '0');
    const bMonth = String(bDate.getMonth() + 1).padStart(2, '0');
    const bYear = bDate.getFullYear();
  //  console.log("comparando:");
    //console.log(parseInt(aDay) + '/' + parseInt(aMonth) + '/' + parseInt(aYear) + ' - ' + parseInt(aStart[0]) + ':' + parseInt(aStart[1]) + ':' + parseInt(aStart[2]));
  //  console.log(parseInt(bDay) + '/' + parseInt(bMonth) + '/' + parseInt(bYear) + ' - ' + parseInt(bStart[0]) + ':' + parseInt(bStart[1]) + ':' + parseInt(bStart[2]));
    if((aDay == bDay)
      && (aMonth == bMonth)
      && (aYear == bYear)
      && (parseInt(aStart[0]) == parseInt(bStart[0]))
      && (parseInt(aStart[1]) == parseInt(bStart[1]))
      && (parseInt(aStart[2]) == parseInt(bStart[2])))
      {
        //console.log("0");
        return 0;
      }
    if(parseInt(aYear) > parseInt(bYear)){
      //console.log("1");
      return 1;
    }
    else if ((parseInt(aYear) == parseInt(bYear))&&(parseInt(aMonth) > parseInt(bMonth))) {
    //  console.log("1");
      return 1;
    }
    else if ((parseInt(aYear) == parseInt(bYear))&&(parseInt(aMonth) == parseInt(bMonth))&&(parseInt(aDay) > parseInt(bDay))) {
//console.log("1");
      return 1;
    }
    else if ((parseInt(aYear) == parseInt(bYear))&&(parseInt(aMonth) == parseInt(bMonth))&&(parseInt(aDay) == parseInt(bDay))
  &&(parseInt(aStart[0]) > parseInt(bStart[0]))) {
//console.log("1");
      return 1;
    }
    else if ((parseInt(aYear) == parseInt(bYear))&&(parseInt(aMonth) == parseInt(bMonth))&&(parseInt(aDay) == parseInt(bDay))
  &&(parseInt(aStart[0]) == parseInt(bStart[0])) &&(parseInt(aStart[1]) > parseInt(bStart[1]))) {

//console.log("1");
      return 1;
    }
    else if ((parseInt(aYear) == parseInt(bYear))&&(parseInt(aMonth) == parseInt(bMonth))&&(parseInt(aDay) == parseInt(bDay))
  &&(parseInt(aStart[0]) == parseInt(bStart[0])) &&(parseInt(aStart[1]) == parseInt(bStart[1]))&&(parseInt(aStart[2]) > parseInt(bStart[2]))) {
//console.log("1");
      return 1;
    }
    else {
    // console.log("-1");
      return -1;
    }
  }

  classes.sort(compare);
}

class Student extends Component  {
  state = {coreScene: 'myDay',
          isLoaded:false,
          modules:[],
          classes:[],
          activities:[],

};

  changeCoreScene = (coreSceneIndex)=>{
    switch(coreSceneIndex) {
      case 0:
        this.setState({coreScene:"lectures"});
        break;
      case 1:
        this.setState({coreScene:"myActivities"});
        break;
        case 2:
          this.setState({coreScene:"myDay"});
          break;
        case 3:
          this.setState({coreScene:"myModules"});
          break;
        case 4:
          this.setState({coreScene:"myStatistics"});
          break;
    }
  }
  setClasses (modules){
    var tempLec = [];
    modules.map((module)=>{
    const header = {module_code: module.module_code,
                    module_name: module.module_name,
                    module_lecturer: module.module_lecturer
                  };
    module.classes.map((lecture) => { if(lecture.length != 0){
        const classesFull = {...header,
          ...lecture};
        tempLec.push(classesFull);
        }
    })

    })
    //tempLec.sort((a,b) => (new Date(a.date) > new Date(b.date))&&(parseInt(a.start_time.split(':')[0]) > parseInt(b.start_time.split(':')[0])) ? 1 : ((new Date(a.date) == new Date(b.date))&&(parseInt(a.start_time.split(':')[0]) == parseInt(b.start_time.split(':'))[0]) ? 0 : -1));
    //console.log(tempLec);
    sortClasses(tempLec);
    this.setState({
      classes: tempLec
    });
  }

  setActivities (modules){
    var tempAct = [];
    modules.map((module)=>{
    const header = {module_code: module.module_code,
                    module_name: module.module_name,
                    module_lecturer: module.module_lecturer
                  };
    module.activities.map((activity) => {
      const activityFull = {...header,
        ...activity};
      tempAct.push(activityFull);
    })
  })
    sortActivities(tempAct);
    this.setState({
      activities: tempAct
    });

  }

  componentDidMount() {
    fetch('http://mvroso.pythonanywhere.com/modulesByStudent1')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            modules: result
          });
          this.setActivities (this.state.modules);
          this.setClasses(this.state.modules);
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
        <div className="App">
          <div className="Menubar">
            <TopMenuBar />
          </div>

          <div>
            <CoreSceneRenderer coreScene={this.state.coreScene} modules={this.state}/>
          </div>

          <div className="BottomNavigation">
            <SimpleBottomNavigation coreScene={this.changeCoreScene}/>
          </div>
        </div>
      );
    }

}

export default Student;


{/*
  <BrowserRouter>
  <Switch>
    <Route path='/lectures' component={Lectures} />
    <Route path='/myday' component={MyDay} />
  </Switch>
</BrowserRouter>
*/}
