# BFC

## 什么是BFC
`BFC：（Block Formatting Context）`

> 官方解释：块级格式化上下文 或 块级格式区域 ，块级格式区域包含创建它的元素内部的所有内容，但不包含创建新块级格式区域的子元素内部的所有内容

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

BFC布局规则：
1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3. 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算。


## 怎么生成一个BFC区域
`OFDP`

1. 根元素 `html`,或包含body的元素
2. 设置 `overflow`，且值不为visible (为 auto、scroll、hidden)
3. 设置浮动 `float`，且值不为none（为 left、right），
4. 设置 `display` 为这些值 inline-block、flex、grid、table、table-cell、table-caption
5. 设置定位 `position`, 不为static或relative（为 absolute 、 fixed）


## BFC有哪些特性

1. 属于同一个BFC的两个相邻容器的上下margin可能会重叠
2. 计算BFC高度时浮动元素也会被计算
3. BFC的区域不会与浮动容器发生重叠
4. 所有属于BFC中的盒子默认左对齐，并且它们的左边距可以触及到容器的左边线。最后一个盒子，尽管是浮动的，但依然遵循这个原则
5. BFC是独立容器，容器内部元素不会影响容器外部元素


## 利用BFC可以解决一些问题

### 1. 解决两个div上下margin重叠问题
```css
// html
<div class="box1">元素1</div>
<div class="box2">元素2</div>

// css
.box1{
  width: 50px;
  height: 50px;
  background: wheat;
  margin-bottom: 10px;
}
.box2{
  width: 50px;
  height: 50px;
  background: turquoise;
  margin-top: 10px;
}
```
![外边距重叠](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf4d2fa0f0c2463898c04329a5c53e0b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

将其中一个div独立为一个BFC即可解决：
```css
.box1{
  width: 50px;
  height: 50px;
  background: wheat;
  margin-bottom: 10px;
  display: inline-block;
}
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b01ec748ee374ee5b250984e206571d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

### 2. 解决父元素高度塌陷问题

子级元素浮动时，父元素没设高度会引起内部高度为0

```css
// html
<div class="boxF">
  <div class="boxC">子元素</div>
</div>

// css
.boxF{
  border: 1px solid red;
}
.boxC{
  width: 100px;
  height: 100px;
  background:turquoise;
  float: left;
}
```

![父元素高度塌陷](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01937fa74e2f489dae33926a48b4f8d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

解决方案：根据`计算BFC高度时浮动元素也会被计算`的特性，给父级div设置为一个独立BFC，则内部的float的高度也会参与计算
```css
.boxF{
  border: 1px solid red;
  overflow: hidden;
}
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8e1eae64770487d9d7e0f8e7ec21f37~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

### 3. 让浮动元素不重叠

```css
// html
<div class="box1">元素1</div>
<div class="box2">元素2</div>

// css
.box1{
  width: 50px;
  height: 50px;
  background:wheat;
  float: left; // 浮动
}
.box2{
  width: 200px;
  height: 200px;
  background: turquoise;
}
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cc8901e94a5401089fb44a492b10712~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

根据BFC的布局规则4：BFC的区域不会与float box重叠，让box2单独成为一个BFC。box2就会自适应宽度，这时候就形成了一个两栏自适应的布局。

```css
.box2{
  width: 200px;
  height: 200px;
  background: turquoise;
  overflow: hidden;
}
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b9b9411bf4347849f22f3e9b6ea8646~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

## 总结

> 以上例子都体现了：BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。因为BFC内部的元素和外部的元素绝对不会互相影响，因此，当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。

[什么是BFC？看这一篇就够了](https://blog.csdn.net/sinat_36422236/article/details/88763187?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166442153016800186589917%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166442153016800186589917&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-88763187-null-null.142^v50^pc_rank_34_2,201^v3^control_2&utm_term=bfc&spm=1018.2226.3001.4187)
