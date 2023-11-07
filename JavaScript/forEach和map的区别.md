# forEach和map的区别

1. map有返回值而且必须return返回一个数组才行 ; 而forEach没有返回值可直接打印结果；
即：forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回；

2. map因为返回数组所以可以链式操作，forEach不能；

3. map里可以用return ,而forEach里用return不起作用，forEach不能用break，会直接报错；

4. 总的来说 map 的速度大于forEach；
