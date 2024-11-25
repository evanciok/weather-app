import React, { useState, useEffect } from 'react';
import InputLocation from './components/InputLocation';
import DisplayWeather from './components/DisplayWeather';
import clearBG from './components/assets/clear-bg.jpg';
import cloudyBG from './components/assets/cloudy-bg.jpeg';
import drizzleBG from './components/assets/drizzle-bg.png';
import tsBG from './components/assets/ts-bg.jpg';
import snowBG from './components/assets/snowy-bg.jpg';
import './App.css';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const weatherBackgrounds = {
    Clear: clearBG,
    Clouds: cloudyBG,
    Snow: snowBG,
    Rain: drizzleBG,
    Drizzle: drizzleBG,
    Thunderstorm: tsBG,
  };

  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.main; 
      const background = weatherBackgrounds[condition] || weatherBackgrounds.Clear; 
      document.body.style.backgroundImage = `url(${background})`; 
      document.body.style.backgroundSize = 'cover'; 
      document.body.style.backgroundPosition = 'center'; 
      document.body.style.backgroundAttachment = 'fixed'; 
    }
  }, [weatherData]); 

  const fetchWeather = (location) => {
    setError(null); 
    if (!location) {
      return; 
    }

    fetch(`${BACKEND_API_URL}/weather?location=${encodeURIComponent(location)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Location not found or invalid');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data); 
      })
      .catch((err) => {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      });
  };

  return (
    <div className="App" style={{ backgroundImage: weatherData ? weatherBackgrounds[weatherData.main] : 'none' }}>
      <h1>Weather Application</h1>
      <InputLocation onLocationSubmit={fetchWeather} />
      {error && <p style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{error}</p>}
      <DisplayWeather weatherData={weatherData} />
    </div>
  );
}

export default App;