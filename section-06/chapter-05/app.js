const chalk = require('chalk');
const axios = require('axios').default;

const SECRET_KEY = process.env.DARK_SKY_API_SECRET_KEY;
const LATITUDE = process.env.LATITUDE || 51.3026;
const LONGITUDE = process.env.LONGITUDE || 0.739;

const API_URL = `https://api.darksky.net/forecast/${SECRET_KEY}/${LATITUDE},${LONGITUDE}`;
const params = {
    units: 'si',
    exclude: 'minutely,hourly,flags,alerts'
};

showCurrentlyWeather();

async function showCurrentlyWeather() {
    console.log(chalk.green('Fetching current weather...'));
    try {
        const weather = await getCurrentWeather();
        console.log(chalk.green.inverse('Current weather:'));
        console.log(chalk.yellow.inverse(weather.daily.data[0].summary));
        console.log(chalk.yellow('Temperature:\t') + chalk.blueBright(weather.currently.temperature));
        console.log(chalk.yellow('Wind Speed:\t') + chalk.blue(weather.currently.windSpeed));
    } catch (error) {
        console.log(chalk.red.inverse('Failed to get currently weather!'));
    }
}

function getCurrentWeather() {
    return axios.get(API_URL, {params})
        .then(response => response.data)
}
