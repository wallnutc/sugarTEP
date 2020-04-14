import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Item_lecture from "./item_lecture";
import Grid from '@material-ui/core/Grid';
import icon_star_grey from '../images/icons/lectures_disabled.png';
import icon_lecture_bold from '../images/icons/lectures_disabled.png';
import icon_clock from '../images/icons/lectures_disabled.png';


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

export default function DetailedExpansionPanel(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary  aria-controls="panel1c-content" id="panel1c-header">
        <Grid container spacing={1} style={{ cursor: 'pointer' }}>
          <Grid item>
              <img className={classes.img} alt="complex" src={icon_lecture_bold} />
          </Grid>
          <Grid item xs>
            <Grid>
              <Typography variant="caption" color="textSecondary">
                {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">
                {props.item.lecture_title}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" color="textSecondary">
                {props.item.lecture_begin} - {props.item.lecture_finish}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Grid container direction="column" spacing={2}>
            <Typography variant="body1">
              {props.item.lecture_description}
            </Typography>
            <Grid item xs container direction="row-reverse" justify="flex-start" spacing={2}>
              <Grid item  >
                <img src={icon_star_grey} />
                <img src={icon_star_grey} />
                <img src={icon_star_grey} />
                <img src={icon_star_grey} />
                <img src={icon_star_grey} />
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
