import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// Resolves charts dependancy
charts(FusionCharts);


function PieComponent (props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'https://mvroso.pythonanywhere.com/activityTypePieChartsByCourse' + props.courseID;
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
        var legendcaption = null;
        if (props.type == "module"){
          data = module;
          caption = "Year Breakdown by Module Hours";
          legendcaption = "Modules";
          centerlabel = "$label: $value hours";
        }
        else if (props.type == "activity"){
          data = activity;
          caption = "Year Breakdown by Activity Type Hours";
          legendcaption = "Activities";
          centerlabel = "$label: $value hours";
        }
        else if (props.type == "grade"){
          data = grade;
          caption = "Year Breakdown by Average Activity Type Grade";
          legendcaption = "Activities";
          centerlabel = "$label: $value%"
        }
        const datasource = {
          chart: {
            caption: caption,
            bgColor: "#ffffff",
            startingAngle: "310",
            showBorder: "0",
            legendNumColumns: "1",
            enableMultiSlicing: "0",
            plotHighlightEffect: "fadeout",
            legendPosition: "bottom",
            legendCaption: legendcaption,
            legendCaptionBold: "1",
            legendItemFont: "Rubik",
            legendItemFontSize: "12",
            legendShadow: "1",
            legendBorderColor: "#CCCCCC",
            legendBgAlpha: "20",
            legendBorderThickness: "1",
            legendCaptionFont: "Rubik",
            legendCaptionFontSize: "14",
            legendCaptionFontColor: "#333333",
            pieRadius: "80%",
            doughnutRadius: "60%",
            legendBgColor: "#ffffff",
            legendAllowDrag: "0",
            legendScrollBgColor: "#ffffff",
            showLegend: "1",
            defaultCenterLabel: props.label,
            centerlabel: centerlabel,
            centerLabelBold: "1",
            showTooltip: "0",
            showLabels: "0",
            showValues: "0",
            decimals: "1",
            theme: "fusion"
          },
          data: data
        }
        
        return (
            <ReactFusioncharts
                type= "doughnut2d"
                width= "80%"
                height= "100%"
                dataFormat= "json"
                dataSource= {datasource}
            />
        );
    }
  else return <div></div>
};
  
  export default PieComponent;