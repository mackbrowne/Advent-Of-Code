const { readFile } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);

const buildPlanets = input => readFile(`${__dirname}/${input}`, '\n').reduce((planets, item) => {
  const [planet, orbit] = item.split(')');
  
  if(planets[planet]){
    planets[planet].moons.push(orbit);
  }else{
    planets[planet] = {
      moons: [ orbit ]
    }
  }

  if(planets[orbit]){
    planets[orbit].parent = planet;
  }else{
    planets[orbit] = {
      parent: planet,
      moons: []
    }
  }

  return planets;
}, {});


const findRoot = planets => Object.keys(planets).find(planet => !planets[planet].parent);

const countOrbits = planets => {
  const findOrbits = (planet, depth) => {
    return depth + planet.moons.reduce((total, moon) => total + findOrbits(planets[moon], depth + 1), 0);
  }
  return findOrbits(planets[findRoot(planets)], 0);;
}

const buildPath = (planets, planet) => {
  const path = [];
  let parent = planets[planet].parent;
  do {
    path.push(parent);
    parent = planets[parent].parent
  } while( parent );
  return path.reverse();
}

const findDistance = planets => {
  const youPath = buildPath(planets, 'YOU');
  const sanPath = buildPath(planets, 'SAN');
  let index = 0;
  do {
     index ++;
  }while(youPath[index] === sanPath[index]);

  return youPath.length - index + sanPath.length - index;
}
test(countOrbits(buildPlanets('test1.txt')), 42);
test(findDistance(buildPlanets('test2.txt')), 4);
endTest();

console.log(`Part 1 - ${countOrbits(buildPlanets('input.txt'))}`);

console.log(`Part 2 - ${findDistance(buildPlanets('input.txt'))}`)