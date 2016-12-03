let fs = require('fs');
var sort = require('alphanum-sort');

let inputFile = fs.readFileSync('input.txt').toString().split("\n");

const MAPPED_INPUT = inputFile.map((inputLine) => {
  return inputLine.split(/\ +/)
    .filter((numberString) => {
      return numberString.length > 0
    })
    .map((numberString) => {
      return parseInt(numberString);
    });
});

function validateTriangle(triplet) {
  triplet = sort(triplet);
  if (triplet[0] + triplet[1] > triplet[2]) {
    return true;
  }
  return false;
}

function part1() {
  let filteredTriangles = MAPPED_INPUT.filter(validateTriangle);
  console.log("The Answer for Part 1 is " + filteredTriangles.length);
}

function part2() {
  let validTriangles = 0;
  MAPPED_INPUT.forEach((line, index) => {
    if (index < MAPPED_INPUT.length - 1 && index % 3 === 0) {
      for (var i=0; i<3; i++) {
        if (validateTriangle([
            MAPPED_INPUT[index][i],
            MAPPED_INPUT[index + 1][i],
            MAPPED_INPUT[index + 2][i]
          ])) {
          validTriangles++;
        }
      }
    }
  });
  console.log("The answer for part 2 is: " + validTriangles);
}

part1();
part2();
