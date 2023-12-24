#! /usr/bin/env -S node --experimental-modules

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8");
const inputLines = input.split("\n");

const colours = {
  red: 12,
  green: 13,
  blue: 14,
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
  try {
    for (const draw of draws) {
      const cubes = draw.split(",");
      for (const cube of cubes) {
        const cubeCount = cube.trim().split(" ")[0];
        const cubeColour = cube.trim().split(" ")[1];
        for (const colour in colours) {
          if (cubeColour == colour && cubeCount > colours[colour]) {
            throw new Error(`${cubeColour} count too high`, {
              cause: cubeCount,
            });
          }
        }
      }
    }
    sum += gameId;
  } catch (e) { }
});

console.log(sum);
