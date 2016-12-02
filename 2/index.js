let fs = require('fs');
let array = fs.readFileSync('input.txt').toString().split("\n");

let pad = [ [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9] ];

let currentLoc = { x: 1, y: 1 };

let code = [];

array.forEach((inputLine)=>{
  if(inputLine.length > 0){
    inputLine.split('').forEach((inputChar)=>{
      switch(inputChar){
        case "D":
          if(currentLoc.y < 2){
            currentLoc.y++;
          }
        break;
        case "U":
          if(currentLoc.y > 0){
            currentLoc.y--;
          }
        break;
        case "L":
          if(currentLoc.x > 0){
            currentLoc.x--;
          }
        break;
        case "R":
          if(currentLoc.x < 2){
            currentLoc.x++;
          }
        break;
      }
    });  
    code.push( pad[currentLoc.y][currentLoc.x] );
  }
});

console.log('the code is - ' + code);
