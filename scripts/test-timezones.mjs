import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const JEST_BIN = path.join(ROOT, 'node_modules', 'jest', 'bin', 'jest.js');

const ZONES = [
  'UTC',
  'Europe/Paris',
  'America/New_York',
  'Pacific/Auckland',
  'Pacific/Kiritimati',
  'Pacific/Pago_Pago',
];

const requested = process.argv.slice(2);
const zones = requested.length > 0 ? requested : ZONES;
const failed = [];

for (const zone of zones) {
  console.log(`::group::Tests in ${zone}`);
  const run = spawnSync(
    process.execPath,
    [JEST_BIN, '--ci', '--testPathIgnorePatterns', 'test/lint'],
    {
      cwd: ROOT,
      stdio: 'inherit',
      env: {
        ...process.env,
        OPALE_TZ: zone,
        NODE_OPTIONS:
          `${process.env.NODE_OPTIONS ?? ''} --require ./scripts/set-timezone.cjs`.trim(),
      },
    },
  );
  console.log('::endgroup::');
  if (run.status !== 0) {
    failed.push(zone);
    console.log(`::error title=Time zone::Tests fail when the phone is in ${zone}`);
  }
}

if (failed.length > 0) {
  console.log(`Failed in: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`Tests pass in ${zones.length} time zone(s): ${zones.join(', ')}`);
