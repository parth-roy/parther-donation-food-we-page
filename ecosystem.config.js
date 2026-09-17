// ============================================================
// PM2 Ecosystem Config — DonateFood.in Next.js Web
// Server: DigitalOcean Droplet (64.227.173.170)
// Usage: pm2 start ecosystem.config.js --only donatefood-web
// ============================================================

module.exports = {
  apps: [
    {
      name: "donatefood-web",
      script: ".next/standalone/server.js",
      cwd: "/var/www/donatefood.in",
      instances: 2,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "800M",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
        HOSTNAME: "0.0.0.0",
      },
      out_file: "/var/log/pm2/donatefood-out.log",
      error_file: "/var/log/pm2/donatefood-err.log",
      time: true,
    },
  ],
};
