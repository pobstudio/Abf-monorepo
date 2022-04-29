import { lerp } from '@abf-monorepo/sketch-utils';

const CANVAS_SIZE = 570;
const MARGIN = 60;

const GRID_SIZE = 16;

const circles = [];

const UNIT_SIZE = (CANVAS_SIZE - 2 * MARGIN) / (GRID_SIZE - 1);

for (let i = 0; i < GRID_SIZE; ++i) {
  for (let j = 0; j < GRID_SIZE; ++j) {
    const x = lerp(0, CANVAS_SIZE - 2 * MARGIN, i / (GRID_SIZE - 1));
    const y = lerp(0, CANVAS_SIZE - 2 * MARGIN, j / (GRID_SIZE - 1));
    circles.push(`cx="${x + MARGIN}" cy="${y + MARGIN}"`);
    console.log(`'${circles[circles.length - 1]}',`);
  }
}
