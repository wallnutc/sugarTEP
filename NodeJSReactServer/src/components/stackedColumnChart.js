import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
export default function StackedColumnChart (props){

  const title = "Modules Overview by Week";
  const xlabel = "Week";
  const options = {
      title: {
          display: true,
          text: title,
          position: 'top'
      },
      scales: {
          xAxes: [{
              stacked: true,
              ticks: {
                  min: props.response.startAxis,
                  max: props.response.endAxis
              },
              scaleLabel: {
                  display: true,
                  labelString: xlabel,
                  fontSize: 14
              }
          }],
          yAxes: [{
              stacked: true,
              ticks: {
                      suggestedMin: 0.1
                  },
              scaleLabel: {
                      display: true,
                      labelString: 'Hours',
                      fontSize: 14
                  }
          }]
      },
      width:'600px',
      responsive: true,
      maintainAspectRatio: true,
  };
      var mydatasets = [
    				];

      var colorslist = ['rgba(199, 0, 57, 0.8)','rgba(255, 87, 51, 0.6)','rgba(255, 141, 26, 0.6)','rgba(237, 221, 83, 0.6)','rgba(87, 199, 133, 0.6)','rgba(0, 186, 173, 0.6)','rgba(42, 123, 155, 0.6)','rgba(61, 61, 107, 0.6)','rgba(81, 24, 73, 0.6)','rgba(144, 12, 63, 0.8)','rgba(63, 56, 68, 0.6)',];
      var borderlist = ['rgba(199, 0, 57, 1)','rgba(255, 87, 51, 1)','rgba(255, 141, 26, 1)','rgba(237, 221, 83, 1)','rgba(173, 212, 92, 1)','rgba(87, 199, 133, 1)','rgba(0, 186, 173)','rgba(42, 123, 155, 1)','rgba(61, 61, 107, 1)','rgba(81, 24, 73, 1)','rgba(144, 12, 63, 1)','rgba(63, 56, 68, 1)',];
      console.log("datasets = " + typeof(props.response.datasets));
      //var datasets3 = JSON.parse(props.response.datasets);

      console.log("datasets.key = " + Object.keys(props.response) );

      for(var j = 0; j < props.response.datasets.length; j++) {
          mydatasets.push({label: props.response.datasets[j].label, backgroundColor: colorslist[j], boderColor: borderlist[j], data: props.response.datasets[j].data.split(','), spanGraphs: true});
      }
      console.log(mydatasets);
      var subjectsData = {
          labels: props.response.labels.split(','),
          datasets: mydatasets
      }

    return  <Bar  data={subjectsData} options={options} />
}
{/*
  .split(',')
  var response = {
    "labels": "Teaching 1,Teaching 2,Teaching 3,Teaching 4,Teaching 5,Teaching 6,Teaching 7,Teaching 8,Teaching 9,Teaching 10,Teaching 11,Teaching 12,Revision 1,Exams 1,Christmas 1,Christmas 2,Christmas 3,Christmas 4,Christmas 5,Teaching 13,Teaching 14,Teaching 15,Teaching 16,Teaching 17,Teaching 18,Teaching 19,Teaching 20,Teaching 21,Teaching 22,Teaching 23,Teaching 24,Revision 2,Exams 2",
    "datasets": [
          {
          "label": "Introduction to Management Science",
          "data": "2.1,4.0,4.0,4.0,4.0,6.0,1.9,4.0,4.0,4.1,2.1,2.1,0,0,0,0,0,0,0,2.1,2.1,2.1,2.1,2.1,2.1,0,2.1,2.1,2.1,2.1,2.1,7.5,9.5"
          },
          {
          "label": "Introduction to Computing",
          "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.3,4.3,5.3,5.3,5.3,5.3,1.0,5.8,7.8,23.3,6.3,6.3,0,0"
          },
          {
          "label": "Introduction to Manufacturing",
          "data": "2.8,4.0,4.0,5.0,5.0,7.0,0,8.0,8.0,8.0,6.8,11.8,7.0,5.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
          },
          {
          "label": "Engineering Design II",
          "data": "4.0,6.1,7.8,7.8,7.6,6.9,1.9,6.5,7.9,6.9,6.3,4.6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
          },
          {
          "label": "Mechanics",
          "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.0,4.0,7.7,5.7,9.2,5.5,1.5,5.5,4.0,4.0,4.0,4.0,12.0,12.0"
          },
          {
          "label": "Electrical Engineering",
          "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.8,8.2,6.2,8.2,6.2,6.7,1.0,4.7,4.7,4.7,4.7,7.7,9,2"
          },
          {
          "label": "Chemistry",
          "data": "3.7,8.7,5.7,5.7,4.7,8.7,2.0,9.7,5.7,9.7,5.7,9.7,5.0,7.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
          },
          {
          "label": "Physics",
          "data": "2.5,3.5,3.5,3.5,3.5,3.5,1.0,3.5,3.5,3.5,3.5,12.5,10.0,10.0,0,0,0,0,0,0,4.3,1.3,5.6,1.3,5.6,1.3,5.6,1.3,5.6,1.3,1.3,0,2"
          },
          {
          "label": "Engineering Maths II",
          "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5.5,6.5,6.5,6.5,6.5,6.2,0.7,6.2,6.5,6.5,5.5,9.5,7.5,9.5"
          }, {
          "label": "Engineering Maths 1",
          "data": "6.7,9.7,9.7,9.7,9.7,9.1,2.6,9.1,9.7,9.7,9.7,11.7,5.0,7.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
          }
          ],
    "startAxis": "Teaching 1",
    "endAxis": "Exams 2"
  };
  var options = {
      title: {
          display: true,
          text: title,
          position: 'top'
      },
      scales: {
          xAxes: [{
              stacked: true,
              ticks: {
                  min: response.startAxis,
                  max: response.endAxis
              },
              scaleLabel: {
                  display: true,
                  labelString: xlabel,
                  fontSize: 14
              }
          }],
          yAxes: [{
              stacked: true,
              ticks: {
                      suggestedMin: 0.1
                  },
              scaleLabel: {
                      display: true,
                      labelString: 'Hours',
                      fontSize: 14
                  }
          }]
      }
  };
  {
    label: 'test1',
      data :[1]
    },
    {
      label: 'test2',
      data:  [2]
    }
  */}
