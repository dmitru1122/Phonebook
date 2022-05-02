function splitString(string, splitBy) {
  const resArr = [];
  let seachFrom = 0;

  function serchFrom(str, indexFrom) {
    let index = string.indexOf(splitBy, indexFrom);
    if (index != -1) {
      const substringStr = str.substring(indexFrom, index);
      if (substringStr != "") {
        resArr.push(substringStr);
      }

      resArr.push(splitBy);
      serchFrom(str, index + splitBy.length);
      return;
    }
    if (str.length > index) {
      const substringStr = str.substring(indexFrom);
      if (substringStr != "") {
        resArr.push(substringStr);
      }
    }
  }
  serchFrom(string, seachFrom);
  return resArr;
}

splitString("ABBCCDDEEBBAABB", "BB");
