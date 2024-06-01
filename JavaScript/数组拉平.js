function flat(arr, resArr) {
  if (arr.length === 1 && !Array.isArray(arr[0])) {
    return arr
  }
  // console.log(resArr);
  arr.forEach(item => {
    let newItem = item
    if (Array.isArray(item)) {
      newItem = flat(item, [])
    }
    resArr = resArr.concat(newItem)
  })
  return resArr
}

const arr = [1, [2, 3, [4, 5], [6, 7]]]

console.log(flat(arr, []))