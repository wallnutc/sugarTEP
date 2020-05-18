import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// Resolves charts dependancy
charts(FusionCharts);


function PieComponent (props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'http://mvroso.pythonanywhere.com/activityTypePieChartsByModule' + props.moduleID.toString();
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
    
    if(response.ByHours != undefined){
        const module = response.ByHours;
        const grade = response.ByGrade;
        var caption = null;
        var data = null;
        var centerlabel = null;

        if (props.type == "hours"){
          data = module;
          caption = "Year Breakdown by Hours";
        }
        else if (props.type == "grade"){
          data = grade;
          caption = "Year Breakdown by Grade";
        }
        const datasource = {
          chart: {
            caption: caption,
            bgColor: "#ffffff",
            startingAngle: "310",
            showBorder: "0",
            showLabels: "0",
            showValues: "1",
            legendCaption: "Activities",
            legendCaptionBold: "1",
            legendItemFont: "Rubik",
            legendShadow: "1",
            legendBorderColor: "#CCCCCC",
            legendBgAlpha: "20",
            legendBorderThickness: "1",
            legendCaptionFont: "Rubik",
            legendCaptionFontSize: "14",
            legendCaptionFontColor: "#333333",
            plotHighlightEffect: "fadeout",
            legendPosition: "bottom",
            legendBgColor: "#ffffff",
            legendAllowDrag: "0",
            legendScrollBgColor: "#ffffff",
            showLegend: "1",
            centerLabelBold: "1",
            enableMultiSlicing: "0",
            useEllipsesWhenOverflow:"1",
            centerLabelBold: "1",
            showTooltip: "0",
            decimals: "1",
            theme: "fusion"
          },
          data: data
        }
        
        return (
            <ReactFusioncharts
                type= "pie2d"
                width= "90%"
                height= "90%"
                dataFormat= "json"
                dataSource= {datasource}
            />
        );
    }
    else {
        console.log("Failed Render");
        return <div></div>
    }
  };
  
  export default PieComponent;