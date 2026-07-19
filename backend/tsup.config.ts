import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  platform: "node",
  outDir: "dist",
  clean: true,
  sourcemap: true,
  // Don't bundle Prisma's client — it ships native query engine
  // binaries that must stay as real files on disk, not get inlined.
  external: ["@prisma/client", ".prisma/client"],
  noExternal: [], 
});