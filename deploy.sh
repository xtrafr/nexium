#!/bin/bash

# Nexium Services - Vercel Deployment Script
echo "🚀 Starting Nexium Services deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check for sensitive files that shouldn't be deployed
if [ -d "Nexium/hts-cache" ]; then
    echo "⚠️  Warning: hts-cache directory found. This contains sensitive information."
    echo "   It will be excluded from deployment via .gitignore"
fi

# Build check (for static sites, this is just a validation)
echo "✅ Validating project structure..."

# Check for required files
required_files=("index.html" "package.json" "vercel.json")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ Project structure validated"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your site should be live at the URL provided above"
echo "📊 You can monitor performance at: https://vercel.com/dashboard" 