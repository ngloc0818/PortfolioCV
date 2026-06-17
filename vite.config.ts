import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Disable SSR for static deployment
    server: { entry: "server" },
    ssr: false,
  },
});