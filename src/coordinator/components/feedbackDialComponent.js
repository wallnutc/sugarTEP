import React ,{useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);
// Resolves charts dependancy

function FeedbackDialByQuestion(props){
    //console.log("dial rendered on enter");
    //console.log(props.type);
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'https://mvroso.pythonanywhere.com/feedbackBy' + props.type.toString() + props.activityID.toString()
      //console.log("dial rendered");
      //console.log(url);
      fetch(url)
         .then((response) => response.json())
         .then((responseJson) => {
           setResponse(responseJson);
         })
         .catch((error) => {
           console.error(error);
         });
    },[props.activityID, props.type]);
    var i, q=null
    var data = null
    if(response.Questions != undefined){
        data = response.Questions

        for (i=0; i< data.length; i++){
            if(data[i].question == props.questionName){
                q = data[i];
            }

        }
        if (q == null){
            //console.log("Failed Dial Render, Question Not Found");
            return <div></div>
        }
        const chartConfigs = {
            type: 'angulargauge',// The chart type
            width: 250, // Width of the chart
            height: 75, // Height of the chart
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
