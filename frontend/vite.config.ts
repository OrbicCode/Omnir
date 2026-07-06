import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Or vue(), etc.
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@stores': fileURLToPath(new URL('./stores', import.meta.url)),
    }
  },
  server: {
    host: true, // Listens on all local IP addresses
    port: 5173,
    watch: {
      usePolling: true, // Forces file change tracking inside Docker containers
    },
  },
});
