module.exports = {
    sum: (array, start = 0) => array.reduce((total, item) => total + item, start),
    multiply: (array, start = 1) => array.reduce((total, item) => total * item, start)
}