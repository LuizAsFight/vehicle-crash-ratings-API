function pickFields(data, schema) {
  return Object
    .keys(schema)
    .reduce((reducer, key, i) => {
      reducer[key] = data[key];
      return reducer;
    }, {});
}

module.exports = pickFields