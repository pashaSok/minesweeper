import { createBox } from "./box";
import { generateRandom } from "./getRandom";

export let matrix = [];

function addBombs(bombCount) {
  let currentBombCount = bombCount;

  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  while (currentBombCount) {
    const x = generateRandom(0, matrixWidth - 1);
    const y = generateRandom(0, matrixHeight - 1);

    const matrixElem = matrix[y][x];
    if (!matrixElem) {
      matrix[y][x] = 1;
      currentBombCount--;
    }
  }
}

export function getAllNeighbors(coordinates) {
  const { x, y } = coordinates;
  const n1 = matrix[y - 1]?.[x];
  const n2 = matrix[y - 1]?.[x + 1];
  const n3 = matrix[y]?.[x + 1];
  const n4 = matrix[y + 1]?.[x + 1];
  const n5 = matrix[y + 1]?.[x];
  const n6 = matrix[y + 1]?.[x - 1];
  const n7 = matrix[y]?.[x - 1];
  const n8 = matrix[y - 1]?.[x - 1];

  return [n1, n2, n3, n4, n5, n6, n7, n8].filter(
    (item) => typeof item !== "undefined"
  );
}
export function openAllBombs() {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((matrixElem) => {
      if (matrixElem.isBomb) {
        matrixElem.open();
      }
    });
  });
}
export function createMatrix(width = 10, height = 10, bombCount = 10) {
  matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  addBombs(bombCount);

  matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newBox = createBox(Boolean(matrixElem), { x, y });

      matrix[y][x] = newBox;
    });
  });
}
