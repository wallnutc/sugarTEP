import React ,{Components, useState} from 'react';
import Header from "../components/header";
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import PieModuleComponent from '../components/graph_components/pieModuleComponent';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ModuleIcon from '@material-ui/icons/School';
import ModulesIcon from '../components/iconsSVG/modulesIcon';
const mainBlue = "#0061D2";


const Summary = (props) => <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal', color: 'white'}}>
  <div style = {{float:'left', padding:'0 20px ', color: 'white'}}>
    <ModulesIcon style ={{fontSize: '45px', verticalAlign:'middle', color: 'white'}}/>
    <span style = {{marginLeft:'24px',fontWeight: 'normal', fontSize: '14px', lineHeight: '17px', color: 'white'}}>
      {props.title}
    </span>
  </div>
</div>


const GeneralInformation = ((props) =>
    <div style={{padding:'7px 24px'}}>
      <ExpansionPanel style= {{backgroundColor:props.colour, color: 'white'}}>
        <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
          <Summary title= {"General Information"} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails >
          <div style = {{textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
            <div> Description: </div>
            <div style = {{fontWeight: 300}}> {props.description} </div>
            <div style = {{margin:'12px 0 0 0 '}}> Professors: </div>
            <div style = {{fontWeight: 300}}> {props.prof} | {props.email} </div>
          </div>
        </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );

function Workload (props) {

  const [filterState, setFilterState] = React.useState(0);

  const renderGraph = (v)=>{
    switch (v) {
      case 0:
        return (<div style = {{position: 'relative', height:550}}> <PieModuleComponent moduleID = {props.moduleID} label = {props.label} type = "hours"/> </div>);

      case 1:
        return( <div style = {{position: 'relative', height:550}}> <PieModuleComponent moduleID = {props.moduleID} label = {props.label} type = "grade"/> </div>);
    }
  }
  return(
    <div style={{padding:'7px 24px'}}>
          <ExpansionPanel style = {{backgroundColor:props.colour, color:'white'}}>
            <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
              <Summary title= {"Workload"} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style = {{backgroundColor: 'white'}}>
              <div style = {{width:'100%', height: '100%', textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
                <div style = {{fontWeight: 300,color:"black"}}> Total amount of workload which you are expected to have during the module, including lectures, activities and guided study time.</div>
                <div style = {{margin:'12px 0 0 0 ', fontWeight: 300, color:'#AFAFAF', paddingBottom:'5px'}}> Year breakdown by: </div>
                <div >
                <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(0)}
                style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==0? "#0153B4":'#F6F7FA',}}
                children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==0? "#FFFFFF":'#0061D2'}}> Module (Total)  </span>}></Button>
                <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(1)}
                style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==1? "#0153B4":'#F6F7FA',}}
                children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==1? "#FFFFFF":'#0061D2'}}> Module (Total)  </span>}></Button>

                </div>
                {renderGraph(filterState)}

               </div>
            </ExpansionPanelDetails >
          </ExpansionPanel>
        </div>);
}



function ModulePanel (props) {
  const [filterState, setFilterState] = React.useState(0);

  const renderGraph = (v)=>{
    switch (v) {
      case 0:
        return (<div style = {{position: 'relative', height:550}}> <PieModuleComponent moduleID = {props.module.module_ID} label = {props.module.module_name} type = "hours"/> </div>);

      case 1:
        return( <div style = {{position: 'relative', height:550}}> <PieModuleComponent moduleID = {props.module.module_ID} label = {props.module.module_name} type = "grade"/> </div>);
    }
  }
  console.log("dentro do panel:");
  const panelStyle = {
    transition: 'all 4s linear',
    padding:'0 24px',
    overflow:'scroll',
    position:'fixed',
    top: '55px',
    bottom:'72px',
    zIndex:1,
    backgroundColor: 'white'
  };
  const mainStyle = {
    left: "0",
    right:"0",
    position: 'fixed',
    backgroundColor: "",
    height:'75px',
    top:'100px',
    zIndex: 1,
  };
  const titleStyle ={
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21px',
    padding: 0,
    margin:'auto 24px',
    float:'left',
    color: props.module.colour
  };
  if(props.module != undefined){
    return( <div style={panelStyle}>
              <div style={{position:'fixed',width:'100%',height: 'auto', backgroundColor:'white',zIndex:2}}>
                <IconButton onClick = {()=>{props.onClick(false)}}
                style={{marginTop:'8px', color:props.module.color, }} aria-label="delete" color="primary">
                    <ArrowBackIosIcon color='action'/>
                </IconButton>

              </div>

                <div style={{position:'relative', top:'64px'}}>
                <div style={{width:'100%',display:'flex'}}>
                  <ModulesIcon style ={{fontSize: '45px', verticalAlign:'middle', float:'left',  margin: 0, color: props.module.colour}}/>
                  {/*<img  src={headerContent.imgPath} style={imgStyle}/>*/}
                  <h2 style={titleStyle}> {props.module.module_code} - {props.module.module_name} </h2>
                </div>
                  <div style = {{textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
                    <div style={{margin:'16px 0 ',color:props.module.colour}}> Description: </div>
                    <div style = {{fontWeight: 300}}> {props.module.module_description==null||props.module.module_description==''? 'No description yet':props.module.module_description} </div>
                    <div style = {{margin:'16px 0 ',color:props.module.colour}}> Professors: </div>
                    <div style = {{fontWeight: 300}}> {props.module.module_lecturer} | {props.module.module_lecturer_email} </div>
                    <div style = {{margin:'16px 0 ',color:props.module.colour}}> Module Workload: </div>
                    <div style = {{width:'100%', height: '100%', textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
                      <div style = {{fontWeight: 300,color:"black"}}> Total amount of workload which you are expected to have during the module, including lectures, activities and guided study time.</div>
                      <div style = {{margin:'12px 0 0 0 ', fontWeight: 300, color:'#AFAFAF', paddingBottom:'5px'}}> Year breakdown by: </div>
                      <div >
                      <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(0)}
                      style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==0? "#0153B4":'#F6F7FA',}}
                      children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==0? "#FFFFFF":'#0061D2'}}> Module (Total)  </span>}></Button>
                      <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(1)}
                      style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==1? "#0153B4":'#F6F7FA',}}
                      children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==1? "#FFFFFF":'#0061D2'}}> Module (Total)  </span>}></Button>

                      </div>
                      {renderGraph(filterState)}

                     </div>
                  </div>
                  {/*<GeneralInformation colour = {props.module.colour} prof = {props.module.module_lecturer} description = {props.module.module_description} email = {props.module.module_lecturer_email}/>
                  <Workload colour = {props.module.colour} moduleID = {props.module.module_ID} label = {props.module.module_name}/>

                    */}
                  </div>

            </div>


    );
  }
  else return <h4 style={{textAlign: "center"}}>Loading...</h4>;
}


