const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const findCoord = (directions, LOWER, HIGHER, MAX) => {
  let min = 0,
    max = MAX - 1;
  directions.split("").map((direction, i) => {
    const distance = MAX / Math.pow(2, i + 1);
    if (direction === LOWER) max -= distance;
    else if (direction === HIGHER) min += distance;
    else throw Error("Unknown Symbol");
  });

  if (max === min) {
    return max;
  }
  throw Error(`${max} !== ${min} coordinate`);
};

const findSeat = (DIRECTIONS, ROWS, COLUMNS) => {
  const [, VERTICAL, HORIZONTAL] = DIRECTIONS.match(/([F|B]*)([L|R]*)/);
  const row = findCoord(VERTICAL, "F", "B", ROWS);
  const column = findCoord(HORIZONTAL, "L", "R", COLUMNS);

  const seatID = row * COLUMNS + column;
  return seatID;
};

const PLANE_ROWS = 128;
const PLANE_COLS = 8;
test(findSeat("FBFBBFFRLR", PLANE_ROWS, PLANE_COLS), 357);
test(findSeat("BFFFBBFRRR", PLANE_ROWS, PLANE_COLS), 567);
test(findSeat("FFFBBBFRRR", PLANE_ROWS, PLANE_COLS), 119);
test(findSeat("BBFFBBFRLL", PLANE_ROWS, PLANE_COLS), 820);

endTest();

const getSeats = (file) =>
  parseInput(file).map((directions) =>
    findSeat(directions, PLANE_ROWS, PLANE_COLS)
  );

//Part 1
const ALL_BOOKINGS = getSeats('input.txt');
console.log(`Part 1 - ${Math.max(...ALL_BOOKINGS)}`);

const findMissing = (seats) => {
  const MAX = Math.max(...seats);
  const MIN = Math.min(...seats);

  for(let i = MIN; i <= MAX; i++){
    if(!seats.includes(i)) return i;
  }
}
console.log(`Part 2 - ${findMissing(ALL_BOOKINGS)}`);
