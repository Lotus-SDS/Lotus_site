---
name: Lotus
description: Inovação que floresce através do código — a near-black studio site lit by one lime light source.
colors:
  lotus-lime: "#b7c95b"
  lime-glow: "#e0ee9e"
  void: "#050605"
  ink: "#111410"
  bone: "#ecefe6"
  sage: "#a3aa9c"
  moss: "#6e766a"
  fern: "#5c6259"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, min(16.5vw, 27svh), 15.5rem)"
    fontWeight: 250
    lineHeight: 0.84
    letterSpacing: "-0.04em"
  display-close:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 7.4vw, 7rem)"
    fontWeight: 300
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.05rem, 4.4vw, 4.1rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  statement:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 4.4vw, 4.15rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  lead:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  box: "16px"
  window: "18px"
  panel: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(1.75rem, 4.2vw, 3.5rem)"
  section: "clamp(6rem, 16vh, 11rem)"
  shell: "1360px"
components:
  button-primary:
    backgroundColor: "{colors.lotus-lime}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.lime-glow}"
    textColor: "{colors.void}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-light:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.sage}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "32px"
  service-tile:
    textColor: "{colors.bone}"
    rounded: "{rounded.panel}"
    padding: "28px"
  stat-box:
    textColor: "{colors.bone}"
    rounded: "{rounded.box}"
    padding: "16px"
    height: "116px"
  code-window:
    textColor: "{colors.bone}"
    typography: "{typography.code}"
    rounded: "{rounded.window}"
---

# Design System: Lotus

## Overview

**Creative North Star: "O Caule que Floresce"**

The site is a dark field with a single living light: the lime of the Lotus logo, a lotus drawn in circuit-board traces. Everything luminous on the page belongs to that one plant. In the first viewport the logo exists as thousands of particles that sprout from the base of its stem and settle into the flower, suspended in depth between two lines of giant, light type. From the flower's base a single circuit trace, the stem, grows down the page in sync with reading. It lights one via node per section, turns each section's heading from dim to bright as it arrives, splits into four leader lines that power the service tiles, and ends in the contact button.

Density is low and scale is high: huge light-weight lettering, generous vertical rhythm, hairline structure, and very few surfaces. Glass exists only where it lenses light behind it (the code window over the chip, the tiles over the lit board, the header over scrolled content). Motion is the stem's growth plus the flower's physics; everything else is quiet.

The world was set by two dark reference sites the owners chose (an agency landing page and an AI-product landing page), translated into the brand's own lime instead of their electric blue and orange.

**Key Characteristics:**
- One accent, used as light, never as a fill field.
- Giant light display type paired with a darker second line for depth.
- A circuit trace (1.5px lime core, 7px soft glow, 45° chamfered corners, via dots) as the page's connective structure.
- Pills for every control, thin-bordered boxes for data, 20px panels for content.
- Near-black ground with a green cast, never pure black or blue-black.

## Colors

A restrained palette: a green-cast void, four text neutrals stepped by importance, and the logo's lime as the only light source.

### Primary
- **Lotus Lime** (`lotus-lime`): the logo's exact color, sampled from its palette. Primary buttons, the stem and its lit vias, icon discs of powered tiles, the accent word in the statement, selection and focus rings.
- **Lime Glow** (`lime-glow`): the hot core of light. Primary-button hover, the stem's trailing highlight and tip, the brightest particles, string literals in the code window.

### Neutral
- **Green Void** (`void`): page ground and button text on lime.
- **Ink** (`ink`): the one raised solid, behind portraits while they load.
- **Bone** (`bone`): primary text and bright display lines; at 5–16% opacity it becomes every hairline, border, and glass tint.
- **Sage** (`sage`): secondary text, labels, captions (8.5:1 on the void).
- **Moss** (`moss`): the dim half of split headings and the unlit state of headings before the stem arrives (4.3:1, large text only).
- **Fern** (`fern`): the hero's rear display line, darker so the particle lotus reads in front of it (about 3:1, only at display size). Below 640px the lotus covers the whole line, so it rises above the particles in `sage` with a void halo to stay legible.

