const { parseNumbers, readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum, multiply } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const score = (board) =>
  sum(
    board
      .flat(2)
      .filter((letter) => letter !== "X")
      .map(Number)
  );

const checkBingo = (board) => {
  const SIZE = board.length; //5

  const isBingo = (rowCol) =>
    rowCol.filter((item) => item === "X").length === rowCol.length;

  for (let i = 0; i < SIZE; i += SIZE) {
    console.log(i);
    const row = board[i];
    const col = board.map((row) => row[i]);
    console.log(col);
    if (isBingo(row) || isBingo(col)) {
      console.log("BINGO");
      //return true;
    }
  }

  return false;
};

const part1 = (input) => {
  const [calledNumbersLine, , ...boardLines] = input;

  const calledNumbers = calledNumbersLine.split(",");

  const boards = boardLines.reduce(
    (acc, line) => {
      if (line.length > 0) {
        let lastBoard = acc.pop();
        const lineNumbers = line
          .match(/\d+ */g)
          .map((matchedLine) => matchedLine.trim());
        lastBoard.push(lineNumbers);
        acc.push(lastBoard);
      } else {
        acc.push(new Array());
      }

      return acc;
    },
    [[]]
  );

  //play bingo
  try {
    calledNumbers.forEach((pickedNumber) => {
      console.log(pickedNumber);
      // console.log(boards);
      boards.forEach((board, boardIndex) => {
        // console.log(`board ${index + 1}`);
        // console.log(board);
        board.forEach((boardLine, lineIndex) => {
          let foundIndex = boardLine.indexOf(pickedNumber);
          if (foundIndex >= 0) {
            boardLine[foundIndex] = "X";
            if (!!checkBingo(board)) {
              throw { board, lastPicked: pickedNumber };
            }
          }
        });
      });
    });
  } catch ({ board, lastPicked }) {
    return [score(board), Number(lastPicked)];
  }
};

const part2 = (input) => {};

const run = () => {
  const [boardScore, lastPicked] = part1(test1);
  test(boardScore, 188);
  test(lastPicked, 24);
  test(multiply([boardScore, lastPicked]), 4512);

  // const part2Result = part2(test1);
  // test(part2Result[0], 23);
  // test(part2Result[1], 10);
  // test(part2Result[0] * part2Result[1], 230);
  endTest();

  console.log(`Part 1 - ${multiply(part1(input))}`);
  // console.log(`Part 2 - ${multiply(part2(input))}`);
};

run();
