// weatherHelpers.js

// Format a number with a leading zero if needed
function formatTemperature(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

// Ensure positive integer temperature
function convertToPostive(temperature) {
    return Math.abs(Math.round(temperature));
  }

//Extract temperature from weather data
function extractTemperature(weatherData) {
    if (weatherData && weatherData.data && weatherData.data.current) {
      return weatherData.data.current.temp_c;
    }
    return null; // Return null if temperature data is not available
  }
  
  module.exports = { formatTemperature, convertToPostive, extractTemperature };
  