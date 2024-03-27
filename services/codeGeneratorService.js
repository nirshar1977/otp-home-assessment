// codeGeneratorService.js
const { fetchWeatherData } = require('../api/weatherAPI');
const { formatTemperature, convertToPostive } = require('../helpers/weatherHelpers');


async function generateOTP(apiKey, cityIds) {
  const temperatures = [];

  console.log("City IDs:",cityIds);

  try {
    for (const cityId of cityIds) {
      const temperature = await fetchWeatherData(cityId,apiKey);
      const temperatureCelsius = convertToPostive(temperature);
      temperatures.push(formatTemperature(temperatureCelsius));
    }

    // Build the one-time code using the temperatures
    const otp = temperatures.join('');
    return otp;
  } catch (error) {
    throw new Error(`Error generating one-time code: ${error.message}`);
  }
}

module.exports = { generateOTP };
