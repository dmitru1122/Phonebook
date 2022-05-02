function splitString(string, splitBy) {
  const resArr = [];
  let seachFrom = 0;

  function serchFrom(str, indexFrom) {
    console.log(indexFrom);
    let index = string.indexOf(splitBy, indexFrom);
    console.log(index);
    if (index != -1) {
      resArr.push(str.substring(indexFrom, index));
      serchFrom(str, index + 1);
    }
  }
  serchFrom(string, seachFrom);
  return resArr;
}

splitString("ABBCCDDEEBBAABB", "BB");

function splitStringBy(string, splitBy) {
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
  return resArr;
}

splitStringBy("ABBCCDDEEBBAABB", "BB");
