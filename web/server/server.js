const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const banana = require('@banana-dev/banana-dev');


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

// create the post request for students in the endpoint '/api/students'
app.post('/api/multiverse', async (req, res) => {

    const modelParameters = req.body.prompt;
    try{
    const out = await banana.run(apiKey, modelKey, modelParameters)
    //out.modelOutputs[0].image_base64
    console.log(modelParameters);
    res.json({photo: out.modelOutputs[0].image_base64, prompt: modelParameters});

    } catch (e){
        console.log(e);
    }
    
});


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});