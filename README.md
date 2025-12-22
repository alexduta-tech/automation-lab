# AUT - Automation Playground

A full-stack web application for managing users, built with a FastAPI backend and React/Vite frontend, containerized with Docker.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Access the application](#access-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)

## Project Overview

Automation Playground is a user management application that provides a complete system for creating, viewing, and managing user profiles. The application features a modern React frontend and a robust FastAPI backend with file storage for user data and profile pictures.

## Tech Stack

### Backend
- **Python** 3.13+ - Programming language 
- **FastAPI** 0.123.10 - Modern, fast web framework for building APIs with Python
- **Uvicorn** 0.38.0 - ASGI server (used to handle HTTP async requests server, run FastAPI apps)
- **Pydantic** 2.12.5 - Data validation using Python type annotations (used to ensure data integrity and consistency)
- **Python Multipart** 0.0.20 - Multipart request handling (used for file uploads)
- **Email Validator** 2.3.0 - Email validation (used to validate user emails)
<img width="1867" height="577" alt="image" src="https://github.com/user-attachments/assets/5c9801ee-bdf9-418b-962f-52118ad2100d" />


### Frontend
- **JavaScript** - Client-side scripting language
- **React** 19+ - UI library for building user interfaces
- **Node.js** 24+ - Runtime environment for JavaScript, required for React tooling
- **React Router DOM** 7+ - Client-side routing (used for navigation within the application)
- **Vite** 7+ - Build tool and dev server (used for frontend development and deployment)
- **ESLint** - Code quality tool (used to ensure code quality and maintainability)
<img width="1725" height="962" alt="image" src="https://github.com/user-attachments/assets/e61bc015-4f42-46ec-a144-625462f945d0" />


### Infrastructure
- **Docker** - Containerization (used to package and deploy applications)
- **Nginx** - Web server for frontend (web server and reverse proxy, forwarding requests to the backend)
<img width="1182" height="186" alt="image" src="https://github.com/user-attachments/assets/2a8e37cf-366e-4f1a-a699-2616394d6b31" />


## Project Structure

```
AutomationPlayground/
├── backend/                    # FastAPI application
│
├── frontend/                   # React application
│
├── docker-compose.yml         # Docker Compose configuration
├── run_frontend_backend.bat   # Windows batch script to run both services
└── README.md                  # This file
```
For more details, refer to backend and frontend folders in the README.md 

## Installation & Setup

## Option 1: Docker setup (recommended for testing and production)

### Prerequisites
Install the following dependencies:

- **Docker Desktop** - recommended for full setup

### Installation
1. Clone the repository or navigate to the project directory
   ```sh
   git clone https://github.com/alexduta-tech/automation-lab.git
   ```

2. Build and run the containers, run bat file::
   ```bash
   run_frontend_backend.bat
   ```
   
   Note: Initial Docker execution may take additional time to build the image and download dependencies. This is a one-time cost; later runs benefit from Docker’s caching mechanism.

### Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Docs**: http://localhost:8000/docs

## Option 2: Local setup (recommended for development only)

### Backend Setup

#### Prerequisites
Install the following dependencies:

* Python 3.12+ - https://www.python.org/downloads/
* pip (installed wih Python)

#### Installation

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

#### Usage
Activate virtual environment: 
```sh
venv\Scripts\activate
```

To run the application, use the following command from the root directory:

```sh
uvicorn app.main:app --reload
```

This will start the server at `http://127.0.0.1:8000`. You can access the API documentation at `http://127.0.0.1:8000/docs`.

### Frontend Setup

#### Prerequisites
Install the following dependencies:

* Node.js 24+ (required for React tooling) - https://nodejs.org/en/download/
* npm (installed with Node.js)

#### Installation

1. Clone the repo
   ```sh
   git https://github.com/alexduta-tech/automation-lab.git
   ```
2. Navigate to the frontend directory
    ```sh
    cd frontend
    ```
3. Install the dependencies:
   ```sh
   npm install
   ```

#### Usage

To run the application, use the following command from the `frontend` directory:

```sh
npm run dev
```

This will start the development server, typically at `http://localhost:5173`.

## API Documentation

Once the backend is running, access the interactive API documentation at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

- `GET /users` - Retrieve all users
- `POST /users` - Create a new user
- `POST /users/{user_id}/upload-profile-pic` - Upload profile picture

## Features

-  User CRUD operations
-  Profile picture upload and storage
-  Email validation
-  Responsive React UI
-  Interactive API documentation
-  Docker containerization
-  File-based data storage
-  RESTful API design

## Notes

- User data is stored in `storage/users.json`
- Profile pictures are stored in `storage/profile_pics/`
- The application uses JSON file storage for simplicity; 
- The project uses:
   - **ESLint** for JavaScript/JSX, usage:
      ```bash
      npm run lint
      ```
   - **Pydantic** for Python type validation
   - **FastAPI** best practices

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