### Named Rules
**The One Light Rule.** Lime is light, not paint. It appears as strokes, glows, text, icon discs, and the primary pill; it never floods a section background.

**The Earned Glow Rule.** Something glows because the stem reached it (a via, a tile, the contact button) or because the pointer is on it. Nothing glows at rest for decoration.

## Typography

**Display Font:** Hanken Grotesk (with system-ui)
**Body Font:** Hanken Grotesk (with system-ui)
**Mono Font:** JetBrains Mono, for code only

**Character:** One neo-grotesk family across the whole range: hairline-light at giant sizes, medium and uppercase for statements and split headings. The mono face appears only where there is real code or a part marking.

### Hierarchy
- **Display** (250, `var(--hero-fs)`: 21vw on phones, min(16.5vw, 27svh) from 640px, capped at 15.5rem; 0.84): the two hero lines. On phones the rear line breaks into "que / floresce".
- **Display Close** (300, clamp(2.9rem, 7.4vw, 7rem), 0.94): the contact question, bright line over moss line.
- **Headline** (500, clamp(2.05rem, 4.4vw, 4.1rem), 0.98, uppercase): split headings, a bright lead phrase then a moss continuation ("Serviços: da visão à realidade digital").
- **Statement** (500, clamp(1.85rem, 4.4vw, 4.15rem), 1.02, uppercase): the manifesto sentence, lit word by word with scroll.
- **Title** (500, 1.3rem; founder names 1.5rem): tile and card titles.
- **Body / Lead** (400, 1rem and clamp(1.0625rem, 1.25vw, 1.1875rem), 1.65, sage): paragraphs held to 38–46ch.
- **Label** (500, 0.8125rem, 0.14em tracking, uppercase): footer list headings and the pillar line only.

### Named Rules
**The Two-Tone Heading Rule.** Every section heading is one sentence in two values: the lead phrase in bone, the continuation in moss. The lead phrase starts in moss and brightens only when the stem's node reaches it.

**The No Kicker Rule.** No small label ever sits above a heading. The heading carries its own weight.

## Layout

A centered shell (max 1360px) with a fluid gutter (clamp(1.75rem, 4.2vw, 3.5rem)). The stem's rail runs inside the left gutter, at 45% of the gutter's width, so content never collides with it. Sections breathe with clamp(6rem, 16vh, 11rem) of vertical padding. Desktop compositions use a 12-column grid (heading 5–7 columns, supporting copy offset to the right); everything collapses to one column on phones, with the rail kept at the left edge.

The hero is full-height (100svh): the display stage fills the space above a hairline "ground" at roughly 70–75% of the viewport, with pills, CTAs, and stat boxes below it and the stack marquee at the foot. The lotus width is min(60vw, 640px, 70svh) so it never crosses the ground on short screens.

Breakpoints follow Tailwind: 640 (hero type switches to width-and-height driven), 768, 1024 (desktop navigation), 1280 (hero side notes).

## Elevation & Depth

Depth comes from layering and light, not surfaces. The hero stacks three planes (bright line in front, particle lotus in the middle, fern line behind) that move at different speeds with scroll and against each other with the pointer. Other sections pair a slow background layer with a faster foreground one (chip versus code window, giant drifting word versus portraits).

### Shadow Vocabulary
- **Panel drop** (`0 24px 48px -24px rgb(0 0 0 / .75)` plus a 1px inner top highlight): glass panels.
- **Lime lift** (`0 10px 28px -14px lime/.7`, hover `0 16px 40px -14px lime/.85`): the primary pill.
- **Powered tile** (`0 30px 60px -34px lime/.45` plus inner lime top line): a service tile the stem has reached.
- **Socket ring** (`0 0 0 6px lime/.12` plus `0 18px 48px -14px lime/.9`): the contact CTA once the stem ends in it.

### Named Rules
**The Lens Rule.** Frosted glass (18px blur) is allowed only over something worth blurring: glow, a dot-grid board, a photo, or scrolling content. Glass over empty void is decoration and is not allowed.

## Shapes

