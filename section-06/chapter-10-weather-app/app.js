const yargs = require('yargs');
const chalk = require('chalk');

const getGeolocation = require('./geocoding.js');
const getForecast = require('./forecast.js');

yargs.command(
    'weather',
    'Show weather in the specified region.',
    {
        address: {
            describe: 'Address.',
            demandOption: true,
            type: 'string'
        },
    },
    function ({address}) {
        console.log(chalk.yellow('Getting geolocation...'));
        getGeolocation(address, (geolocation) => {
            if(!geolocation){
                console.log(chalk.yellow.inverse(`Can't get geolocation by addres: "${address}"`));
                return;
            }
            const geoCoordinates = {
                latitude: geolocation.center[0],
                longitude: geolocation.center[0]
            };
            const place = geolocation.place_name;
            console.log(chalk.yellow('Getting weather forecast...'));
            getForecast(geoCoordinates, (forecast) => {
                if(!forecast){
                    console.log(chalk.yellow.inverse(`Can't get weather for: "${place}"`));
                    return;
                }
                console.log(chalk.blue.inverse.bold(`Weather at :${place}`));
                console.log(chalk.blueBright.inverse.bold('Today:'));
                console.log(chalk.blue(forecast.daily.summary));
                console.log(chalk.blueBright(forecast.daily.data[0].summary));
                console.log(chalk.green(`Temperature:\t${forecast.currently.temperature}°C`));
                console.log(chalk.green(`Humidity:\t${forecast.currently.humidity*100}%`));
                console.log(chalk.blueBright.inverse.bold('Tomorrow:'));
                console.log(chalk.blueBright(forecast.daily.data[1].summary));
                console.log(chalk.green(`Temperature:\t${forecast.daily.data[1].temperatureLow}-${forecast.daily.data[1].temperatureHigh}°C`));
                console.log(chalk.green(`Humidity:\t${forecast.daily.data[1].humidity*100}%`));
            });
        });
    }
);

yargs.parse();
