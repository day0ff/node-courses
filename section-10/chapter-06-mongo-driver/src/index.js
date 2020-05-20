const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.01:27017';
const database = 'driver';

const client = new MongoClient(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true});

client.connect()
    .then(() => {
        console.log('Connected successfully to server');
        const db = client.db(database);
        db.collection('users').insertOne({
            name: 'Denis',
            age: 36
        }).then(response => {
            console.log(response.ops);
            client.close();
        });
    })
    .catch(error => {
        console.log('Could not connect to server');
        console.log(error);
        client.close();
    });
