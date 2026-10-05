# 🚀 Deployment Guide - GitHub Pages

Follow these steps to deploy your Facebook Views application to GitHub Pages.

## Prerequisites

- A GitHub account (create one at https://github.com/signup)
- Git installed on your computer (already done ✓)
- Your project is ready (already done ✓)

## Step-by-Step Deployment

### 1️⃣ Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `facebookviuer` (or any name you prefer)
   - **Description**: "Multi-tab Facebook video player for maximizing watch time"
   - **Visibility**: Choose `Public` (required for free GitHub Pages)
   - **Do NOT** initialize with README (we already have one)
3. Click **"Create repository"**

### 2️⃣ Connect Local Repository to GitHub

Open your terminal/PowerShell in the project directory and run:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/facebookviuer.git

# Verify the remote was added
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/facebookviuer.git
git branch -M main
git push -u origin main
```

### 3️⃣ Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/facebookviuer`
2. Click on **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**

### 4️⃣ Wait for Deployment

- GitHub will build and deploy your site (takes 1-5 minutes)
- You'll see a message: "Your site is published at `https://YOUR_USERNAME.github.io/facebookviuer/`"
- Click the link to view your live site!

## 🎉 Your Site is Live!

Your Facebook Views application is now accessible at:
```
https://YOUR_USERNAME.github.io/facebookviuer/
```

## 🔄 Updating Your Site

Whenever you make changes to your code:

```bash
# Stage your changes
git add .

# Commit your changes
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically rebuild and deploy your site within a few minutes.

## 🔧 Troubleshooting

### Site not loading?
- Wait 5-10 minutes after first deployment
- Check GitHub Pages settings are correct
- Ensure repository is Public
- Clear your browser cache

### 404 Error?
- Make sure `index.html` is in the root directory
- Check that branch and folder settings are correct
- Verify the URL is correct: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Changes not showing?
- Wait a few minutes after pushing
- Clear browser cache (Ctrl + F5)
- Check Actions tab on GitHub for build status

## 📱 Custom Domain (Optional)

To use a custom domain like `fbviews.com`:

1. Buy a domain from a registrar
2. In GitHub Pages settings, add your custom domain
3. Update your domain's DNS settings:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
4. Wait for DNS propagation (up to 48 hours)

## 🔒 HTTPS

GitHub Pages automatically provides HTTPS for your site. If using a custom domain:
1. Wait for DNS to propagate
2. In Pages settings, check **"Enforce HTTPS"**

## 📊 Analytics (Optional)

To track visitors:
1. Create a Google Analytics account
2. Get your tracking ID
3. Add the tracking code to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages
- GitHub Community: https://github.community/
- Open an issue in your repository

---

Happy deploying! 🚀
