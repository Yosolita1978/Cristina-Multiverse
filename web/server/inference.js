const HUGGINGFACE_API_URL = "https://xnoufaxvh12gt3v6.us-east4.gcp.endpoints.huggingface.cloud"; // Set this in your env file

async function runModel(prompt) {
  const response = await fetch(HUGGINGFACE_API_URL, {
    headers: { 
      "Accept": "image/png",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      parameters: {}
    })
  });

  const result = await response.content;
  
  return result; 
}

exports.runModel = runModel;