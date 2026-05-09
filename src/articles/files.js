// Path-traversal'a karsi sertlestirilmis dosya yazimi. allowedRoots disinda
// her yola yazma reddedilir. Atomic yazim icin tmp + rename.

import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const REPO_ROOT = path.resolve(process.env.REPO_ROOT || process.cwd());
const ALLOWED_ROOTS = [
  path.join(REPO_ROOT, 'content', 'tutorials'),
  path.join(REPO_ROOT, 'public', 'tutorials'),
  path.join(REPO_ROOT, 'public', 'og'),
  path.join(REPO_ROOT, 'public'),
  path.join(REPO_ROOT, 'src'),
  path.join(REPO_ROOT, 'scripts'),
];

function ensureAllowed(filePath) {
  const resolved = path.resolve(filePath);
  const ok = ALLOWED_ROOTS.some(root => resolved === root || resolved.startsWith(root + path.sep));
  if (!ok) throw new Error(`Path disallowed: ${resolved}`);
  return resolved;
}

export function repoPath(...segments) {
  return ensureAllowed(path.join(REPO_ROOT, ...segments));
}

export async function safeWrite(filePath, contents) {
  const target = ensureAllowed(filePath);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const tmp = `${target}.tmp.${process.pid}.${Date.now()}`;
  await fs.writeFile(tmp, contents);
  await fs.rename(tmp, target);
}

export async function safeUnlink(filePath) {
  const target = ensureAllowed(filePath);
  if (!existsSync(target)) return false;
  await fs.unlink(target);
  return true;
}

export async function safeRead(filePath) {
  const target = ensureAllowed(filePath);
  return fs.readFile(target, 'utf8');
}
