import React from 'react';
import {Pie} from 'react-chartjs-2';
export default function PieChart (){
  const response = {
  	"labels": "Introduction to Management Science,Introduction to Computing,Introduction to Manufacturing,Engineering Design II,Mechanics,Electrical Engineering,Chemistry,Physics,Engineering Maths II,Engineering Maths 1",
  	"datasets": [
  				{
  				"data": "102,83,86,74,86,81,95,106,93,122"
  				}
  				]
  }
  const title = "Modules Overview Total";
  var mydatasets = [];
  var colorslist = ['rgba(199, 0, 57, 0.8)','rgba(255, 87, 51, 0.6)','rgba(255, 141, 26, 0.6)','rgba(237, 221, 83, 0.6)','rgba(87, 199, 133, 0.6)','rgba(0, 186, 173, 0.6)','rgba(42, 123, 155, 0.6)','rgba(61, 61, 107, 0.6)','rgba(81, 24, 73, 0.6)','rgba(144, 12, 63, 0.8)','rgba(63, 56, 68, 0.6)',];
  var borderlist = ['rgba(199, 0, 57, 1)','rgba(255, 87, 51, 1)','rgba(255, 141, 26, 1)','rgba(237, 221, 83, 1)','rgba(173, 212, 92, 1)','rgba(87, 199, 133, 1)','rgba(0, 186, 173)','rgba(42, 123, 155, 1)','rgba(61, 61, 107, 1)','rgba(81, 24, 73, 1)','rgba(144, 12, 63, 1)','rgba(63, 56, 68, 1)',];

  for(var j = 0; j < response.datasets.length; j++) {
          mydatasets.push({backgroundColor: colorslist, boderColor: borderlist, data: response.datasets[j].data.split(','), spanGraphs: true});
  }
  const subjectsData = {
      labels: response.labels.split(','),
      datasets: mydatasets
  }


  var pieOptions = {
      legend: {
          display: true
      },
      title: {
                display: true,
                text: title,
                position: 'top',
                fontSize: 20,
                fontFamily: 'Roboto',
            },
      rotation: -0.7 * Math.PI,
  };

  return <Pie data={subjectsData} options={pieOptions} />;

}
