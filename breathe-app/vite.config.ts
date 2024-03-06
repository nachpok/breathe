import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [
    "B.ico",
    "robots.txt",
    "B-144x144.png",
    "B-512x512.png",
    "manifest.json",
  ],
  manifest: {
    name: "Breathe",
    short_name: "B",
    theme_color: "#000000",
    background_color: "#FFFFFF",
    display: "standalone",
    start_url: "/index.html",
    scope: "/",
    icons: [
      {
        src: "public/B.ico",
        sizes: "16x16",
        type: "image/ico",
      },
      {
        src: "public/B-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "public/B-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "public/B-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
