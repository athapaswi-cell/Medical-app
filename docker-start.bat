@echo off
echo Starting Healthcare Application with Docker...
echo.

echo Step 1: Stopping any existing containers...
docker-compose down

echo.
echo Step 2: Building Docker images...
docker-compose build --no-cache

echo.
echo Step 3: Starting all services...
docker-compose up -d

echo.
echo Step 4: Checking container status...
docker ps

echo.
echo ========================================
echo Healthcare Application is starting up!
echo ========================================
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000/api
echo Nginx Proxy: http://localhost:80
echo.
echo Checking service health...
timeout /t 10 /nobreak > nul
docker-compose ps

echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
pause