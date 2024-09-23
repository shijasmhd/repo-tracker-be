const pickFromObj = (obj, keys) => {
  return keys.reduce((pickedObj, key) => {
    if (obj && obj[key]) {
      pickedObj[key] = obj[key];
    }

    return pickedObj;
  }, {});
};

module.exports = pickFromObj;