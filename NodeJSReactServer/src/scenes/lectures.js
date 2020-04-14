import React from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import Items_list from "../components/items_list";

function Lectures () {
  const headerContent = {title:"Lectures", imgPath: require("../images/icons/lectures.svg")};
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>

        <div className="filter">
            <FilterSelector />
        </div>
        
        <div className="main" >
          <Items_list/>
        </div>
      </div>
    );
}

export default Lectures;
