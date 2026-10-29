# C1 水墨晕开

- 分类：A–G 代码样片 · C 线与墨
- 长什么样：墨在宣纸上一团一团晕开。
- 适合：中国感、回忆、哀伤
- 关键词：水墨、晕开、宣纸

## 风格提示词

用代码（Canvas 2D）画一段"水墨晕开"的动画：墨在宣纸上一团一团晕开。
适合讲：中国感、回忆、哀伤
关键词：水墨、晕开、宣纸

下面是我们自己写的参考实现：一个绘制函数 S.C1(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.C1 = (c, w, h, t, s, dpr) => {
  if (!s.init) {
    s.init = 1; s.paper = paperTex(w, h, dpr, '#e9e2d2', 21); const r = rng(23);
    s.blobs = [[.3, .45, .26, .2], [.62, .38, .2, 1.5], [.48, .66, .16, 3.0], [.78, .62, .12, 4.2]].map(([x, y, R, t0]) => ({ x, y, R, t0, k: Array.from({ length: 16 }, () => [(r() - .5) * .5, (r() - .5) * .5, .4 + r() * .6]) }));
  }
  const tm = t % 10; c.drawImage(s.paper, 0, 0, w, h); const m = Math.min(w, h);
  c.globalCompositeOperation = 'multiply';
  for (const b of s.blobs) {
    const age = tm - b.t0; if (age <= 0) continue; const g = 1 - Math.exp(-age * .9), R = b.R * m * g;
    for (const [dx, dy, kk] of b.k) { const gr = c.createRadialGradient(b.x * w + dx * R, b.y * h + dy * R, 0, b.x * w + dx * R, b.y * h + dy * R, R * kk); gr.addColorStop(0, 'rgba(28,28,32,.22)'); gr.addColorStop(.7, 'rgba(28,28,32,.08)'); gr.addColorStop(1, 'rgba(28,28,32,0)'); c.fillStyle = gr; c.beginPath(); c.arc(b.x * w + dx * R, b.y * h + dy * R, R * kk, 0, TAU); c.fill(); }
  }
  c.globalCompositeOperation = 'source-over';
  const sz = m * .085, sx = w * .06, sy = h - sz - h * .07; c.fillStyle = '#b3352a'; c.fillRect(sx, sy, sz, sz);
  c.fillStyle = '#f3e6d6'; c.font = `700 ${sz * .38}px ${SERIF}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('俯仰', sx + sz / 2, sy + sz / 2);
  const f = ss(8.6, 10, tm); if (f > 0) { c.globalAlpha = f; c.drawImage(s.paper, 0, 0, w, h); c.globalAlpha = 1; }
};
```
