import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, TimeSeries);

function TimelineModuleComponent(props){
  const [response,setResponse] = useState({});
  useEffect(() => {
    var url = 'http://mvroso.pythonanywhere.com/timelineByModule' + props.moduleID;
    console.log(url);
    fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {
         setResponse(responseJson);
       })
       .catch((error) => {
         console.error(error);
       });
  },[props.moduleID]);
  if(response.byActivity != undefined){
    const data = response.byActivity;
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
        "year": [],
        "month": [],
        "day": [6]
      }
    }
    if (props.bin == "Semester"){
      binning = {
        "day": [],
        "month": [],
        "year": [1]
      }
    }
    const dataSource = {
        navigator: {
          enabled: 0
        },
        legend: {
          enabled: 0,
          position: "right"
        },
        chart: {
        },
        caption: {
        text: "Total Hours By Activity Type (" + props.bin + " View)"
        },
        subcaption: {
        text: props.label
        },
        series: "Module",
        yaxis: [
        {
            plot: [
            {
                value: "Hours",
                type: "column",
                aggregation: "sum",
            }
            ],
            format: {
            suffix: "H"
            }
        }
        ],
        xAxis: {
          binning: binning
        }
    };

    const timeseriesDs = {
        type: "timeseries",
        width: "95%",
        height: "95%",
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

export default TimelineModuleComponent;
