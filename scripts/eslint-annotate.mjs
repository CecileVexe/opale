import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import path from 'node:path';

function runEslint() {
  try {
    return execFileSync('npx', ['eslint', '.', '--format', 'json'], {
      encoding: 'utf8',
      shell: true,
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (error) {
    // ESLint exits 1 when it finds errors; the JSON report is still on stdout.
    if (!error.stdout) throw error;
    return error.stdout;
  }
}

const results = JSON.parse(runEslint());
let errors = 0;
let warnings = 0;

for (const file of results) {
  const relative = path.relative(process.cwd(), file.filePath).replaceAll('\\', '/');
  for (const m of file.messages) {
    const isError = m.severity === 2;
    if (isError) errors += 1;
    else warnings += 1;
    const location = `file=${relative},line=${m.line ?? 1},col=${m.column ?? 1}`;
    console.log(
      `::${isError ? 'error' : 'warning'} ${location},title=${m.ruleId ?? 'eslint'}::${m.message}`,
    );
  }
}

const summary = `## ESLint\n\n${errors} error(s), ${warnings} warning(s)\n`;
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);

process.exit(errors > 0 ? 1 : 0);
