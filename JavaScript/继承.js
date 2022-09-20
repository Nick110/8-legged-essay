// 组合式继承

// 定义 Person 构造函数
function Person(name) {
  this.name = name
  this.letters = ['a', 'b', 'c']
}

// 在 Person 的原型上添加 sayName 方法
Person.prototype.sayName = function() {
  console.log(this.name + ' 你好~')
}

// 定义 Student 构造函数
function Student(name, age) {
  // 继承属性
  Person.call(this, name)
  this.age = age
}

// 继承方法
Student.prototype = new Person()

// 在 Student 的原型上添加 sayAge 方法
Student.prototype.sayAge = function() {
  console.log(this.age)
}

let stu1 = new Student('CoderBin', 18)
let stu2 = new Student('Bin', 23)

stu1.letters.push('d')

// 输出 stu1 的信息
// console.log(stu1.letters)   // [ 'a', 'b', 'c', 'd' ]
// stu1.sayName()               // CoderBin 你好~
// stu1.sayAge()                 // 18

// 输出 stu2 的信息
console.log(Student.prototype.__proto__)   // [ 'a', 'b', 'c']
stu2.sayName()               // Bin 你好~
// stu2.sayAge()                 // 23