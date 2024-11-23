import React from 'react';

function DisplayWeather({ weatherData }) {
  if (!weatherData) {
    return <p>No data available for the input location. Please try another.</p>;
  }

  return (
    <div className="weather-container">
      <h2>Current Weather</h2>
      <p>Location: {weatherData.location ? weatherData.location : 'Not available'}</p>
      <p>Coordinates: {weatherData.coordinates}</p>
      <p>Time: {new Date(weatherData.time * 1000).toLocaleString()}</p>
      <p>Temperature: {weatherData.temperature}°F</p>
      <p>Feels Like: {weatherData.feels_like}°F</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Condition: {weatherData.main}</p>
      <p>Description: {weatherData.description}</p>
    </div>
  );
}

export default DisplayWeather;