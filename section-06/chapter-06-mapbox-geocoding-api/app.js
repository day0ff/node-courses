const axios = require('axios').default;

const SECRET_KEY = process.env.MAPBOX_ACCESS_TOKEN || null;
const ADDRESS = process.env.ADDRESS || null;
const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const params = {
    access_token: SECRET_KEY,
    country:'BY',
    limit:1
};

getGeolocation().then(data => console.log(data));

function getGeolocation() {
    return axios.get(MAPBOX_URL + ADDRESS + '.json', {params})
        .then(response => response.data.features[0])
}

