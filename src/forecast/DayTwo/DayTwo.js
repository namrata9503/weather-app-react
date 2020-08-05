import React, { useState } from 'react';
import "./DayTwo.css";

const dayTwo = props => {

   
  return (
    // Display float as intiger
    //<div className = {(typeof props.main !== "undefined") ? (((Math.trunc(props.temp -273.15)) > 20) ? 
    //'high2 ' : 'dayTow'): 'dayTow'}>
    <div className="dayTwo">
         <p className="main">{props.main}</p>
      <p className="tempp"> {Math.trunc(props.temp -273.15)} ºc</p>
      <div className="iconnn">
       <i className={`wi ${props.iconss} display-4 iconImg`}></i>

     </div>
     <div className="shortDate">
     <p className="dayy">{props.day}</p>
      <p className="dt">{props.date} {props.month}</p>
     </div>

    </div>
  );
};

export default dayTwo;