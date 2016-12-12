#!/usr/bin/env node

const InputList = require("./input-list");

class Floor {
  contructor() {
    this.microchips = [];
    this.generators = [];
  }
  findLone(array1, array2) {
    return array1.filter(function(n) {
      return array2.indexOf(n) === -1;
    });
  }
  safetyCheck(elevator) {
    let generators = this.generators;
    let microchips = this.microchips;
    if (elevator.floor === index) {
      generators = generators.concat(elevator.generators);
      microchips = microchips.concat(elevator.microchips);
    }
    if (generators.length & this.findLone(microchips, generators).length) {
      console.log('bad combo');
      safe = false;
    }
  }
  print() {
    console.log(`microchips: ${this.microchips}, generators: ${this.generators}`);
  }
}

class Elevator {
  constructor() {
    this.floor = 0;
    this.microchips = [];
    this.generators = [];
  }
  up() {
    if (this.elevator.floor < this.floors.length - 1) {
      this.elevator.floor++;
      return true;
    } else {
      console.log(`elevator cant go up on floor ${this.elevator.floor}`)
      return false;
    }
  }
  down() {
    if (this.elevator.floor > 0) {
      this.elevator.floor--;
      return true;
    } else {
      console.log(`elevator cant go down on floor ${this.elevator.floor}`);
      return false;
    }
  }
  print() {
    console.log(`elevator floor: ${this.floor}, microchips: ${this.microchips}, generators: ${this.generators}`)
  }
}


class Warehouse {
  constructor() {
    this.floors = [];
    this.elevator = null;
  }
  print() {
    for (let i = this.floors.length - 1; i >= 0; i--) {
      this.floors[i].print();
    }
    this.elevator.print();
  }
  safetyCheck() {
    let safe = true;
    this.floors.forEach((floor, index) => {
      if(!floor.safetyCheck()){
        safe = false;
      }
    });
    return safe;
  }
}

function startFactory(input) {
  let floors = [];

  input.forEach((line, index) => {
    let microchips = line.match(/([a-z]+)-compatible microchip/g) || [];
    microchips = microchips.map((result) => {
      return result.split('-')[0]
    });

    let generators = line.match(/([a-z]+) generator/g) || [];
    generators = generators.map((result) => {
      return result.split(' ')[0]
    });

    const newFloor = new Floor();
    newFloor.microchips = microchips;
    newFloor.generators = generators;
    floors.push(newFloor);
  });

  const elevator = new Elevator();
  const warehouse = new Warehouse();
  warehouse.elevator = elevator;
  warehouse.floors = floors;

  warehouse.print();
}

const Input = new InputList('input.txt');
Input.on("loaded", () => startFactory(Input.inputList));
