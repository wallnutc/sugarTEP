import React ,{Component} from 'react';
import './styles/mainFrame.css';
import TopMenuBar from './components/menu';
import FilterSelector from './components/FilterSelector';
import SimpleBottomNavigation from './components/bottom_Navigation';
import Items_list from "./components/items_list";

import Lectures from "./scenes/lectures";
import MyActivities from "./scenes/myActivities";
import MyDay from "./scenes/myDay";
import SelfGuidedStudy from './scenes/selfGuidedStudy';
import MyStatistics from './scenes/myStatistics';



function CoreSceneRenderer (props){
  switch(props.coreScene) {
    case 'lectures':
      return (<Lectures />);
    case 'myActivities':
      return (<MyActivities />);
    case 'myDay':
      return (<MyDay />);
    case 'selfGuidedStudy':
      return (<SelfGuidedStudy />);
    case 'myStatistics':
      return (<MyStatistics />);
    default:
      return (<MyDay />);
  }
}

class Student extends Component  {
  state = {coreScene: 'myDay'};

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
          this.setState({coreScene:"selfGuidedStudy"});
          break;
        case 4:
          this.setState({coreScene:"myStatistics"});
          break;
    }
  }

    render(){
      return (
        <div className="App">
          <div className="Menubar">
            <TopMenuBar />
          </div>

          <div>
            <CoreSceneRenderer coreScene={this.state.coreScene}/>
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
