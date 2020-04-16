import React, { useState, useEffect } from 'react';

export default function MakeChart() {



    useEffect(() => {
        fetch('http://mvroso.pythonanywhere.com/coordinatorGraphs').then(res => res.json()).then(data => {
            console.log(data);
        });
    }, []);

  //check what errors occurred with myChart, but they aren't relevent, you just need it for things like myChart.destroy() if you wish to delete it
  //ctx1 will sort out where to put the chart.
  //invoke this useEffect by calling myChart somewhere


  return <div> </div>
}

//change your packages.json to include "proxy": "http://mvroso.pythonanywhere.com:5000"; !!!!!
{/*
  if(myChart == null){
      console.log("Uh Oh the Chart didn't generate")
  }
  const [myChart, makeStackedChart] = useState(0); //set your chart to null to begin with
  var canvas = document.getElementById("some place where this chart is going");
var ctx = canvas.getContext("2d");
  makeStackedChart(data, ctx, "bar", "Modules Overview", "Week");*/}
