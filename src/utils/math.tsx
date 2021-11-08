export function euclidDistance(
  x: [number, number],
  y: [number, number]
): number {
  return Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2));
}

export function angleBetweenPoints(
  x: [number, number],
  y: [number, number]
): number {
  return Math.atan2(y[1] - x[1], y[0] - x[0]);
}

export function getTranslateValues(element: Element): [number, number] {
  const style = window.getComputedStyle(element);
  const matrix = style.transform;
  if (matrix === "none" || typeof matrix === "undefined") {
    return [0, 0];
  }
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)?.[1].split(", ");
  if (!matrixValues) {
    return [0, 0];
  }
  if (matrixType === "2d") {
    return [parseFloat(matrixValues[4]), parseFloat(matrixValues[5])];
  }
  if (matrixType === "3d") {
    return [parseFloat(matrixValues[12]), parseFloat(matrixValues[13])];
  }
  return [0, 0];
}
