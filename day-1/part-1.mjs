#! /usr/bin/env -S node --experimental-modules

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");
const inputLines = input.split("\n");

let sum = 0;
inputLines.forEach((line) => {
  // skip empty lines
  if (line.length == 0) {
    return;
  }

  // digits as characters
  let firstDigit, lastDigit;
  for (const i in line) {
    const startChar = line.charAt(i);
    const endChar = line.charAt(line.length - 1 - i);

    if (!isNaN(parseInt(startChar)) && typeof firstDigit === "undefined") {
      firstDigit = startChar;
    }
    if (!isNaN(parseInt(endChar)) && typeof lastDigit === "undefined") {
      lastDigit = endChar;
    }

    // break early if done
    if (typeof firstDigit !== "undefined" && typeof lastDigit !== "undefined") {
      break;
    }
  }

  const concatDigits = parseInt(firstDigit + lastDigit);
  sum += concatDigits;
});

console.log(sum);
