const obj = {
  a: 1,
  b: 2,
}

// Object.getOwnPropertyDescriptors（）获取某个对象的属性描述符
const descriptors = Object.getOwnPropertyDescriptors(obj)
/* 
  {
    a: { value: 1, writable: true, enumerable: true, configurable: true },
    b: { value: 2, writable: true, enumerable: true, configurable: true }
  }
*/
console.log(descriptors);

Object.defineProperty(obj, 'a', {
  value: 3,
  writable: false, // 不可更改
  enumerable: false, // 不可遍历
  configurable: false, // 不可再对这些属性描述符做更改
})

obj.a = 2
console.log(obj.a); // 3
console.log(obj); // { b: 2 }
console.log(Object.keys(obj)); // [ 'b' ]
for (var key in obj) {
  console.log(key);
} // b

Object.defineProperty(obj, 'a', {
  writable: true,
}) // 会报错： TypeError: Cannot redefine property: a， 因为configurable已经在上一步被设置为false