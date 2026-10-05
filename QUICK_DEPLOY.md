# ⚡ Quick Deploy Commands

## 🎯 Step 1: Create GitHub Repository
Go to: https://github.com/new
- Name: `facebookviuer`
- Public repository
- Don't initialize with README

## 🎯 Step 2: Push to GitHub

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/facebookviuer.git
git branch -M main
git push -u origin main
```

## 🎯 Step 3: Enable GitHub Pages

1. Go to: `https://github.com/YOUR_USERNAME/facebookviuer/settings/pages`
2. Source: **main** branch, **/ (root)** folder
3. Click **Save**

## 🎯 Step 4: Access Your Site

Wait 2-5 minutes, then visit:
```
https://YOUR_USERNAME.github.io/facebookviuer/
```

## 🔄 Update Your Site Later

```bash
git add .
git commit -m "Your update message"
git push origin main
```

That's it! 🎉
