import { useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const api_key = '1f170b6ec9fcfab7d7e67dbd3627f1b5'
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    description: '',
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    name: '',
    country: '',
    main: '',
    sunrise: 0,
    sunset: 0,
    wind_speed: 0,
    icon: ''
  });
  const [dataLoaded, setLoaded] = useState(false);
  const searchWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then((response) => {
        console.log(response.data);
        setWeatherData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          name: response.data.name,
          country: response.data.sys.country,
          main: response.data.weather[0].main,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          wind_speed: response.data.wind.speed,
          icon: response.data.weather[0].icon
        });
        setLoaded(true);
      });
  };
  const kToC = (k) => {
    return Math.round(k - 273.15);
  }
  const normalizeTime = (t) => {
    let date = new Date(t*1000);
    return (`${date.getHours()}:${date.getMinutes()}`);
  }
  return (
    <div className="App">
      <div className='search-bar'>
        <input
          placeholder='Type here...'
          type="text"
          className='search-input'
          onChange={(e) => {
            setCity(e.target.value);
            console.log(e.target.value);
          }}
        />
        <button className='search-btn' onClick={searchWeather}>
          Search
        </button>
      </div>
      {dataLoaded && (
        <div className='card-body'>
          <div className="card-column card-main">
            <p className='temp'>{kToC(weatherData.temp)}&deg;</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather icon" className='weather-icon' />
            <div className='card-row card-min-max'>
              <p className="min-max">Max: {kToC(weatherData.temp_max)}&deg; | Min: {kToC(weatherData.temp_min)}&deg;</p>
            </div>
          </div>
          <div className="card-column card-secondary">
            <div className="card-column card-header">
              <p className='name'>{weatherData.name}, {weatherData.country}</p>
              <div className='card-row card-main'>
                <p className='main'>{weatherData.main}, {weatherData.description}</p>
              </div>
            </div>
            <div className="card-column card-footer">
              <p className='secondary-info'>Wind speed {weatherData.wind_speed} m\s</p>
              <p className='secondary-info'>Sunrise: {normalizeTime(weatherData.sunrise)}</p>
              <p className='secondary-info'>Sunset: {normalizeTime(weatherData.sunset)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
