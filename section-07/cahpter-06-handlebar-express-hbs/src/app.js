const express = require('express');
const path = require('path');
const hbs = require('hbs');


const PATH_VIEWS_DIR = path.join(__dirname, '../views');
const PATH_PUBLIC_DIR = path.join(__dirname, '../public');

const app = express();

app.set('view engine', 'hbs');
app.set('views', PATH_VIEWS_DIR);

hbs.registerPartials(PATH_VIEWS_DIR);

app.use(express.static(PATH_PUBLIC_DIR));

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
});

app.get('/json', (req, res) => {
    res.send({title: 'JSON'});
});

app.get('/help', (req, res) => {
    res.render('index', {title: 'Help'});
});

app.listen(3000, () => console.log('listening on port 3000'));
