let fs = require('fs');

let inputFile = fs.readFileSync('input.txt').toString().split("\n");

const PARSED_INPUT = inputFile.filter((inputLine) => {
  return inputLine.length > 0
}).map((inputLine) => {
  let parsedLine = inputLine.split('-');
  idSum = parsedLine[parsedLine.length - 1].split('[');
  return {
    'name': parsedLine.slice(0, parsedLine.length - 1).join(''),
    'originalName': parsedLine.slice(0, parsedLine.length - 1).join(' '),
    'id': parseInt(idSum[0]),
    'checksum': idSum[1].replace(']', '')
  };
});

function countLetters(str) {
  let sums = {};
  for (x = 0, length = str.length; x < length; x++) {
    var l = str.charAt(x)
    sums[l] = (isNaN(sums[l]) ? 1 : sums[l] + 1);
  }

  let sumArray = [];
  for (var key in sums) {
    if (sums.hasOwnProperty(key)) {
      sumArray.push({
        'letter': key,
        'sum': sums[key]
      });
    }
  }
  return sumArray;
}

function compare(a, b) {
  if (a.sum > b.sum)
    return -1;
  if (a.sum < b.sum)
    return 1;
  if (a.letter < b.letter)
    return -1;
  if (a.letter > b.letter)
    return 1;
  return 0;
}

function part1() {
  let idCounter = 0;
  PARSED_INPUT.map((inputLine) => {
    inputLine.realsum = countLetters(inputLine.name)
      .sort(compare).slice(0, 5).map((sum) => {
        return sum.letter;
      }).join('');
    return inputLine;
  }).filter((inputLine) => {
    return inputLine.checksum === inputLine.realsum;
  }).forEach((validRooms) => {
    idCounter += validRooms.id;
  });
  return idCounter;
}

function part2() {
  let result = PARSED_INPUT.map((inputLine) => {
    inputLine.crackedName = '';
    for (let i = 0; i < inputLine.originalName.length; i++) {
      let letter = inputLine.originalName[i]
      if (letter !== ' ') {
        let newCharCode = (inputLine.id % 26) + letter.charCodeAt();
        if (newCharCode > 122) {
          newCharCode -= 26;
        }
        letter = String.fromCharCode(newCharCode);
      }
      inputLine.crackedName += letter;
    }
    return inputLine;
  }).filter((inputLine) => {
    return inputLine.crackedName.search("northpole") >= 0;
  });
  return result[0].id;
}

console.log("The Answer for part 1 is: " + part1());
console.log("The Answer for part 2 is: " + part2());
