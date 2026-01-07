@echo off

REM ============================================
REM Prompt user for local or Docker execution
REM ============================================
choice /M "Do you want to use the app (e.g. run tests) locally (Y) or on Docker (N)?"
if errorlevel 2 goto :No
if errorlevel 1 goto :Yes


:Yes
    echo Running the app locally...
    echo export const API_BASE = "http://localhost:8000"; > frontend/src/config/config.js
    goto :Continue
:No
    echo Running the app on Docker...
    echo export const API_BASE = "http://backend:8000"; > frontend/src/config/config.js
    goto :Continue

:Continue
REM ============================================
REM Check if the network exists
REM ============================================
docker network inspect automation-network >nul 2>&1

if %errorlevel% neq 0 (
    echo Network automation-network does not exist. Creating it...
    docker network create automation-network
) else (
    echo Network automation-network already exists.
)

REM ============================================
REM Build all services (frontend + backend)
REM ============================================
docker compose build

REM ============================================
REM Start all services in detached mode
REM ============================================
docker compose up -d

echo --------------------------------------------
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo All containers are running.
echo --------------------------------------------

pause
