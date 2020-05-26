import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// Resolves charts dependancy
charts(FusionCharts);

function FeedbackChartsByQuestion(props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'https://mvroso.pythonanywhere.com/feedbackBarChartsByModule' + props.moduleID.toString()
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
            console.log("Failed Bar Render, Question Not Found");
            return <div>No Responses Yet For {props.questionName}</div>
        }
        const bardataSource = {
        chart: {
            caption: "Distribution of responses for " + q.question + " by " + props.type,
            labelDisplay: "Auto",
            xaxisname: "Score",
            yaxisname: "# of Entries",
            theme: "fusion"
        },
        data: q.bardata,
        yAxis: [{
            format: {
                round: "0"
            }
        }]
        }
        return (
            <ReactFusioncharts
                type= "column2d"
                width= "100%"
                height= {props.height}
                dataFormat= "json"
                dataSource= {bardataSource}
            />
        );
    }
    else {
        console.log("Failed Bar Render");
        return <div></div>
    }
}

export default FeedbackChartsByQuestion;