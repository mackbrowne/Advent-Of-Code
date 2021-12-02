const DAYS = ['01', '02']

const runDay = day => {
    console.log(`DAY ${day}\n`);
    require(`./${day}`);
    console.log('\n');
}
DAYS.map(runDay);