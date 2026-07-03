import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Or vue(), etc.

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on all local IP addresses
    port: 5173,
    watch: {
      usePolling: true, // Forces file change tracking inside Docker containers
    },
  },
});
