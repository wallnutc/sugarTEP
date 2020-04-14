import React ,{Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component  {




    render(){
      return (
        <div className="App">
        <ul>
          <li><a href="/student"> student </a></li>
          <li><a href="/lecturer"> lecturer </a></li>
          <li>Coordinator</li>
        </ul>
        </div>
      );
    }

}

export default App;


{/*
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

*/}
