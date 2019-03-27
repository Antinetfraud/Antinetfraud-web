function getParams(url, name) {
  if (url.indexOf('?') !== -1) {
    let str = url.substr(url.indexOf('?') + 1);

    let strs = str.split("&");

    let result = null
    for (var i = 0; i < strs.length; i++) {
      if (strs[i].split("=")[0] === name) {
        result = strs[i].split("=")[1];
        break;
      }
    }
    return result;
  } else {
    return null
  }
}

export { getParams }