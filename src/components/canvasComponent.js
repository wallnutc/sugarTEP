import React ,{Components, useEffect} from 'react';
import StackedColumnChart from './stackedColumnChart';
import PieChart from './pieChart';

function CanvasComponent (){
  console.log("entreeeii");
  useEffect(() => {

      fetch('http://mvroso.pythonanywhere.com/coordinatorGraphs').then(res => res.json()).then(res => {
          console.log(res);

      });
  }, []);

        return (
          <div >
            <PieChart />
            <StackedColumnChart/>

          </div>
        );

}

export default CanvasComponent;
