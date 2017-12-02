const fs = require('fs');
const inputFile = fs.readFileSync('input.txt').toString();

const findDoubles = (input, nextDigit) => {
    let sum = 0;
    for(let i = 0; i<input.length; i++){
        const a = input[i];
        let b;

        if(i < input.length - nextDigit){
            b = input[i + nextDigit];
        }else{
            b = input[i + nextDigit - input.length];
        }

        if(a === b){
            sum += parseInt(a);
        }
    }
    return sum;
};

console.log(`A - ${findDoubles(inputFile, 1)}`);
console.log(`B - ${findDoubles(inputFile, inputFile.length / 2)}`);