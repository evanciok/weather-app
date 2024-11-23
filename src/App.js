import React, { useState } from 'react';
import InputLocation from './components/InputLocation';
import DisplayWeather from './components/DisplayWeather';
import './styles/App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = (location) => {
    setError(null); 
    if (!location) {
      console.log('Location is empty, not sending API request.');
      return; 
    }
    // Send the location to the backend
    fetch(`http://localhost:5000/weather?location=${encodeURIComponent(location)}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data); 
      })
      .catch((err) => {
        setError('Failed to fetch weather data.');
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <InputLocation onLocationSubmit={fetchWeather} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DisplayWeather weatherData={weatherData} />
    </div>
  );
}

export default App;