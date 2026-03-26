import re
from pathlib import Path


def parse_block(content: str, selector: str) -> dict[str, str]:
	pattern = rf"{re.escape(selector)}\s*\{{([\s\S]*?)\n\}}"
	match = re.search(pattern, content)
	if not match:
		return {}
	return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", match.group(1)))


def resolve(value: str, dark_vars: dict[str, str], root_vars: dict[str, str]) -> str:
	value = value.strip()
	if value.startswith("var(") and value.endswith(")"):
		name = value[4:-1].strip()
		return resolve(dark_vars.get(name, root_vars.get(name, "")), dark_vars, root_vars)
	return value


def hex_to_rgb(hex_color: str) -> tuple[float, float, float]:
	hex_color = hex_color.strip().lstrip("#")
	if len(hex_color) == 3:
		hex_color = "".join(ch * 2 for ch in hex_color)
	return tuple(int(hex_color[i:i + 2], 16) / 255 for i in (0, 2, 4))


def linearize(channel: float) -> float:
	return channel / 12.92 if channel <= 0.03928 else ((channel + 0.055) / 1.055) ** 2.4


def luminance(rgb: tuple[float, float, float]) -> float:
	r, g, b = rgb
	return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)


def contrast_ratio(foreground: str, background: str) -> float:
	l1 = luminance(hex_to_rgb(foreground))
	l2 = luminance(hex_to_rgb(background))
	high, low = (l1, l2) if l1 > l2 else (l2, l1)
	return (high + 0.05) / (low + 0.05)


def main() -> int:
	variables_path = Path(__file__).resolve().parents[1] / "css" / "variables.css"
	content = variables_path.read_text(encoding="utf-8")
	root_vars = parse_block(content, ":root")
	dark_vars = parse_block(content, '[data-theme="dark"]')
	for key, value in root_vars.items():
		dark_vars.setdefault(key, value)

	pairs = [
		("--color-text", "--color-bg", 4.5),
		("--color-text", "--color-surface", 4.5),
		("--color-heading", "--color-bg", 4.5),
		("--color-text-muted", "--color-bg", 4.5),
		("--color-text-muted", "--color-surface", 4.5),
		("--primary", "--color-bg", 4.5),
		("--primary", "--color-surface", 4.5),
		("--white", "--primary-dark", 4.5),
		("--white", "--secondary", 4.5),
		("--gray-500", "--color-surface", 4.5),
	]

	failed = []
	for foreground_token, background_token, min_ratio in pairs:
		foreground = resolve(dark_vars[foreground_token], dark_vars, root_vars)
		background = resolve(dark_vars[background_token], dark_vars, root_vars)
		if not (foreground.startswith("#") and background.startswith("#")):
			failed.append((foreground_token, background_token, min_ratio, 0.0))
			continue
		ratio = contrast_ratio(foreground, background)
		print(f"{foreground_token} on {background_token}: {ratio:.2f}")
		if ratio < min_ratio:
			failed.append((foreground_token, background_token, min_ratio, ratio))

	if failed:
		print("FAIL")
		for foreground_token, background_token, min_ratio, ratio in failed:
			print(f"{foreground_token} on {background_token}: {ratio:.2f} (mínimo {min_ratio:.2f})")
		return 1

	print("PASS")
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
