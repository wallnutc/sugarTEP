import React ,{Components} from 'react';
import Header from "../components/header";
import TimelineComponent from "../components/graph_components/timelineComponent";
import PieCourseComponent from "../components/graph_components/pieCourseComponent";

function MyStatistics (props) {
  console.log(props.student.label);
  const headerContent = {title:"My Statistics", imgPath: require("../images/icons/myStatistics.svg")};
  if(props.student != undefined){
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>
        <div className="main" style = {{textAlign: 'center'}}>

          <div style = {{fontWeight: 300, width:'90%', height: '100%', textAlign: 'justify', display: 'inline-block', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}> Overview of the expected workload for your entire year, divided by module, activity type, hourly contribution and grade contribution.</div>
          <div style = {{margin:'12px 0 0 5% ', fontWeight: 300, color:'#AFAFAF',textAlign: 'justify' }}> view by: </div>
          <div style = {{display: 'inline-block', position: 'relative', height: 800}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "module"/></div>

          <div style = {{display: 'inline-block',position: 'relative', height: 800}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "activity"/></div>

          <div style = {{display: 'inline-block', position: 'relative', height: 800}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "grade"/></div>

          <div style = {{position: 'relative', height: 400, width: "100%"}}>
          <TimelineComponent courseID = {props.student.course_ID} label = {props.student.label}/></div>
        </div>

      </div>
    );
  }
  else return <h4 style={{textAlign: "center"}}>Loading...</h4>
}

export default MyStatistics;
{/*//<TimelineComponent courseID = "1" label = "Engineering year 2"/>
<canvas ref='canvas2' className="canvas2" style= {{position: 'fixed',top:'150px',width: '100%'}} ></canvas>
  <div className="filter">
    <div style={{}}>
      <FilterSelector />
    </div>
  </div>
  <div className="main" >
    <Items_list/>
  </div>
*/}
