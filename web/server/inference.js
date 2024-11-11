const endpointId = process.env.GOOGLE_CLOUD_ENDPOINT_ID;
const project = process.env.GOOGLE_PROJECT;
const location = process.env.GOOGLE_LOCATION;

const {PredictionServiceClient} = require('@google-cloud/aiplatform');

// Specifies the location of the api endpoint
const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function runModel(prompt) {
  const request = {
    endpoint: `projects/${project}/locations/${location}/endpoints/${endpointId}`,
    instances: [
        { stringValue: prompt}
    ],
  };

  const [response] = await predictionServiceClient.predict(request);
  
  return response.predictions[0].stringValue;
}

exports.runModel = runModel;