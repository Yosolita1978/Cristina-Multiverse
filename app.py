import base64
import os
from io import BytesIO

import torch
from diffusers import DiffusionPipeline


# Init is ran on server startup
# Load your model to GPU as a global variable here using the variable name "model"
def init():
    global pipeline

    HF_AUTH_TOKEN = os.getenv("HF_AUTH_TOKEN")

    pipeline = DiffusionPipeline.from_pretrained(
        "ECRodriguez/ecrodriguez", use_auth_token=HF_AUTH_TOKEN
    )
    pipeline = pipeline.to("cuda")


# Inference is ran for every server call
# Reference your preloaded global model variable here.
def inference(model_inputs: dict) -> dict:
    global pipeline

    # Parse out your arguments
    prompt = model_inputs.get("prompt", None)
    num_inference_steps = model_inputs.get("num_inference_steps", 50)

    if prompt == None:
        return {"message": "No prompt provided"}

    # Run the model
    with torch.autocast("cuda"):
        image = pipeline(
            prompt, num_inference_steps=num_inference_steps
        ).images[0]

    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    # Return the results as a dictionary
    return {"image_base64": image_base64}
