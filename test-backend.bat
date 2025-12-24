@echo off
echo ========================================
echo  Testing Healthcare Backend API
echo ========================================
echo.

echo Testing backend endpoints...
echo.

echo [1] Health Check:
echo URL: http://localhost:5000/api/health
curl -s http://localhost:5000/api/health
echo.
echo.

echo [2] Hospitals List:
echo URL: http://localhost:5000/api/hospitals
curl -s http://localhost:5000/api/hospitals
echo.
echo.

echo [3] Specific Hospital:
echo URL: http://localhost:5000/api/hospitals/southeast-health
curl -s http://localhost:5000/api/hospitals/southeast-health
echo.
echo.

echo [4] Doctors List:
echo URL: http://localhost:5000/api/doctors
curl -s http://localhost:5000/api/doctors
echo.
echo.

echo [5] Wrong Endpoint (should show error):
echo URL: http://localhost:5000/wrong-endpoint
curl -s http://localhost:5000/wrong-endpoint
echo.
echo.

echo ========================================
echo  Backend API Test Complete
echo ========================================
pause