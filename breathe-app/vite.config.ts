import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["B.ico", "robots.txt", "B-144x144.png", "B-512x512.png"],
  manifest: {
    name: "Breathe",
    short_name: "B",
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
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
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});
