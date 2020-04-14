import React ,{Component} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import ListRenderer from "../components/listRenderer";


class MyDay extends Component {
  constructor(props){
    super(props);
    this.headerContent = {title:"My Day", imgPath: require("../images/icons/myDay.svg")};
    this.state = {myDay:[
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

  }


render(){
  return (
    <div >
      <div className="header">
        <Header imgPath = {this.headerContent.imgPath}  title = {this.headerContent.title}/>
      </div>
      <div className="filter">
        <div>
          <FilterSelector />
        </div>
      </div>
      <div className="main" >
        <ListRenderer renderContent={this.state.myDay}/>
        }
      </div>
    </div>
  );


}

}

export default MyDay;
{/*

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
