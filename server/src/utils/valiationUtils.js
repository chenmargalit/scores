export const isStrANumber = str => {
  if (!str) {
    return { error: true, msg: 'no string provided' };
  } else {
    return !isNaN(str);
  }
};

export const verifyLength = (item, min, max) => {
  return item.length >= min && item.length <= max;
};
