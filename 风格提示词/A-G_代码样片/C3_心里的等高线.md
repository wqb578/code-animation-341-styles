# C3 心里的等高线

- 分类：A–G 代码样片 · C 线与墨
- 长什么样：像地图上的等高线，一直在起伏。
- 适合：情绪起伏、心里的地形
- 关键词：等高线、地形、起伏

## 风格提示词

用代码（Canvas 2D）画一段"心里的等高线"的动画：像地图上的等高线，一直在起伏。
适合讲：情绪起伏、心里的地形
关键词：等高线、地形、起伏

下面是我们自己写的参考实现：一个绘制函数 S.C3(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.C3 = (c, w, h, t, s) => {
  const cols = 60, rows = Math.max(8, Math.round(cols * h / w)), cw = w / cols, ch = h / rows;
  const cen = [0, 1, 2, 3, 4].map(i => [.5 + .32 * Math.sin(t * .13 * (1 + i * .3) + i * 2), .5 + .3 * Math.cos(t * .11 * (1 + i * .2) + i * 1.3), .16 + .05 * i]);
  const f = (x, y) => { let v = 0; for (const [cx, cy, r] of cen) { const dx = (x - cx) * (w / Math.min(w, h)), dy = (y - cy) * (h / Math.min(w, h)); v += Math.exp(-(dx * dx + dy * dy) / (r * r)); } return v + .08 * Math.sin(x * 9 + t * .3) * Math.cos(y * 7); };
  const G = []; for (let j = 0; j <= rows; j++) { const row = []; for (let i = 0; i <= cols; i++) row.push(f(i / cols, j / rows)); G.push(row); }
  c.fillStyle = '#0c120f'; c.fillRect(0, 0, w, h);
  for (let L = 1; L <= 11; L++) {
    const lv = L * .13; c.strokeStyle = L === 6 ? 'rgba(244,196,120,.95)' : `rgba(214,182,128,${.18 + L * .04})`; c.lineWidth = L === 6 ? 1.6 : .8; c.beginPath();
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = G[j][i], b = G[j][i + 1], d = G[j + 1][i], e = G[j + 1][i + 1];
      const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (e > lv ? 2 : 0) | (d > lv ? 1 : 0); if (idx === 0 || idx === 15) continue;
      const x = i * cw, y = j * ch, T = [x + cw * (lv - a) / (b - a), y], R = [x + cw, y + ch * (lv - b) / (e - b)], B = [x + cw * (lv - d) / (e - d), y + ch], Lf = [x, y + ch * (lv - a) / (d - a)];
      const seg = { 1: [Lf, B], 2: [B, R], 3: [Lf, R], 4: [T, R], 5: [Lf, T, B, R], 6: [T, B], 7: [Lf, T], 8: [Lf, T], 9: [T, B], 10: [T, R, Lf, B], 11: [T, R], 12: [Lf, R], 13: [B, R], 14: [Lf, B] }[idx];
      for (let k = 0; k < seg.length; k += 2) { c.moveTo(seg[k][0], seg[k][1]); c.lineTo(seg[k + 1][0], seg[k + 1][1]); }
    }
    c.stroke();
  }
};
```
