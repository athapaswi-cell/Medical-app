@echo off
echo ========================================
echo  Running Healthcare Full Stack
echo ========================================
echo.

echo Starting all services...
echo - Frontend (React/Next.js): http://localhost:3000
echo - Backend API (Node.js): http://localhost:5000  
echo - Full App (Nginx): http://localhost:80
echo.
echo Press Ctrl+C to stop all services
echo.

docker-compose up