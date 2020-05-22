import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
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

    return (
        <div className={classes.root}>
            <div style={{ width: expanded? '1226px': '100%', padding:0,margin:0,borderRadius: '8px', border: expanded? '1px solid #C4C4C4':null, zIndex: '0'}}>
            <ExpansionPanel onChange={handleChange('panel1')} >

                <ExpansionPanelSummary style = {{padding:0,margin:0, color: 'white'}}>
                { expanded? <div style = {{ position:'relative', height: '100px', width:'317px', backgroundColor: '#414141', borderRadius: '8px 0px 0px 0px',fontFamily: 'Rubik', fontStyle: 'normal'}}>
                <div style={{float:'left',position:'relative',left:0,marginRight:'17px',width:'12px',height:'100px',borderRadius:'8px 0 0 0',backgroundColor: props.module.colour }}/>

                <p style = {{position:'relative',top:'24',left:'0px', fontWeight: '500', fontSize: '18px', display: 'flex', alignItems: 'center', color: 'white'}}> {props.module.module_code + ' - ' + props.module.module_name} </p>
    <Typography style={{position:'relative', verticalAlign:'middle' , left:'29px', float:'left', fontSize: '18px', fontWeight:'500', color: 'white', paddingBottom: '0.5px'}}> <PersonIcon className={classes.iconS} style={{ fontSize: 22 , verticalAlign:'middle'}} /> {props.module.total_students} &nbsp; <b>ECTS</b> {props.module.credits}</Typography>
                </div>
                :
                  <div style={{display:'flex',height:'76px', width:'100%', padding:'0',backgroundColor: '#414141', borderRadius: '8px', verticalAlign:'middle'}}>
                    <div style={{position:'relative',left:0,marginRight:'30px',width:'12px',height:'76px',borderRadius:'8px 0 0 8px',backgroundColor: props.module.colour }}/>
                    <div style={{position:'relative',top:'27px'}}>
                    <Typography className={classes.heading} ><b>{props.module.module_code + ' - ' + props.module.module_name} &nbsp;&nbsp;&nbsp;</b></Typography>
                    <Typography className={classes.secondaryHeading}> <PersonIcon fontSize="small" style = {{verticalAlign:'middle'}} /> {props.module.total_students} &nbsp;&nbsp;&nbsp; <b>ECTS</b> {props.module.credits} </Typography>
                    </div>
                  </div>
                }

                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.expanded}>
                        <div style={{position:'relative'}}>
                        {/*<div style={{position:'absolute',top:'-102px',height:'500px', width:'1223px', backgroundColor:"red",border:'2px solid blue', borderRadius:'8px'}}> </div>*/}
                        <VerticalTabs setState={props.setState} today={props.today} module={props.module} classes={props.module.classes}/>
                        </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            </div>
        </div>
    );
}
