#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.resolve(projectRoot, process.argv[2] ?? 'dist/public');
const assetsDirectory = path.join(outputDirectory, 'assets');

// These are deliberately raw-file limits. Transfer-size budgets belong in a
// browser/network check because compression depends on the server configuration.
const budgets = { mainJavaScript: 400 * 1024, mainCss: 64 * 1024, image: 300 * 1024 };
const imageExtensions = new Set(['.avif', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const jpegExtensions = new Set(['.jpeg', '.jpg']);
const formatBytes = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
const relativeOutputPath = (filePath) => path.relative(outputDirectory, filePath).split(path.sep).join('/');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));
  return files.flat();
}

function scriptSourceFromHtml(html) {
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+\.js)["'][^>]*>/gi)].map((match) => match[1]);
  const entryScript = scripts.find((source) => /(?:^|\/)assets\/index-[^/]+\.js(?:\?|$)/.test(source));
  if (!entryScript) throw new Error(`Could not find the Vite entry script (assets/index-*.js) in index.html. Found: ${scripts.join(', ') || 'none'}.`);
  const assetPath = entryScript.split('?')[0].match(/assets\/index-[^/]+\.js$/)?.[0];
  if (!assetPath) throw new Error(`Could not resolve the entry asset path from ${entryScript}.`);
  return assetPath;
}

function importedSpecifierBases(bundle) {
  const dynamic = new Set();
  const staticImports = new Set();
  for (const match of bundle.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g)) dynamic.add(path.posix.basename(match[1]));
  for (const match of bundle.matchAll(/\bimport\s+(?!\s*\()[\s\S]*?\sfrom\s*["']([^"']+)["']/g)) staticImports.add(path.posix.basename(match[1]));
  for (const match of bundle.matchAll(/\bimport\s*["']([^"']+)["']/g)) staticImports.add(path.posix.basename(match[1]));
  return { dynamic, staticImports };
}

const violations = [];
const checks = [];
const fail = (message) => violations.push(message);

if (!existsSync(outputDirectory)) {
  fail(`Build output is missing: ${outputDirectory}. Run \"pnpm build\" first.`);
} else if (!existsSync(assetsDirectory)) {
  fail(`Build assets directory is missing: ${assetsDirectory}.`);
} else {
  const indexPath = path.join(outputDirectory, 'index.html');
  if (!existsSync(indexPath)) {
    fail(`Build entry page is missing: ${indexPath}.`);
  } else {
    let entryRelativePath;
    try {
      entryRelativePath = scriptSourceFromHtml(await readFile(indexPath, 'utf8'));
    } catch (error) {
      fail(error instanceof Error ? error.message : String(error));
    }
    if (!entryRelativePath) {
      // The actionable diagnostic is already recorded above.
    } else {
    const entryPath = path.join(outputDirectory, entryRelativePath);
    if (!existsSync(entryPath)) {
      fail(`index.html references a missing entry script: ${entryRelativePath}.`);
    } else {
      const entrySize = (await stat(entryPath)).size;
      checks.push(`main JavaScript ${relativeOutputPath(entryPath)}: ${formatBytes(entrySize)} / ${formatBytes(budgets.mainJavaScript)}`);
      if (entrySize > budgets.mainJavaScript) fail(`Main JavaScript exceeds its ${formatBytes(budgets.mainJavaScript)} budget: ${relativeOutputPath(entryPath)} is ${formatBytes(entrySize)}.`);

      const outputFiles = await walk(outputDirectory);
      const cssFiles = outputFiles.filter((file) => /[\\/]assets[\\/]index-[^\\/]+\.css$/i.test(file));
      if (cssFiles.length !== 1) fail(`Expected exactly one emitted CSS file for the main bundle, found ${cssFiles.length}: ${cssFiles.map(relativeOutputPath).join(', ') || 'none'}.`);
      for (const cssPath of cssFiles) {
        const cssSize = (await stat(cssPath)).size;
        checks.push(`CSS ${relativeOutputPath(cssPath)}: ${formatBytes(cssSize)} / ${formatBytes(budgets.mainCss)}`);
        if (cssSize > budgets.mainCss) fail(`Main CSS exceeds its ${formatBytes(budgets.mainCss)} budget: ${relativeOutputPath(cssPath)} is ${formatBytes(cssSize)}.`);
      }

      const imageFiles = outputFiles.filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
      for (const imagePath of imageFiles) {
        const extension = path.extname(imagePath).toLowerCase();
        const imageSize = (await stat(imagePath)).size;
        if (jpegExtensions.has(extension)) fail(`JPEG output is not allowed: ${relativeOutputPath(imagePath)}. Emit a modern format such as WebP instead.`);
        if (imageSize > budgets.image) fail(`Image exceeds the ${formatBytes(budgets.image)} per-file budget: ${relativeOutputPath(imagePath)} is ${formatBytes(imageSize)}.`);
      }
      checks.push(`${imageFiles.length} emitted image(s), each limited to ${formatBytes(budgets.image)}; no JPEG output.`);

      const projectDirectory = path.join(projectRoot, 'src', 'pages', 'projects');
      const projectSources = (await readdir(projectDirectory, { withFileTypes: true })).filter((entry) => entry.isFile() && entry.name.endsWith('.tsx')).map((entry) => path.basename(entry.name, '.tsx'));
      const assetFiles = await readdir(assetsDirectory);
      const { dynamic, staticImports } = importedSpecifierBases(await readFile(entryPath, 'utf8'));
      for (const projectName of projectSources) {
        const routeChunk = assetFiles.find((file) => file.startsWith(`${projectName}-`) && file.endsWith('.js'));
        if (!routeChunk) {
          fail(`Route chunk missing for ${projectName}: expected assets/${projectName}-*.js.`);
          continue;
        }
        if (!dynamic.has(routeChunk)) fail(`Route chunk assets/${routeChunk} is not dynamically imported by the main entry chunk.`);
        if (staticImports.has(routeChunk)) fail(`Route chunk assets/${routeChunk} is statically imported by the main entry chunk; it must remain lazy-loaded.`);
      }
      checks.push(`${projectSources.length} project route chunk(s) present and dynamically imported from the main entry.`);
    }
    }
  }
}

console.log(`Build budget check: ${outputDirectory}`);
for (const check of checks) console.log(`  PASS ${check}`);
if (violations.length) {
  console.error(`\nBuild budget check failed with ${violations.length} issue(s):`);
  for (const violation of violations) console.error(`  FAIL ${violation}`);
  process.exitCode = 1;
} else {
  console.log('\nBuild budget check passed.');
}
