from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import os
import shutil
import uuid

app = FastAPI()

# Allow frontend requests (Next.js on Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model once
model = YOLO("best.pt")


def save_upload(file: UploadFile):
    unique_name = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_name)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return file_path, unique_name


@app.get("/")
def home():
    return {"message": "Traffic Sign Detection API Running 🚀"}


@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    try:
        img_path, name = save_upload(image)

        results = model.predict(img_path, imgsz=640, conf=0.25)

        result_np = results[0].plot()
        result_rgb = result_np[..., ::-1]

        result_img = Image.fromarray(result_rgb)
        result_img_path = os.path.join(UPLOAD_FOLDER, f"pred_{name}")
        result_img.save(result_img_path)

        return FileResponse(result_img_path, media_type="image/png")

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
