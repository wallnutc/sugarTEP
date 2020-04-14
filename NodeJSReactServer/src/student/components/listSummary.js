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
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconLecture from '../images/icons/lectures.svg';
import IconMyActivities from '../images/icons/myActivities.svg';
import IconSelfGuidedStudy from '../images/icons/selfGuidedStudy.svg';
import Icon_lecture_bold from '../images/icons/selfGuidedStudy.svg';


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

export default function ListSummary(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>

        <ExpansionPanelSummary  aria-controls="panel1c-content" id="panel1c-header">
        <Grid container spacing={1} style={{ cursor: 'pointer' }}>
          <Grid item>
            <img className={classes.img} alt="complex" src={
            IconLecture} />

          </Grid>
          <Grid item xs>
            <Grid>
              <Typography variant="caption" color="textSecondary">
                {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">
                {props.item.title}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="textSecondary">
                <ScheduleIcon /> {props.item.begin} - {props.item.finish}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        </ExpansionPanelSummary>
    </div>
  );
}
{/*
  <img className={classes.img} alt="complex" src={
     (props)=>{
      switch (props.item.activityType) {
        case 'lecture':
          return <IconLecture/>;
        case 'assignment':
          return <IconMyActivities/>;
        case 'selfGuidedStudy':
          return <IconSelfGuidedStudy/>;
      }
    }
    } />
    switch (props.item.activityType) {
      case 'lecture':
        return IconLecture
      case 'assignment':
        return IconMyActivities
      case 'selfGuidedStudy':
        return IconSelfGuidedStudy
    }

  */}
