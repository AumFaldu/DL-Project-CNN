from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import base64
import torch

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⭐ CPU optimisation
torch.set_num_threads(1)

# Load YOLO model once at startup
model = YOLO("best.pt")

# ⭐ Warmup model (VERY IMPORTANT for Render)
@app.on_event("startup")
def warmup():
    dummy = Image.new("RGB", (320, 320))
    model.predict(dummy, imgsz=320, conf=0.25)

@app.get("/")
def home():
    return {"message": "Traffic Sign Detection API Running 🚀"}

@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    try:
        img_bytes = await image.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        if img.width > 1600:
            img.thumbnail((1600, 1600))
        with torch.no_grad():
            results = model.predict(
                img,
                imgsz=320,
                conf=0.25,
                device="cpu",
                verbose=False
            )

        result_np = results[0].plot()

        result_img = Image.fromarray(result_np[..., ::-1])
        buf = io.BytesIO()
        result_img.save(buf, format="JPEG", quality=90)

        img_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        return {"image": img_base64}

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
