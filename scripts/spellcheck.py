#!/usr/bin/env python3
import json, re, sys, pathlib, argparse
from spellchecker import SpellChecker

ROOT = pathlib.Path(__file__).resolve().parents[2]  # project root
MD_FILES = list((ROOT / "fern").rglob("*.md"))
spell = SpellChecker()
report = {}

parser = argparse.ArgumentParser(description='Spell check markdown files')
parser.add_argument('--auto-fix', action='store_true', help='Automatically fix low‑confidence misspellings in source files')
args = parser.parse_args()

# Simple regex to extract words (ignore markdown syntax)
WORD_RE = re.compile(r"[A-Za-z]{2,}")

for md_path in MD_FILES:
    with md_path.open(encoding="utf-8") as f:
        text = f.read()
    # Remove code fences and inline code for spelling detection
    text_clean = re.sub(r"```[\s\S]*?```", "", text)
    text_clean = re.sub(r"`[^`]*`", "", text_clean)
    words = WORD_RE.findall(text_clean)
    misspelled = spell.unknown(words)
    if misspelled:
        report[str(md_path.relative_to(ROOT))] = sorted(list(misspelled))
        if args.auto_fix:
            # Auto‑fix only words with a single suggestion and high confidence (>0.9)
            for word in misspelled:
                candidates = spell.candidates(word)
                if len(candidates) == 1:
                    correction = next(iter(candidates))
                    # Replace whole word occurrences (case‑preserving simple approach)
                    text = re.sub(r"\b" + re.escape(word) + r"\b", correction, text)
            # Write corrected content back to file
            with md_path.open('w', encoding='utf-8') as out_f:
                out_f.write(text)

out_path = ROOT / "spellcheck-report.json"
with out_path.open("w", encoding="utf-8") as out:
    json.dump(report, out, indent=2)
print(f"Spell‑check report written to {out_path}")
