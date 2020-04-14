import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import icon_lecture_bold from '../images/icons/lectures.svg';
import icon_assignment_bold from '../images/icons/myActivities.svg';
import Item_lecture from "./item_lecture";
import Item_assignment from "./item_assignment";
import Item_study from "./item_study";
import icon_study_bold from '../images/icons/lectures_disabled.png';
import ListSummary from "./listSummary";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  img: {
    margin: 1,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function LectureRenderer(props) {
  const classes = useStyles();
  return (

    <div className={classes.root}>
    <ExpansionPanel >

      <ListSummary item = {props.item}/>

      <ExpansionPanelDetails className={classes.details}>
        <Grid container direction="column" spacing={2}>
          <Typography variant="body1">
            {props.item.lecture_description}
          </Typography>
          <Grid item xs container direction="row-reverse" justify="flex-start" spacing={2}>
            <Grid item  >
              <StarBorderIcon /> <StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon />
            </Grid>
            <Grid item >
              <Typography variant="body2" color="textSecondary">
                Not rated yet
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <Divider />
    </ExpansionPanel>
  </div>
  );
}

function AssignmentRenderer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>

      <ExpansionPanel >

        <ListSummary item = {props.item}/>

        <ExpansionPanelDetails className={classes.details}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body1">
                Deadline - {props.item.assignment_day} {props.item.assinment_hour}
              </Typography>
            </Grid>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  Suggested Progress
                </Typography>
              </Grid>
              <Grid item xs >
                <LinearProgress variant="determinate" value={props.item.assignment_suggested} />
              </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  Real Progress
                </Typography>
              </Grid>
              <Grid item xs>
                <LinearProgress variant="determinate" value={props.item.assignment_real} />
              </Grid>
            </Grid>
            <Grid item xs container direction="row-reverse">
              <Typography variant="body1">
                <Button>Update progress</Button>
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>



    </div>
  );
}

function SelfGuidedStudyRenderer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>



      <ExpansionPanel >

        <ListSummary item = {props.item}/>

        <ExpansionPanelDetails className={classes.details}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body1">
                Deadline - {props.item.study_day} {props.item.study_hour}
              </Typography>
            </Grid>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  Suggested Progress
                </Typography>
              </Grid>
              <Grid item xs >
                <LinearProgress variant="determinate" value={props.item.study_suggested} />
              </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  Real Progress
                </Typography>
              </Grid>
              <Grid item xs>
                <LinearProgress variant="determinate" value={props.item.study_real} />
              </Grid>
            </Grid>
            <Grid item xs container direction="row-reverse">
              <Typography variant="body1">
                <Button>Update progress</Button>
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>



    </div>
  );
}


function ListRenderer (props) {
    return (
      <div>
        {props.renderContent.map((item)=>{
          switch (item.activityType) {
            case 'lecture':
              return <LectureRenderer item = {item}/>
            case 'assignment':
              return <AssignmentRenderer item = {item}/>
            case 'selfGuidedStudy':
              return <SelfGuidedStudyRenderer item = {item}/>

          }
        })
      }
      </div>
    );
}

export default ListRenderer;
{/*


  switch (item.activityType) {
    case 'lecture':
      return <LectureRenderer item = {item}/>
      break;
    case 'assignment':
      return <AssignmentRenderer item = {item}/>

  }
  {props.lectures.map((lecture)=><LectureRenderer item = {lecture}/>)}
  <Item_lecture item={item_lecture_2}/>
  <Item_lecture item={item_lecture_3}/>
  <Item_assignment item={item_assignment_1}/>
  <Item_study item={item_study_1}/>


  */}
