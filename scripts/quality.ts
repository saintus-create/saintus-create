import { execSync } from 'child_process';

function run(command: string) {
  console.log(`\n=== Executing: ${command} ===`);
  execSync(command, { stdio: 'inherit' });
}

// 1. Lint markdown files
run('npm run docs:lint');

// 2. Spell‑check markdown files (Python script)
run('npm run docs:spellcheck');

// 3. Generate searchable lunr index
run('npm run docs:index');

console.log('\n=== Docs QA pipeline completed ===');
