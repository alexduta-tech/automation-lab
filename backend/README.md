# Backend Project

This project is a FastAPI backend for the Automation Playground system 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine or Docker container for development and testing purposes.

## Local machine (recommended for development)

### Prerequisites
Install the following dependencies:

* Python 3.13+ - https://www.python.org/downloads/
* pip (installed wih Python)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alexduta-tech/automation-lab.git
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install the dependencies:
   ```sh
   pip install -r app/requirements.txt
   ```

### Usage
Activate virtual environment: 
```sh
venv\Scripts\activate
```

To run the application, use the following command from the root directory:

```sh
uvicorn app.main:app --reload
```

This will start the server at `http://127.0.0.1:8000`. You can access the API documentation at `http://127.0.0.1:8000/docs`.

## Docker (recommended for testing and production)

### Prerequisites
Install the following dependencies:
* Docker Desktop - https://www.docker.com/products/docker-desktop/

### Installation

Run the installation .bat file: 
```sh
run_frontend_backend.bat 
```

This will install both backen and frontend apps.

Note: Initial Docker execution may take additional time to build the image and download dependencies. This is a one-time cost; later runs benefit from Docker’s caching mechanism.


### Usage

Use the server at `http://localhost:8000`. You can access the API documentation at `http://localhost:8000/docs`.

## Project Structure

```
.
├── app
│   ├── api
│   │   └── users.py       # user CRUD operations
│   ├── schemas
│   │   └── user_schema.py # user data validation
│   ├── storage
│   │   ├── users.json     # store user data
│   │   └── profile_pics   # store profile pictures
│   ├── utils
│   │   └── file_ops.py    # file operations
│   ├── __init__.py
│   ├── Dockerfile         # containerization
│   ├── .dockerignore      # docker ignore file
│   ├── .gitignore         # git ignore file
│   ├── main.py            # CORS setup, allow origin
│   └── requirements.txt   # dependencies
└── venv 
```
