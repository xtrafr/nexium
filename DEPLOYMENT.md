# 🚀 Nexium Services - Deployment Guide

This guide will help you deploy the Nexium Services website to Vercel.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/) (for version control)
- [Vercel CLI](https://vercel.com/cli) (will be installed automatically)

## 🛠️ Quick Deployment

### Option 1: Using Deployment Scripts (Recommended)

#### Windows:
```bash
deploy.bat
```

#### Linux/Mac:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Using npm Scripts

```bash
# Install dependencies (if any)
npm install

# Deploy to production
npm run deploy

# Or deploy to preview
npm run deploy:preview
```

### Option 3: Manual Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to production
vercel --prod
```

## 🔧 Configuration Files

The project includes the following configuration files:

- **`vercel.json`** - Vercel deployment configuration
- **`package.json`** - Project metadata and scripts
- **`.gitignore`** - Git ignore rules (excludes sensitive files)
- **`robots.txt`** - Search engine crawling rules
- **`sitemap.xml`** - Site structure for search engines

## 📁 Project Structure

```
nexium/
├── index.html                 # Main landing page
├── favicon.ico               # Site favicon
├── Nexium/                   # Main application directory
│   ├── index.html            # Nexium portal page
│   ├── nexiumservices.shop/  # Main application
│   │   ├── index.html        # Main application page
│   │   ├── styles.css        # Complete styling
│   │   ├── script.js         # JavaScript functionality
│   │   ├── web-vitals.js     # Web Vitals library
│   │   ├── vercel-analytics.js      # Vercel Analytics
│   │   └── vercel-speed-insights.js # Vercel Speed Insights
│   ├── *.webp               # Product images
│   └── hts-cache/           # HTTrack cache (excluded from deployment)
├── api/                      # API endpoints
├── .well-known/             # Security and verification files
├── vercel.json              # Vercel configuration
├── package.json             # Project configuration
└── .gitignore              # Git ignore rules
```

## 🚀 Deployment Steps

### 1. Prepare Your Environment

```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd nexium

# Install Vercel CLI
npm install -g vercel
```

### 2. Validate Project Structure

```bash
# Check if all required files exist
npm run validate
```

### 3. Deploy to Vercel

```bash
# Deploy to production
vercel --prod

# Or use the deployment script
./deploy.sh  # Linux/Mac
deploy.bat   # Windows
```

### 4. Configure Custom Domain (Optional)

After deployment, you can configure a custom domain in the Vercel dashboard:

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## 🔒 Security Considerations

### Sensitive Files Excluded

The following files/directories are excluded from deployment:

- `Nexium/hts-cache/` - Contains sensitive HTTrack data
- `Nexium/hts-log.txt` - Contains sensitive log information
- `.vercel/` - Local Vercel configuration
- `.env*` - Environment variables

### Security Headers

The project includes security headers configured in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Performance Optimization

### Image Optimization

- All product images are in modern formats (WebP/AVIF) for better compression
- Images are served with proper cache headers
- Lazy loading is implemented for better performance

### Web Vitals

- Core Web Vitals tracking is implemented
- Performance monitoring with Vercel Analytics
- Speed insights for continuous optimization

## 🔍 SEO Optimization

### Search Engine Optimization

- Proper meta tags and descriptions
- Sitemap.xml for search engine indexing
- Robots.txt for crawling control
- Structured data for better search results

### Analytics

- Vercel Analytics for performance monitoring
- Web Vitals tracking for Core Web Vitals
- Speed insights for performance optimization

## 🐛 Troubleshooting

### Common Issues

1. **Deployment Fails**
   ```bash
   # Check if all required files exist
   ls -la index.html package.json vercel.json
   
   # Validate project structure
   npm run validate
   ```

2. **Images Not Loading**
   - Check if WebP/AVIF images are in the correct location
   - Verify image paths in `script.js` and `api/products.json`
   - Ensure proper Content-Type headers for modern image formats

3. **Vercel CLI Not Found**
   ```bash
   npm install -g vercel
   ```

4. **Domain Issues**
   - Check DNS configuration in Vercel dashboard
   - Verify domain settings and SSL certificates

### Debug Mode

Enable debug mode by adding to browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📈 Monitoring

### Performance Monitoring

- **Vercel Analytics**: Monitor page views and performance
- **Web Vitals**: Track Core Web Vitals metrics
- **Speed Insights**: Continuous performance monitoring

### Error Tracking

- Check Vercel dashboard for deployment logs
- Monitor browser console for JavaScript errors
- Review server logs in Vercel dashboard

## 🔄 Continuous Deployment

### Automatic Deployments

To enable automatic deployments:

1. Connect your GitHub repository to Vercel
2. Push changes to the main branch
3. Vercel will automatically deploy updates

### Preview Deployments

For testing before production:

```bash
# Deploy to preview
vercel --preview

# Or use npm script
npm run deploy:preview
```

## 📞 Support

If you encounter issues during deployment:

1. Check the [Vercel Documentation](https://vercel.com/docs)
2. Review the [Vercel Community](https://github.com/vercel/vercel/discussions)
3. Contact support at: support@nexiumservices.com

## 🎉 Success!

After successful deployment, your site will be available at:

- **Production**: `https://your-project.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

You can monitor your deployment in the [Vercel Dashboard](https://vercel.com/dashboard).

---

**Happy Deploying! 🚀** 