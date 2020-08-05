import React, { useState } from 'react';
import api from "./apiKeys";
import weatherIcons from './weatherIcons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import  WindIcon from './assests/wind.png';
import  HumidityIcon from './assests/Humidity.png';
import './App.css';
import CurrentLocation from "./CurrentLocation/currentLocation";
import DayOne from './forecast/DayOne/DayOne';
import DayTwo from './forecast/DayTwo/DayTwo';
import DayThree from './forecast/DayThree/DayThree';



function App() {
 

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [icon,setIcon] = useState(undefined);
  const [showMsg, setShowMsg] = React.useState('');
  const [city, setCity] = useState('');
  const [icon1,setIcon1] = useState(undefined);
  const [icon2,setIcon2] = useState(undefined);
  const [icon3,setIcon3] = useState(undefined);

  const [day1, setDay1] = useState({});
  const [day2, setDay2] = useState({});
  const [day3, setDay3] = useState({});
  const [day4, setDay4] = useState({});


  
  const search = evt => {
    if(evt.key === "Enter")
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(result => {
      console.log("search result : ",result);
      setWeather(result);
     getDays(query);
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

  const getDays = async (c) => {
   
    
    const apic= await fetch(
      `${api.base}forecast?q=${c}&appid=${api.key}`
      );
    const data = await apic.json();
    if(data){

        get_dailyWeatherIcon1(weatherIcons, data.list[1].weather[0].id);
        get_dailyWeatherIcon2(weatherIcons, data.list[9].weather[0].id);
        get_dailyWeatherIcon3(weatherIcons, data.list[17].weather[0].id);

        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const monthNames = ["Jan", "Feb", "March", 
        "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nove", "Dec" ];

        let dateAr1= data.list[9].dt_txt.split(' ')[0];
        let newDate1 = dateAr1[5] + '' + dateAr1[6] + '-' + dateAr1[8] + '' + dateAr1[9]
         + '-' + dateAr1[0] + '' + dateAr1[1]+ dateAr1[2] + '' + dateAr1[3];
    
         let loIsDate1 = new Date(newDate1);
         let weekdayNumber1 = loIsDate1.getDay();
         let weekdayName1 = days[weekdayNumber1];
          const m1 = new Date(newDate1);
          const month1= monthNames[m1. getMonth()];

         const d1 = dateAr1[8] + '' + dateAr1[9];

       
         let dateAr2= data.list[17].dt_txt.split(' ')[0];
         let newDate2 = dateAr2[5] + '' + dateAr2[6] + '-' + dateAr2[8] + '' + dateAr2[9]
          + '-' + dateAr2[0] + '' + dateAr2[1]+ dateAr2[2] + '' + dateAr2[3];
    
          let loIsDate2 = new Date(newDate2);
         let weekdayNumber2 = loIsDate2.getDay();
          let weekdayName2 = days[weekdayNumber2];

          const m2 = new Date(newDate2);
          const month2= monthNames[m2. getMonth()];

         const d2 = dateAr2[8] + '' + dateAr2[9];
    
    
          let dateAr3= data.list[25].dt_txt.split(' ')[0];
          let newDate3 = dateAr3[5] + '' + dateAr3[6] + '-' + dateAr3[8] + '' + dateAr3[9]
           + '-' + dateAr3[0] + '' + dateAr3[1]+ dateAr3[2] + '' + dateAr3[3];
    
           
          let loIsDate3 = new Date(newDate3);
          let weekdayNumber3 = loIsDate3.getDay();
           let weekdayName3 = days[weekdayNumber3];

           const m3 = new Date(newDate3);
          const month3= monthNames[m3. getMonth()];

         const d3 = dateAr3[8] + '' + dateAr3[9];

      console.log("data result ", data);
      setCity( data.city.name);
      setDay1({
        main: data.list[1].weather[0].main,
        description: data.list[1].weather[0].description,
        date: d1,
        day: weekdayName1,
        month: month1,
        temp: data.list[1].main.temp,
        id: data.list[1].weather[0].id
      });
      setDay2({
        main: data.list[9].weather[0].main,
        description: data.list[9].weather[0].description,
        day: weekdayName2,
        month: month2,
        date: d2,
        temp: data.list[9].main.temp,
        id: data.list[9].weather[0].id
      });
      setDay3({
        main: data.list[17].weather[0].main,
        description: data.list[17].weather[0].description,
        day: weekdayName3,
        month: month3,
        date: d3,
        temp: data.list[17].main.temp,
        id: data.list[17].weather[0].id
      });
      
      console.log('txt date ', data.list[1].dt_txt.split(' ')[0]);
      console.log('day date ', newDate1);
    }
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
  const get_dailyWeatherIcon1 = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
      setIcon1(icons.Thunderstorm);
      break;
      case rangeId >= 300 && rangeId <= 321:
        // this.setState({ icon: icon.Drizzle });
        setIcon1(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
      setIcon1(icons.Rain);
      break;
      case rangeId >= 600 && rangeId <= 622:
      setIcon1(icons.Snow);
      break;
      case rangeId >= 701 && rangeId <= 781:
      setIcon1(icons.Atmosphere);
      break;
      case rangeId === 800:
      setIcon1(icons.Clear);

        break;
      case rangeId >= 801 && rangeId <= 804:
      
      setIcon1(icons.Clouds)
    
        break;
      default:
      setIcon1(icons.Clouds);
    }
  }
  const get_dailyWeatherIcon2 = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
      setIcon2(icons.Thunderstorm);
      break;
      case rangeId >= 300 && rangeId <= 321:
        // this.setState({ icon: icon.Drizzle });
        setIcon2(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
      setIcon2(icons.Rain);
      break;
      case rangeId >= 600 && rangeId <= 622:
      setIcon2(icons.Snow);
      break;
      case rangeId >= 701 && rangeId <= 781:
      setIcon2(icons.Atmosphere);
      break;
      case rangeId === 800:
      setIcon2(icons.Clear);

        break;
      case rangeId >= 801 && rangeId <= 804:
      
      setIcon2(icons.Clouds)
    
        break;
      default:
      setIcon2(icons.Clouds);
    }
  }
  const get_dailyWeatherIcon3 = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
      setIcon3(icons.Thunderstorm);
      break;
      case rangeId >= 300 && rangeId <= 321:
        // this.setState({ icon: icon.Drizzle });
        setIcon3(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
      setIcon3(icons.Rain);
      break;
      case rangeId >= 600 && rangeId <= 622:
      setIcon3(icons.Snow);
      break;
      case rangeId >= 701 && rangeId <= 781:
      setIcon3(icons.Atmosphere);
      break;
      case rangeId === 800:
      setIcon3(icons.Clear);

        break;
      case rangeId >= 801 && rangeId <= 804:
      
      setIcon3(icons.Clouds)
    
        break;
      default:
      setIcon3(icons.Clouds);
    }
  }
 
  

  const DegreesToDirection = (degrees) => {
    const WindDirection = ['N','NNE','NE', 'ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

    const value = Math.floor((degrees / 22.5) + 0.5);
    return WindDirection[value % 16];
  }

  const timePicker  = (dt) => {
    var utc = dt / 3600;
 
    var d = new Date();

    var utcOLffset = d.getTimezoneOffset();

    d.setMinutes(d.getMinutes() + utcOLffset);

    var mOffset = utc * 60;
    d.setMinutes(d.getMinutes() + mOffset);
    return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  const datePicker  = (dt) => {
    var utc = dt / 3600;
    // var timestr = date.toLocaleTimeString();
     
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    var d = new Date();

    var utcOLffset = d.getTimezoneOffset();

    d.setMinutes(d.getMinutes() + utcOLffset);

    var mOffset = utc * 60;
    d.setMinutes(d.getMinutes() + mOffset);
    return d.toLocaleDateString(undefined, options);
  }
  
  return ( 
    
  <header className = {(typeof weather.main !== "undefined") ? ((weather.main.temp > 20) ? 
  'app warm ' 
  : 'app ') : 'app '} >
  <section className=" mx-auto align-items-center  ">
   <CurrentLocation />

    <main id="new-weather" className={ (typeof weather.main !== "undefined") ? ((weather.main.temp > 20) ? 
  ' sunny ' 
  : 'winter ') : 'app-main '}>
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
  <span style={{fontSize:'4.2rem', display:'flex', lineHeight:'3rem', paddingTop:'10px'}}>   
   {timePicker(weather.timezone)}</span>
    <span>{datePicker(weather.timezone)}</span><br/>
     </div> 
    <div className = "location-boxx" >
    <div className = "loc" > {weather.name} , {weather.sys.country} </div> 
  
    </div> 
    <div className = "weather-boxx" >
    
   
    <div className = "temp" >
    <span className = "temperature" >{Math.round(weather.main.temp)}</span><span  className = "cell">°c</span>

    </div> 
    <div className="iconn">
       <i className={`wi ${icon} display-4 iconImgg`}></i>

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
    <div className="days search-days">
    <DayOne 
          temp={day1.temp} 
          date={day1.date} 
          day={day1.day}
          month={day1.month} 
          date={day1.date}
          main={day1.main}
          id={day1.id} 
          icons={icon}
          iconss={icon1}/>
    <DayTwo
          temp={day2.temp} 
          date={day2.date} 
          day={day2.day}
          month={day2.month} 
          date={day2.date}
          main={day2.main}
          id={day2.id} 
          icons={icon}
          iconss={icon2}/>
    <DayThree
          temp={day3.temp} 
          date={day3.date} 
          day={day3.day}
          month={day3.month} 
          date={day3.date}
          main={day3.main}
          id={day3.id} 
          icons={icon}
          iconss={icon3}/> 
   </div>     
    </div>
    
    ) : ('')}
   
    </main> 
    </section>
    </header>
  );
}

export default App;