Controls are full pills (999px): buttons, tags, the GitHub link, icon buttons. Content panels use 20px corners (service tiles, portraits), the code window 18px, data boxes 16px. Structure lines are hairlines (bone at 7–10%) and the stem's traces turn corners with 45° chamfers (16px), marked by round vias.

## Components

### Buttons
- **Shape:** full pill (999px), 48px tall (56px for the contact pair), 24px side padding, 550 weight.
- **Primary:** lime fill, void text, lime lift shadow. Hover shifts to lime glow with a deeper lift; the trailing arrow nudges up and right (down for in-page links).
- **Ghost:** transparent with a bone/16 hairline; hover raises the border to bone/40 and adds a bone/5 wash.
- **Light:** bone fill with void text, used for in-page navigation ("Ver serviços").
- **Press:** 1px drop and 0.99 scale. Focus: 2px lime outline, 3px offset.

### Chips
- **Tag:** 32px pill, bone/14 hairline, sage text at 0.8125rem, for service lines in the hero.
- **Tech chip:** borderless bone/5 pill at 0.75rem inside tiles.

### Cards / Containers
- **Service tile:** glass panel (20px) over the dot-grid board and bus glow. Unpowered: bone/9 border, outlined icon disc. Powered (the stem arrived): lime/32 border, lime icon disc with void glyph, powered-tile shadow. Hover lifts 4px.
- **Stat box:** 16px box, bone/10 hairline, bone/2.5 fill with light blur over the hero aura; number top-right in extralight tabular numerals, label bottom-left in sage.
- **Portrait:** 4:5 frame (20px) with a grayscale-plus-lime duotone that clears to full color on hover or focus, and full color on touch screens. Wipes in from the bottom; the image drifts inside its frame with scroll.

### Navigation
Logo mark plus the "lotus" wordmark at left, centered links (0.9375rem, sage, bone when active), and the lime pill CTA at right. Under the links runs a miniature stem: a hairline filling with scroll progress and one via per link that lights as its section is reached. The header turns into void/70 glass after 24px of scroll. Below 1024px a full-screen menu with 2.5rem light links replaces it; content behind it is made inert.

### The Stem (signature)
An SVG trace measured from the live layout: it starts at the lotus base, crosses the hero ground at a via, runs left along it to the rail, descends, and ends in the contact CTA. A faint ghost track shows the route ahead. The drawn part is a 1.5px lime core over a 7px lime/16 glow with a 110px lime-glow trail and a breathing tip placed at 66% of viewport height. Each section heading carries a node; tiles receive branches (a bus with drops when tiles share a row, side ticks when stacked). Horizontal runs get their own scroll span so the tip never jumps. With reduced motion the stem renders complete and everything is lit.

### Particle Lotus (signature)
The logo PNG sampled into about 5,200 particles (2,600 on narrow screens) drawn on canvas with additive blending in eight brightness levels. Particles sprout from the stem base outward, then hold their positions with spring physics (k 0.05, damping 0.84) and part around the pointer. A ring of light travels from the base to the petal tips about every four seconds. Rendering pauses off screen and in background tabs.

### Code Window
Glass window with three muted dots, a "lotus.py" tab, numbered lines, and palette-only syntax colors (keywords lime, strings lime-glow/80, comments moss italic). It starts complete, then deletes and retypes the studio's two snippets while visible, with a blinking lime block caret.

## Do's and Don'ts

### Do:
- **Do** keep lime as the only chromatic color and use it as light: strokes, glows, text, the primary pill.
- **Do** let the stem reach something before it glows. New sections get a `data-stem-node` heading; new card rows get `data-stem-tile`.
- **Do** write headings as two-tone sentences (bone lead phrase, moss continuation).
- **Do** keep controls as pills and data in thin-bordered boxes with tabular numerals.
- **Do** give every parallax layer a reduced-motion value of zero movement.

### Don't:
- **Don't** put glass over empty void; add the light or texture it is lensing, or use a plain panel.
- **Don't** place kickers or eyebrow labels above headings.
- **Don't** use gradient text, blue-black grounds, or a second accent hue.
- **Don't** invent proof: no client logos, project counts, or satisfaction numbers the studio doesn't have.
- **Don't** use monospace outside real code or part markings.
