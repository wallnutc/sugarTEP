import React from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import ListRenderer from "../components/listRenderer";
import EvaluationActivity from "../components/evaluationActivity";
function MyActivities () {
  const headerContent = {title:"My Activities", imgPath: require("../images/icons/myActivities.svg")};
  const state = {assignments:[
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
          assignment_real: 25,
          expectedDifficulty: 10 ,
          expectedTime: 50,
          realTime: 25,
        },
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
        <ListRenderer renderContent={state.assignments}/>
        {/*<EvaluationActivity activity = {state.assignments[0]}/>*/}
        </div>
      </div>
    );
}

export default MyActivities;
