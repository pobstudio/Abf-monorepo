import { lerp } from '@abf-monorepo/sketch-utils';

const CANVAS_SIZE = 16;

const GRID_SIZE = 16;

const rects = [];

for (let i = 0; i < GRID_SIZE; ++i) {
  for (let j = 0; j < GRID_SIZE; ++j) {
    const x = lerp(0, CANVAS_SIZE, i / GRID_SIZE);
    const y = lerp(0, CANVAS_SIZE, j / GRID_SIZE);
    rects.push(`x="${x}" y="${y}"`);
    console.log(`'${rects[rects.length - 1]}',`);
  }
}
