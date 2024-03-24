const states = {
  PENDING: 'pending',
  FULLFILLED: 'fullfilled',
  REJECTED: 'rejected',
}

class MyPromise {
  // 私有属性
  #state = states.PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(states.FULLFILLED, data)
    }
    const reject = (reason) => {
      this.#changeState(states.REJECTED, reason)
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  #run() {
    if (this.#state === states.PENDING) return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()
      if (this.#state === states.FULLFILLED) {
        if (typeof onFulfilled === 'function') {
          onFulfilled(this.#result)
        }
      }
      else {
        if (typeof onRejected === 'function') {
          onRejected(this.#result)
        }
      }
    }
  }

  #changeState = (state, result) => {
    if (this.#state !== states.PENDING) return
    this.#state = state
    this.#result = result
    console.log(this.#state, this.#result);
    this.#run()
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({onFulfilled, onRejected, resolve, reject});
      this.#run();
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(3421)
})

p.then(res => {
  console.log('成功', res);
}, reason => {
  console.log('失败', reason);
}).then(() => {
  console.log('成功', res);
}).then(() => {
  console.log('成功', res);
})

// export default MyPromise

