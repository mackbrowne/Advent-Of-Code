const fs = require('fs');
const getInput = () => {
  return fs.readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(line => {
    const [ nameWeight, children ] = line.split('->');
    const [name, weight] = nameWeight.trim().split(' ');
    const tower = {
      name,
      weight: parseInt(weight.slice(1, -1))
    }
    if(children) tower.children = children.trim().split(', ');
    return tower;
  });
};

const buildTree = (treeList) => {
  let tree = treeList.pop();
  do {
    // find all children from treeList
    // once all the children have been recursively populated
    // find top element in treelist children's
  } while(treeList.length > 0);
}

console.log(getInput());