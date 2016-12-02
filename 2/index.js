let fs = require('fs');
let inputFile = fs.readFileSync('input.txt').toString().split("\n");

let pad1 = [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]];

let pad2 = [[ 'x', 'x', '1', 'x', 'x' ],
            [ 'x', '2', '3', '4', 'x' ],
            [ '5', '6', '7', '8', '9' ],
            [ 'x', 'A', 'B', 'C', 'x' ],
            [ 'x', 'x', 'D', 'x', 'x' ]];

function generateCode(pad){
  let currentLoc = { x: 1, y: 1 };
  let code = [];

  let xMax = pad[0].length - 1;
  let yMax = pad.length - 1;

  inputFile.forEach((inputLine)=>{
    if(inputLine.length > 0){
      inputLine.split('').forEach((inputChar)=>{
        switch(inputChar){
          case "D":
            if(currentLoc.y < yMax && pad[currentLoc.y + 1][currentLoc.x] !== 'x'){
              currentLoc.y++;
            }
          break;
          case "U":
            if(currentLoc.y > 0 && pad[currentLoc.y - 1][currentLoc.x] !== 'x'){
              currentLoc.y--;
            }
          break;
          case "L":
            if(currentLoc.x > 0 && pad[currentLoc.y][currentLoc.x - 1] !== 'x'){
              currentLoc.x--;
            }
          break;
          case "R":
            if(currentLoc.x < xMax && pad[currentLoc.y][currentLoc.x + 1] !== 'x'){
              currentLoc.x++;
            }
          break;
        }
      });
      code.push( pad[currentLoc.y][currentLoc.x] );
    }
  });
  return code;
}

console.log('The code for part1 is - ' + generateCode(pad1));
console.log('The code for part2 is - ' + generateCode(pad2));
