#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "github-issues.md");
const targetPath = path.join(root, "github-issues-import.json");

const source = fs.readFileSync(sourcePath, "utf8");

const issueRegex =
	/### Issue\s+(\d+)\s+—\s+([^\n]+)\n\n\*\*Título:\*\*\n\n```\n([\s\S]*?)\n```\n\n\*\*Labels:\*\*\s+([^\n]+)\n\n\*\*Corpo:\*\*\n\n```markdown\n([\s\S]*?)\n```/g;

const parseLabels = (rawLabels) => {
	const matches = rawLabels.match(/`([^`]+)`/g) || [];
	return matches.map((label) => label.replace(/`/g, "").trim());
};

const issues = [];
let match;

while ((match = issueRegex.exec(source)) !== null) {
	const number = Number(match[1]);
	const shortTitle = match[2].trim();
	const title = match[3].trim();
	const labels = parseLabels(match[4]);
	const body = match[5].replace(/\s+$/, "");

	issues.push({
		number,
		shortTitle,
		title,
		labels,
		body,
	});
}

if (issues.length === 0) {
	console.error("Nenhuma issue encontrada. Verifique o formato de github-issues.md.");
	process.exit(1);
}

const payload = {
	generatedAt: new Date().toISOString(),
	sourceFile: "github-issues.md",
	totalIssues: issues.length,
	issues,
};

fs.writeFileSync(targetPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(`Arquivo gerado: ${path.relative(root, targetPath)} (${issues.length} issues)`);
