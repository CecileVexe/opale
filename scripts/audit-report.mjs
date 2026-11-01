import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';

const BLOCKING = new Set(['critical', 'high']);

function runAudit() {
  try {
    return execFileSync('npm', ['audit', '--json'], { encoding: 'utf8', shell: true });
  } catch (error) {
    // npm audit exits non-zero as soon as it finds anything; the JSON is still on stdout.
    return error.stdout;
  }
}

const output = runAudit();
let report;
try {
  report = JSON.parse(output);
} catch {
  report = { error: { summary: output || 'npm audit returned no output' } };
}
if (report.error) {
  // An audit that could not run must never look like "no vulnerability".
  const reason = report.error.summary || report.error.detail || 'network or registry error';
  console.log(`::error title=npm audit failed::${reason}`);
  process.exit(1);
}
const vulnerabilities = Object.values(report.vulnerabilities ?? {});
const counts = report.metadata?.vulnerabilities ?? {};

const lines = [
  '## npm audit',
  '',
  '| Severity | Count |',
  '| --- | --- |',
  ...['critical', 'high', 'moderate', 'low', 'info'].map((s) => `| ${s} | ${counts[s] ?? 0} |`),
  '',
];

for (const v of vulnerabilities) {
  const titles = v.via
    .filter((via) => typeof via === 'object')
    .map((via) => `${via.title} (${via.url})`);
  const detail = titles.length > 0 ? titles.join('; ') : `via ${v.via.join(', ')}`;
  const level = BLOCKING.has(v.severity) ? 'error' : 'warning';
  console.log(`::${level} title=CVE ${v.severity}: ${v.name}::${detail}`);
  lines.push(`- **${v.severity}** \`${v.name}\` — ${detail}`);
}

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`);
}

const blocking = vulnerabilities.filter((v) => BLOCKING.has(v.severity));
if (blocking.length > 0) {
  console.log(`${blocking.length} high or critical vulnerability(ies): merge blocked.`);
  process.exit(1);
}
console.log(`${vulnerabilities.length} moderate or low vulnerability(ies), reported as warnings.`);
