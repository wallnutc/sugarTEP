import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './style.css';



export default function SimpleMenu() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>




      <div style={{}}>
        <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"55px"}}>
           <img className="photoU" style={{marginTop:'10px',height:'40px'}} src={require('../images/logoGroup.svg')}/>
        </Button>
      </div>
      {/*
        <div className="Tlogo">
            <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"55px", display: 'flex', margin:'0 auto', padding: 0}}>
                <img className="photoT" src={require('../images/Trinity_White_Logo.png')}/>
            </Button>
        </div>
        <div style={{float: 'left'}}>
        <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"55px",display: 'flex'}} >
          <img className="photo" src={require('../images/sugar.png')}/>
        </Button>
        </div>
        */}

    </div>
  );
}
