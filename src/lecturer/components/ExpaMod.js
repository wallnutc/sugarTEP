import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import VerticalTabs from "./verticalTab3";

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


    return (
        <div className={classes.root}>
            <div style={{ width: expanded? '317px': '100%', padding:0,margin:0}}>
            <ExpansionPanel onChange={handleChange('panel1')} >

                <ExpansionPanelSummary style = {{padding:0,margin:0}}>
                { expanded? <div style = {{ position:'relative', height: '100px', width:'317px', backgroundColor:'#414141', borderRadius: '8px 0px 0px 0px',fontFamily: 'Rubik', fontStyle: 'normal'}}>
                <p style = {{position:'relative',top:'24',left:'29px', fontWeight: '500', fontSize: '18px', display: 'flex', alignItems: 'center', color: '#FFFFFF'}}> 3E7 - Engineering Math </p>
                <Typography style={{position:'relative', verticalAlign:'middle' , left:'29px', float:'left', fontSize: '15px', fontWeight:'500', color: 'white', paddingBottom: '0.5px'}}> <PersonIcon className={classes.iconS} style={{ fontSize: 22 , verticalAlign:'middle'}} /> 35 &nbsp; <b>ECTS</b> 10</Typography>
                </div>
                :
                  <div style={{height:'76px', width:'100%', padding:'0px 30px',backgroundColor:'#D6D6D6', borderRadius: '8px', verticalAlign:'middle'}}>
                    <div style={{position:'relative',top:'27px'}}>
                    <Typography className={classes.heading} ><b>3E7 - Engineering Maths &nbsp;&nbsp;&nbsp;</b></Typography>

                    <Typography className={classes.secondaryHeading}> <PersonIcon fontSize="small" style = {{verticalAlign:'middle'}} /> 35 &nbsp;&nbsp;&nbsp; <b>ECTS</b> 10 </Typography>
                    </div>
                    <div style = {{float:'right',position:'relative', top:'15px'}}>
                      <Typography className={classes.timeHead}><b>Tuesday</b>: 10.45 - 11.45 AM </Typography>
                      <Typography className={classes.timeHead}><b>Thursday</b>: 10.45 - 11.45 AM </Typography>
                    </div>
                  </div>
                }

                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.expanded}>
                        <div style={{position:'relative'}}>
                        <VerticalTabs/>
                        </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            </div>
        </div>
    );
}
