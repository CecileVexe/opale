import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..', '..');

export type LintCase = { filePath: string; code: string };
export type LintMessage = { ruleId: string | null; message: string };

// ESLint runs in a child process, exactly as `npm run lint` does: its config loading relies on
// dynamic imports that the Jest module system does not support.
export function lintCases(cases: LintCase[]): LintMessage[][] {
  const run = spawnSync(process.execPath, [path.join(__dirname, 'lint-runner.mjs')], {
    cwd: ROOT,
    input: JSON.stringify(cases),
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (run.status !== 0) throw new Error(`ESLint runner failed: ${run.stderr}`);
  const results = JSON.parse(run.stdout) as LintMessage[][];
  for (const messages of results) {
    if (messages.some((m) => m.ruleId === null)) {
      throw new Error(`ESLint could not parse a snippet: ${JSON.stringify(messages)}`);
    }
  }
  return results;
}

export function countRule(messages: LintMessage[], ruleId: string): number {
  return messages.filter((m) => m.ruleId === ruleId).length;
}
