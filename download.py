import os

from diffusers import DiffusionPipeline


def download_model():
    # do a dry run of loading the huggingface model, which will download weights
    HF_AUTH_TOKEN = os.getenv("HF_AUTH_TOKEN")

    DiffusionPipeline.from_pretrained(
        "ECRodriguez/ecrodriguez", use_auth_token=HF_AUTH_TOKEN
    )


if __name__ == "__main__":
    download_model()
