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

  for (let i = 0; i < SIZE; i++) {
    const row = board[i];
    const col = board.map((row) => row[i]);

    if (isBingo(row) | isBingo(col)) {
      return true;
    }
  }

  return false;
};

const buildCalledNumbers = (calledNumbersLine) => calledNumbersLine.split(",");

const buildBoards = (boardLines) =>
  boardLines.reduce(
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

const playBingo = (input, bingoCallback) => {
  const [calledNumbersLine, , ...boardLines] = input;

  const calledNumbers = buildCalledNumbers(calledNumbersLine);

  const boards = buildBoards(boardLines);

  try {
    calledNumbers.forEach((pickedNumber) => {
      boards.forEach((board) => {
        board.forEach((boardLine) => {
          let foundIndex = boardLine.indexOf(pickedNumber);
          if (foundIndex >= 0) {
            boardLine[foundIndex] = "X";
            if (!!checkBingo(board)) bingoCallback(board, pickedNumber, boards);
          }
        });
      });
    });
  } catch ({ board, lastPicked }) {
    return [score(board), Number(lastPicked)];
  }
};

const part1 = (input) =>
  playBingo(input, (board, lastPicked) => {
    throw { board, lastPicked };
  });

const part2 = (input) => {
  const done = [];
  return playBingo(input, (board, lastPicked, boards) => {
    if (done.indexOf(board) < 0) done.push(board);
    if (done.length === boards.length) throw { board, lastPicked };
  });
};

const run = () => {
  const [boardScore, lastPicked] = part1(test1);
  test(boardScore, 188);
  test(lastPicked, 24);
  test(multiply([boardScore, lastPicked]), 4512);

  const [p2score, p2LastPicked] = part2(test1);
  test(p2score, 148);
  test(p2LastPicked, 13);
  test(multiply([p2score, p2LastPicked]), 1924);
  endTest();

  console.log(`Part 1 - ${multiply(part1(input))}`);
  console.log(`Part 2 - ${multiply(part2(input))}`);
};

run();
