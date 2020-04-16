import React from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import Items_list from "../components/items_list";

function MyActivities () {
  const headerContent = {title:"My Activities", imgPath: require("../images/icons/myActivities.svg")};
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
          <Items_list/>
        </div>
      </div>
    );
}

export default MyActivities;
