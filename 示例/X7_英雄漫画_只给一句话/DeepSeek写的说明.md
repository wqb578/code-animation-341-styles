# INK & THUNDER — a comic book come to life

A 16-second, seamlessly loopable code animation built as **one self-contained HTML file**:
no libraries, no external fonts, no network requests.

**Prompt it was built from**

> A superhero comic book come to life: newsprint pages, thick ink panels, Ben-Day
> halftone, yellow narration boxes, speech balloons, burst lettering, and a red title
> slab over flipping pages.

## View it

Open `index.html` in any modern browser (Chromium / Firefox / Safari). It autoplays and
loops. `click` restarts, `space` pauses.

- `ink-and-thunder.mp4` — 1600×900, 30 fps render of the same timeline
- `preview.gif` — small inline preview
- `poster.png` — a full-resolution still

## Timeline (16.0 s loop)

| time | beat |
|------|------|
| 0.00 | newsprint pages flip; the red **INK & THUNDER** title slab slams down over them |
| 2.05 | slab lifts away, the comic page slides up into frame |
| 2.95 | yellow narration box types itself: *MEANWHILE, ABOVE THE SLEEPING CITY…* |
| 3.40 | the caped silhouette streaks into the panel (with after-images) |
| 5.45 | speech balloon pops: *NOT TODAY, DOOM-BOT!* |
| 6.85 | hero winds up; camera pushes in |
| 7.72 | **impact** — flash, screen shake, mis-registered print plates, burst lettering |
| 7.86 | the hero breaks out of the panel and flies across the page, over the masthead |
| 10.15 | burst fades; the panel is left empty |
| 10.40 | caption: *THE INK COULD NOT HOLD HIM.* · balloon: *SEE YOU NEXT ISSUE!* |
| 12.12 | bottom panel caption: *SOMEWHERE OUT THERE, THE DOOM-BOT IS STILL RUNNING.* |
| 12.90 | the page is laid down / turns away |
| 13.72 | the red title slab slams shut over the turning pages |
| 15.10 | a final page slides in over everything — the loop point |

## How the look is built

- **Paper** — layered cream gradients, a procedurally drawn newsprint grain canvas
  (per-pixel noise + 14 soft stains), a fold crease, crop marks, page number, price.
- **Ben-Day halftone** — two offset layers of `radial-gradient` dots with
  `mix-blend-mode: multiply`, one masked so the dots swell toward the horizon; dot
  phase drifts slowly so the screen "breathes" like a printed screen.
- **Thick ink panels** — 6 px ink borders, hard offset shadows, a 3 px masthead rule.
- **Burst lettering** — an irregular starburst polygon generated in JS, black plate +
  yellow plate + cyan/magenta mis-registration plates, per-letter wobble.
- **Print texture** — the whole frame is multiplied by the grain canvas and a vignette,
  and the burst gets a two-plate offset for one beat at impact.
- **Page turns** — 3D `rotateY` sheets over a `perspective` stack; a landing page
  slides in at the end so the loop seam is hidden under a full-bleed page.

## Re-rendering the video

`capture.mjs` drives headless Edge over the DevTools protocol, seeks the animation
deterministically (`window.__seek(t)`), and grabs frames:

```powershell
node capture.mjs --out frames --fps 30 --dur 16 --scale 1 --format jpeg --quality 92
ffmpeg -framerate 30 -i frames/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 20 ink-and-thunder.mp4
```

Single stills:

```powershell
node capture.mjs --out stills --times 3.9,5.9,8.1 --scale 1 --format png
```

## Credit

The caped silhouette is adapted from the public-domain (CC0) clip art
*Super hero flying silhouette* by **laobc** — <https://openclipart.org/detail/66385>
— recoloured to ink + newsprint and re-composed. Everything else is drawn in CSS/SVG/JS.
