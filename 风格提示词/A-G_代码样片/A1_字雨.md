# A1 字雨

- 分类：A–G 代码样片 · A 字
- 长什么样：话像雨一样落下来，越积越多。
- 适合：被说教、重复的话、压力
- 关键词：字雨、落下、堆积

## 风格提示词

用代码（Canvas 2D）画一段"字雨"的动画：话像雨一样落下来，越积越多。
适合讲：被说教、重复的话、压力
关键词：字雨、落下、堆积

下面是我们自己写的参考实现：一个绘制函数 S.A1(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.A1 = (c, w, h, t, s) => {
  if (!s.init) { s.init = 1; s.r = rng(3); s.drops = []; s.pile = []; for (let i = 0; i < 26; i++) s.drops.push(spawn(true)); }
  function spawn(first) { const r = s.r, base = Math.min(w, h) / 17, k = [0.55, 0.7, 0.9, 1.2, 1.7][Math.floor(r() * 5)]; return { txt: PARENT[Math.floor(r() * PARENT.length)], size: base * k, x: r() * w * 0.92 - w * 0.04, y: first ? -r() * h * 1.2 : -base * 2, v: (h / 300) * (36 + base * k * 3.2) }; }
  const dt = clamp(t - (s.lt ?? t), 0, .05); s.lt = t;
  c.fillStyle = vgrad(c, h, '#0b0e15', '#050608'); c.fillRect(0, 0, w, h);
  const ground = h - 10 - Math.min(s.pile.length, 60) * h * 0.004;
  c.textBaseline = 'alphabetic';
  for (const p of s.pile) { c.font = `${p.size}px ${SERIF}`; c.fillStyle = `rgba(150,164,190,${p.a})`; c.fillText(p.txt, p.x, p.y); }
  for (const d of s.drops) {
    d.y += d.v * dt;
    if (d.y >= ground) { s.pile.push({ txt: d.txt, size: d.size * 0.9, x: d.x, y: ground + s.r() * 8, a: .32 }); Object.assign(d, spawn(false)); }
    c.font = `${d.size}px ${SERIF}`; c.fillStyle = `rgba(214,224,242,${0.25 + d.size / (Math.min(w, h) / 17) * 0.35})`; c.fillText(d.txt, d.x, d.y);
  }
  if (s.pile.length > 70) s.pile.splice(0, 8);
  glowDot(c, w * 0.5, h - 14, 14, '#f1b25c', .55 + .35 * (Math.sin(t * 5) > 0 ? 1 : 0.2));
};
```
