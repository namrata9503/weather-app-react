// Visit https://api.openweathermap.org & then signup to get our API keys for free
module.exports = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
    timeKey: process.env.REACT_APP_DATE_API_KEY
  };