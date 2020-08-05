
import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

import apiKeys from "../apiKeys";
import loader from "../assests/WeatherIcons.gif";
import weatherIcons from '../weatherIcons';
import  WindIcon from '../assests/wind.png';
import  HumidityIcon from '../assests/Humidity.png';
import './currentLocation.css';
import DayOne from '../forecast/DayOne/DayOne';
import DayTwo from '../forecast/DayTwo/DayTwo';
import DayThree from '../forecast/DayThree/DayThree';

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
      main:undefined,
      day1:{},
      day2:{},
      day3:{},
      icon1:undefined,
      icon2:undefined,
      icon3:undefined
     

    };
  
    componentDidMount() {
      if (navigator.geolocation) {
        this.getPosition()
          //If user allow location service then will fetch data & send it to get-weather function.
          .then((position) => {
            this.getWeather(position.coords.latitude, position.coords.longitude);
            this.getDays(position.coords.latitude, position.coords.longitude);
          })
          .catch((err) => {
            //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
            this.getWeather(28.67, 77.22);
            this.getDays(28.67, 77.22);
            alert(
              "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
      } else {
        alert("Geolocation not available");
      }
  
      this.timerID = setInterval(
        () => (this.getWeather(this.state.lat, this.state.lon),
                this.getDays(this.state.lat, this.state.lon)),
        600000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    dateBuilder = (d) => {
        let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
        
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

    getDays = async (lat, lon) =>{
      const apic= await fetch(
        `${apiKeys.base}forecast?lat=${lat}&lon=${lon}&appid=${apiKeys.key}`
        );
      const data = await apic.json();
      if(data){
        console.log("current data : ", data);
        this.get_dailyWeatherIcon1(weatherIcons, data.list[1].weather[0].id);
        this.get_dailyWeatherIcon2(weatherIcons, data.list[9].weather[0].id);
        this.get_dailyWeatherIcon3(weatherIcons, data.list[17].weather[0].id);

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
   
       
           this.setState({
            day1:{
            main: data.list[1].weather[0].main,
            description: data.list[1].weather[0].description,
            day: weekdayName1,
            month: month1,
            date: d1,
            temp: data.list[1].main.temp,
            id: data.list[1].weather[0].id,
            },

            day2:{
            main: data.list[9].weather[0].main,
            description: data.list[9].weather[0].description,
            day: weekdayName2,
            month: month2,
            date: d2,
            temp: data.list[9].main.temp,
            id: data.list[9].weather[0].id
            },
            day3:{
            main: data.list[17].weather[0].main,
            description: data.list[17].weather[0].description,
            day: weekdayName3,
            month: month3,
            date: d3,
            temp: data.list[17].main.temp,
            id: data.list[17].weather[0].id
            }
            
          });
      }
      else{
        console.log("error ", data.errorMessage);
      }
     
    }
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
  get_dailyWeatherIcon1 = (icons, rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
              this.setState({
                icon1: icons.Thunderstorm});
              break;
            case rangeId >= 300 && rangeId <= 321:
              this.setState({ 
                icon1: icons.Drizzle 
                });
              break;
            case rangeId >= 500 && rangeId <= 521:
              this.setState({ 
              icon1: icons.Rain 
               });
              break;
            case rangeId >= 600 && rangeId <= 622:
              this.setState({ 
                 icon1: icons.Snow 
                });
              break;
            case rangeId >= 701 && rangeId <= 781:
              this.setState({ 
                icon1: icons.Atmosphere 
                 });
              break;
            case rangeId === 800:
              this.setState({ 
              icon1: icons.Clear 
              });
              break;
            case rangeId >= 801 && rangeId <= 804:
              this.setState({
                icon1: icons.Clouds 
               });
              break;
            default:
              this.setState({ 
               icon1: icons.Clouds 
               });
          }
      }
 get_dailyWeatherIcon2 = (icons, rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
              this.setState({
                icon2: icons.Thunderstorm});
              break;
            case rangeId >= 300 && rangeId <= 321:
              this.setState({ 
                icon2: icons.Drizzle 
                });
              break;
            case rangeId >= 500 && rangeId <= 521:
              this.setState({ 
              icon2: icons.Rain 
               });
              break;
            case rangeId >= 600 && rangeId <= 622:
              this.setState({ 
                 icon2: icons.Snow 
                });
              break;
            case rangeId >= 701 && rangeId <= 781:
              this.setState({ 
                icon2: icons.Atmosphere 
                 });
              break;
            case rangeId === 800:
              this.setState({ 
              icon2: icons.Clear 
              });
              break;
            case rangeId >= 801 && rangeId <= 804:
              this.setState({
                icon2: icons.Clouds 
               });
              break;
            default:
              this.setState({ 
               icon2: icons.Clouds 
               });
          }
      }
  get_dailyWeatherIcon3 = (icons, rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
              this.setState({
                icon3: icons.Thunderstorm});
              break;
            case rangeId >= 300 && rangeId <= 321:
              this.setState({ 
                icon3: icons.Drizzle 
                });
              break;
            case rangeId >= 500 && rangeId <= 521:
              this.setState({ 
              icon3: icons.Rain 
               });
              break;
            case rangeId >= 600 && rangeId <= 622:
              this.setState({ 
                 icon3: icons.Snow 
                });
              break;
            case rangeId >= 701 && rangeId <= 781:
              this.setState({ 
                icon3: icons.Atmosphere 
                 });
              break;
            case rangeId === 800:
              this.setState({ 
              icon3: icons.Clear 
              });
              break;
            case rangeId >= 801 && rangeId <= 804:
              this.setState({
                icon3: icons.Clouds 
               });
              break;
            default:
              this.setState({ 
               icon3: icons.Clouds 
               });
          }
      }
  
    render() {
        if (this.state.temp) {
        return (
 
    <div className = " currentbg">
    
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
    
    
    <div className = "location-box" >
    <div className = "location" > {this.state.city} , {this.state.country} </div> 
   
     </div>
     
    <div className = "date">
   <span style={{fontSize:'2.2rem'}}>{this.timeBuiler(new Date())}</span> 
   
   <span>{this.dateBuilder(new Date())}</span> 
     </div>
     <div className="icon">
       <i className={`wi ${this.state.icon} display-1 iconImage`}></i>

     </div>
     <div className = "weather-box" >
      <span className = "tempe" >{Math.round(this.state.temp)}</span><span  className = "cel">°c</span>
      <div className = "weather" >
    <h4  className="description"> {this.state.description.charAt(0).toUpperCase() +
            this.state.description.slice(1)}
   </h4>

     </div> 
    </div> 
    
  
     <div className="days">
    <DayOne 
          temp={this.state.day1.temp} 
          day={this.state.day1.day}
          month={this.state.day1.month} 
          date={this.state.day1.date}
          main={this.state.day1.main}
          id={this.state.day1.id} 
          iconss={this.state.icon1}/>
    <DayTwo
          temp={this.state.day2.temp} 
          day={this.state.day2.day}
          month={this.state.day2.month} 

          date={this.state.day2.date} 
          main={this.state.day2.main}
          id={this.state.day2.id} 
          iconss={this.state.icon2} />
    <DayThree
          temp={this.state.day3.temp} 
          day={this.state.day3.day}
          month={this.state.day3.month} 

          date={this.state.day3.date} 
          main={this.state.day3.main}
          id={this.state.day3.id} 
          iconss={this.state.icon3}/> 
   </div>  
    </div> 
    
    
    
    
    ) : ('')} 
    <div className="arrow bounce button">
    <Link
        activeClass="active"
       to="new-weather"
        spy={true}
       smooth={true}
        offset={-20}
        duration={500}>
  <nav className="fa fa-arrow-down fa-4x"></nav>
  </Link>
</div>
   
    </main> 
    
    </div>
        
        );
     
    }
    else{
        return (
            <React.Fragment>
              <img src={loader} alt="loading..." style={{ width: "40%", WebkitUserDrag: "none" }} />
              <div style={{display:'flex', flexDirection: 'column'}}>
              <h3 style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>
                Detecting your location
              </h3>
              <h3 style={{ color: "white", marginTop: "10px" }}>
                Your current location will be displayed on the App <br></br> & used
                for Real time Weather.
              </h3>
              </div>
            </React.Fragment>
          );
    }
  }
}
  export default Weather;
