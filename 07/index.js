const { parseNumbers, readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);

class LRU {
  constructor(size) {
    if(size <= 0) throw Error('size must be greater than 0');
    this.size = size;
    this.keys = [];
    this.cache = {};
  }

  read(key){
    //find the key if it exist
    const returnValue = this.cache[key];
    if(!returnValue){
      return undefined;
    }

    //update the usage cache keys
    //remove item from keys
    const [poppedValue] = this.keys.splice(this.keys.indexOf(key), 1);

    //push to the end
    this.keys.push(poppedValue);

    //return value
    return returnValue;
  }

  write(key, value){
    if(!this.read(key)){
      this.keys.push(key);
      if(this.count() > this.size) this.delete(this.keys[0])
    } 

    this.cache[key] = value;
  }

  delete(key){
    console.log('deleting ' + key)
    delete this.cache[key];
    this.keys.splice(this.keys.indexOf(key), 1);
  }

  count(){
    return this.keys.length;
  }

  clear(){
    this.cache = {};
    this.keys = [];
  }
}


const lru = new LRU(5);

lru.read('hi');
lru.write('one', 1);
lru.write('two', 2);
lru.write('three', 3);
lru.write('four', 4);
lru.write('five', 5);
lru.read('one');
lru.write('six', 6);

console.log(lru.keys);
console.log(lru.cache);

console.log(lru.read('hi'));

lru.read('another');

lru.delete('one');

console.log(lru.keys);
console.log(lru.cache);

console.log(lru.count());
console.log(lru.clear());
