import * as fs from 'fs';
import * as path from 'path';
import lunr from 'lunr';
const ROOT = process.cwd();
const docsDir = path.join(ROOT, 'fern');

interface DocEntry {
  id: string;
  title: string;
  content: string;
}

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

function extractTitle(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^#\s+(.*)/);
    if (match) return match[1].trim();
  }
  return path.basename(content);
}

function buildIndex(): lunr.Index {
  const idx = lunr(function (this: lunr.Builder) {
    this.ref('id');
    this.field('title');
    this.field('content');
    const files = getAllMarkdownFiles(docsDir);
    let id = 0;
    for (const filePath of files) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const title = extractTitle(raw);
      const entry: DocEntry = { id: id.toString(), title, content: raw };
      this.add(entry);
      id++;
    }
  });
  return idx;
}

const index = buildIndex();
const outPath = path.join(docsDir, 'docs-index.json');
fs.writeFileSync(outPath, JSON.stringify(index), 'utf-8');
console.log(`Lunr index written to ${outPath}`);
