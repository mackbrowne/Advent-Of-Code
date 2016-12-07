let fs = require('fs');

let inputFile = fs.readFileSync('input.txt').toString().split("\n");

function hasAbba(section) {
  for (let i = 0; i < section.length - 3; i++) {
    if (
      section[i] === section[i + 3] && section[i + 1] === section[i + 2] &&
      section[i] !== section[i + 2] && section[i + 1] !== section[i + 3]
    ) {
      return true;
    }
  }
  return false;
}

function getAba(section) {
  let resultList = [];
  for (let i = 0; i < section.length - 2; i++) {
    if (
      section[i] === section[i + 2] && section[i] !== section[i + 1]
    ) {
      resultList.push(section.substring(i, i + 3));
    }
  }
  return resultList;
}

function splitString(line) {
  return line.split(new RegExp('\\[|\\]', 'g'));
}

function part1() {
  return inputFile.map(splitString).map((line) => {
    let insideBracket = false;
    let outsideBracket = false;
    line.forEach((section, index) => {
      if (hasAbba(section)) {
        if (index % 2 === 0) {
          outsideBracket = true;
        } else {
          insideBracket = true;
        }
      }
    });
    return outsideBracket && !insideBracket;
  }).filter((result) => {
    return result
  }).length;
}

function part2() {
  return inputFile.map(splitString).map((line) => {
      let insideAba = [];
      let outsideAba = [];
      line.forEach((section, index) => {
        if (index % 2 === 0) {
          outsideAba = outsideAba.concat(getAba(section));
        } else {
          insideAba = insideAba.concat(getAba(section));
        }
      });

      let isSSL = false;
      insideAba.forEach((aba) => {
        let reversed = aba[1] + aba[0] + aba[1];
        if (outsideAba.indexOf(reversed) > -1) {
          isSSL = true;
        }
      });
      return isSSL;
  }).filter((result) => {
    return result
  }).length;
}

console.log('part 1: ' + part1());
console.log('part 2: ' + part2());
