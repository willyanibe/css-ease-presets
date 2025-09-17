/* -*- coding: utf-8 -*- */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, "..");
const src = resolve(root, "src");
const dist = resolve(root, "dist");

mkdirSync(dist, { recursive: true });

const srcJsonPath = resolve(src, "eases.json");
const eases = JSON.parse(readFileSync(srcJsonPath, "utf-8"));

let varsCss = "/* -*- coding: utf-8 -*- */\n:root{\n";
for (const [name, pts] of Object.entries(eases)) {
  const vname = `--ease-${name}`;
  const bez = `cubic-bezier(${pts.join(",")})`;
  varsCss += `  ${vname}:${bez};\n`;
}
varsCss += "}\n";
writeFileSync(resolve(dist, "ease-vars.css"), varsCss, "utf-8");

let classesCss = "/* -*- coding: utf-8 -*- */\n";
for (const name of Object.keys(eases)) {
  classesCss += `.ease-${name}{animation-timing-function:var(--ease-${name})}\n`;
  classesCss += `.transition-ease-${name}{transition-timing-function:var(--ease-${name})}\n`;
}
writeFileSync(resolve(dist, "ease-classes.css"), classesCss, "utf-8");

copyFileSync(resolve(src, "animations.css"), resolve(dist, "animations.css"));

writeFileSync(resolve(dist, "eases.json"), JSON.stringify(eases, null, 2) + "\n", "utf-8");

const esm = `/* -*- coding: utf-8 -*- */
export const eases = ${JSON.stringify(eases, null, 2)};
export default eases;
`;
writeFileSync(resolve(dist, "index.mjs"), esm, "utf-8");

console.log("Built css-ease-presets → dist/");
