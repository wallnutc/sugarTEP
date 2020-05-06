import React ,{Components, useState, useEffect} from 'react';
import TimelineChart from './timeline';
function CanvasComponent (){
  return (
      <div>
        <TimelineChart consoleID = "1" label = "Engineering" type = "activity"/>
      </div>);


}
export default CanvasComponent;
