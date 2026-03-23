from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import os
import shutil

app = FastAPI()

# Allow any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = YOLO("best.pt")  # Your trained YOLO model

# Helper to save uploads
def save_upload(file: UploadFile, folder: str):
    file_path = os.path.join(folder, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return file_path

@app.post("/predict/image")
async def predict_image(image: UploadFile = File(...)):
    img_path = save_upload(image, UPLOAD_FOLDER)
    results = model.predict(img_path, imgsz=640, conf=0.25)
    result_np = results[0].plot()
    result_rgb = result_np[..., ::-1]
    result_img = Image.fromarray(result_rgb)
    result_img_path = os.path.join(UPLOAD_FOLDER, f"pred_{image.filename}")
    result_img.save(result_img_path)
    return FileResponse(result_img_path, media_type="image/png")

@app.post("/predict/video")
async def predict_video(video: UploadFile = File(...)):
    video_path = save_upload(video, UPLOAD_FOLDER)
    
    # Run YOLO on video and save output
    results = model.predict(
        source=video_path,
        imgsz=640,
        conf=0.25,
        save=True,
        project=UPLOAD_FOLDER,       # folder to save
        name=f"pred_{os.path.splitext(video.filename)[0]}",  # subfolder name
        exist_ok=True
    )

    # Get the saved video path directly from YOLO results
    saved_video_path = results[0].path

    if os.path.exists(saved_video_path):
        return FileResponse(saved_video_path, media_type="video/mp4")
    else:
        return {"error": "Processed video not found. Check YOLO output."}

@app.get("/")
def read_root():
    return {"message": "IDD Traffic Sign Detection API is running"}