var fs = require('fs');
var parse = require('csv-parse');

let position = {x: 0, y:0};
let rawPositions = [];
let crossedPoints = [];

var parser = parse({delimiter: ', '}, function(err, data){
  let inputData = data[0].forEach((item)=>{
      addToDistance(calcDir(item.charAt(0)), parseInt(item.substring(1)) );
  });
  console.log("Answer 1a - Santa is: " + ( Math.abs(position.x) + Math.abs(position.y) ) + " blocks away.");
  console.log("Answer 1b - Santa first re-visits twice point: " + ( Math.abs(crossedPoints[0].x) + Math.abs(crossedPoints[0].y) ) + " blocks away.");
});

function addToDistance(direction, distance){
  switch(direction){
    case "N":
      for(var x=0; x<distance; x++){
        position.y++;
        checkForCrossed();
      }
      break;
    case "E":
      for(var x=0; x<distance; x++){
        position.x++;
        checkForCrossed();
      }
      break;
    case "S":
      for(var x=0; x<distance; x++){
        position.y--;
        checkForCrossed();
      }
      break;
    case "W":
      for(var x=0; x<distance; x++){
        position.x--;
        checkForCrossed();
      }
      break;
  }
}

function checkForCrossed(){
  rawPositions.forEach((pastPosition)=>{
    if(pastPosition.x === position.x && pastPosition.y === position.y){
      crossedPoints.push({x: position.x, y: position.y});
    }
  });
  rawPositions.push({x: position.x, y: position.y})
}

let lastDir = 'N';
function calcDir(leftRight){
  switch(lastDir) {
    case "N":
      lastDir = determineLR(leftRight, "W","E");
      break;
    case "E":
      lastDir = determineLR(leftRight, "N","S");
      break;
    case "S":
      lastDir = determineLR(leftRight, "E","W");
      break;
    case "W":
      lastDir = determineLR(leftRight, "S","N");
      break;
  }
  return lastDir;
}

function determineLR(dir, leftDir, rightDir){
  if(dir === "L"){
    return leftDir;
  }else if(dir === "R"){
    return rightDir;
  }else{
    throw {msg: "PARSE ERROR"};
  }
}

fs.createReadStream(__dirname+'/input.csv').pipe(parser);
