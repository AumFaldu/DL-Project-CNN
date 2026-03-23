from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import base64

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model once at startup
model = YOLO("best.pt")

@app.get("/")
def home():
    return {"message": "Traffic Sign Detection API Running 🚀"}

@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    try:
        # Read uploaded image directly into memory
        img_bytes = await image.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        # Run YOLO prediction (smaller image size = faster)
        results = model.predict(img, imgsz=320, conf=0.25)

        # Get result image as numpy array and convert to PIL
        result_np = results[0].plot()  # plot boxes/labels
        result_img = Image.fromarray(result_np[..., ::-1])

        # Convert to base64
        buf = io.BytesIO()
        result_img.save(buf, format="PNG")
        img_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        return {"image": img_base64}

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
