@echo off
echo ========================================
echo  Starting Healthcare Backend Server
echo ========================================
echo.

cd backend

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [2/2] Starting server...
echo.
echo Backend will be available at:
echo - Health: http://localhost:5000/api/health
echo - Hospitals: http://localhost:5000/api/hospitals
echo - Doctors: http://localhost:5000/api/doctors
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start