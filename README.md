# DonateFood.in — Parther Donation Food Web Platform

A production-grade, hyper-optimized Next.js web application engineered to bridge the gap between food donors (weddings, restaurants, corporate cafeterias, households) and verified local hunger-relief NGOs across India.

---

## 🌟 Key Features

- **Smart Responsive Navigation**: Smooth hide-on-scroll-down, slow animated reveal-on-scroll-up navbar with dynamic glassmorphism and brand-themed underline indicator (55% green `#06571a` fading into 45% orange `#fe7801`).
- **High-Performance WebP Hero Section**: Full-width high-definition WebP banner with zero background distortion.
- **Multilingual Support**: Quick modal and interactive language switcher (English, Bengali, Hindi, and more).
- **Hyper-Localized SEO Routing**: SSG-rendered state, district, and city routes for food donation hubs and NGO directories (e.g. `/donate-food/west-bengal/kolkata/kolkata-central`).
- **CSR & ESG Integration**: Carbon credit and corporate food waste diversion modules for enterprise partners.
- **Volunteer & Emergency Relief**: Fast-dispatch interfaces for time-critical excess perishables.

---

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Standalone Output)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide React
- **Process Manager**: PM2 (Cluster Mode)
- **Web Server & Reverse Proxy**: Nginx (HTTP/2, TLS 1.3, Gzip, Aggressive Cache Caching)
- **Infrastructure**: DigitalOcean Droplet (`64.227.173.170`)
- **DNS & Security**: Cloudflare DNS & Let's Encrypt SSL
- **CI/CD**: GitHub Actions (SSH automated deployment on push to `main`)

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/parth-roy/parther-donation-food-we-page.git
cd parther-donation-food-we-page

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Deployment & Server Architecture

Full server setup instructions, Nginx virtual host configurations, PM2 process management, and Certbot SSL certificate instructions are documented in:
👉 **[SERVER_SETUP.md](./SERVER_SETUP.md)**

### CI/CD Deployment Flow
Every push to the `main` branch automatically triggers `.github/workflows/deploy.yml`:
1. Connects securely to the DigitalOcean Droplet (`64.227.173.170`) via SSH.
2. Pulls the latest code from `origin main`.
3. Runs `npm install` and `npm run build` (standalone target).
4. Synchronizes static and public assets.
5. Performs zero-downtime cluster reload via PM2 (`donatefood-web` on port `3010`).
