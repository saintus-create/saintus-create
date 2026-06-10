import * as fs from 'fs';
import * as path from 'path';

const ROOT = process.cwd();
const docsDir = path.join(ROOT, 'fern');
const outputPath = path.join(docsDir, 'sidebar.json');

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
}

function getTitle(filePath: string, content: string): string {
  const match = content.match(/^#\s+(.*)/m);
  return match ? match[1].trim() : path.basename(filePath, '.md');
}

function buildTree(dir: string, basePath = ''): NavItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: NavItem[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(basePath, entry.name);
    if (entry.isDirectory()) {
      const children = buildTree(fullPath, relPath);
      if (children.length) {
        items.push({ title: entry.name, children });
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const title = getTitle(fullPath, content);
      const urlPath = relPath.replace(/\\.md$/, '');
      items.push({ title, path: urlPath });
    }
  }
  return items;
}

const sidebar: NavItem[] = buildTree(docsDir);
fs.writeFileSync(outputPath, JSON.stringify({ items: sidebar }, null, 2), 'utf-8');
console.log(`Sidebar written to ${outputPath}`);
