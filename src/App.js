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
import StudentSVG from "./images/student.svg"

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

                <p className="CourseName1" >Navigate <b style={{color:'#003EAA'}}>&nbsp;ModuleM&nbsp;</b> as a</p>

                <div  style={{ display: 'flex', justifyContent: 'center'}}>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: "400px", margin:25, float:'left'}}><div><Link to={'/lecturer'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: "360px",boxShadow:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{ position:'relative',left:'41px',height: '360px',width:'396px'}}
                                    image={require('./images/lecturer.svg')}
                                    title="Lecturer"
                                />
                                <CardContent>
                                    <div className='main_button'  style={{background:'#00A2B1'}} >
                                        Lecturer
                                    </div>
                                    <div className='card_description'>
                                      Save time and improve your quality work by planning classes and activities based on students’ experience data
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: '400px', margin:25, float:'left', left:'50%'}}><div><Link to={'/student'} style={{ textDecoration: 'none' }}>
                        <Card style={{ marginTop:'50px',maxWidth: '360px', boxShadow:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{height: '360px',width:'100%'}}
                                    image={require('./images/student.svg')}
                                    title="Student"
                                />


                                <CardContent>
                                    <div className='main_button'  style={{background:'#FF6A6A'}}>
                                        Student
                                    </div>
                                    <div className='card_description'>
                                        Take the lead of your own university experience by managing your time and helping lecturers to improve their modules.
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: '400px', margin:25, float:'left', left:'50%'}}><div><Link to={'/lecturer'} style={{ textDecoration: 'none' }}>
                        <Card style={{width:'369px', maxWidth: '400px', boxShadow:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{height: '360px',width:'88%'}}
                                    image={require('./images/coordinator.svg')}
                                    title="Coordinator"
                                />
                                <CardContent>
                                    <div className='main_button'  style={{background:'#F28F00'}}>
                                        Coordinator
                                    </div>
                                    <div className='card_description'>
                                      Change has never been so easy, manage your course based on a holistic view of the students’ university experience
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>

                </div>

                <div className="CourseInfoBox">
                    <box>
                        <p className="infoTitle">About <b style={{color: '#003EAA'}}>ModuleM</b></p>
                        <p className='info'> ModuleM is a planning and communication tool that allows easy management of information regarding classes, assignments and all aspects of student learning - strengthening the academic-student partnership and optimising the university experience for everyone.</p>
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
