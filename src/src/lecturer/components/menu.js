import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

const mainBlue = "#003EAA";

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
    {/*      <div style={{float: 'left'}}>
          <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"55px", color: 'white'}} >
            <AccountCircleIcon   />
          </Button>

          </div>
      */}
      <div style={{float: 'left'}}>
      <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"55px", color: 'white'}} href="/">
        <HomeIcon   />
      </Button>
      </div>
      <div style={{marginLeft:'43%'}}>
        <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"45px"}}>
           <img className="photoU" style={{marginTop:'0',height:'40px'}} src={require('../images/logoGroup.svg')}/>
        </Button>
      </div>
      {/*

        <div style={{float: "right"}}>
          <Button aria-controls="simple-menu" aria-haspopup="true" style={{height:"55px", color: 'white'}} onClick={handleClick}  >
            <SettingsIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        */}

    </div>
  );
}
