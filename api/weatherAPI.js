// weatherAPI.js
const axios = require('axios');
const { extractTemperature } = require('../helpers/weatherHelpers.js');



async function fetchWeatherData(cityId,apiKey) {
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityId)}`;

  try {
    const response = await axios.get(API_URL);
    const extractedTemp = extractTemperature(response);
    return extractedTemp;
  } catch (error) {
    throw new Error(`Error fetching weather data for city ID ${cityId}: ${error.message}`);
  }
}

module.exports = { fetchWeatherData };
