## Promise.all
Promise.all 方法接受一个 promise 数组，并返回一个新的 promise，当所有 promise 被 resolved 时，该 promise 会 resolved；当其中一个 promise 被 rejected 时，promise.all 方法会被 rejected。

## Promise.race
Promise.race 方法接受一个 promise 数组并返回一个新的 Promise，如果`<font color="red">任何一个 promise 被 resolved 或 rejected，它都会 resolved 或 rejected。` 

## Promise.any
Promise.any 方法接受一个 Promise 数组并返回一个 Promise，当 Promise 数组中的`任何一个 Promise resolved`，则它也 resolved。 如果`所有的 Promise 都 rejected`，则它也rejected。

## Promise.allSettled
Promise.allSettled 方法接受一个 Promise 数组，并返回一个新的 Promise，该 Promise 在所有给定的 Promise `都已 resolved 或被 rejected` 后进行解析，解析的结果为一个status 字段和一个 value 或者 reason 字段的数组。（resolved 是 value，rejected 是 reason）。