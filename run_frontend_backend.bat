@echo off

REM Check if the network exists
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
