const fs = require('fs');
const getInput = () => fs.readFileSync('input.txt').toString().split('');

/*** Failed Attempt ***/

const filterGarbage = (input) => {
  // remove !'s
  for(let i=0; i<input.length; i++){
    const char = input[i];
    if(char === '!'){
      input.splice(i, 2);
      i = -1;
    }
  }

  // remove <> blocks
  for(let i =0; i<input.length; i++){
    const char = input[i];
    if(char === '<'){
      for(let y = i; y < input.length; y++){
        if(input[y] === '>'){
          input.splice(i, y - i + 1);
          i = -1;
        }
      }
    }
  }

  //score
  let score = 0, openers = 0, garbage = 0;
  input.forEach(character => {
    if(character === '{'){
      openers++;
      score = score + openers;
    } else if(character === '}'){
      openers--;
    }else{
      garbage++;
    }
  });
  
  console.log(`Failed A - ${score}`);
  console.log(`Failed B - ${garbage}`);
};
filterGarbage(getInput());


// I was clearly overcomplicating this
// Found on Reddit
const input = getInput();
let garbage = false, score = 0, depth = 1, garbageCount = 0;
for (let i = 0, c = input[0]; i < input.length; i++, c = input[i]) {
  if (c == '!') i++
  else if (garbage && c != '>') garbageCount++
  else if (c == '<') garbage = true
  else if (c == '>') garbage = false
  else if (c == '{') score += depth++
  else if (c == '}') depth--
}

console.log(`Reddit A - ${score}`);
console.log(`Reddit B - ${garbageCount}`);
