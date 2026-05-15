import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "lastgirl",
  brand: {
    displayName: "Last Girl Survivor",
    primaryColor: "#3182F6",
    icon: "",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      build: "node -e \"const fs = require('fs'); if (!fs.existsSync('dist')) fs.mkdirSync('dist'); fs.copyFileSync('www/index.html', 'dist/index.html');\"",
    },
  },
  permissions: [],
  outdir: "dist",
});
