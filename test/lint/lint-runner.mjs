import { readFileSync } from 'node:fs';

import { ESLint } from 'eslint';

const cases = JSON.parse(readFileSync(0, 'utf8'));

const eslint = new ESLint();
const results = [];
for (const { code, filePath } of cases) {
  const [result] = await eslint.lintText(code, { filePath });
  results.push(result.messages.map(({ ruleId, message }) => ({ ruleId, message })));
}
process.stdout.write(JSON.stringify(results));
