import React,{useState,useEffect} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import ListRenderer,{ActivityPanel} from "../components/listRenderer";
import EvaluationActivity from "../components/evaluationActivity";
import InfiniteScroll from "react-infinite-scroll-component";

function MyActivities (props) {
  const batch = 5;
  const headerContent = {title:"My Activities", imgPath: require("../images/icons/myActivities.svg")};
  const [activities,setActivities] = useState(()=>props.activities.length <=batch ? props.activities:props.activities.slice(0,batch))
  const [panels, setpanels] = useState( () => <div style={{height:'100%',width:'100%',backgroundColor:'red'}}> AAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHH </div>);
  const [renderIndex, setRenderIndex] = useState(batch);
  const [hasMore,setHasMore] =  useState(true);

  const fetchMoreData = () => {
  var end = renderIndex + batch;
  if(props.activities.length < renderIndex + batch){
    end = props.activities.length;
    setHasMore(false);
  }

  setActivities(activities.concat(props.activities.slice(renderIndex, end)));
  setRenderIndex(end);
};

// useEffect(() => {
//    setpanels(()=> {return (<ActivityPanel item={props.activities[0]} />)});
//    setIsLoaded(true);
//
// },[]);
  // useEffect(() => {
  //   const temp = props.activities.map((activity)=><ActivityPanel item={activity} />);
  //    setpanels(temp) ;
  //    setIsLoaded(true);
  //
  // },[]);

  // const [loaded, setLoaded] = useState(false);
  //
  // var Panels = () => <div/>
  // useEffect(() => {
  //   Panels = () => props.activities.map((activity)=><ActivityPanel item={activity} />);
  //   setLoaded(true);
  // },[]);
  // useEffect(() => {
  //     var tempAct = [];
  //     setActivities(tempAct);
  //     props.modules.map((module)=>{
  //     const header = {module_code: module.module_code,
  //                     module_name: module.module_name,
  //                     module_lecturer: module.module_lecturer
  //                   };
  //     module.activities.map((activity) => {
  //       const activityFull = {...header,
  //         ...activity};
  //       tempAct.push(activityFull);
  //     })
  //
  //   })
  //   console.log(tempAct);
  //   tempAct.sort((a,b) => (a.due_date > b.due_date) ? 1 : ((b.due_date > a.due_date) ? -1 : 0));
  //   console.log(tempAct);
  //   setActivities(tempAct);
  //   setLoaded(true);
  // },[]);


    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>
        <div className="filter">
          <div>
            <FilterSelector />
          </div>
        </div>
        <div className="main" >
        <InfiniteScroll
          dataLength={activities.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {activities.map((i, index) => (
            <div key={index}>
              <ActivityPanel item={i} />
            </div>
          ))}
        </InfiniteScroll>
        {/*panels*/

        }
        {/*state.assignments.map((item)=>{
          return <ListRenderer item = {item} />
<ListRenderer code = {props.modules[0].module_code} item = {props.modules[0].activities[0]} />
        })*/
      }

        {/*
          <div style = {{position:"fixed", top:0,textAlign:'center', width: '100%', height: '100%', zIndex:3}}>
            <div style = {{ borderRadius:'5%',margin:'auto', background: 'white', width: '328px',height: '608px'}}>
              <EvaluationActivity activity = {state.assignments[0]}/>
            </div>
          </div>
          */}
        </div>
      </div>
    );
}

export default MyActivities;
