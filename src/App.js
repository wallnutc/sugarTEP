import React ,{Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import './styles/mainFrame.css';
import TopmenuBar from './components/menu'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

class App extends Component  {

    renderContent = () => {
        if (isMobile) {
        return (
            <div className="CourseApp">
                <div className='CourseBackground1'/><div className='CourseBackground2'/>
                <div className="CourseMenubar">
                    <TopmenuBar/>
                </div>
                <div className="CourseLogo1" style={{width:'150px', height:'155px'}}>
                    <img src={require('./images/cc.png')} style={{width:'150px', height:'150px'}}/>
                </div>
                <h2 className="CourseName1" >ModuleM</h2>
    
                <div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:'auto'}}><div><Link to={'/student'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{ height: 300}}
                                    image={require('./images/studentcard.png')}
                                    title="Student"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Student
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" component="p" style={{height: '80%'}}>
                                        This platform is used by students to help them organise and manage their individual workload. The features within this tool help the student track workload and provide useful information to lecturers with the aim of improving the students modules.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:'auto'}}><div><Link to={'/lecturer'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: 300}}
                                    image={require('./images/lectcard.png')}
                                    title="Lecturer"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2"  >
                                        Lecturer
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" component="p"  style={{height: '80%'}}>
                                        This is platform is used by lecturers to improve and manage the modules which they oversee. The features within this tool help the lecturer mange module content, view student workload distribution and gather module feedback.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:'auto'}}><div><Link to={'/coordinator'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: 300}}
                                    image={require('./images/coordcard.png')}
                                    title="Coordinators"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Coordinator
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" component="p"  style={{height: '80%'}}>
                                        This platform is used by coordinators to review and organise a courses content and workload. The features within this tool provide a course overview which the coordinator can use to identify and implement positive changes.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
    
                </div>
    
                <div className="CourseInfoBox">
                    <box>
                        <Typography style={{fontSize: '20px', fontFamily: 'Titillium Web, sans-serif'}}>
                            ModuleM is a platform for third level education institutes to help with organisation, workload management and academic planning throughout the year.
                        </Typography>
                        <Typography style={{fontSize: '14px', fontFamily: 'Titillium Web, sans-serif'}} >
                            ModuleM was created by a group of students from Trinity College Dublin and University of Sao Paulo. The sites' features and functions have been developed from user feedback and testing over the course of a year.
                        </Typography>
                    </box>
                </div>
            </div>
          );
        }
        return (
            <div className="CourseApp">
                <div className='CourseBackground1'/><div className='CourseBackground2'/>
                <div className="CourseMenubar">
                    <TopmenuBar/>
                </div>
                <div className="CourseLogo1" style={{width:'150px', height:'155px'}}>
                    <img src={require('./images/cc.png')} style={{width:'150px', height:'150px'}}/>
                </div>
                <h2 className="CourseName1" >ModuleM</h2>
    
                <div  style={{ display: 'flex', justifyContent: 'center'}}> 
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:25, float:'left'}}><div><Link to={'/student'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{ height: 300}}
                                    image={require('./images/studentcard.png')}
                                    title="Student"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Student
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" component="p" style={{height: '80%'}}>
                                        This platform is used by students to help them organise and manage their individual workload. The features within this tool help the student track workload and provide useful information to lecturers with the aim of improving the students modules.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:25, float:'left', left:'50%'}}><div><Link to={'/lecturer'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: 300}}
                                    image={require('./images/lectcard.png')}
                                    title="Lecturer"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2"  >
                                        Lecturer
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" component="p"  style={{height: '80%'}}>
                                        This is platform is used by lecturers to improve and manage the modules which they oversee. The features within this tool help the lecturer mange module content, view student workload distribution and gather module feedback.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:25, float:'left'}}><div><Link to={'/coordinator'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: 300}}
                                    image={require('./images/coordcard.png')}
                                    title="Coordinators"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Coordinator
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" component="p"  style={{height: '80%'}}>
                                        This platform is used by coordinators to review and organise a courses content and workload. The features within this tool provide a course overview which the coordinator can use to identify and implement positive changes.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
    
                </div>
    
                <div className="CourseInfoBox">
                    <box>
                        <Typography style={{fontSize: '20px', fontFamily: 'Titillium Web, sans-serif'}}>
                            ModuleM is a platform for third level education institutes to help with organisation, workload management and academic planning throughout the year.
                        </Typography>
                        <Typography style={{fontSize: '14px', fontFamily: 'Titillium Web, sans-serif'}} >
                            ModuleM was created by a group of students from Trinity College Dublin and University of Sao Paulo. The sites' features and functions have been developed from user feedback and testing over the course of a year.
                        </Typography>
                    </box>
                </div>
            </div>
          );
    }

    render(){
      return this.renderContent();
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
