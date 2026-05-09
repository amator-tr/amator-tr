// Git add + commit + push. Tum cagrilar execFile + args dizisi —
// shell metakarakterleri yorumlanmaz. Slug ve username'i pre-validate
// etmek caller'in sorumlulugu (bkz. src/articles/validate.js).

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileP = promisify(execFile);

const REPO_ROOT = path.resolve(process.env.REPO_ROOT || process.cwd());
const GIT_TIMEOUT_MS = 30_000;

const DEFAULT_NAME = process.env.GIT_AUTHOR_NAME || 'Admin Publish';
const DEFAULT_EMAIL = process.env.GIT_AUTHOR_EMAIL || 'admin@amator.tr';

async function git(args, opts = {}) {
  const env = { ...process.env, ...(opts.env || {}) };
  return execFileP('git', ['-C', REPO_ROOT, ...args], {
    timeout: GIT_TIMEOUT_MS,
    maxBuffer: 5 * 1024 * 1024,
    env,
  });
}

export async function gitAdd(paths) {
  if (!paths || paths.length === 0) return;
  await git(['add', '--', ...paths]);
}

export async function gitCommit({ message, name = DEFAULT_NAME, email = DEFAULT_EMAIL }) {
  // -c ile config override; persist etmeyiz.
  const { stdout } = await git([
    '-c', `user.name=${name}`,
    '-c', `user.email=${email}`,
    'commit', '-m', message,
  ]);
  return stdout;
}

export async function gitPush({ remote = 'origin', branch = 'main' } = {}) {
  await git(['push', remote, branch]);
}

export async function gitHeadSha() {
  const { stdout } = await git(['rev-parse', 'HEAD']);
  return stdout.trim();
}

export async function gitResetHard(ref = 'HEAD') {
  await git(['reset', '--hard', ref]);
}

export async function gitStatusIsClean() {
  const { stdout } = await git(['status', '--porcelain']);
  return stdout.trim().length === 0;
}

// Calismayan SSH/auth durumunda nigh-deterministic erken hata.
export async function gitRemoteReachable() {
  try { await git(['ls-remote', '--exit-code', 'origin', 'HEAD']); return true; }
  catch { return false; }
}
