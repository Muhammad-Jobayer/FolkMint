import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from database import standard_response

router = APIRouter(prefix="/api/upload", tags=["upload"])

# Directory configuration (relative to project root)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(PROJECT_ROOT, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"]
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    filename = f"{uuid.uuid4().hex}{ext}"
    save_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return standard_response(True, data={"url": f"/uploads/{filename}", "filename": filename}, message="Image uploaded successfully")
