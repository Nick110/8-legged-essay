// 解决循环引用的递归
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    // 额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
};

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  field5: function(a) {
    return a;
  },
  field6: Symbol(1),
};
target.target = target;

let result = deepClone(target);
console.log('result', result);
/*
{
  field1: 1,
  field2: undefined,
  field3: { child: 'child' },
  field4: [ 2, 4, 8 ],
  target: [Circular]
}
*/