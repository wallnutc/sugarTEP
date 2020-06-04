import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, TimeSeries);

function TimelineComponent(props){
  console.log("in simulated graph: "+props.end);
  const [response,setResponse] = useState({});
    var data = {
        activityID: props.activityID,
        courseID: props.courseID,
        start: props.start.split('T')[0],
        end: props.end.split('T')[0],
        hours: props.hours,
        distribution: props.distribution
    }
  console.log("activityTimeline", data);
  var startInt = new Date(props.start);
  var endInt = new Date(props.end);
  startInt.setDate(startInt.getDate()-14);
  endInt.setDate(endInt.getDate()+14);
  startInt = startInt.toLocaleDateString('en-GB', {
    year: 'numeric', month: 'short', day: 'numeric'
  }).replace(/ /g, '-').split('-');
  endInt = endInt.toLocaleDateString('en-GB', {
    year: 'numeric', month: 'short', day: 'numeric'
  }).replace(/ /g, '-').split('-');

  var startInterval = startInt[2] + '-' + startInt[1] + '-' + startInt[0]
  var endInterval = endInt[2] + '-' + endInt[1] + '-' + endInt[0]



  useEffect(() => {
    var url = 'https://mvroso.pythonanywhere.com/editTimelineByActivity';
    //console.log(url);
    fetch(url, {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(data),
        headers: new Headers({"content-type": "application/json"})
    }).then((response) => response.json())
       .then((responseJson) => {
         setResponse(responseJson);
       })
       .catch((error) => {
         console.error(error);
       });
  },[props.activityID, props.end, props.hours, props.distribution, props.courseID]);
  if(response.total != undefined){
    const data = response.total;
    const schema = response.schema;
    var binning = null;
    if (props.bin == "Month"){
      binning = {
        "day": [],
        "year": [],
        "month": [1]
      }
    }
    if (props.bin == "Week"){
      binning = {
        "day": [6],
        "month": [],
        "year": []
      }
    }
    if (props.bin == "Semester"){
      binning = {
        "day": [],
        "month": [],
        "year": [1]
      }
    }
    if (props.bin == "Day"){
      binning = {
        "day": [1],
        "month": [],
        "year": []
      }
    }
    const dataSource = {
        chart: {
        },
        navigator: {
          enabled: 0
        },
        legend: {
          enabled: 0,
          position: "bottom"
        },
        chart: {
        },
        series: "Course",
        yaxis: [
        {
            plot: [
            {
                value: "Hours",
                type: "column",
                aggregation: "sum"
            }
            ],
            format: {
            suffix: "H"
            }
        }
        ],
        xAxis: {
            binning: binning,
            initialinterval: {
                from: startInterval,
                to: endInterval
            }
        }
    };

    const timeseriesDs = {
        type: "timeseries",
        width: "100%",
        height: "90%",
        dataSource: dataSource
    }
    const fusionTable = new FusionCharts.DataStore().createDataTable(data,schema);
    timeseriesDs.dataSource.data = fusionTable;
    return (
        <div>
          {dataSource.data ? (<ReactFC {...timeseriesDs} />) : ("loading")}
        </div>
      );

  }
  else return <div></div>
};

export default TimelineComponent;
