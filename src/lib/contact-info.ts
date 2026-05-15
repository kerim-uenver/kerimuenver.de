// Obfuscated to keep scrapers from harvesting email, phone, and address from the static build. (Feel free to recommend a better approach via a GitHub issue or PR.)

const a = ["2261219", "4710"];
const b = ["ed.revneum", "irek@tcatnoc"];
const c = ["renrohT", "23 eßartS"];
const d = ["miehnnaM", "70386"];

function r(s: string) {
  return s.split("").reverse().join("");
}

export function tel(): string {
  return r(a[1]) + " " + r(a[0]);
}

export function mail(): string {
  return r(b[1]) + r(b[0]);
}

export function mailHref(): string {
  return "mailto:" + mail();
}

export function address(): string[] {
  return [r(c[0]) + " " + r(c[1]), r(d[1]) + " " + r(d[0])];
}
