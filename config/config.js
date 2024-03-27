require('dotenv').config();

// Load the city list from the environment variable and parse it as JSON
const cityList = JSON.parse(process.env.CITY_LIST);

const config = {
  apiKey: process.env.API_KEY,
  cityList: cityList
};

module.exports = config;