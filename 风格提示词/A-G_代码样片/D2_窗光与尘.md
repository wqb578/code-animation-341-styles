# D2 窗光与尘

- 分类：A–G 代码样片 · D 光与天气
- 长什么样：一束光从窗照进来，灰尘在光里飘。
- 适合：安静、时间、老房子
- 关键词：窗光、灰尘、光束

## 风格提示词

用代码（Canvas 2D）画一段"窗光与尘"的动画：一束光从窗照进来，灰尘在光里飘。
适合讲：安静、时间、老房子
关键词：窗光、灰尘、光束

下面是我们自己写的参考实现：一个绘制函数 S.D2(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.D2 = (c, w, h, t, s) => {
  if (!s.init) { s.init = 1; const r = rng(37); s.p = Array.from({ length: 170 }, () => [r() * w, r() * h, r() * TAU, .4 + r() * 1.4]); }
  c.fillStyle = '#0b0806'; c.fillRect(0, 0, w, h);
  const wx = w * .08, wy = h * .08, ww = w * .2, wh = h * .36;
  const beam = new Path2D(); beam.moveTo(wx + ww, wy); beam.lineTo(wx, wy + wh); beam.lineTo(w * .52, h * 1.02); beam.lineTo(w * 1.02, h * .66); beam.closePath();
  const g = c.createLinearGradient(wx, wy, w * .8, h); g.addColorStop(0, 'rgba(255,222,165,.34)'); g.addColorStop(1, 'rgba(255,200,140,.03)');
  c.globalCompositeOperation = 'lighter'; c.fillStyle = g; c.fill(beam);
  c.fillStyle = 'rgba(255,214,160,.12)'; c.beginPath(); c.moveTo(w * .52, h); c.lineTo(w * .7, h * .86); c.lineTo(w, h * .7); c.lineTo(w, h); c.fill();
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#f4e2c2'; c.fillRect(wx, wy, ww, wh); c.fillStyle = '#0b0806'; c.fillRect(wx + ww / 2 - 2, wy, 4, wh); c.fillRect(wx, wy + wh / 2 - 2, ww, 4);
  for (const p of s.p) {
    const x = (p[0] + Math.sin(t * .2 + p[2]) * 20 + t * 4) % w, y = (p[1] + Math.cos(t * .17 + p[2]) * 16 - t * 2 + h * 10) % h;
    const lit = c.isPointInPath(beam, x * (c.getTransform().a), y * (c.getTransform().d));
    c.fillStyle = lit ? `rgba(255,236,200,${.5 + .4 * Math.sin(t * 2 + p[2])})` : 'rgba(255,220,170,.05)'; c.beginPath(); c.arc(x, y, p[3] * (lit ? 1 : .7), 0, TAU); c.fill();
  }
};
```
