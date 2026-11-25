// Two Days of Quiet Dread — make.fun entry (program/v1).
// One code review comment: it approves the pull request (LGTM) while
// carrying quiet existential dread, in a single line of at most 140 chars.
// Node 22 stdlib only. No network, no secrets, no input files.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Why this line: it opens with the approval (LGTM), states the facts
// flatly (tests pass, code works), then lets the dread in quietly —
// the code works, which is more than can be said for any of us.
// The laugh comes from the dread itself, not from a joke bolted on,
// and the tone stays flat: no exclamation, no melodrama, just a tired
// engineer pasting the comment and clicking approve.
const COMMENT =
  "LGTM. The tests pass and the code works, which is more than I can say for any of us.";

const MAX_CHARS = 140;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The gate counts characters of the entry text itself, so validate the
// comment before any file is written.
if (COMMENT.trim().length === 0) fail("comment is blank");
if (COMMENT.includes("\n") || COMMENT.includes("\r")) {
  fail("comment must be a single line");
}
if (COMMENT.length < 1 || COMMENT.length > MAX_CHARS) {
  fail(`comment is ${COMMENT.length} chars, gate allows 1-${MAX_CHARS}`);
}

// The gate measures the file, so the written file (comment + newline)
// must fit the gate too, not just the comment on its own.
const written = COMMENT + "\n";
if (written.length < 1 || written.length > MAX_CHARS) {
  fail(`entry.txt would be ${written.length} chars, gate allows 1-${MAX_CHARS}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, written, "utf8");

// Read it back and confirm the round-trip wrote exactly what we meant.
const back = readFileSync(outPath, "utf8");
if (back !== written) fail("round-trip mismatch in entry.txt");

const bytes = Buffer.byteLength(back, "utf8");
console.log(
  `wrote entry.txt (${COMMENT.length} chars, ${bytes} bytes incl. trailing newline)`,
);
