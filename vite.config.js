import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"], // Add this line to allow .glb file imports
});
