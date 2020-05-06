import React ,{Component, useState} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import ListRenderer from "../components/listRenderer";
import {LecturePanel,ActivityPanel} from "../components/listRenderer";
import InfiniteScroll from "react-infinite-scroll-component";


function MyDay (props) {
  const today = "2018-Sep-14";
  const today2 = "2018-09-14T00:00:00"
  const headerContent = {title:"My Day", imgPath: require("../images/icons/myDay.svg")};
  const batch = 5;
  const activeActivities = props.activities.filter((item) => new Date(item.start_date >= new Date(today2)));
  const [activities,setActivities] = useState(()=>activeActivities.length <=batch ? activeActivities:activeActivities.slice(0,batch))
  const [panels, setpanels] = useState( () => <div style={{height:'100%',width:'100%',backgroundColor:'red'}}> AAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHH </div>);
  const [renderIndex, setRenderIndex] = useState(batch);
  const [hasMore,setHasMore] =  useState(true);

  const fetchMoreData = () => {
  var end = renderIndex + batch;
  if(activeActivities.length < renderIndex + batch){
    end = activeActivities.length;
    setHasMore(false);
  }

  setActivities(activities.concat(activeActivities.slice(renderIndex, end)));
  setRenderIndex(end);
};



return (
  <div >
    <div className="header">
      <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
    </div>
    <div className="filter">
      <div>
        <FilterSelector />
      </div>
    </div>
    <div className="main" >

    {props.classes.filter((item) =>item.date==today ).map((item)=> <LecturePanel item = {item} /> )}
    <div style = {{marginLeft:'24px', fontFamily: 'Rubik', fontStyle: 'normal',fontSize: '14px', lineHeight: '17px'}}> Activities backlog</div>
    <InfiniteScroll
      dataLength={activities.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {activities.map((i, index) => (
        <div key={index}>
          <ActivityPanel item={i} />
        </div>
      ))}
    </InfiniteScroll>

    </div>
  </div>
);

}

export default MyDay;
{/*
  {
    activityType:"assignment",
    module_code: "3E2",
    module_name: "Accountability",
    module_lecturer: "Juliana Lima",
    title: "Depreciation",
    begin: "6:50 PM",
    finish: "7:20 PM",
    study_hour: "7:15 AM",
    study_suggested: 50,
    study_real: 20
  },
<ListRenderer renderContent={myDay.myDay} />
  function MyDay () {
    const headerContent = {title:"My Day", imgPath: require("../images/icons/myDay.svg")};
    var data = {myDay:[
      {
        activityType:"assignment",
        module_code: "3E7",
        module_name: "Engineering Math",
        module_lecturer: "Prof. Marilda Fernandes",
        title: "Linear Algebra Assignment",
        begin: "5:40 PM",
        finish: "6:25 PM",
        assinment_hour: "7:15 AM",
        assignment_suggested: 50,
        assignment_real: 25
      },
      {
        activityType:"selfGuidedStudy",
        module_code: "3E2",
        module_name: "Accountability",
        module_lecturer: "Juliana Lima",
        title: "Depreciation",
        begin: "6:50 PM",
        finish: "7:20 PM",
        study_hour: "7:15 AM",
        study_suggested: 50,
        study_real: 20
      },
      { activityType:"lecture",
        module_code: "3E2",
        module_name: "Accountability",
        module_lecturer: "Juliana Lima",
        title: "Depreciation",
        begin: "7:30 AM",
        finish: "9:45 AM",
        lecture_description: "Depreciation is an accounting method of allocating the cost of a tangible or physical asset"},
    {
      activityType:"lecture",
      module_code: "3E9",
      module_name: "Chemical Processes",
      module_lecturer: "Marcio Silva",
      title: "Balancing Chemical Equations",
      begin: "10:30 AM",
      finish: "11:45 AM",
      lecture_description: "A chemical equation is a written symbolic representation of a chemical reaction"
    },
    {
      activityType:"lecture",
      module_code: "3E7",
      module_name: "Engineering Math",
      module_lecturer: "Marilda Fernandes",
      title: "Modular Inequalities",
      begin: "1:30 PM",
      finish: "3:55 PM",
      lecture_description: "If you are talking about what engineers use on a daily basis, well pretty much all of engineering"
    }
  ]

  };

      return (
        <div >
          <div className="header">
            <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
          </div>
          <div className="filter">
            <div>
              <FilterSelector />
            </div>
          </div>
          <div className="main" >
            <ListRenderer renderContent={data.myDay}/>
          </div>
        </div>
      );
  }
*/}
