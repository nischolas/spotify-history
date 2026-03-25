import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "node:url";
import { vitePluginUmami } from "@nischolas/vite-plugin-umami-inline";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // Alias for src folder
    },
  },
  plugins: [
    react(),
    vitePluginUmami({
      scriptUrl: "https://umami.nicholas-mathi.eu/script.js",
      websiteId: "b9e87674-b6ce-4b71-8728-d53ebdaff2d3",
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      },
      manifest: {
        lang: "de",
        name: "Spotify Streamingverlauf",
        short_name: "Spotify",
        description: "Erkunde deinen Spotify Streamingverlauf",
        theme_color: "#1DB954",
        background_color: "#191414",
        display: "standalone",
        icons: [
          {
            src: "favicon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});
