const axios = require('axios');
const chalk = require('chalk');

const SECRET_KEY = process.env.DARK_SKY_API_SECRET_KEY;
const DARKSKY_URL = 'https://api.darksky.net/forecast/';

const params = {
    units: 'si',
    exclude: 'minutely,hourly,flags,alerts'
};

module.exports = getForecast;

function getForecast({latitude, longitude}, callback) {
    const url = `${DARKSKY_URL}${SECRET_KEY}/${latitude},${longitude}`;
    axios.get(url, {params})
        .then(response => callback(response.data))
        .catch(() => console.log(chalk.red.inverse(`Can't make request by url: ${url.replace('https://', '')}`)));
}
