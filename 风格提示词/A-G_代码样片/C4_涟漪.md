# C4 涟漪

- 分类：A–G 代码样片 · C 线与墨
- 长什么样：一滴落下，一圈圈荡开。
- 适合：一句话的影响、余波
- 关键词：涟漪、水滴、扩散

## 风格提示词

用代码（Canvas 2D）画一段"涟漪"的动画：一滴落下，一圈圈荡开。
适合讲：一句话的影响、余波
关键词：涟漪、水滴、扩散

下面是我们自己写的参考实现：一个绘制函数 S.C4(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.C4 = (c, w, h, t, s) => {
  c.fillStyle = vgrad(c, h, '#082027', '#020708'); c.fillRect(0, 0, w, h);
  const r = rng(29), per = 1.15, k = Math.floor(t / per), m = Math.min(w, h); c.lineWidth = 1;
  for (let i = k - 4; i <= k; i++) {
    if (i < 0) continue; const rr = rng(i * 7 + 1), x = (.12 + rr() * .76) * w, y = (.25 + rr() * .6) * h, age = t - i * per;
    for (let j = 0; j < 4; j++) { const a = age - j * .2; if (a <= 0) continue; const R = a * m * .17, al = Math.max(0, 1 - age / 4.4) * (1 - j * .2) * .75; c.strokeStyle = `rgba(170,225,230,${al})`; c.beginPath(); c.ellipse(x, y, R, R * .42, 0, 0, TAU); c.stroke(); }
    if (age < .25) glowDot(c, x, y, 10, '#cdf3f5', (1 - age / .25) * .8);
  }
};
```
