const { parseItems } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);

const lineMapper = {
  U: { dimension: 'y', direction: 1 },
  D: { dimension: 'y', direction: -1 },
  L: { dimension: 'x', direction: -1 },
  R: { dimension: 'x', direction: 1 },
};

const intersect = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 },
  { x: x4, y: y4 }
) => {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return { x, y };
};

const calculateManhattanDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.abs(x2 - x1) + Math.abs(y2 - y1);

const convertVectorToCoord = (prevCoords, [vector, ...distance], index) => {
  const { dimension, direction } = lineMapper[vector];

  const distanceValue = Number(distance.join(''));

  const { ...newCoord } = prevCoords[index];
  newCoord[dimension] += distanceValue * direction;
  newCoord.distance += distanceValue;

  return [...prevCoords, newCoord];
};

const findIntersections = (wire1, wire2) => {
  const intersections = [];
  wire1.forEach((coordA, indexA, allCoordsA) => {
    wire2.forEach((coordB, indexB, allCoordsB) => {
      if (indexA === 0 || indexB === 0) return;

      const prevCoordA = allCoordsA[indexA - 1];
      const prevCoordB = allCoordsB[indexB - 1];

      const intersection = intersect(prevCoordA, coordA, prevCoordB, coordB);
      if (intersection) {
        const distanceA =
          prevCoordA.distance +
          calculateManhattanDistance(intersection, prevCoordA);
        const distanceB =
          prevCoordB.distance +
          calculateManhattanDistance(intersection, prevCoordB);
        const totalDistance = distanceA + distanceB;

        const manhattanDistance = calculateManhattanDistance(
          { x: 0, y: 0 },
          intersection
        );

        if (manhattanDistance !== 0)
          intersections.push({
            ...intersection,
            totalDistance,
            manhattanDistance,
          });
      }
    });
  });
  return intersections;
};

const findIntersectionDistances = file => {
  const wireCoords = parseItems(`${__dirname}/${file}`, '\n', item =>
    item.split(',')
  ).map(wire =>
    wire.reduce(convertVectorToCoord, [{ x: 0, y: 0, distance: 0 }])
  );

  return findIntersections(...wireCoords);
};

const findLowestValue = (file, reducer) =>
  Math.min(...findIntersectionDistances(file).map(reducer));

const findClosestIntersection = file =>
  findLowestValue(file, ({ manhattanDistance }) => manhattanDistance);

const findShortestIntersection = file =>
  findLowestValue(file, ({ totalDistance }) => totalDistance);

test(findClosestIntersection('test1.txt'), 6);
test(findClosestIntersection('test2.txt'), 159);
test(findClosestIntersection('test3.txt'), 135);

test(findShortestIntersection('test1.txt'), 30);
test(findShortestIntersection('test2.txt'), 610);
test(findShortestIntersection('test3.txt'), 410);
endTest();

console.log(`Part 1 - ${findClosestIntersection('input.txt')}`);
console.log(`Part 2 - ${findShortestIntersection('input.txt')}`);
