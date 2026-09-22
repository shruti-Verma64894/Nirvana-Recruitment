import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/o": {
        target: "http://192.168.1.20:8080",
        changeOrigin: true,

        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            // Do not forward localhost browser Origin to Liferay
            proxyReq.removeHeader("origin");
          });
        },
      },
    },
  },
});