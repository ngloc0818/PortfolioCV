import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true, // Kích hoạt Nitro server cho Vercel
  tanstackStart: {
    // Disable SSR for static deployment
    server: { entry: "server" },
    ssr: false,
  },
});