# E1 极简几何

- 分类：A–G 代码样片 · E 图形与纸
- 长什么样：圆、方、半圆在纯色上滚、落、长出来。
- 适合：把复杂的事讲清楚
- 关键词：几何、扁平、色块

## 风格提示词

用代码（Canvas 2D）画一段"极简几何"的动画：圆、方、半圆在纯色上滚、落、长出来。
适合讲：把复杂的事讲清楚
关键词：几何、扁平、色块

下面是我们自己写的参考实现：一个绘制函数 S.E1(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.E1 = (c, w, h, t, s) => {
  const tm = t % 6.5, m = Math.min(w, h), ly = h * .68, out = eOut(ss(4.6, 5.6, tm)) * w * 1.2;
  c.fillStyle = '#ebe5d6'; c.fillRect(0, 0, w, h);
  c.save(); c.translate(-out * 0, 0);
  c.fillStyle = '#161616'; c.fillRect(w * .06, ly, w * .88 * eOut(tm / .8), Math.max(2, m * .012));
  const cr = m * .14, cx = lerp(-cr, w * .46, eOut((tm - .4) / 1.3)) + out; c.save(); c.translate(cx, ly - cr); c.rotate((cx / cr)); c.fillStyle = '#d9432f'; c.beginPath(); c.arc(0, 0, cr, 0, TAU); c.fill(); c.fillStyle = '#ebe5d6'; c.fillRect(-cr * .08, -cr, cr * .16, cr * .5); c.restore();
  const sq = m * .2, sqx = w * .72 + out, sqy = lerp(-sq, ly - sq / 2, eBack((tm - 1.1) / .9)), rot = eBack((tm - 3) / .7) * Math.PI / 2;
  c.save(); c.translate(sqx, sqy); c.rotate(rot); c.fillStyle = '#2047c9'; c.fillRect(-sq / 2, -sq / 2, sq, sq); c.restore();
  const yr = m * .18 * eBack((tm - 2) / .8); if (yr > 0) { c.fillStyle = '#f2b630'; c.beginPath(); c.arc(w * .24 + out, ly, yr, Math.PI, TAU); c.fill(); }
  c.restore();
};
```
