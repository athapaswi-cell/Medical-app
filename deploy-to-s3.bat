@echo off
echo ========================================
echo  Deploying Healthcare App to S3
echo ========================================
echo.

echo [1/2] Building application...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo [2/2] Uploading to S3...
aws s3 sync out/ s3://healthcare-application-s3 --delete
if errorlevel 1 (
    echo [ERROR] Upload failed - make sure AWS CLI is configured
    echo Run: aws configure
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Your app is live at:
echo http://healthcare-application-s3.s3-website-us-east-1.amazonaws.com
echo.
pause