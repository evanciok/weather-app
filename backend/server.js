const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const OPENWEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function getLatLon(location) {
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`;

    try {
      const response = await axios.get(geocodingUrl);
      const data = response.data;
      if (!data || data.length === 0) {
        throw new Error('Location not found. Please try again.');
      }
      const { lat, lon } = data[0]; 
      return { lat, lon };
    } 
    catch (error) {
      throw new Error('Error getting location coordinates: ' + error.message);
    }
}

async function getWeather(location, lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${OPENWEATHER_API_KEY}&units=imperial&lang=en`;

    try {
      const response = await axios.get(weatherUrl);
      const data = response.data;
      return {
        location: location,
        coordinates: `${lat}, ${lon}`,
        time: data.current.dt,
        temperature: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        main: data.current.weather[0].main,
        description: data.current.weather[0].description,
      };
    } 
    catch (error) {
      throw new Error('Error fetching weather data: ' + error.message);
    }
}

app.get('/weather', async (req, res) => {
    const { location } = req.query

    try {
      const { lat, lon } = await getLatLon(location);
      const weatherData = await getWeather(location, lat, lon);
      res.json(weatherData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});