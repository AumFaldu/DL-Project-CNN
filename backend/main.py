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

torch.set_num_threads(1)
model = None

@app.on_event("startup")
def warmup():
    global model
    model = YOLO("best.pt")
    
    dummy = Image.new("RGB", (640, 640))
    model.predict(dummy, imgsz=640, conf=0.1)

@app.get("/")
def home():
    return {"message": "Traffic Sign Detection API Running 🚀"}

@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    global model
    try:
        if model is None:
            return JSONResponse({"error": "Model not loaded yet"}, status_code=500)

        if not image.content_type.startswith("image/"):
            return JSONResponse({"error": "Invalid file type"}, status_code=400)

        img_bytes = await image.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        if img.width > 1600:
            img.thumbnail((1600, 1600))

        with torch.no_grad():
            results = model.predict(
                img,
                imgsz=640,
                conf=0.1,
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
