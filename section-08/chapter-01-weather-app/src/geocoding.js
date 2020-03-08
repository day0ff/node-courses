const axios = require('axios');
const chalk = require('chalk');

const SECRET_KEY = process.env.MAPBOX_ACCESS_TOKEN || null;
const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const params = {
    access_token: SECRET_KEY,
    limit: 1
};

module.exports = getGeolocation;

function getGeolocation(address, callback) {
    const url = MAPBOX_URL + encodeURI(address) + '.json';

    axios.get(url, {params})
        .then(response => callback(response.data.features[0]))
        .catch(() => {
            const message = `Can't make request by url: ${url.replace('https://', '')}`;
            console.log(chalk.red.inverse(message));
            callback({error: message});
        });
}
