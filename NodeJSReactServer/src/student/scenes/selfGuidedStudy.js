import React ,{Components} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import Items_list from "../components/items_list";

function SelfGuidedStudy () {
  const headerContent = {title:"Self-Guided Study", imgPath: require("../images/icons/selfGuidedStudy.svg")};
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>
        <div className="filter">
          <div style={{}}>
            <FilterSelector />
          </div>
        </div>
        <div className="main" >
          <Items_list/>
        </div>
      </div>
    );
}

export default SelfGuidedStudy;
{/*
*/}
