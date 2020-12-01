module.exports = {
  findCombos: (items, size, condition) => {
    const recursive = (recursiveItems, callback, combo) => {
      if (combo.length >= size) {
        condition(combo) ? callback(combo) : false;
      } else {
        recursiveItems.forEach((number, index) => {
          recursive(
            recursiveItems.slice(index + 1, recursiveItems.length),
            callback,
            [...combo, number]
          );
        });
      }
    };

    return new Promise((resolve, reject) => {
      recursive(items, resolve, []);
      reject();
    });
  },
};