function ModuleButton (props) {
  if(props.module != undefined){
    return(<div style={{margin:'7px 24px',backgroundColor: props.module.colour, color: 'white'}} className="MuiPaper-root MuiExpansionPanel-root MuiExpansionPanel-rounded MuiPaper-elevation1 MuiPaper-rounded">
      <Button fullWidth onClick = {()=>props.onClick(props.module.module_code)} className="MuiButtonBase-root MuiExpansionPanelSummary-root" tabIndex="0" role="button" aria-disabled="false" aria-expanded="false" style="padding: 0px;"
      style={{textAlign:'left', padding:0,justifyContent:'left',textTransform: 'none',height:'56px',borderRadius:'8px', border:'1px solid '+props.module.colour}}
      children ={
          <div style={{width: '100%', fontFamily: 'Rubik', fontStyle: 'normal', color: 'white'}}>
            <div style={{float:'left',position:'relative',left: 0,height:'100%', width:'56px',margin:'0', borderRadius:'8px 0 0 8px',backgroundColor:'white'}}>
            <ModulesIcon color='action' style={{margin:'6px',verticalAlign:'middle', fontSize: '42px', padding: "0px 2px", color: props.module.colour}} />
            </div>
          <div style={{padding:'5px 16px', margin:'auto', overflow:'hidden'}}>
            <div style={{fontWeight:'300',fontSize: '10px'}}>Prof. {props.module.module_lecturer} </div>
            <div style={{fontFamily: 'Rubik', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
              {props.module.module_code} - {props.module.module_name}
            </div>
          </div>
          </div>
      } />
      </div>

    );
  }
  else return <h4 style={{textAlign: "center"}}>Loading...</h4>;
}

export default function MyModules (props) {
  const [moduleSelected,setModuleSelected] = useState(false);
  const [selectedID,setSelectedID] = useState();

  const headerContent = {title:"My Modules", imgPath: require("../images/icons/selfGuidedStudy.svg")};
  if(props.modules != undefined){

    function selectModule(id) {
      setModuleSelected(true);
      setSelectedID(id);
      console.log("id selected:" + id)
    }
    return (
      <div >
        <div className="header">
          <div>
            <ModulesIcon style={{height:'40px', width: '40px',float:'left', zIndex: 2, color:mainBlue}}/>
            <div style={{fontFamily: 'Rubik',fontStyle: 'normal',fontWeight: '500',fontSize: '20px',float:'left',lineHeight: '40px',marginLeft:'16px',color: mainBlue}}>My Modules</div>
          </div>
        </div>
        <div className="main" style={{marginTop:'144px'}}>
      {
        props.modules.map((module ) => <div key={module.module_ID}> <ModuleButton module={module} onClick={selectModule}/></div>)
      }

        </div>

        { moduleSelected ? <div style={{zIndex:2,}}> <ModulePanel module={props.modules.find((module) => module.module_code == selectedID)} onClick={setModuleSelected}/></div> : <div/>  }



      </div>
    );
  }
  else return <h4 style={{textAlign: "center", color:mainBlue}}>Loading...</h4>;
}

{/*
*/}
