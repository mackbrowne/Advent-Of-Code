let fs = require('fs');
let inputFile = fs.readFileSync('input.txt').toString().split("\n");

let screenObj = [
  Array(50).fill('.'), Array(50).fill('.'), Array(50).fill('.'),
  Array(50).fill('.'), Array(50).fill('.'), Array(50).fill('.')
]


function printScreen(screen) {
  for (let i = 0; i < screen.length; i++) {
    printScreenLine(screen[i]);
  }
  clearScreen();
}

function printScreenLine(screenLine) {
  console.log(screenLine.join(''));
}

function clearScreen() {
  var lines = process.stdout.getWindowSize()[1];
  for (var i = 0; i < 1; i++) {
    console.log('\r\n');
  }
}

function sleep(time, callback) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {;
  }
  callback();
}

function createRect(screen, rectSize) {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      if (i < parseInt(rectSize[1]) && j < parseInt(rectSize[0])) {
        screen[i][j] = '#';
      }
    }
  }
  return screen;
}

function lineShift(screenLine, delta) {
  for(let i=0; i<delta; i++){
    screenLine.unshift(screenLine.pop())
  }
  return screenLine
}

function shiftXY(screen, xy, coord, delta) {
  if (xy === 'y') {
   screen[coord] = lineShift(screen[coord], delta);
  } else {
    let newScreenLine = screen.map((screenLine)=>{
      return screenLine[coord];
    });
    newScreenLine = lineShift(newScreenLine, delta);
    screen.forEach((screenLine, index)=>{
      screenLine[coord] = newScreenLine[index];
    });
  }
  return screen;
}

function run(input, screen) {
  input.filter((line) => {
    return line.length > 0;
  }).map((line) => {
    let splitLine = line.split(' ');

    switch (splitLine[0]) {
      case 'rect':
        let rectSize = splitLine[1].split('x');
        //console.log('rect - ' + rectSize);
        screen = createRect(screen, rectSize);
        break;
      case 'rotate':
        let coordString = splitLine[2].split('=');
        screen = shiftXY(screen, coordString[0], parseInt(coordString[1]), parseInt(splitLine[4]));
        break;
    }

    return screen
  });

  let litChars = screen.map((screenLine)=>{
    return screenLine.filter((screenChar)=>{
      return screenChar === '#';
    }).join('')
  }).join('').length;

  console.log('part 1: ' + litChars);
  console.log('part 2: ');
  printScreen(screen);
}

run(inputFile, screenObj);
