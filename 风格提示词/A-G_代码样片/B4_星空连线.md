# B4 星空连线

- 分类：A–G 代码样片 · B 粒子
- 长什么样：点和点连成网，中间那颗暖的是你。
- 适合：人和人的关系、联结、孤独
- 关键词：星座、连线、网

## 风格提示词

用代码（Canvas 2D）画一段"星空连线"的动画：点和点连成网，中间那颗暖的是你。
适合讲：人和人的关系、联结、孤独
关键词：星座、连线、网

下面是我们自己写的参考实现：一个绘制函数 S.B4(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.B4 = (c, w, h, t, s) => {
  if (!s.init) { s.init = 1; const r = rng(13); s.n = []; for (let i = 0; i < 60; i++) s.n.push([r() * w, r() * h, (r() - .5) * 12, (r() - .5) * 12]); }
  const dt = clamp(t - (s.lt ?? t), 0, .05); s.lt = t;
  c.fillStyle = vgrad(c, h, '#070b18', '#03040a'); c.fillRect(0, 0, w, h);
  const D = Math.min(w, h) * .24, me = [w * .5 + Math.sin(t * .3) * w * .08, h * .5 + Math.cos(t * .23) * h * .08];
  for (const p of s.n) { p[0] += p[2] * dt; p[1] += p[3] * dt; if (p[0] < 0 || p[0] > w) p[2] *= -1; if (p[1] < 0 || p[1] > h) p[3] *= -1; }
  c.lineWidth = .7;
  for (let i = 0; i < s.n.length; i++) for (let j = i + 1; j < s.n.length; j++) {
    const a = s.n[i], b = s.n[j], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (d < D) { c.strokeStyle = `rgba(150,175,230,${(1 - d / D) * .45})`; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
  }
  for (const p of s.n) { const d = Math.hypot(p[0] - me[0], p[1] - me[1]); if (d < D * 1.3) { c.strokeStyle = `rgba(241,178,92,${(1 - d / (D * 1.3)) * (.35 + .3 * Math.sin(t * 3 + p[0]))})`; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(me[0], me[1]); c.stroke(); } }
  c.fillStyle = '#dfe6ff'; for (const p of s.n) { c.beginPath(); c.arc(p[0], p[1], 1.4, 0, TAU); c.fill(); }
  glowDot(c, me[0], me[1], 16, '#f1b25c', .7); c.fillStyle = '#fff1d8'; c.beginPath(); c.arc(me[0], me[1], 2.6, 0, TAU); c.fill();
};
```
