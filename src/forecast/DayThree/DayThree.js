import React, { useState } from 'react';
import "./DayThree.css";

const dayThree = props => {

   
  return (
    // Display float as intiger
   // <div className = {(typeof props.main !== "undefined") ? (((Math.trunc(props.temp -273.15)) > 20) ? 
  //  'high3 ' : 'dayThree'): 'dayThree'}>
  <div className="dayThree">
       <p className="main">{props.main}</p>
      <p className="tempp"> {Math.trunc(props.temp -273.15)} ºc</p>
      <div className="iconnn">
       <i className={`wi ${props.iconss} display-4 iconImg`}></i>

     </div>
     <div className="shortDate">
     <p className="dayy">{props.day}</p>
      <p className="dt">{props.date} {props.month}</p>
     </div>
  {/* <img src={props.main} alt="icon" /> */}
      {/*{ <p>{String(props.date).replace(/-/g, ".")}</p> */}
    </div>
  );
};

export default dayThree;