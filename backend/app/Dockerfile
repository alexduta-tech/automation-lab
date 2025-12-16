# Use official lightweight Python image
FROM python:3.12-slim AS backend

# Set working directory in container
WORKDIR /app

# Install system dependencies (optional but recommended)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI application code (backend project has an 'app' folder containing main.py etc.)
COPY . ./app

# Expose port for FastAPI
EXPOSE 8000

# Default command to run the backend using uvicorn (app.main:app assumes main.py is inside 'app' folder)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
