import React from "react"
import Item_lecture from "./item_lecture"
import Item_assignment from "./item_assignment"
import Item_study from "./item_study"

class Items_list extends React.Component {
  render(){
    var item_assignment_1 = {
      module_code: "3E7",
      module_name: "Engineering Math",
      module_lecturer: "Prof. Marilda Fernandes",
      assignment_title: "Linear Algebra Assignment",
      assignment_begin: "5:40 PM",
      assignment_finish: "6:25 PM",
      assignment_day: "Today",
      assinment_hour: "7:15 AM",
      assignment_suggested: "50",
      assignment_real: "25"
    }
    var item_study_1 = {
      module_code: "3E2",
      module_name: "Accountability",
      module_lecturer: "Juliana Lima",
      study_title: "Depreciation",
      study_begin: "6:50 PM",
      study_finish: "7:20 PM",
      study_day: "Today",
      study_hour: "7:15 AM",
      study_suggested: "50",
      study_real: "25"
    }
    var item_lecture_1 = {
      module_code: "3E2",
      module_name: "Accountability",
      module_lecturer: "Juliana Lima",
      lecture_title: "Depreciation",
      lecture_begin: "7:30 AM",
      lecture_finish: "9:45 AM",
      lecture_description: "Depreciation is an accounting method of allocating the cost of a tangible or physical asset"
    }
    var item_lecture_2 = {
      module_code: "3E9",
      module_name: "Chemical Processes",
      module_lecturer: "Marcio Silva",
      lecture_title: "Balancing Chemical Equations",
      lecture_begin: "10:30 AM",
      lecture_finish: "11:45 AM",
      lecture_description: "A chemical equation is a written symbolic representation of a chemical reaction"
    }
    var item_lecture_3 = {
      module_code: "3E7",
      module_name: "Engineering Math",
      module_lecturer: "Marilda Fernandes",
      lecture_title: "Modular Inequalities",
      lecture_begin: "1:30 PM",
      lecture_finish: "3:55 PM",
      lecture_description: "If you are talking about what engineers use on a daily basis, well pretty much all of engineering"
    }
    return (
      <div>
        <Item_lecture item={item_lecture_1}/>
        <Item_lecture item={item_lecture_2}/>
        <Item_lecture item={item_lecture_3}/>
        <Item_assignment item={item_assignment_1}/>
        <Item_study item={item_study_1}/>
      </div>
    );
  }
}

export default Items_list
