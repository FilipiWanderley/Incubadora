#!/usr/bin/env python3

from __future__ import annotations

import json
import re
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    source_path = root / "github-issues.md"
    target_path = root / "github-issues-import.json"

    source = source_path.read_text(encoding="utf-8")
    issues = []
    chunks = re.split(r"(?=^### Issue\s+\d+\s+—\s+)", source, flags=re.MULTILINE)
    header_rx = re.compile(r"^### Issue\s+(\d+)\s+—\s+([^\n]+)", re.MULTILINE)
    title_rx = re.compile(r"\*\*Título:\*\*\s*```\s*([\s\S]*?)\s*```", re.MULTILINE)
    labels_rx = re.compile(r"\*\*Labels:\*\*\s*([^\n]+)", re.MULTILINE)
    body_rx = re.compile(r"\*\*Corpo:\*\*\s*```markdown\s*([\s\S]*?)\s*```", re.MULTILINE)

    for chunk in chunks:
        header = header_rx.search(chunk)
        if not header:
            continue

        title_match = title_rx.search(chunk)
        labels_match = labels_rx.search(chunk)
        body_match = body_rx.search(chunk)
        if not (title_match and labels_match and body_match):
            continue

        number = int(header.group(1))
        short_title = header.group(2).strip()
        title = title_match.group(1).strip()
        labels = re.findall(r"`([^`]+)`", labels_match.group(1))
        body = body_match.group(1).rstrip()

        issues.append(
            {
                "number": number,
                "shortTitle": short_title,
                "title": title,
                "labels": labels,
                "body": body,
            }
        )

    if not issues:
        raise SystemExit("Nenhuma issue encontrada no arquivo fonte.")

    payload = {
        "generatedAt": "2026-04-02",
        "sourceFile": "github-issues.md",
        "totalIssues": len(issues),
        "issues": issues,
    }

    target_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Arquivo gerado: {target_path.name} ({len(issues)} issues)")


if __name__ == "__main__":
    main()
