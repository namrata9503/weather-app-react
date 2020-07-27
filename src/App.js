import React, { useState } from 'react';
import api from "./apiKeys";
import weatherIcons from './weatherIcons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import  WindIcon from './assests/wind.png';
import  HumidityIcon from './assests/Humidity.png';
import './App.css';
import CurrentLocation from "./CurrentLocation/currentLocation";


function App() {
 

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [icon,setIcon] = useState(undefined);
  const [showMsg, setShowMsg] = React.useState('');
 

  
  const search = evt => {
    if(evt.key === "Enter")
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(result => {
      console.log(result);
      setWeather(result);
      setQuery('');
      if(result.weather){
        get_WeatherIcon(weatherIcons, result.weather[0].id);
        setShowMsg('');
        
      }
      else{
        setShowMsg("Please search for a valid city 😩");
       // return null;
      }
   } );
  }

 const get_WeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
      setIcon(icons.Thunderstorm);
      break;
      case rangeId >= 300 && rangeId <= 321:
        // this.setState({ icon: icon.Drizzle });
        setIcon(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
      setIcon(icons.Rain);
      break;
      case rangeId >= 600 && rangeId <= 622:
      setIcon(icons.Snow);
      break;
      case rangeId >= 701 && rangeId <= 781:
      setIcon(icons.Atmosphere);
      break;
      case rangeId === 800:
      setIcon(icons.Clear);

        break;
      case rangeId >= 801 && rangeId <= 804:
      
      setIcon(icons.Clouds)
    
        break;
      default:
      setIcon(icons.Clouds);
    }
  }
 
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
  return  ` ${date} ${month}, ${year}`;

  // return (day+', '+date+ ' '+month+' '+year+ '\n' +hour+':'+minute); 

  }
  const timeBuiler = t => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[t.getDay()];
    let hour = t.getHours();
  let minute = t.getMinutes();
  return  `${day}, ${hour}:${minute}`;
  }

  const DegreesToDirection = (degrees) => {
    const WindDirection = ['N','NNE','NE', 'ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

    const value = Math.floor((degrees / 22.5) + 0.5);
    return WindDirection[value % 16];
  }

  return ( 
    
  <header className = {(typeof weather.main !== "undefined") ? ((weather.main.temp > 20) ? 
  'app warm ' 
  : 'app ') : 'app '} >
  <section className=" mx-auto align-items-center  my-5">
   <CurrentLocation />

    <main id="new-weather" className={ (typeof weather.main !== "undefined") ? ((weather.main.temp > 20) ? 
  ' sunny my-5' 
  : 'winter my-5') : 'app-main my-5'}>
    <div className = "search-box" >
    <input type = "text"
    className = "search-bar"
    placeholder = "Search Location.."
    onChange={e => setQuery(e.target.value)}
    value={query}
    onKeyPress={search}  autoFocus />
   <p className="msg"> {showMsg}</p>
    </div>
   {(typeof weather.main !== "undefined") ? (

    <div>
  <div className = "date">
  <span style={{fontSize:'4.2rem', display:'flex', lineHeight:'3rem', paddingTop:'10px'}}>    {timeBuiler(new Date())}</span>
    <span>{dateBuilder(new Date())}</span><br/>
     </div> 
    <div className = "location-boxx" >
    <div className = "loc" > {weather.name} , {weather.sys.country} </div> 
  
    </div> 
    <div className = "weather-boxx" >

    <div className="iconn">
       <i className={`wi ${icon} display-4 iconImg`}></i>

     </div>
    <div className = "temp" >
    <span className = "temperature" >{Math.round(weather.main.temp)}</span><span  className = "cell">°c</span>

    </div> 
    <div className = "weatherr" >
    <h4  className="descriptionn"> {weather.weather[0].description.charAt(0).toUpperCase() +
            weather.weather[0].description.slice(1)}</h4>

     </div> 
     
  
    </div> 
    <footer className="footer">
    <img
        src={HumidityIcon}
        className="Humidityimg"
        alt="Humidity"
      />
      <h4 className="humidity">Humidity: 
      <span className="spanh">{weather.main.humidity} %</span> </h4>

    <img
        src={WindIcon}
        className="Windimg"
        alt="Wind"
      />
       <h4 className="wind">
       Wind speed:<span className="spanw">{DegreesToDirection(weather.wind.deg)} {weather.wind.speed} KPH</span></h4>

    </footer>
    </div>
    
    ) : ('')}
    </main> 
    </section>
    </header>
  );
}

export default App;

