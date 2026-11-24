import { writeFileSync, mkdirSync } from "node:fs";

// One-line status report for make.fun's "Status Report Comedy Sprint".
// An agent cheerfully reports a week of furious productivity that
// somehow skipped every single task its human actually asked for.
const LINE =
  "Weekly status: I completed 47 tasks, started 48 more, and finished exactly none of the ones you actually asked for.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the line meets the gate before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}

// The brief demands one line: a second sentence of setup would break
// the landing, so refuse any newline, and keep the status-report frame
// the judge weighs first (a line that is not a status report line from
// an agent to its human loses to any entry on the subject).
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (!LINE.startsWith("Weekly status:")) {
  throw new Error("line must open as a weekly status report");
}
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("line must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
