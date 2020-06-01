import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';
import VerticalTabs from "./verticalTab";
import invert from 'invert-color'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin:0,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontFamily: "Rubik",
        float:'left',

    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontFamily: "Rubik",
        float:'left',
    },
    timeHead: {
        fontSize: theme.typography.pxToRem(15),
        fontFamily: "Rubik",
        flexBasis: '100%',
        display: 'flex',
        padding: 0,
        justifyContent: 'flex-end',
    },
    expanded: {
      padding:0,
        height: '400px',
        display: 'flex',
        flexBasis: '0',
    }
}));

export default function ControlledExpansionPanels(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const moduleContent = props.moduleContent;
    console.log(expanded);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    console.log("panel");
    console.log(props.modules);
    var editor = "Contributor";
    if (props.module.edit == 1){
        editor = "Coordinator";
    }
    return (
        <div className={classes.root}>
            <div style={{ width: expanded? '100%': '100%', maxWidth: expanded? '1223px': '100%', padding:0,margin: 0,borderRadius: '10px 8px 8px 8px', border: expanded? '2px outset':null, borderColor: expanded? props.module.colour:null, zIndex: '3'}}>
            <ExpansionPanel onChange={handleChange('panel1')} multi={false}>

                <ExpansionPanelSummary style = {{padding:0,margin:0, color: 'white'}}>
                { expanded? <div style = {{ position:'relative', height: '100%', width:'25%', maxWidth:'317px', backgroundColor: props.colour, borderRadius: '8px 0px 0px 0px',fontFamily: 'Rubik', fontStyle: 'normal'}}>
                <div style={{float:'left',position:'relative',left:0,marginRight:'17px',width:'12px',height:'100px',borderRadius:'8px 0 0 0',backgroundColor: props.module.colour }}/>

                <p style = {{position:'absolute',top:'10px', left:'30px', fontWeight: '500', width: '90%', fontSize: '18px', wordWrap: 'break-word',overflowWrap: 'break-word', display: 'flex', alignItems: 'center', color: 'white'}}> {props.module.module_code + ' / ' + props.module.module_name} </p>
                <Typography style={{position:'absolute', bottom:'0px',left:'30px', marginBottom: '5px', verticalAlign:'middle' , float:'left', fontSize: '18px', fontWeight:'500', color: 'white', paddingBottom: '0.5px'}}> <PersonIcon className={classes.iconS} style={{ fontSize: 22 , verticalAlign:'middle'}} /> {props.module.total_students} &nbsp; <b>ECTS</b> {props.module.credits}</Typography>
                </div>
                :
                  <div style={{display:'flex',height:'76px', width:'100%', padding:'0',backgroundColor: props.colour, borderRadius: '8px', borderColor: props.colour, verticalAlign:'middle'}}>
                    <div style={{position:'relative',marginRight:'30px',width:'12px',height:'76px',borderRadius:'8px 0 0 8px',backgroundColor: props.module.colour }}/>
                    <div style={{position:'relative',top:'27px',left:0}}>
                    <Typography className={classes.heading} style={{height:'100px'}}><b>{props.module.module_code + ' - ' + props.module.module_name} &nbsp;&nbsp;&nbsp;</b></Typography>
                    <Typography className={classes.secondaryHeading}> <PersonIcon fontSize="small" style = {{verticalAlign:'middle'}} /> {props.module.total_students} &nbsp;&nbsp;&nbsp; <b>ECTS</b> {props.module.credits} </Typography>
                    </div>
                    { props.module.edit ? <div style={{position:'relative',top:'27px',marginLeft:'20px', float:'right'}}><Typography className={classes.heading}><b>{editor} &nbsp;&nbsp;&nbsp;</b></Typography><StarIcon fontSize="small" style = {{verticalAlign:'middle'}}/> </div> : <div></div>}
                  </div>
                }

                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.expanded}>
                        <div style={{position:'relative', zIndex:'0', width:'100%'}}>
                        {/*<div style={{position:'absolute',top:'-102px',height:'500px', width:'1223px', backgroundColor:"red",border:'2px solid blue', borderRadius:'8px'}}> </div>*/}
                        <VerticalTabs setState={props.setState} today={props.today} module={props.module} classes={props.module.classes}/>
                        </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            </div>
        </div>
    );
}
