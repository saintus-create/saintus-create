import * as fs from 'fs';
import * as path from 'path';
import markdownToc from 'markdown-toc';

const ROOT = process.cwd();
const docsDir = path.join(ROOT, 'fern');

function getAllMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function validateHeadings(content: string): string[] {
  const warnings: string[] = [];
  const lines = content.split('\n');
  let prevLevel = 0;
  lines.forEach((line, idx) => {
    const m = line.match(/^(#+)\s+/);
    if (m) {
      const level = m[1].length;
      if (prevLevel && level - prevLevel > 1) {
        warnings.push(`Line ${idx + 1}: skipped heading level from ${prevLevel} to ${level}`);
      }
      prevLevel = level;
    }
  });
  return warnings;
}

function processFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const warnings = validateHeadings(raw);
  if (warnings.length) {
    console.warn(`Heading warnings in ${filePath}:`);
    warnings.forEach(w => console.warn('  ' + w));
  }
  // Generate TOC using markdown-toc
  const toc = markdownToc(raw).content;
  let newContent: string;
  if (raw.includes('<!-- TOC -->')) {
    newContent = raw.replace('<!-- TOC -->', toc);
  } else {
    // Insert TOC after first top‑level heading or at file start
    const lines = raw.split('\n');
    const firstHeadingIdx = lines.findIndex(l => l.startsWith('# '));
    if (firstHeadingIdx >= 0) {
      const before = lines.slice(0, firstHeadingIdx + 1).join('\n');
      const after = lines.slice(firstHeadingIdx + 1).join('\n');
      newContent = `${before}\n\n${toc}\n\n${after}`;
    } else {
      newContent = `${toc}\n\n${raw}`;
    }
  }
  fs.writeFileSync(filePath, newContent, 'utf-8');
}

const files = getAllMarkdownFiles(docsDir);
files.forEach(processFile);

console.log('Heading lint and TOC generation complete.');
