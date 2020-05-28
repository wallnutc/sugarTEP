import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// Resolves charts dependancy
charts(FusionCharts);

function FeedbackBarByQuestion(props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'https://mvroso.pythonanywhere.com/feedbackBy' + props.type.toString() + props.activityID.toString()
      console.log(url);
      fetch(url)
         .then((response) => response.json())
         .then((responseJson) => {
           setResponse(responseJson);
         })
         .catch((error) => {
           console.error(error);
         });
    },[props.activityID]);
    var i, q, dataType, data = null
    if(response.Questions != undefined){
        data = response.Questions;
        console.log("dataFeedback",data);
        console.log("Question",props.questionName);
        for (i=0; i< data.length; i++){
            if(data[i].question == props.questionName){
            q = data[i];
            }
        }
        if (q == null){
            console.log("Failed Bar Render, Question Not Found");
            return <div>No responses yet for {props.questionName}.</div>
        }
        const bardataSource = {
        chart: {
            caption: "Distribution of responses for " + q.question,
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
                height= "300"
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

export default FeedbackBarByQuestion;
