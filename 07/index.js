const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const parsedRequirements = (file) =>
  parseInput(file).reduce((root, instruction) => {
    const [rawOuter, rawInner] = instruction.split(" contain ");

    const BAG_MATCHER = /(\d+)?[\s]?(\w* \w*) bag[s]?[.|,]?/;
    const [, , outer] = rawOuter.match(BAG_MATCHER);
    if (rawInner === "no other bags.") {
      return { ...root, [outer]: 0 };
    } else {
      const inner = rawInner.split(", ").reduce((base, inner) => {
        const [, amount, color] = inner.match(BAG_MATCHER);
        return {
          ...base,
          [color]: Number(amount),
        };
      }, {});

      return {
        ...root,
        [outer]: inner,
      };
    }
  }, {});

const findDesired = (requirements, desired) => {
  const recursive = (current) =>
    Object.keys(requirements[current]).some((currentInner) => {
      if (requirements[currentInner] === 0) return false;
      if (currentInner === desired) return true;

      return recursive(currentInner);
    });

  return Object.keys(requirements).reduce(
    (prev, current) => (recursive(current) ? prev + 1 : prev),
    0
  );
};

const countDesired = (requirements, desired) => {
  const recursive = (current) => {
    const innerBags = requirements[current]

    if (innerBags === 0) return 1;

    return 1 + Object.keys(innerBags).reduce(
      (prev, bag) => prev + innerBags[bag] * recursive(bag),
      0
    );
  };

  return recursive(desired) - 1;
};

test(findDesired(parsedRequirements("test.txt"), "shiny gold"), 4);
test(countDesired(parsedRequirements("test.txt"), "shiny gold"), 32);
test(countDesired(parsedRequirements("test2.txt"), "shiny gold"), 126);
endTest();

console.log(
  `Part 1 - ${findDesired(parsedRequirements("input.txt"), "shiny gold")}`
);
console.log(`Part 2 - ${countDesired(parsedRequirements("input.txt"), "shiny gold")}`);
