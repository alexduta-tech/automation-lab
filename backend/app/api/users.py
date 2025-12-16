from fastapi import APIRouter, UploadFile, File, HTTPException
from datetime import datetime
import uuid
import os
from app.schemas.user_schema import UserCreate
from app.utils.file_ops import read_users, write_users

# API Router for user-related endpoints: create user, upload profile picture, list users etc.
router = APIRouter()

# Directory for storing profile pictures
PROFILE_DIR = "app/storage/profile_pics"

# -------------------------
# POST /users - Create User
# -------------------------
@router.post("/users")
async def create_user(user: UserCreate):
    data = read_users()
    users = data["users"]

    # Check duplicate email
    if any(u["email"] == user.email for u in users):
        raise HTTPException(status_code=400, detail="Email already exists")

    # Create new user
    new_user = {
        "id": str(uuid.uuid4()),
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": user.status,
        "profile_picture": None,
        "created_at": datetime.utcnow().isoformat(),
    }

    # Append and save new user
    users.append(new_user)
    write_users(data)

    return new_user


# ---------------------------------------------------
# POST /users/{id}/upload-picture - Upload Profile Picture
# Query parameters:
# user_id: ID of the user whose picture is being uploaded
# ---------------------------------------------------
@router.post("/users/{user_id}/upload-picture")
async def upload_picture(user_id: str, file: UploadFile = File(...)):
    # Ensure storage folder exists
    os.makedirs(PROFILE_DIR, exist_ok=True)

    # Construct file path
    file_ext = os.path.splitext(file.filename)[1]
    picture_path = f"{PROFILE_DIR}/{user_id}{file_ext}"

    # Save file
    with open(picture_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Update user record 
    data = read_users()
    users = data["users"]

    # Find user and update profile picture path
    for u in users:
        if u["id"] == user_id:
            u["profile_picture"] = picture_path
            write_users(data)
            return {"message": "Picture uploaded"}

    raise HTTPException(status_code=404, detail="User not found")

# ---------------------------------
# GET /users - List Users
# Optional query parameters:
# search: search term for name or email
# role: filter by user role
# status: filter by user status  
# size: number of items per page (default 10)
# page: page number (default 1)     
# ---------------------------------
@router.get("/users")
async def list_users(
    search: str | None = None,
    role: str | None = None,
    status: str | None = None,
    page: int = 1,
    size: int = 10
    ):
    data = read_users()
    users = data["users"]

    #  SEARCH FILTER 
    if search:
        search_lower = search.lower()
        users = [
            u for u in users
            if search_lower in u["name"].lower()
            or search_lower in u["email"].lower()
            ]

    #  ROLE FILTER 
    if role:
        users = [u for u in users if u["role"] == role]

    #  STATUS FILTER 
    if status:
        users = [u for u in users if u["status"] == status]

    #  PAGINATION: total, page, size, items
    total = len(users)
    start = (page - 1) * size
    end = start + size
    paginated = users[start:end]

    return {
        "total": total,
        "page": page,
        "size": size,
        "items": paginated,
    }
