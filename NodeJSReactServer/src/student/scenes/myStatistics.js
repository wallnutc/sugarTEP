import React ,{Components} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import CanvasComponent from "../components/canvasComponent"

function MyStatistics () {

  const headerContent = {title:"My Statistics", imgPath: require("../images/icons/myStatistics.svg")};
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>
        <div className="main" >
          <CanvasComponent />
        </div>

      </div>
    );
}

export default MyStatistics;
{/*
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
