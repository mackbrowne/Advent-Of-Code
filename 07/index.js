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
  
  const findAndPopulate = treeName => {
    const listIndex = treeList.findIndex(listItem => listItem.name === treeName);
    const tree = treeList.splice(listIndex, 1).pop();
    if(tree.children){
      tree.children = tree.children.map( child => {
        //find child in treeList
        if(typeof child === 'string'){
          child = findAndPopulate(child);
        }
        return child;
      });
    }
    return tree;
  };

  const findParent = treeName => {
    const parentIndex = treeList.findIndex(listItem => {
      let foundParent = false;
      if(listItem.children) listItem.children.forEach(child => {
        if(treeName === child){
          foundParent = true;
        }
      });
      return foundParent;
    });

    return findAndPopulate(treeList[parentIndex].name);
  };

  let builtTree = findAndPopulate(treeList[0].name);
  while(treeList.length > 0){
    treeList.push(builtTree);
    builtTree = findParent(builtTree.name);
  }
  return builtTree;
}

console.log(buildTree(getInput()))
