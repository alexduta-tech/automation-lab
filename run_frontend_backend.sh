#!/usr/bin/env bash
# Linux and macOS version of run_frontend_backend.bat: sets up the app for local or Docker
# execution, then builds and starts the frontend and backend containers.
set -e
cd "$(dirname "$0")"

# ============================================
# Prompt user for local or Docker execution
# ============================================
while true; do
    read -r -p "Do you want to use the app (e.g. run tests) locally (Y) or on Docker (N)? [Y,N] " answer
    case "$answer" in
        [Yy]) echo "Running the app locally..."; api_base="http://localhost:8000"; break ;;
        [Nn]) echo "Running the app on Docker..."; api_base="http://backend:8000"; break ;;
    esac
done
# same line as run_frontend_backend.bat writes (trailing space included), so git sees no change between the two
echo "export const API_BASE = \"$api_base\"; " > frontend/src/config/config.js

# ============================================
# Check if the network exists
# ============================================
if docker network inspect automation-network >/dev/null 2>&1; then
    echo "Network automation-network already exists."
else
    echo "Network automation-network does not exist. Creating it..."
    docker network create automation-network
fi

# ============================================
# Build all services (frontend + backend)
# ============================================
docker compose build

# ============================================
# Start all services in detached mode
# ============================================
docker compose up -d

echo "--------------------------------------------"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "All containers are running."
echo "--------------------------------------------"
