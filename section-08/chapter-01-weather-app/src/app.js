const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getGeolocation = require('./geocoding');
const getForecast = require('./forecast');

const ADDRESS = process.env.ADDRESS || null;

const PATH_HBS_VIEWS_DIR = path.join(__dirname, '../templates/views');
const PATH_HBS_PARTIALS_DIR = path.join(__dirname, '../templates/partials');
const PATH_PUBLIC_DIR = path.join(__dirname, '../public');

const app = express();

app.set('view engine', 'hbs');
app.set('views', PATH_HBS_VIEWS_DIR);

hbs.registerPartials(PATH_HBS_PARTIALS_DIR);
hbs.registerHelper('json', (data) => {
    return JSON.stringify(data);
});
hbs.registerHelper('round', (number) => {
    return Math.round(number);
});
hbs.registerHelper('day', (time) => {
    return new Date(time * 1000).getDate();
});
hbs.registerHelper('weekday', (time) => {
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const indexDay = new Date(time * 1000).getDay();
    return weekDay[indexDay];
});

app.use(express.static(PATH_PUBLIC_DIR));

app.get('', (req, res) => {
    getGeolocation(ADDRESS, (geolocation) => {
        if (!geolocation) {
            const message = `Can't get geolocation by addres: "${address}"`
            console.log(chalk.yellow.inverse(message));
            res.render('index', {error: message});
            return;
        }
        if (geolocation.error) {
            res.render('index', {error: geolocation.error});
            return;
        }
        const geoCoordinates = {
            latitude: geolocation.center[1],
            longitude: geolocation.center[0]
        };
        getForecast(geoCoordinates, (forecast) => {
            const place = geolocation.place_name;
            if (!forecast) {
                const message = `Can't get weather for: "${place}"`;
                console.log(chalk.yellow.inverse(message));
                res.render('index', {error: message});
                return;
            }
            if (forecast.error) {
                res.render('index', {error: forecast.error});
                return;
            }
            res.render('index', {geolocation, forecast});
        });
    });
});

app.get('/forecast', (req, res) => {
    getGeolocation(req.query.address, (geolocation) => {
        if (!geolocation) {
            const message = `Can't get geolocation by addres: "${address}"`;
            console.log(chalk.yellow.inverse(message));
            res.render('forecast',{error: message});
            return;
        }
        if (geolocation.error) {
            res.render('forecast',{error: geolocation.error});
            return;
        }
        const geoCoordinates = {
            latitude: geolocation.center[1],
            longitude: geolocation.center[0]
        };
        getForecast(geoCoordinates, (forecast) => {
            const place = geolocation.place_name;
            if (!forecast) {
                const message = `Can't get weather for: "${place}"`;
                console.log(chalk.yellow.inverse(message));
                res.render('forecast',{error: message});
                return;
            }
            if (forecast.error) {
                res.render('forecast',{error: forecast.error});
                return;
            }
            res.render('forecast',{geolocation, forecast});
        });
    });
});

app.listen(3000, () => console.log('listening on port 3000'));

