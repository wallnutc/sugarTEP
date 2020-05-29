import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, TimeSeries);

function TimelineComponent(props){
  const [response,setResponse] = useState({});
  useEffect(() => {
    var url = 'https://mvroso.pythonanywhere.com/studentTimelineByCourse' + props.courseID;
    console.log(url);
    fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {
         setResponse(responseJson);
       })
       .catch((error) => {
         console.error(error);
       });
  },[]);
  if(response.data != undefined){
    const data = response.data;
    const schema = response.schema;
    const dataSource = {
        navigator: {
          enabled: 0
        },
        legend: {
          enabled: 1,
        },
        chart: {
        },
        caption: {
        text: "Workload To Date"
        },
        series: "User",
        yaxis: [
        {
            plot: [
            {
                value: "Hours",
                type: "line",
                aggregation: "sum"
            }
            ],
            format: {
            suffix: "H"
            }
        }
        ],
        xAxis: {
          binning: {
            "day": [1,6],
            "month": [1]
          }
        }
    };

    const timeseriesDs = {
        type: "timeseries",
        width: "95%",
        height: "100%",
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
