# Deployment Guide

This document outlines deployment strategies for the portfolio across multiple platforms.

## 🌐 Web Deployment (Cloudflare Pages)

### Prerequisites

- Cloudflare account
- GitHub repository connected to Cloudflare

### Steps

1. **Connect Repository**
   - Log in to Cloudflare Dashboard
   - Navigate to Pages → Create a project
   - Connect your GitHub repository

2. **Build Settings**
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`

3. **Environment Variables**
