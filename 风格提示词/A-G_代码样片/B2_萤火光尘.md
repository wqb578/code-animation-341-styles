# B2 萤火光尘

- 分类：A–G 代码样片 · B 粒子
- 长什么样：暖色光点慢慢往上飘，有远有近。
- 适合：温暖、回忆、找回光
- 关键词：萤火、光尘、暖

## 风格提示词

用代码（Canvas 2D）画一段"萤火光尘"的动画：暖色光点慢慢往上飘，有远有近。
适合讲：温暖、回忆、找回光
关键词：萤火、光尘、暖

下面是我们自己写的参考实现：一个绘制函数 S.B2(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.B2 = (c, w, h, t, s) => {
  if (!s.init) { s.init = 1; const r = rng(7); s.p = []; for (let i = 0; i < 70; i++) s.p.push({ x: r() * w, y: r() * h, z: r(), ph: r() * TAU, f: .5 + r() * 1.5 }); }
  const g = c.createRadialGradient(w * .5, h * .7, 0, w * .5, h * .7, Math.hypot(w, h) * .7); g.addColorStop(0, '#231409'); g.addColorStop(1, '#060403'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.globalCompositeOperation = 'lighter'; const m = Math.min(w, h) / 300;
  for (const p of s.p) {
    const z = p.z, size = (1.2 + z * z * 24) * m, vy = (5 + z * 16) * m;
    const y = ((p.y - t * vy) % (h + 60) + h + 60) % (h + 60) - 30, x = p.x + Math.sin(t * .4 * p.f + p.ph) * 18 * m;
    const fl = .55 + .45 * Math.sin(t * p.f * 2.2 + p.ph), a = (z > .8 ? .13 : .55) * fl;
    glowDot(c, x, y, size * (z > .8 ? 1.6 : 1), z > .5 ? '#ffb664' : '#ffd79a', a);
    if (z < .8) { c.fillStyle = `rgba(255,236,200,${.8 * fl})`; c.beginPath(); c.arc(x, y, Math.max(.6, size * .12), 0, TAU); c.fill(); }
  }
  c.globalCompositeOperation = 'source-over';
};
```
