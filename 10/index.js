const File = require("fs");

function runBots(input, chips, wantedOutputs) {
  let bots = [];
  let outputs = [];
  let botCommands = [];
  let wantedChips = [];

  input.forEach((line) => {
    let commands = line.split(' ');
    if (commands[0] === 'value') {
      let botIndex = bots.findIndex((element) => {
        return element.bot === +commands[5];
      });
      if (botIndex === -1) {
        bots.push({
          bot: +commands[5],
          chips: [+commands[1]]
        });
      } else {
        bots[botIndex].chips.push(+commands[1]);
      }
    } else if (commands[0] === 'bot') {

      botCommands.push({
        bot: +commands[1],
        low: +commands[6],
        lowToOutput: commands[5] === 'output',
        high: +commands[11]
      });
    }
  });

  let foundBot = -1;
  while (foundBot < 0) {
    let currentBotIndex = bots.findIndex((bot) => {
      return bot.chips.length === 2;
    });
    if (currentBotIndex > 0) {
      let currentBot = bots[currentBotIndex];
      let lowChip = Math.min.apply(null, currentBot.chips);
      let highChip = Math.max.apply(null, currentBot.chips);

      if (chips.length && chips.indexOf(currentBot.chips[0]) > -1 &&
        chips.indexOf(currentBot.chips[1]) > -1) {
        foundBot = currentBot.bot;
      }

      let currentCommand = botCommands.find((command) => {
        return command.bot === currentBot.bot;
      });

      let highChipBot = bots.findIndex((bot) => {
        return bot.bot === currentCommand.high;
      });

      if (highChipBot > 0) {
        bots[highChipBot].chips.push(highChip);
      } else {
        bots.push({
          bot: currentCommand.high,
          chips: [highChip]
        });
      }

      if (currentCommand.lowToOutput) {
        let lowChipOutput = outputs.findIndex((bot) => {
          return bot.bot === currentCommand.low;
        });
        if (lowChipOutput > 0) {
          outputs[lowChipOutput].chips.push(lowChip);
        } else {
          outputs.push({
            bin: currentCommand.low,
            chips: [lowChip]
          });
        }

        if(
          wantedOutputs.indexOf(lowChip) > -1
        ){
          wantedChips.push(lowChip);
        }
      } else {
        let lowChipBot = bots.findIndex((bot) => {
          return bot.bot === currentCommand.low;
        });
        if (lowChipBot > 0) {
          bots[lowChipBot].chips.push(lowChip);
        } else {
          bots.push({
            bot: lowChip,
            chips: [lowChip]
          });
        }
      }
      bots[currentBotIndex].chips = [];
    }else{
      console.log("no bots have 2 chips");
      foundBot = 99999;
    }
  }

  return foundBot;
}


const data = File.readFileSync("input.txt", "utf-8").trim().split('\n');

console.log("Part 1: " + runBots(data, [61, 17], []));
console.log("Part 2: " + runBots(data, [], [0, 1, 2]));
