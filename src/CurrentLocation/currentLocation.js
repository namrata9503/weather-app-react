
import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

import apiKeys from "../apiKeys";
import loader from "../assests/WeatherIcons.gif";
import weatherIcons from '../weatherIcons';
import  WindIcon from '../assests/wind.png';
import  HumidityIcon from '../assests/Humidity.png';
import './currentLocation.css';

 class Weather extends React.Component {
    state = {
      lat: undefined,
      lon: undefined,
      icon:undefined,
      showMsg:'',
      city:undefined,
      country:undefined,
      description:undefined,
      humidity:undefined,
      wind:undefined,
      deg:undefined,
      temp:undefined,
      main:undefined
     
    };
  
    componentDidMount() {
      if (navigator.geolocation) {
        this.getPosition()
          //If user allow location service then will fetch data & send it to get-weather function.
          .then((position) => {
            this.getWeather(position.coords.latitude, position.coords.longitude);
          })
          .catch((err) => {
            //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
            this.getWeather(28.67, 77.22);
            alert(
              "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
      } else {
        alert("Geolocation not available");
      }
  
      this.timerID = setInterval(
        () => this.getWeather(this.state.lat, this.state.lon),
        600000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        
      return  ` ${date} ${month}, ${year}`;
    
      // return (day+', '+date+ ' '+month+' '+year+ '\n' +hour+':'+minute); 
    
      }
  timeBuiler = t => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[t.getDay()];
        let hour = t.getHours();
      let minute = t.getMinutes();
      return  `${day}, ${hour}:${minute}`;
      }
 DegreesToDirection = (degrees) => {
        const WindDirection = ['N','NNE','NE', 'ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    
        const value = Math.floor((degrees / 22.5) + 0.5);
        return WindDirection[value % 16];
      
}
    getPosition = (options) => {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };
    getWeather = async (lat, lon) => {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call.json();
      if(data){
        this.get_WeatherIcon(weatherIcons, data.weather[0].id);
        this.setState({showMsg: " "})
        
      }
      else{
        this.setState({showMsg: "Unable to search current location 😩"})
       // return null;
      }
      console.log("data ", data, data.name);
      this.setState({

        lat: lat,
        lon: lon,
        city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind:data.wind.speed,
      deg:data.wind.deg,
      description: data.weather[0].description,
      country: data.sys.country,
      main:data.main
      });
        //   console.log("data ", weather.coord.lat, weather.name);

    }; 
    get_WeatherIcon = (icons, rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
              this.setState({ icon: icons.Thunderstorm });
              break;
            case rangeId >= 300 && rangeId <= 321:
              this.setState({ icon: icons.Drizzle });
              break;
            case rangeId >= 500 && rangeId <= 521:
              this.setState({ icon: icons.Rain });
              break;
            case rangeId >= 600 && rangeId <= 622:
              this.setState({ icon: icons.Snow });
              break;
            case rangeId >= 701 && rangeId <= 781:
              this.setState({ icon: icons.Atmosphere });
              break;
            case rangeId === 800:
              this.setState({ icon: icons.Clear });
              break;
            case rangeId >= 801 && rangeId <= 804:
              this.setState({ icon: icons.Clouds });
              break;
            default:
              this.setState({ icon: icons.Clouds });
          }
      }
  
    render() {
        if (this.state.temp) {
        return (
 
    <div className = "my-5 currentbg">
    
    <main >
      {/* <p className="msg"> {showMsg}</p> */}
     {(typeof this.state.main !== "undefined") ? (

    <div>
<footer className="footerr row">
    <div className="col">
    
      <h4 className="humidity">Humidity: 
      <img src={HumidityIcon}
        className="Humidityicon"
        alt="Humidity"/>
      <span className="span1">{this.state.humidity} %</span> </h4>
    </div>
   
      <div className="col">
   
       <h4 className="wind">Wind speed:
       <img src={WindIcon}
        className="Windicon"
        alt="Wind" />
        <span className="span2">{this.DegreesToDirection(this.state.deg)} {this.state.wind} KPH</span>
       </h4>
      </div>
  

    </footer>
    <div className = "weather-box" >
      <span className = "tempe" >{Math.round(this.state.temp)}</span><span  className = "cel">°c</span>
    </div> 
    
    <div className = "location-box" >
    <div className = "location" > {this.state.city} , {this.state.country} </div> 
    <div className = "weather" >
    <h4  className="description"> {this.state.description.charAt(0).toUpperCase() +
            this.state.description.slice(1)}</h4>

     </div> 
     </div>
    <div className="icon">
       <i className={`wi ${this.state.icon} display-1 iconImage`}></i>

     </div>
 
    <div className = "date">
   <span style={{fontSize:'4.2rem', display:'flex'}}>{this.timeBuiler(new Date())}</span> 
   
   <span>{this.dateBuilder(new Date())}</span> 
     </div> 
    </div> 
    
    
    
    
    ) : ('')} 
    <div className="arrow bounce button">
    <Link
         activeClass="active"
       to="new-weather"
        spy={true}
       smooth={true}
        offset={-70}
        duration={500}
        >
  <a className="fa fa-arrow-down fa-4x" href="#"> </a>
  </Link>
</div>
    </main> 
    
    </div>
        
        );
     
    }
    else{
        return (
            <React.Fragment>
              <img src={loader} alt="loading..." style={{ width: "50%", WebkitUserDrag: "none" }} />
              <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
                Detecting your location
              </h3>
              <h3 style={{ color: "white", marginTop: "10px" }}>
                Your current location wil be displayed on the App <br></br> & used
                for calculating Real time weather.
              </h3>
            </React.Fragment>
          );
    }
  }
}
  export default Weather;
