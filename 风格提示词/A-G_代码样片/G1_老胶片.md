# G1 老胶片

- 分类：A–G 代码样片 · G 质感
- 长什么样：颗粒、闪烁、划痕、边上的漏光。
- 适合：回忆、旧时光、整片的统一质感
- 关键词：胶片、颗粒、漏光

## 风格提示词

用代码（Canvas 2D）画一段"老胶片"的动画：颗粒、闪烁、划痕、边上的漏光。
适合讲：回忆、旧时光、整片的统一质感
关键词：胶片、颗粒、漏光

下面是我们自己写的参考实现：一个绘制函数 S.G1(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.G1 = (c, w, h, t, s, dpr) => {
  if (!s.init) { s.init = 1; const r = rng(59); [s.nz, s.nx] = offscreen(256, 256, 1); const id = s.nx.createImageData(256, 256); for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } s.nx.putImageData(id, 0, 0); }
  const jy = (Math.random() - .5) * 1.4; c.save(); c.translate(0, jy);
  c.fillStyle = vgrad(c, h, '#5b3a63', '#f0a36a'); c.fillRect(0, -2, w, h + 4);
  const m = Math.min(w, h); glowDot(c, w * .68, h * .58, m * .4, '#ffd08a', .5); c.fillStyle = '#ffe3b0'; c.beginPath(); c.arc(w * .68, h * .58, m * .08, 0, TAU); c.fill();
  c.fillStyle = '#2a1626'; c.beginPath(); c.moveTo(0, h); for (let x = 0; x <= w; x += 8) c.lineTo(x, h * .72 - Math.sin(x / w * Math.PI) * h * .12); c.lineTo(w, h); c.fill();
  const tx = w * .36, ty = h * .72 - Math.sin(.36 * Math.PI) * h * .12; c.fillRect(tx - 2, ty - m * .22, 4, m * .22); c.beginPath(); c.arc(tx, ty - m * .24, m * .08, 0, TAU); c.arc(tx - m * .06, ty - m * .19, m * .06, 0, TAU); c.arc(tx + m * .06, ty - m * .19, m * .06, 0, TAU); c.fill();
  const px = w * .47, py = ty + h * .01; c.beginPath(); c.arc(px, py - m * .085, m * .016, 0, TAU); c.fill(); c.fillRect(px - m * .012, py - m * .07, m * .024, m * .07);
  c.restore();
  c.globalAlpha = .22; c.globalCompositeOperation = 'overlay'; const ox = Math.random() * 256, oy = Math.random() * 256; c.fillStyle = c.createPattern(s.nz, 'repeat'); c.save(); c.translate(-ox, -oy); c.fillRect(ox, oy, w, h); c.restore();
  c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
  c.fillStyle = `rgba(0,0,0,${Math.random() * .08})`; c.fillRect(0, 0, w, h);
  const lx = w * (.1 + .08 * Math.sin(t * .5)); glowDot(c, lx, h * .3, m * .7, '#ff7a2a', .22 + .1 * Math.sin(t * 1.3));
  if (Math.random() < .3) { c.fillStyle = 'rgba(255,240,220,.25)'; c.fillRect(Math.random() * w, 0, 1, h); }
  const v = c.createRadialGradient(w / 2, h / 2, m * .3, w / 2, h / 2, Math.hypot(w, h) * .6); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = v; c.fillRect(0, 0, w, h);
};
```
