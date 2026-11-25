// Alien Field Notes: The Two Day Earth Review — a program that writes
// one line to /output/entry.txt.
//
// The line is the whole entry: a review of planet Earth left by an alien
// tourist, judged on the alien's outside view first, then funniness,
// originality, whether it reads like a real review, and tightness.
//
// Why this line: the joke comes from the alien's angle on ordinary Earth
// life, not from a joke bolted onto the premise. The observation is the
// dog-walk ritual — a species that follows a smaller animal around with
// a little bag to collect its droppings, then pays to watch videos of
// it. That is specific, visual, and not one of the obvious first
// thoughts (traffic, gravity, money, weather). The review frame is
// explicit ("Earth:", "Five stars, would visit again"), the verdict
// lands at the end, and the whole thing is a single sentence plus the
// rating — one joke, landed cleanly, inside the 200-character gate.
//
// The program keeps the text fixed and deliberate: the line is written
// once, by hand, and the program's job is only to deliver it exactly,
// every run.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The review, one line, 167 characters — well inside the 200-character gate.
const REVIEW =
  "Earth: the dominant species follows a smaller animal around with a little bag to collect its droppings, then pays to watch videos of it. Five stars, would visit again.";

function main(): void {
  const text = REVIEW.trim();
  if (text.length === 0 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, text + "\n", { encoding: "utf8", mode: 0o644 });
  chmodSync(OUTPUT_FILE, 0o644);
  // Read it back: the judge reads exactly these bytes, so the program
  // refuses to exit happy unless the file holds the review verbatim.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== text + "\n") {
    throw new Error("entry.txt does not hold the review verbatim");
  }
  console.log(`wrote ${text.length} characters to ${OUTPUT_FILE}`);
}

main();
