# Vercel Deployment Guide

## Local readiness

```bash
npm install
npm run build
```

Fix all build errors before deployment.

## GitHub

```bash
git init
git add .
git commit -m "Initial LumaStay prototype"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

## Vercel

1. Go to Vercel.
2. Import the GitHub repository.
3. Select Next.js as the framework.
4. Keep default build settings.
5. Deploy.

## Environment variables

No environment variables are required for the mock JSON prototype.

## Deployment success criteria

- Homepage loads.
- Room listing loads.
- Dynamic room pages load.
- Checkout page loads.
- Dashboard and admin pages load.
- No broken image layout blocks.
