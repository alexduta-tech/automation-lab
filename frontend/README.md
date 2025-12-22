# Frontend Project

This project is a React frontend for the Automation Playground system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine or Docker container for development and testing purposes.

## Local machine (recommended for development)

### Prerequisites
Install the following dependencies:

* Node.js (required for React tooling) - https://nodejs.org/en/download/
* npm (installed with Node.js)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alexduta-tech/automation-lab.git
   ```
2. Navigate to the frontend directory
    ```sh
    cd frontend
    ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Usage

To run the application, use the following command from the `frontend` directory:

```sh
npm run dev
```

This will start the development server, typically at `http://localhost:5173`.

## Docker (recommended for testing and production)

### Prerequisites
Install the following dependencies:
* Docker Desktop  

### Installation
Run the installation .bat file: 
```sh
run_frontend_backend.bat 
```

This will install both backend and frontend apps.

Note: Initial Docker execution may take additional time to build the image and download dependencies. This is a one-time cost; later runs benefit from Docker’s caching mechanism.

### Usage

Use the server at `http://localhost:3000`.

## Project Structure

```
.
├── public
│   └── vite.svg
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── BackButton.jsx
│   │   └── WidgetCard.jsx
│   ├── pages
│   │   ├── CreateUser.jsx
│   │   ├── Home.jsx
│   │   ├── UserDialogs.jsx
│   │   ├── UserList.jsx
│   │   └── UserSearchOverlap.jsx
│   ├── styles
│   │   └── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .dockerignore
├── .gitignore
├── Dockerfile
├── eslint.config.js
├── index.html
├── nginx.conf
├── package-lock.json
├── package.json
└── vite.config.js
```
