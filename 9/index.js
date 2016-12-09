// let fs = require('fs');
// let parsedInput = fs.readFileSync('input.txt').toString();
//
//
// function uncompress(inputFile, part2){
//
//   let i = 0;
//   let lastMarked = 0;
//   let frontBracket = -1;
//   let backBracket = -1;
//
//   let bigSum = 0;
//
//   while(i < inputFile.length){
//     if(inputFile[i] === '('){
//       frontBracket = i;
//     }else if(inputFile[i] === ')'){
//       backBracket = i;
//     }
//     if(frontBracket > -1 && backBracket > -1){
//       let compression = inputFile.substring(frontBracket+1, backBracket).split('x');
//       let amount = parseInt(compression[0]);
//       let times = parseInt(compression[1]);
//       let uncompressed = "";
//       let multiplier = inputFile.substring(backBracket + 1, backBracket + 1 + amount);
//       for(let j=0; j<times; j++){
//         uncompressed += multiplier;
//       }
//
//       bigSum += frontBracket - lastMarked;
//       if(part2){
//         bigSum += uncompress(uncompressed, true);
//       }else{
//         bigSum += uncompressed.length;
//         lastMarked = backBracket + amount + 1;
//       }
//       i = lastMarked;
//
//       frontBracket = -1;
//       backBracket = -1;
//     }else{
//       i++;
//     }
//   }
//   bigSum += inputFile.length - 1 - lastMarked;
//
//   return bigSum;
// }
//
// console.log("Part 0 - " + parsedInput.length);
// console.log("Part 1 - " + uncompress(parsedInput, false));
// console.log("Part 2 - " + uncompress(parsedInput, true));

const File = require("fs");

function uncompress(data, recurse) {
  let decompressed_length = 0;

  while (data.length > 0) {
    if (data[0] === "(") {
      const match = /^\((\d+)x(\d+)\)(.*)$/.exec(data);

      const sublength = recurse(match[3].substr(0, +match[1]), recurse);
      decompressed_length += sublength*(+match[2]);

      data = match[3].substr(+match[1]);
    } else {
      decompressed_length += 1;
      data = data.substr(1);
    }
  }

  return decompressed_length;
}


const data = File.readFileSync("input.txt", "utf-8").trim();

console.log("Part 0:" + data.length);
console.log("Part 1: " + uncompress(data, x => x.length));
console.log("Part 2: " + uncompress(data, uncompress));
