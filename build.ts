import { rm } from "node:fs/promises";
import path from "node:path";
import tailwind from "bun-plugin-tailwind";
import { glob } from "bun";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

// Create dist directory structure
await Promise.all([
  Bun.write(`${outdir}/.gitkeep`, ""),
  Bun.write(`${outdir}/index.html`, ""),
  Bun.write(`${outdir}/favicon.ico`, ""),
]);

const entrypoints = await glob("src/**/*.html");

const result = await Bun.build({
  entrypoints,
  outdir,
  plugins: [tailwind],
  minify: true,
  target: "browser",
  sourcemap: "linked",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "global.__DEV__": "false",
  },
  splitting: true,
  sourcemap: "external",
});

console.log("\nBuild Summary:");
console.log("===============");

let totalSize = 0;
for (const output of result.outputs) {
  const relativePath = path.relative(process.cwd(), output.path);
  const sizeKB = (output.size / 1024).toFixed(1);
  console.log(` ${relativePath.padEnd(50)} ${sizeKB} KB`);
  totalSize += output.size;
}

console.log(`\nTotal size: ${(totalSize / 1024).toFixed(1)} KB`);
console.log(`Build completed successfully!`);