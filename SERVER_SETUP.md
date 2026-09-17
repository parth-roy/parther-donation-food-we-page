# DonateFood.in — DigitalOcean Droplet & CI/CD Deployment Guide
# Server: 64.227.173.170
# SSH: ssh -i ~/.ssh/id_droplet_new root@64.227.173.170
# Domain: donatefood.in & www.donatefood.in
# Port: 3010 (Dedicated port to avoid conflicts with acs-web on 3000, test-acs-web on 3001, metrowala on 3005)
# ============================================================

## 1. GitHub Repository Secrets Setup

Go to your repository on GitHub:
**https://github.com/parth-roy/parther-donation-food-we-page**
Navigate to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.

Add the following 4 secrets:

| Secret Name | Value | Notes |
| :--- | :--- | :--- |
| `SERVER_HOST` | `64.227.173.170` | Droplet IP address |
| `SSH_USERNAME` | `root` | Server user |
| `SSH_PRIVATE_KEY` | *(Paste full content of `id_droplet_new`)* | Must include `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` |
| `SSH_PASSPHRASE` | *(Your passphrase if set, or leave empty)* | Passphrase used to decrypt `id_droplet_new` |

---

## 2. Cloudflare DNS Settings

Ensure your Cloudflare DNS table has these two A records:

| Type | Name | Content (IPv4) | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `donatefood.in` | `64.227.173.170` | **DNS only** (Grey Cloud) | Auto |
| **A** | `www` | `64.227.173.170` | **DNS only** (Grey Cloud) | Auto |

> [!NOTE]
> Keep the proxy status as **DNS only** while generating Let's Encrypt SSL via Certbot. Once SSL is active, you can either keep it as "DNS only" or switch to "Proxied" (Orange Cloud) with SSL mode set to **Full (Strict)** in Cloudflare SSL/TLS settings.

---

## 3. Server Setup & Initial Deployment (Run on Droplet)

### Step 3.1 — SSH into your Droplet
```bash
ssh -i ~/.ssh/id_droplet_new root@64.227.173.170
```

### Step 3.2 — Verify Node.js, PM2, and Nginx
Check that Node.js, PM2, and Nginx are installed (they are already running for other projects on this droplet):
```bash
node -v      # should be v20.x or v22.x
pm2 -v       # should be PM2 v5.x
nginx -v     # should show nginx version
```
*(If NVM is not loaded in your session, run: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`)*

### Step 3.3 — Create Project Directory & Clone Repo
```bash
mkdir -p /var/www/donatefood.in
cd /var/www/donatefood.in

# Clone the repository directly into this folder
git clone https://github.com/parth-roy/parther-donation-food-we-page.git .
```

### Step 3.4 — Install Dependencies & Build
```bash
cd /var/www/donatefood.in

npm install

# Clean any existing build artifacts
rm -rf .next 2>/dev/null || true

# Run Next.js standalone build
npm run build

# Copy static assets into standalone output
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

### Step 3.5 — Launch with PM2
```bash
# Start donatefood-web on port 3010
pm2 start ecosystem.config.js --only donatefood-web

# Save PM2 process list so it automatically restarts on server reboot
pm2 save

# Verify it is running and healthy
pm2 list
curl http://localhost:3010
```

---

## 4. Nginx Reverse Proxy Configuration

### Step 4.1 — Create the Nginx Configuration File
Run on the server:
```bash
cat > /etc/nginx/sites-available/donatefood.in << 'EOF'
# Redirect www to non-www
server {
    listen 80;
    listen [::]:80;
    server_name www.donatefood.in;
    return 301 http://donatefood.in$request_uri;
}

# Main DonateFood site proxying to port 3010
server {
    listen 80;
    listen [::]:80;
    server_name donatefood.in;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1000;

    # Static Assets Caching (1 year immutable)
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3010;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public Images Caching (30 days)
    location /images/ {
        proxy_pass http://127.0.0.1:3010;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Main Application
    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
    }
}
EOF
```

### Step 4.2 — Enable Site & Test Nginx
```bash
# Link the site into sites-enabled
ln -sf /etc/nginx/sites-available/donatefood.in /etc/nginx/sites-enabled/

# Test configuration syntax
nginx -t

# Reload Nginx without downtime
systemctl reload nginx
```

---

## 5. SSL / TLS Certificate Setup (Let's Encrypt Certbot)

### Option A: Standard Multi-Domain Certificate (Recommended for donatefood.in & www.donatefood.in)
Since Cloudflare is in "DNS only" mode, Certbot can verify HTTP-01 challenges directly:
```bash
certbot --nginx \
  -d donatefood.in \
  -d www.donatefood.in \
  --non-interactive \
  --agree-tos \
  -m admin@parther.in
```

Certbot automatically:
1. Provisions the cryptographic certificate from Let's Encrypt.
2. Updates `/etc/nginx/sites-available/donatefood.in` to listen on port 443 with HTTP/2 and TLS.
3. Configures automatic HTTP-to-HTTPS redirects.

Test Nginx and reload:
```bash
nginx -t && systemctl reload nginx
```

Test auto-renewal:
```bash
certbot renew --dry-run
```

---

### Option B: Wildcard Certificate (*.donatefood.in & donatefood.in)
If you require a true wildcard certificate (`*.donatefood.in`), Let's Encrypt mandates DNS-01 verification.
To automate this with Cloudflare:

1. Create a Cloudflare API Token with `Zone:DNS:Edit` permission at https://dash.cloudflare.com/profile/api-tokens.
2. On the Droplet, create `/root/.secrets/cloudflare.ini`:
   ```bash
   mkdir -p /root/.secrets
   cat > /root/.secrets/cloudflare.ini << 'EOF'
   dns_cloudflare_api_token = YOUR_CLOUDFLARE_API_TOKEN
   EOF
   chmod 600 /root/.secrets/cloudflare.ini
   ```
3. Install the Certbot Cloudflare plugin and request the wildcard:
   ```bash
   apt install -y python3-certbot-dns-cloudflare
   certbot certonly \
     --dns-cloudflare \
     --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
     -d donatefood.in \
     -d '*.donatefood.in' \
     --agree-tos \
     -m admin@parther.in \
     --non-interactive
   ```

---

## 6. Verification & Health Check

After completing the steps above:
1. Open your browser and navigate to: **https://donatefood.in**
2. Confirm HTTPS lock icon displays.
3. Check PM2 status:
   ```bash
   pm2 list
   pm2 logs donatefood-web --lines 50
   ```
4. Test Git Auto-Deployment:
   Any push to the `main` branch will automatically trigger `.github/workflows/deploy.yml`, fetch the code, rebuild, and reload PM2 with zero downtime.
