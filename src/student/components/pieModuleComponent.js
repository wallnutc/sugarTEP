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
          caption = "Year Breakdown by Module Hours";
          centerlabel = "$label: $value hours";
        }
        else if (props.type == "grade"){
          data = grade;
          caption = "Year Breakdown by Activity Type Grade";
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
  
  export default PieComponent;