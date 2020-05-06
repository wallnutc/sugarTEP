import React,{useState, useEffect} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import {LecturePanel} from "../components/listRenderer";
import InfiniteScroll from "react-infinite-scroll-component";

function Lectures (props) {
  const headerContent = {title:"Lectures", imgPath: require("../images/icons/lectures.svg")};
  const batch = 5;
  const [classes,setclasses] = useState(()=>props.classes.length <=batch ? props.classes:props.classes.slice(0,batch))
  const [panels, setpanels] = useState( () => <div style={{height:'100%',width:'100%',backgroundColor:'red'}}> AAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHH </div>);
  const [renderIndex, setRenderIndex] = useState(batch);
  const [hasMore,setHasMore] =  useState(true);

  const fetchMoreData = () => {
  var end = renderIndex + batch;
  if(props.classes.length < renderIndex + batch){
    end = props.classes.length;
    setHasMore(false);
  }
  setclasses(classes.concat(props.classes.slice(renderIndex, end)));
  setRenderIndex(end);
};


  const Panels = () => props.classes.map((lecture) => <LecturePanel item={lecture} />);
  const lec1 = props.classes[0];
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>

        <div className="filter">
            <FilterSelector />
        </div>

        <div className="main" >
        {

        }
        <InfiniteScroll
          dataLength={classes.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {classes.map((i, index) => (
            <div key={index}>
              <LecturePanel item={i} />
            </div>
          ))}
        </InfiniteScroll>
        </div>
      </div>
    );
}

export default Lectures;
