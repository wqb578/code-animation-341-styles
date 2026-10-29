# E3 字符画

- 分类：A–G 代码样片 · E 图形与纸
- 长什么样：画面全是字符拼成的，像老电脑屏幕。
- 适合：科技、冷、记忆碎片
- 关键词：字符画、终端、像素

## 风格提示词

用代码（Canvas 2D）画一段"字符画"的动画：画面全是字符拼成的，像老电脑屏幕。
适合讲：科技、冷、记忆碎片
关键词：字符画、终端、像素

下面是我们自己写的参考实现：一个绘制函数 S.E3(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.E3 = (c, w, h, t, s) => {
  const cs = Math.max(7, Math.round(Math.min(w, h) / 26)), cols = Math.floor(w / (cs * .62)), rows = Math.floor(h / cs), ch = ' .,:;-=+*#%@';
  c.fillStyle = '#0a0703'; c.fillRect(0, 0, w, h); c.font = `500 ${cs}px ${MONO}`; c.textBaseline = 'top';
  const lx = .5 + .3 * Math.cos(t * .7), ly = .5 + .3 * Math.sin(t * .9);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const x = i / cols, y = j / rows, ax = (x - .5) * w / h, d = Math.hypot(ax, y - .5);
    let v = .5 + .5 * Math.sin(d * 22 - t * 2.4); v *= Math.exp(-d * 1.6);
    v += .9 * Math.exp(-(((x - lx) * w / h) ** 2 + (y - ly) ** 2) / .02);
    const k = Math.min(ch.length - 1, Math.floor(clamp(v, 0, .999) * ch.length)); if (!k) continue;
    c.fillStyle = `rgba(255,179,71,${.35 + v * .65})`; c.fillText(ch[k], i * cs * .62, j * cs);
  }
};
```
