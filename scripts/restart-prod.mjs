import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';

const port = process.env.PORT ?? '4321';

try {
  if (process.platform === 'win32') {
    const out = execSync(
      `netstat -ano | findstr ":${port}"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] },
    );
    const pids = [
      ...new Set(
        out
          .split('\n')
          .map((line) => line.trim().split(/\s+/).pop())
          .filter((pid) => pid && /^\d+$/.test(pid)),
      ),
    ];
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      } catch {
        /* proceso ya cerrado */
      }
    }
  }
} catch {
  /* puerto libre */
}

for (const dir of ['dist', 'node_modules/.astro']) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
}

execSync('npm run build', { stdio: 'inherit' });

console.log(`\nIniciando servidor en http://localhost:${port} …\n`);
spawn('node', ['./dist/server/entry.mjs'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
