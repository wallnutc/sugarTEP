import React ,{useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);
// Resolves charts dependancy

function FeedbackDialByQuestion(props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'https://mvroso.pythonanywhere.com/feedbackBarChartsByModule' + props.moduleID.toString()
      //console.log(url);
      fetch(url)     
         .then((response) => response.json())
         .then((responseJson) => {
           setResponse(responseJson);
         })
         .catch((error) => {
           console.error(error);
         });
    },[props.moduleID]);
    var i, q, dataType, data = null
    if(response.byActivity != undefined){
        data = response;
        if(props.type == "activity"){
            dataType = data.byActivity;
        }
        if(props.type == "class"){
            dataType = data.byClass;
        }
        if(props.type == "module"){
            dataType = data.byModule;
        }
    
        for (i=0; i< dataType.length; i++){
            if(dataType[i].question == props.questionName){
            q = dataType[i];
            }
        }
        if (q == null){
            //console.log("Failed Dial Render, Question Not Found");
            return <div></div>
        }
        const chartConfigs = {
            type: 'angulargauge',// The chart type
            width: '100%', // Width of the chart
            height: props.height, // Height of the chart
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    lowerlimit: "0",
                    upperlimit: "5",
                    showValue: "0",
                    showLabel: "0",
                    theme: "fusion",
                    showtooltip: "0",
                    showTickMarks: "0",
                    showTickValues: "0"
                },
                "colorRange": {
                    color: [{minvalue: "0",maxvalue: "1.5",code: "#F2726F"},{minvalue: "1.5",maxvalue: "3",code: "#FFC533"},{minvalue: "3",maxvalue: "5",code: "#62B58F"}]
                },
                "dials":  { dial: [{value: q.dialvalue.toString()}]}
            }
        }
        return (
            <ReactFC
                {...chartConfigs}/>
            );
    }
    else {
        //console.log("Failed Dial Render");
        return <div></div>
    }
}

export default FeedbackDialByQuestion;