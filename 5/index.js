let md5 = require('md5');

let INPUT_CODE = 'ffykfhsq';

function part1() {
  console.log('Part 1');
  let counter = 0;
  let passwordHashes = [];
  while (passwordHashes.length < 8) {
    let md5Code = md5(INPUT_CODE + counter);
    if (md5Code.substring(0, 5) === '00000') {
      console.log('Found password letter: ' + md5Code[5]);
      passwordHashes.push(md5Code[5]);
    }
    counter++;
  }
  console.log('Counter ran to: ' + counter);
  console.log('the answer to part 1 is: ' + passwordHashes.join(''));
  return passwordHashes.join('');
}

function part2() {
  console.log('Part 2');
  let counter = 0;
  let finalPassword = ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'];
  while (finalPassword.indexOf('x') > -1) {
    let md5Code = md5(INPUT_CODE + counter);
    if (md5Code.substring(0, 5) === '00000') {
      let index = parseInt(md5Code[5]);
      if (index < 8 && finalPassword[index] === 'x') {
        console.log('Found code for index: ' + index + ', ' + md5Code[6]);
        finalPassword[index] = md5Code[6];
      }
    }
    counter++;
  }
  console.log('Counter ran to: ' + counter);
  console.log('the answer to part 2 is: ' + finalPassword.join(''));
  return finalPassword.join('');
}

part1();
part2();
