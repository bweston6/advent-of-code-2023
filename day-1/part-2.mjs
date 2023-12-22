#! /usr/bin/env -S node --experimental-modules

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { numbers } from "./numbers.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");
const inputLines = input.split("\n");

function containsDigit(string) {
  for (const [i, number] of numbers.entries()) {
    if (string.includes(number)) {
      return i + 1;
    }
  }
  return NaN;
}

let sum = 0;
inputLines.forEach((line) => {
  // skip empty lines
  if (line.length == 0) {
    return;
  }

  // digits as characters
  let firstDigit, lastDigit;
  for (let i in line) {
    i = parseInt(i);
    const startChar = line.charAt(i);
    const endChar = line.charAt(line.length - 1 - i);

    const startSubStringDigit = containsDigit(line.substring(0, i + 1));
    const endSubStringDigit = containsDigit(line.substring(line.length - (i + 1), line.length));

    if ((!isNaN(parseInt(startChar)) || !isNaN(startSubStringDigit)) && typeof firstDigit === "undefined") {
      firstDigit = !isNaN(startSubStringDigit) ? startSubStringDigit.toString() : startChar;
    }
    if ((!isNaN(parseInt(endChar)) || !isNaN(endSubStringDigit)) && typeof lastDigit === "undefined") {
      lastDigit = !isNaN(endSubStringDigit) ? endSubStringDigit.toString() : endChar;
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
