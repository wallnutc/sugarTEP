import React,{Components, useState, useEffect} from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "../lib/ReactFC";

ReactFC.fcRoot(FusionCharts, TimeSeries);

export default function timelineCourse(props){
    const [response,setResponse] = useState({});
    useEffect(() => {
        var url = "http://mvroso.pythonanywhere.com/timelineByCourse" + props.courseID
        fetch(url)
         .then((response) => response.json())
         .then((responseJson) => {
           setResponse(responseJson);
         })
         .catch((error) => {
           console.error(error);
         });
    },[]);

    const data = response[1];
    const schema = response[2];
    const binning = response[3];
    const dataSource = {
        chart: {},
        caption: {
        text: "Total Hours Over Year"
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
                aggregation: "sum"
            }
            ],
            title: "Hours Count",
            format: {
            suffix: " Hours"
            }
        }
        ],
        xAxis: {
        binning: binning
        },
    };

    const timeseriesDs = {
        type: "timeseries",
        renderAt: props.container,
        width: "100%",
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
  