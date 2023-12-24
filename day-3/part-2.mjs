#! /usr/bin/env -S node --experimental-modules

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");

// create 2d array of chars
const inputLines = input.trim().split("\n");
const inputArray = new Array();
inputLines.forEach((line) => {
  inputArray.push(line.split(""));
});

function getValueAt(startX, startY) {
  const locations = [[startX, startY]];
  let valueChars = inputArray[startY][startX];
  // search backwards
  for (let x = startX - 1; x >= 0; x--) {
    if (isNaN(parseInt(inputArray[startY][x]))) break;
    locations.push([x, startY]);
    valueChars = inputArray[startY][x] + valueChars;
  }
  // search forwards
  for (let x = startX + 1; x < inputArray[startY].length; x++) {
    if (isNaN(parseInt(inputArray[startY][x]))) break;
    locations.push([x, startY]);
    valueChars = valueChars + inputArray[startY][x];
  }
  return { value: parseInt(valueChars), locations };
}

// only returns the product if there is more than one value around the symbol
function prodValuesAround(symbolX, symbolY) {
  let prod = 1;
  let valueCount = 0;
  let searchedLocations = [[symbolX, symbolY]];
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      if (
        JSON.stringify(searchedLocations).includes(
          JSON.stringify([symbolX + x, symbolY + y]),
        )
      ) {
        continue;
      }
      if (!isNaN(parseInt(inputArray[symbolY + y][symbolX + x]))) {
        const { value, locations } = getValueAt(symbolX + x, symbolY + y);
        searchedLocations.push(...locations);
        valueCount++;
        prod *= value;
      }
    }
  }
  if (valueCount > 1) {
    return prod;
  } else {
    return 0;
  }
}

let sum = 0;
const symbolRegEx = /\*/;

for (const y in inputArray) {
  for (const x in inputArray[y]) {
    if (symbolRegEx.exec(inputArray[y][x]) !== null) {
      sum += prodValuesAround(parseInt(x), parseInt(y));
    }
  }
}

console.log(sum);
