import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// Resolves charts dependancy
charts(FusionCharts);


function StudentPieComponent (props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'http://mvroso.pythonanywhere.com/studentsByModule' + props.moduleID.toString();
      fetch(url)
         .then((response) => response.json())
         .then((responseJson) => {
           setResponse(responseJson);
         })
         .catch((error) => {
           console.error(error);
         });
    },[]);
    
    if(response.pie != undefined){
        const data = response.pie;
        var caption = "My Class by Courses";
        const datasource = {
          chart: {
            caption: caption,
            bgColor: "#ffffff",
            startingAngle: "310",
            showBorder: "0",
            showLabels: "0",
            showValues: "0",
            legendCaption: "Courses",
            legendCaptionBold: "1",
            legendItemFont: "Rubik",
            legendShadow: "1",
            legendBorderColor: "#CCCCCC",
            legendBgAlpha: "10",
            legendBorderThickness: "1",
            legendCaptionFont: "Rubik",
            legendCaptionFontSize: "14",
            legendCaptionFontColor: "#333333",
            plotHighlightEffect: "fadeout",
            legendPosition: "left",
            legendBgColor: "#ffffff",
            legendAllowDrag: "0",
            showLegend: "1",
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
                width= "100%"
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
  
  export default StudentPieComponent;