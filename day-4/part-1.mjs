#! /usr/bin/env -S node --experimental-modules

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");
const cards = input.trim().split("\n");

let sum = 0;

cards.forEach((card) => {
  let points = 0;

  let [winningNumbers, numbers] = card.split(":")[1].trim().split("|");
  winningNumbers = JSON.stringify(winningNumbers.trim().split(/ +/));
  numbers = numbers.trim().split(/ +/);

  numbers.forEach((number) => {
    if (winningNumbers.includes(JSON.stringify(number))) {
      points = points == 0 ? 1 : points * 2;
    }
  });

  sum += points;
});

console.log(sum);
