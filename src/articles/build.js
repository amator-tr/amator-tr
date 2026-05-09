// Mevcut MD->HTML pipeline'ini admin'den tetikler. Pipeline kendi
// incremental cache'ini kullaniyor; admin sadece subprocess olarak cagiriyor
// ve cikti loglarini doner.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileP = promisify(execFile);

const REPO_ROOT = path.resolve(process.env.REPO_ROOT || process.cwd());
const BUILD_TIMEOUT_MS = 60_000;

export async function runBuild({ force = false } = {}) {
  const args = [path.join(REPO_ROOT, 'scripts', 'build.mjs')];
  if (force) args.push('--force');
  try {
    const { stdout, stderr } = await execFileP('node', args, {
      cwd: REPO_ROOT,
      timeout: BUILD_TIMEOUT_MS,
      maxBuffer: 5 * 1024 * 1024,
    });
    return { ok: true, stdout, stderr };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
      stdout: err.stdout || '',
      stderr: err.stderr || '',
      code: err.code,
    };
  }
}
