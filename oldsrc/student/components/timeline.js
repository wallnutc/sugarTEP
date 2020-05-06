import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, TimeSeries);

export default function timelineCourse(props) {
    const data = props.response.byModule;
    const schema = props.response.schema;
    const binning = props.response.bin;
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
        width: "100%",
        height: "1000",
        dataSource: dataSource
    }
    const fusionTable = new FusionCharts.DataStore().createDataTable(data,schema);
    timeseriesDs.dataSource.data = fusionTable;
    return (
        <div>
          {dataSource.data ? (<ReactFC {...timeseriesDs} />) : ("loading")}
        </div>
      );
};