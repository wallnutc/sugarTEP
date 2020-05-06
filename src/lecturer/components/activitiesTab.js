import React from 'react';
import Button from '@material-ui/core/Button';
import '../styles/lecturesTab.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TextField from '@material-ui/core/TextField';
import StackedColumnChart from './stackedColumnChart';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

var response = {
  "labels": "Teaching 1,Teaching 2,Teaching 3,Teaching 4,Teaching 5,Teaching 6,Teaching 7,Teaching 8,Teaching 9,Teaching 10,Teaching 11,Teaching 12,Revision 1,Exams 1,Christmas 1,Christmas 2,Christmas 3,Christmas 4,Christmas 5,Teaching 13,Teaching 14,Teaching 15,Teaching 16,Teaching 17,Teaching 18,Teaching 19,Teaching 20,Teaching 21,Teaching 22,Teaching 23,Teaching 24,Revision 2,Exams 2",
  "datasets": [
        {
        "label": "Engineering Design II",
        "data": "4.0,6.1,7.8,7.8,7.6,6.9,1.9,6.5,7.9,6.9,6.3,4.6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        },
        {
        "label": "Mechanics",
        "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.0,4.0,7.7,5.7,9.2,5.5,1.5,5.5,4.0,4.0,4.0,4.0,12.0,12.0"
        },
        {
        "label": "Electrical Engineering",
        "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.8,8.2,6.2,8.2,6.2,6.7,1.0,4.7,4.7,4.7,4.7,7.7,9,2"
        },
        {
        "label": "Chemistry",
        "data": "3.7,8.7,5.7,5.7,4.7,8.7,2.0,9.7,5.7,9.7,5.7,9.7,5.0,7.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
        },
        {
        "label": "Physics",
        "data": "2.5,3.5,3.5,3.5,3.5,3.5,1.0,3.5,3.5,3.5,3.5,12.5,10.0,10.0,0,0,0,0,0,0,4.3,1.3,5.6,1.3,5.6,1.3,5.6,1.3,5.6,1.3,1.3,0,2"
        },
        {
        "label": "Engineering Maths II",
        "data": "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5.5,6.5,6.5,6.5,6.5,6.2,0.7,6.2,6.5,6.5,5.5,9.5,7.5,9.5"
        },
        ],
  "startAxis": "Teaching 1",
  "endAxis": "Exams 2"
};


const BootstrapButton = withStyles({
  root: {
    justifyContent: 'left',
    textAlign:'left',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px ',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#F1F1F1',
    borderColor: 'transparent',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#b5b5b5',
      borderColor: '#b5b5b5',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'red',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '#9A9A9A',

    },
  },
})(Button);








function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'black',
    },
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'black',
      opacity: 1,
    },
    '&$selected': {
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'black',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  }
}));

function SelectorBox() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div  className={classes.root} style = {{height:'400px',borderRight: '1px solid #C4C4C4',}}>

      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" centered>
          <AntTab label="Taught" />
          <AntTab label="Scheduled" />
        </AntTabs>
      </div>
      <div>


      <TabPanel  value={value} index={0} >
        <div className = 'selectorBox' >
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 5</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>Today</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 4</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>25th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 2</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 18th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 1</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>13th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 1</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>13th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 1</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>13th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 1</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>13th March</span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 1</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>13th March</span></div></div>} />
        </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 6</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>1st April </span></div></div>} />
        </div>
        <div style = {{margin:'8px 0'}}> <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 7</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}>3rd April</span></div></div>} />
        </div>

        </TabPanel>
      </div>
    </div>
  );
}

function DetailBox() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  const [currency, setCurrency] = React.useState('EUR');

const handleChangeClassroom = (event) => {
  setCurrency(event.target.value);
};
  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
          <AntTab label="Feedback" />
          <AntTab label="Visualize" />
        </AntTabs>
      </div>

      <TabPanel  value={value} index={0}>
        <div className = 'detailBox'>

          <div style = {{margin:'8px 0'}}>

            <StackedColumnChart response = {response} />
          </div>

          <div style = {{margin:'10px 0'}}>
            <MultilineTextFields />
            <Button type='submit' variant="contained" color="default" disableElevation fullWidth style={{textTransform: 'none'}}> add note </Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <div className = 'detailBox'>
          <div>
            <span> Modular Inequalities | </span>
            <span> Today 10:00 - 11:45 AM</span>
          </div>
          <div>
            <span> Content </span> <br/>
            <TextField
              multiline
              id="standard-read-only-input"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Id ornare arcu odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra. Nunc lobortis mattis aliquam faucibus purus in. Condimentum lacinia quis vel eros donec ac odio tempor orci. Cras semper auctor neque vitae tempus quam pellentesque nec. Accumsan tortor posuere ac ut. Enim sit amet venenatis urna cursus eget nunc scelerisque. Egestas sed tempus urna et pharetra pharetra massa massa. Sem et tortor consequat id. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nullam non nisi est sit amet facilisis magna etiam tempor. Phasellus vestibulum lorem sed risus ultricies tristique. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Justo donec enim diam vulputate ut pharetra sit amet. Facilisis mauris sit amet massa vitae tortor."
              fullWidth
              variant="outlined"
              rows={5}
              InputProps={{
                readOnly: true,
              }}/>
          </div>
          <div>
            <span> Classroom </span><br/>
            <TextField
                     id="outlined-select-currency"
                     select
                     fullWidth
                     value={currency}
                     onChange={handleChangeClassroom}
                     helperText="Please select your currency"
                     variant="outlined"
                   >
                     {currencies.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                         {option.label}
                       </MenuItem>
                     ))}
                   </TextField>
          </div>
          <div>
            Activities
            <IconButton aria-label="delete">
              <AddBoxIcon />
            </IconButton>
          </div>
          <div>
            <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
          </div>
          <div>
            Activities
            <IconButton aria-label="delete">
              <AddBoxIcon />
            </IconButton>
          </div>
          <div>
            <BootstrapButton  size = 'large' fullWidth startIcon ={<TodayIcon color='action' style={{fontSize: 40 }} />} children={<div><div style={{fontFamily: 'Rubik'}}>Lecture 3</div><div style={{fontWeight:'300',fontSize: '14px'}}><ScheduleIcon color='action' style={{verticalAlign:'middle',fontWeight:'300',fontSize: '14px'}} /> <span style={{verticalAlign:'middle'}}> 20th March</span></div></div>} />
          </div>

        <div>
        <Button > add note </Button>
        </div>
        </div>

      </TabPanel>
    </div>
  );
}

const useStylesTextField = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '100%',
      margin: '11px 0'
    },
  },
}));
function MultilineTextFields() {
  const classes = useStylesTextField();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-textarea"
          label="Lecture 3 note"
          placeholder=""
          multiline
          variant="outlined"
        />
      </div>
    </form>
  );
}





export default function lecturesTab() {
  const style = {

  }
  return (
    <div style = {{margin:0,padding:0}}>
      <div  style = {{float:'left',height:'500px',width:'32.5%',}}>

        <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Class Status </div>

      <div style = {{ position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox />
      </div>

      </div>
      <div className = 'detailBoxx'style = {{float:'left',height:'500px',width:'67%', }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Mode </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>
          <DetailBox />
        </div>
      </div>
    </div>
  );
}

{/*boxShadow: '0 0 0 0.2rem rgba(207,207,207,.5)',*/}
