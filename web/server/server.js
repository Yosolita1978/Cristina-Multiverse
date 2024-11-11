const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const runModel = require('./inference.js');
const db = require('./db/db-connection.js');
const { auth } = require('express-oauth2-jwt-bearer');


const app = express();
const PORT = process.env.PORT || 8080;
//web/client/dist
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));
app.use(cors());
app.use(express.json());

const validateAccessToken = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    //res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
    res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

// create the get request for students in the endpoint '/api/students'
app.get('/api/model', (req, res) => {
    res.json({ message: `Please help me to build Cristina's Multiverse - one prompt at the time` });

});

// create the get request for the photos in the db in the endpoint '/api/photos'
app.get('/api/photos', async (req, res) => {
    try {
        const { rows: photos } = await db.query('SELECT * FROM photos');
        // console.log(photos);
        // res.send(photos);
        let resultDB = photos
        let reverse = resultDB.reverse();
        res.send(reverse);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the post request for the images in the endpoint miltiverse'
app.post('/api/multiverse', async (req, res) => {

    //req.body.prompt
    const prompt = req.body.prompt;
    try {
        const image_base64 = await runModel.runModel(prompt);
        //out.modelOutputs[0].image_base64
        //console.log(out.modelOutputs[0].image_base64);
        const result = await db.query(
            'INSERT INTO photos(photo, prompt) VALUES($1, $2) RETURNING *',
            [out.modelOutputs[0].image_base64, modelParameters.prompt],
        );
        
        //console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request - this endpoint is not in the path object so it will be enforced for the Auth0
app.delete('/api/multiverse/:id',  validateAccessToken, async (req, res) =>{
    const promptId = req.params.id;
    //console.log("From the delete request-url", req.params,  promptId);
    await db.query('DELETE FROM photos WHERE id=$1', [promptId]);
    res.status(200).json({msg: `Deleted prompt id ${promptId}`}).end();
  
  });


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});