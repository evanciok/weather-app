import React from 'react';
import rainDropIcon from './assets/rain-drop-icon.png';

function DisplayWeather({ weatherData }) {
  if (!weatherData) {
    return;
  }

  const formatCoordinates = (coords) => {
    const [lat, lon] = coords.split(', ').map(Number);
    const latDirection = lat >= 0 ? 'N' : 'S';
    const lonDirection = lon >= 0 ? 'E' : 'W';
    const formattedLat = Math.abs(lat).toFixed(2);
    const formattedLon = Math.abs(lon).toFixed(2);
    return `${formattedLat}° ${latDirection}, ${formattedLon}° ${lonDirection}`;
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString(undefined, options);
  };

  return (
    <div className="weather-container">
      <h2>{weatherData.location || 'Unknown Location'}</h2>
      <p className="subtext">{formatCoordinates(weatherData.coordinates)}</p>
      <p className="datetime">{formatDateTime(weatherData.time)}</p>
      
      <div className="temperature-container">
        <span className="temp">{Math.round(weatherData.temperature)}°F</span>
        <span className="feels-like">({Math.round(weatherData.feels_like)}°F)</span>
      </div>
      <p className="humidity">
        <img src={rainDropIcon} alt="humidity icon" className="humidity-icon" />
        {weatherData.humidity}
      </p>
      <p className="description">{weatherData.description}</p>
      
    </div>
  );
}

export default DisplayWeather;