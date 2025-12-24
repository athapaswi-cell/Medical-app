@echo off
echo ========================================
echo  Healthcare App - Development Mode
echo ========================================
echo.

echo Starting development environment...
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo - API Health: http://localhost:5000/api/health
echo.

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build