#! /usr/bin/env -S node --experimental-modules

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");
const inputLines = input.split("\n");

const colours = {
  red: 0,
  green: 0,
  blue: 0,
};

let sum = 0;
inputLines.forEach((line) => {
  // skip empty lines
  if (line.length == 0) {
    return;
  }

  const gameId = parseInt(line.split(":")[0].split(" ")[1]);
  const game = line.split(":")[1].trim();
  const draws = game.split(";");
  for (const draw of draws) {
    const cubes = draw.split(",");
    for (const cube of cubes) {
      const cubeCount = parseInt(cube.trim().split(" ")[0]);
      const cubeColour = cube.trim().split(" ")[1];
      for (const colour in colours) {
        if (cubeColour == colour && cubeCount > colours[colour]) {
          colours[colour] = cubeCount;
        }
      }
    }
  }
  let power = 1;
  // calculate powerset and reset for next game
  for (const colour in colours) {
    power *= colours[colour];
    colours[colour] = 0;
  }
  sum += power;
});

console.log(sum);
