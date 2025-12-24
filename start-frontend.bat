@echo off
echo ========================================
echo  Starting Healthcare Frontend
echo ========================================
echo.

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [2/2] Starting development server...
echo.
echo Frontend will be available at:
echo - Main App: http://localhost:3000
echo.
echo Make sure backend is running on port 5000!
echo Press Ctrl+C to stop the server
echo.

call npm run dev