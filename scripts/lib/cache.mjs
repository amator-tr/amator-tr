// Build cache: tracks per-slug content hashes so unchanged MDs skip re-render.
// Cache is invalidated globally when template, style, or build version changes.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

// Bump when build output format changes; forces full rebuild.
const BUILD_VERSION = 1;

const CACHE_PATH = path.resolve('scripts/.build-cache.json');

export function loadCache() {
  try {
    const raw = fs.readFileSync(CACHE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { version: BUILD_VERSION, hashes: {} };
  }
}

export function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

export function emptyCache() {
  return { version: BUILD_VERSION, hashes: {} };
}

// Hash a single article's render-relevant inputs. The shellHash represents
// the template+styles+build version; if it changes, every article's hash
// flips and everything rebuilds.
export function hashArticle({ frontmatter, body, shellHash }) {
  const h = crypto.createHash('sha256');
  h.update('v=' + BUILD_VERSION);
  h.update('|shell=' + shellHash);
  h.update('|fm=' + JSON.stringify(frontmatter));
  h.update('|body=' + body);
  return h.digest('hex');
}

// Combine the contents of all template/style files into one shellHash so a
// template tweak invalidates the whole cache.
export function shellHash(files) {
  const h = crypto.createHash('sha256');
  for (const f of files) {
    h.update(f + ':');
    h.update(fs.readFileSync(f));
    h.update('|');
  }
  return h.digest('hex');
}
