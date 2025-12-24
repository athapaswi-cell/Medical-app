@echo off
echo ========================================
echo  Building Healthcare App Docker Images
echo ========================================
echo.

echo [1/3] Building Next.js application...
call npm run build
if errorlevel 1 (
    echo [ERROR] Frontend build failed
    pause
    exit /b 1
)

echo [2/3] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo [ERROR] Backend dependencies installation failed
    pause
    exit /b 1
)
cd ..

echo [3/3] Building Docker images...
docker-compose build
if errorlevel 1 (
    echo [ERROR] Docker build failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Docker Images Built Successfully!
echo ========================================
echo.
echo To run the full stack:
echo docker-compose up
echo.
echo To run in background:
echo docker-compose up -d
echo.
echo Access points:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo - Full App (via Nginx): http://localhost:80
echo.
pause