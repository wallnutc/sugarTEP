  import React ,{useState, useEffect} from 'react';
  import FusionCharts from 'fusioncharts';
  import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import ReactFC from 'react-fusioncharts';
  
  ReactFC.fcRoot(FusionCharts, PowerCharts, FusionTheme);
  
  
  function NestedPieComponent (props){
    const [response,setResponse] = useState({});
    useEffect(() => {
        var url = 'https://mvroso.pythonanywhere.com/nestedPieByCourse' + props.courseID;
        //console.log(url);
        fetch(url)
           .then((res) => res.json())
           .then((responseJson) => {
             setResponse(responseJson);
           })
           .catch((error) => {
             console.error(error);
           });
      },[]);
      
      if(response != undefined){
          const dataSource = {
            chart: {
              caption: "Total Year Breakdown By Hours",
              subcaption: props.label,
              showplotborder: "1",
              showLabels: "0",
              plotHighlightEffect: "fadeout",
              pieborderthickness: "5",
              piebordercolor: "#FFFFFF",
              plotfillalpha: "100",
              hoverfillcolor: "#CCCCCC",
              numberprefix: "$",
              theme: "fusion",
              plottooltext:"<b>$label</b> contributed <b>$value hours</b>, <b>$percentValue</b>",
              highlightParentPieSlices: "1",
              highlightChildPieSlices: "1"
            },
            category: response
          };
          
          return (
            <ReactFC
            type="multilevelpie"
            width="95%"
            height="95%"
            dataFormat="JSON"
            dataSource={dataSource}
          />
          );
      }
      else return <div></div> 
  };
    
    export default NestedPieComponent;
