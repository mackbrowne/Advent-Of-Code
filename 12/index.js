#!/usr/bin/env node

const InputList = require("./input-list");

function startAssembunny(input, ram, part) {
  let i = 0;

  while(i<input.length){
    let line = input[i].split(' ');

    switch(line[0]){
      case 'cpy':
        if(+line[1]){
          ram[line[2]] = +line[1];
        }else{
          ram[line[2]] = ram[line[1]];
        }
        i++;
      break;
      case 'inc':
        ram[line[1]]++;
        i++;
      break;
      case 'dec':
        ram[line[1]]--;
        i++;
      break;
      case 'jnz':
        if((+line[1] && +line[1] > 0) || ram[line[1]] > 0){
          i = i + +line[2];
        }else{
          i++;
        }
      break;
    }
  }
  console.log('part ' + part + ': ' + ram.a);
  return ram;
}

const Input = new InputList('input.txt');
Input.on("loaded", () => startAssembunny(Input.inputList,{
  a: 0,
  b: 0,
  c: 0,
  d: 0
}, 'a'));

Input.on("loaded", () => startAssembunny(Input.inputList,{
  a: 0,
  b: 0,
  c: 1,
  d: 0
}, 'b'));
