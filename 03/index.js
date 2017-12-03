const createSpiral = (size) => {
  let x = new Array(size);
  for (let i = 0; i < size; i++) {
    x[i] = new Array(size);
  }
  return x
};

const getRawDistance = (direction) => Math.abs(direction.x || direction.y);

const changeDirection = ({x, y}) => {
  if(x){
    return {x: y, y: x}
  }else if(y){
    return {x: y * -1, y: x}
  }else{
    throw Error('shouldnt hit here');
  }
}

const findSum = (spiral, x, y) => {
  const sums = [
    spiral[x-1] && spiral[x-1][y],
    spiral[x-1] && spiral[x-1][y-1],
    spiral[x] && spiral[x][y-1],
    spiral[x+1] && spiral[x+1][y-1],
    spiral[x+1] && spiral[x+1][y],
    spiral[x+1] && spiral[x+1][y+1],
    spiral[x] && spiral[x][y+1],
    spiral[x-1] && spiral[x-1][y+1]
  ];
  
  return sums.reduce((a,b)=>{
    if(!b){
      return a;
    }else{
      return a + b;
    }
  }, 0);
}

const findPath = (position) => {
  let partADone = false;
  let partBDone = false;

  const spiralSize = (Math.ceil(Math.sqrt(position)/100)*100) + 10;
  let spiral = createSpiral(spiralSize);

  let i = 1;
  let armLength = 1;
  let direction = { x: 1, y: 0 };

  const halfSpiral = spiralSize/2;
  let pos = {x: halfSpiral, y: halfSpiral};
  spiral[pos.x][pos.y] = i;
  while(true){
    for(let j = 0; j < 2; j++){
      for(let k = 0; k < armLength; k++){
        //incrementers
        pos.x += direction.x;
        pos.y += direction.y;
        i++;
        
        const {x, y} = pos;
        const currentSum = findSum(spiral, x, y);
        spiral[x][y] = currentSum;

        //solutions
        if(i === position && !partADone){
          const partA = Math.abs(x - halfSpiral) + Math.abs(y - halfSpiral);
          console.log(`The answer for part a is - ${partA}`);
          partADone = true;
        }

        if(currentSum > position && !partBDone){
          console.log(`The answer for part b is - ${currentSum}`);
          partBDone = true;
        }

        if(partADone && partBDone) return;
      }
      direction = changeDirection(direction);
    }
    armLength++;
  }
};

findPath(347991)