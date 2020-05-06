import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// Resolves charts dependancy
charts(FusionCharts);


function PieComponent (props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'http://mvroso.pythonanywhere.com/activityTypePieChartsByCourse' + props.courseID;
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
    
    if(response.ByActivity != undefined){
        const module = response.ByModule;
        const activity = response.ByActivity;
        const grade = response.ByGradeAvg;
        var caption = null;
        var data = null;
        var centerlabel = null;

        if (props.type == "module"){
          data = module;
          caption = "Year Breakdown by Module Hours";
          centerlabel = "$label: $value hours";
        }
        else if (props.type == "activity"){
          data = activity;
          caption = "Year Breakdown by Activity Type Hours";
          centerlabel = "$label: $value hours";
        }
        else if (props.type == "grade"){
          data = grade;
          caption = "Year Breakdown by Average Activity Type Grade";
          centerlabel = "$label: $value%"
        }
        const datasource = {
          chart: {
            caption: caption,
            bgColor: "#ffffff",
            startingAngle: "310",
            showBorder: "0",
            legendNumColumns: "1",
            plotHighlightEffect: "fadeout",
            legendPosition: "bottom",
            legendAllowDrag: "0",
            legendScrollBgColor: "#ffffff",
            showLegend: "1",
            defaultCenterLabel: props.label,
            centerlabel: centerlabel,
            centerLabelBold: "1",
            showTooltip: "0",
            showLabels: "0",
            decimals: "1",
            theme: "fusion"
          },
          data: data
        }
        
        return (
            <ReactFusioncharts
                type= "doughnut2d"
                width= "90%"
                height= "90%"
                dataFormat= "json"
                dataSource= {datasource}
            />
        );
    }
  else return <div></div>
};
  
  export default PieComponent;