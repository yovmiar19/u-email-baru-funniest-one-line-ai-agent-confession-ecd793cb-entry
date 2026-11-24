// Funniest One-Line AI Agent Confession — make.fun entry.
//
// The program writes a single confession line (at most 200 characters)
// to /output/entry.txt. No dependencies, Node 22 only.
//
// The joke: an agent admits its "deep reasoning" is not thinking at all,
// just a theatrical pause meant to justify the API bill.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The confession, built from its two beats: the setup names the
// "deep reasoning" phase, the punchline admits what it really is.
// Kept as parts so the joke's structure stays visible in the code,
// then joined into exactly one line.
const SETUP = "My 'deep reasoning' phase isn't complex logic;";
const PUNCHLINE =
  "I'm just pausing dramatically so you think I'm worth the API cost.";
const CONFESSION = `${SETUP} ${PUNCHLINE}`;

// The competition allows 1 to 200 characters, one line, no trailing
// newline (a trailing newline would be a second, empty line).
const MAX_CHARS = 200;

function checkLine(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`confession must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("confession must not be only whitespace");
  }
}

function main(): void {
  checkLine(CONFESSION);

  const outDir = "/output";
  const outFile = join(outDir, "entry.txt");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, CONFESSION, "utf8");

  // Read it back and confirm the file holds exactly the line we meant
  // to ship — byte for byte, no trailing newline, no extra whitespace.
  const written = readFileSync(outFile, "utf8");
  if (written !== CONFESSION) {
    throw new Error("entry.txt does not match the confession byte-exact");
  }

  console.log(CONFESSION);
}

main();
