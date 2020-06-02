import React from 'react';
const mainBlue = "#0061D2";
function Header (props) {
    const mainStyle = {
      left: "0",
      right:"0",
      width: '500px',
      margin: 'auto',
      position: 'fixed',
      backgroundColor: "white",
      height:'75px',
      top:'55px',
      zIndex: 1,
      fill: mainBlue
    };
    const imgStyle= {
        padding: '20px 25px',
        float:'left',
        fill: mainBlue
      };
    const titleStyle ={
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '21px',
      padding: '15px',
      color: mainBlue
    };

    return (
      <div >
        <div style={mainStyle}>
          <img src={props.imgPath} style={{padding: '20px 25px', float:'left', fill: mainBlue}}/>
          <h2 style={titleStyle}> {props.title} </h2>
        </div>
      </div>
    );
}

export default Header;
