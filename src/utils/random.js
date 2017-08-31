import SimplexNoise from "simplex-noise";

export function randInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randNum(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

const simplex = new SimplexNoise();
let noiseInstances = 0;

export function noise2D(x, y, min = 0, max = 1) {
  const n = (simplex.noise2D(x, y) + 1) / 2;
  return (max - min) * n + min;
}

export function buildNoise1D() {
  noiseInstances += 1;
  const offset = noiseInstances * 2;
  return (x, min, max) => noise2D(x, offset, min, max);
}
