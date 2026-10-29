# E2 剪纸层叠

- 分类：A–G 代码样片 · E 图形与纸
- 长什么样：一层层纸片有阴影，前快后慢地移动。
- 适合：童年、故事、温柔的段落
- 关键词：剪纸、纸片、层叠

## 风格提示词

用代码（Canvas 2D）画一段"剪纸层叠"的动画：一层层纸片有阴影，前快后慢地移动。
适合讲：童年、故事、温柔的段落
关键词：剪纸、纸片、层叠

下面是我们自己写的参考实现：一个绘制函数 S.E2(c, w, h, t, s)，c 是 canvas 的 2D context，w/h 是宽高，t 是秒，s 是给这个函数存状态用的空对象。公共的小工具函数在同一文件夹的 _公共函数.js 里。

```js
S.E2 = (c, w, h, t, s, dpr) => {
  if (!s.init) { s.init = 1; s.paper = paperTex(w, h, dpr, '#f1e9dc', 47); }
  c.fillStyle = vgrad(c, h, '#f4ecdf', '#dcebe5'); c.fillRect(0, 0, w, h);
  const m = Math.min(w, h); c.save(); c.shadowColor = 'rgba(80,60,30,.25)'; c.shadowBlur = 14; c.fillStyle = '#fff8e7'; c.beginPath(); c.arc(w * .72, h * .26, m * .1, 0, TAU); c.fill(); c.restore();
  const cols = ['#cfe3df', '#9fc7c1', '#6fa59f', '#43807b', '#235a57'];
  cols.forEach((col, i) => {
    const base = h * (.42 + i * .11), amp = h * (.05 + i * .012), off = t * (6 + i * 10) * m / 300;
    c.save(); c.shadowColor = 'rgba(20,40,40,.35)'; c.shadowBlur = 10; c.shadowOffsetY = -3; c.fillStyle = col; c.beginPath(); c.moveTo(0, h);
    for (let x = 0; x <= w + 6; x += 6) { const u = (x + off) / w; c.lineTo(x, base + Math.sin(u * (3 + i) + i * 1.7) * amp + Math.sin(u * 11 + i) * amp * .25); }
    c.lineTo(w, h); c.closePath(); c.fill(); c.restore();
    if (i === 2) { const hx = ((w * .3 - off) % (w * 1.3) + w * 1.3) % (w * 1.3) - w * .15, u = (hx + off) / w, hy = base + Math.sin(u * 5 + i * 1.7) * amp + Math.sin(u * 11 + i) * amp * .25, hs = m * .07; c.fillStyle = '#2f6f69'; c.fillRect(hx - hs / 2, hy - hs * .9, hs, hs); c.beginPath(); c.moveTo(hx - hs * .65, hy - hs * .9); c.lineTo(hx, hy - hs * 1.5); c.lineTo(hx + hs * .65, hy - hs * .9); c.fill(); c.fillStyle = '#ffd98a'; c.fillRect(hx - hs * .12, hy - hs * .55, hs * .24, hs * .3); }
  });
  c.globalAlpha = .5; c.globalCompositeOperation = 'multiply'; c.drawImage(s.paper, 0, 0, w, h); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
};
```
