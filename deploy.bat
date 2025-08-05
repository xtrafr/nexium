@echo off
echo 🚀 Starting Nexium Services deployment...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check for sensitive files that shouldn't be deployed
if exist "Nexium\hts-cache" (
    echo ⚠️  Warning: hts-cache directory found. This contains sensitive information.
    echo    It will be excluded from deployment via .gitignore
)

REM Build check (for static sites, this is just a validation)
echo ✅ Validating project structure...

REM Check for required files
if not exist "package.json" (
    echo ❌ Missing required file: package.json
    pause
    exit /b 1
)

if not exist "vercel.json" (
    echo ❌ Missing required file: vercel.json
    pause
    exit /b 1
)

echo ✅ Project structure validated

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment completed!
echo 🌐 Your site should be live at the URL provided above
echo 📊 You can monitor performance at: https://vercel.com/dashboard
pause 