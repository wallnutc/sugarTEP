import React ,{Components, useState, useEffect} from 'react';
import StackedColumnChart from './stackedColumnChart';
import PieChart from './pieChart';

function CanvasComponent (){
  const [response,setResponse] = useState({});
  useEffect(() => {
    fetch('http://mvroso.pythonanywhere.com/coordinatorGraphs')
       .then((response) => response.json())
       .then((responseJson) => {
         setResponse(responseJson);
       })
       .catch((error) => {
         console.error(error);
       });
  },[]);

  if(response.datasets != undefined){
    return (
      <div>
        <PieChart />
        <StackedColumnChart response = {response}/>
      </div>);
  }
  else
    return <div> </div>;


}

export default CanvasComponent;
