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
const mainBlue = "#0061D2";
const Summary = (props) => <div style = {{width:'100%',padding:'10px 0', fontFamily: 'Rubik', fontStyle: 'normal', color: 'white'}}>
  <div style = {{float:'left', padding:'0 20px ', color: 'white'}}>
    <SchoolIcon style ={{fontSize: '45px', verticalAlign:'middle', color: 'white'}}/>
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

const Workload = ((props) =>
      <div style={{padding:'7px 24px'}}>
        <ExpansionPanel style = {{backgroundColor:props.colour, color:'white'}}>
          <ExpansionPanelSummary  style = {{padding:'0 0 0 0'}}>
            <Summary title= {"Workload"} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style = {{backgroundColor: 'white'}}>
            <div style = {{width:'100%', height: '100%', textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px'}}>
              <div style = {{fontWeight: 300}}> Total amount of workload which you are expected to have during the module, including lectures, activities and guided study time.</div>
              <div style = {{margin:'12px 0 0 0 ', fontWeight: 300, color:'#AFAFAF' }}> view by: </div>
              <div style = {{position: 'relative', height:550}}> <PieModuleComponent moduleID = {props.moduleID} label = {props.label} type = "hours"/> </div>
              <div style = {{position: 'relative', height:550}}> <PieModuleComponent moduleID = {props.moduleID} label = {props.label} type = "grade"/> </div>
             </div>
          </ExpansionPanelDetails >
        </ExpansionPanel>
      </div>
    );



function ModulePanel (props) {
  console.log("dentro do panel:");
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
    padding: '15px',
    color: props.module.colour
  };
  if(props.module != undefined){
    return( <div style={{overflow:'scroll',position:'fixed',top: '55px', width:'100%',bottom:'72px', zIndex:1, backgroundColor: 'white'}}>
              <div style={{position:'fixed',height: '130px', width:'100%',backgroundColor:'white',zIndex:2}}>
                <IconButton onClick = {()=>props.onClick(false)}
                style={{position:'fixed',top: '55px',margin:'15px 24px', color:props.module.color}} aria-label="delete" color="primary">
                    <ArrowBackIosIcon color='action'/>
                </IconButton>
                <div style={mainStyle}>
                  <SchoolIcon style ={{fontSize: '45px', verticalAlign:'middle', float:'left',  padding: '20px 25px', color: 'white'}}/>
                  {/*<img  src={headerContent.imgPath} style={imgStyle}/>*/}
                  <h2 style={titleStyle}> {props.module.module_code} - {props.module.module_name} </h2>
                </div>
              </div>

                <div style={{position:'relative', top:'130px'}}>
                <GeneralInformation colour = {props.module.colour} prof = {props.module.module_lecturer} description = {props.module.module_description} email = {props.module.module_lecturer_email}/>
                <Workload colour = {props.module.colour} moduleID = {props.module.module_ID} label = {props.module.module_name}/>
                </div>

            </div>


    );
  }
  else return <h4 style={{textAlign: "center"}}>Loading...</h4>;
}


function ModuleButton (props) {
  if(props.module != undefined){
    return(<div style={{margin:'7px 24px',backgroundColor: props.module.colour, color: 'white'}} class="MuiPaper-root MuiExpansionPanel-root MuiExpansionPanel-rounded MuiPaper-elevation1 MuiPaper-rounded">
      <Button fullWidth onClick = {()=>props.onClick(props.module.module_code)} class="MuiButtonBase-root MuiExpansionPanelSummary-root" tabindex="0" role="button" aria-disabled="false" aria-expanded="false" style="padding: 0px;"
      style={{textAlign:'left',justifyContent:'left',textTransform: 'none',}} startIcon={<SchoolIcon color='action' style={{verticalAlign:'middle', fontSize: '45px', padding: "0px 20px", color: 'white'}} />} children ={
          <div style={{width: '100%', padding: '10px 0px', fontFamily: 'Rubik', fontStyle: 'normal', color: 'white'}}>
            <div style={{fontWeight:'300',fontSize: '10px'}}>Prof. {props.module.module_lecturer} </div>
            <div style={{fontFamily: 'Rubik'}}>{props.module.module_code} - {props.module.module_name} </div>
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
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>
        <div className="main">
      {
        props.modules.map((module ) => <ModuleButton module={module} onClick={selectModule}/>)
      }

        </div>

        { moduleSelected ? <div style={{zIndex:2}}> <ModulePanel module={props.modules.find((module) => module.module_code == selectedID)} onClick={setModuleSelected}/></div> : <div/>  }



      </div>
    );
  }
  else return <h4 style={{textAlign: "center", color:mainBlue}}>Loading...</h4>;
}

{/*
*/}
