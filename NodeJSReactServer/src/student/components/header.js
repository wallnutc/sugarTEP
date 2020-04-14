import React from 'react';

function Header (props) {
    const mainStyle = {
      left: "0",
      right:"0",
      position: 'fixed',
      backgroundColor: "white",
      height:'75px',
      top:'55px',
      zIndex: 1,
    };
    const imgStyle= {
        padding: '20px 25px',
        float:'left',
      };
    const titleStyle ={
      fontFamily: 'Rubik',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '21px',
      padding: '15px',
    };


    return (
      <div >
        <div style={mainStyle}>
          <img  src={props.imgPath} style={imgStyle}/>
          <h2 style={titleStyle}> {props.title} </h2>
        </div>
      </div>
    );
}

export default Header;
