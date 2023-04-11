const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const banana = require('@banana-dev/banana-dev');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const apiKey = process.env.BANANA_API_KEY;
const modelKey = process.env.BANANA_MODEL_KEY;


// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for students in the endpoint '/api/students'
app.get('/api/model', (req, res) => {
    res.json({ message: `Please help me to build Cristina's Multiverse - one prompt at the time` });

});

// create the get request for the photos in the db in the endpoint '/api/photos'
app.get('/api/photos', async (req, res) => {
    try {
        const { rows: photos } = await db.query('SELECT * FROM photos');
        console.log(photos);
        res.send(photos);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the post request for the images in the endpoint miltiverse'
app.post('/api/multiverse', async (req, res) => {

    //req.body.prompt
    const modelParameters = { prompt: req.body.prompt }
    try {
        const out = await banana.run(apiKey, modelKey, modelParameters)
        //out.modelOutputs[0].image_base64
        //console.log(out.modelOutputs[0].image_base64);
        const result = await db.query(
            'INSERT INTO photos(photo, prompt) VALUES($1, $2) RETURNING *',
            [out.modelOutputs[0].image_base64, modelParameters.prompt],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});