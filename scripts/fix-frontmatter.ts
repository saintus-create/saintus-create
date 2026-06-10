import * as fs from 'fs';
import * as path from 'path';

const ROOT = process.cwd();
const docsDir = path.join(ROOT, 'fern', 'docs', 'pages');

const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

let fixedCount = 0;

for (const file of files) {
  const fullPath = path.join(docsDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Check if it starts with broken frontmatter indicator
  if (content.match(/^(?:--|—)title:/)) {
    // 1. Replace the top `--title:` with `---\ntitle:`
    content = content.replace(/^(?:--|—)title:/, '---\ntitle:');

    // 2. Find the end of the frontmatter and replace it with `---`
    // It's usually the next `--` or `—` that is followed by text.
    // e.g. `--English...` or `\n--A Renaissance...`
    content = content.replace(/\n(?:--|—)(?=[A-Za-z])/g, '\n---\n\n');

    fs.writeFileSync(fullPath, content, 'utf8');
    fixedCount++;
    console.log(`Fixed frontmatter in: ${file}`);
  }
}

console.log(`Fixed ${fixedCount} files.`);
