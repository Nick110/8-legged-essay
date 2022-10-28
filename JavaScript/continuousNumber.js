// 给出以下数组，找出该数组中连续的数字，输出一个新数组
// 例: [1, 2, 3, 4, 6, 8, 9, 10] -> [ '1-4', '6', '8-10' ]
const num = [1, 2, 3, 4, 6, 8, 9, 10, 19];

function continuousNumber() {
  // 队列用来暂存数字，如果下一个还是连续的就入队列，否则清空队列，得到一段连续的数字，再将新值存入队列，以此循环。
  let queue = [num[0]];
  let result = [];
  for (let i = 1; i <= num.length; i++) {
    if ((num[i - 1] + 1 !== num[i]) || (i === num.length)) {
      let item = queue.length > 1 ? `${queue[0]}-${queue[queue.length - 1]}` : `${queue[0]}`;
      result.push(item);
      queue = [num[i]];
    } else {
      queue.push(num[i]);
    }
  }
  return result;
}

const newArr = continuousNumber(num);
console.log(newArr);
