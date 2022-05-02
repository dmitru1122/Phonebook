function splitString(string, splitBy) {
  const resArr = [];

  if (string === splitBy) {
    resArr.push(string);
    return resArr;
  }
  const arr = string.split(splitBy).filter((el) => el);
  arr.forEach((i, index, arr) => {
    resArr.push(i);
    if (index < arr.length - 1) {
      resArr.push(splitBy);
    }
  });
  if (string.endsWith(splitBy)) {
    resArr.push(splitBy);
  }

  return resArr;
}

splitString("ABBCCDDEEBBAABB", "BB");
