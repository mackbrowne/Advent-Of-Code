const { parseNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);

const layerSize = ({ x, y }) => x * y;

const getChunks = (input, chunk) => {
  const chunks = [];

  for (i = 0; i < input.length; i += chunk) {
    chunks.push(input.slice(i, i + chunk));
  }

  return chunks;
};

const test1Input = parseNumbers(`${__dirname}/test1.txt`, '');
const test1Dimensions = { x: 3, y: 2 };

const test1Layers = getChunks(test1Input, layerSize(test1Dimensions));
const test1Expected = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 0, 1, 2],
];
test1Layers.forEach((layer, i) => test(`${layer}`, `${test1Expected[i]}`));
endTest();

const input = parseNumbers(`${__dirname}/input.txt`, '');
const dimensions = { x: 25, y: 6 };

const LAYERS = getChunks(input, layerSize(dimensions));

const findOccurences = (items, comparator) =>
  items.filter(i => i === comparator).length;

const fewestZeros = LAYERS.reduce((fewest, currentLayer) =>
  findOccurences(fewest, 0) < findOccurences(currentLayer, 0)
    ? fewest
    : currentLayer
);

console.log(
  `Part 1 - ${findOccurences(fewestZeros, 1) * findOccurences(fewestZeros, 2)}`
);

const part2 = LAYERS[0].map((pixel, i) => {
  if (pixel < 2) return pixel;
  let currentLayer = 1;
  let nextPixel;
  do {
    nextPixel = LAYERS[currentLayer][i];
    if (nextPixel < 2) return nextPixel;
    else currentLayer++;
  } while (currentLayer < LAYERS.length);
  throw Error('transparent');
});

console.log(`Part 2: \n`);
getChunks(part2, dimensions.x).forEach(line => console.log(line.map(letter => letter === 0 ? ' ' : '*').join(' ')));

