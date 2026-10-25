# The Kitchen Grimoire

Rahini's recipe site, built with Jekyll on GitHub Pages. GitHub builds it automatically, so there's nothing to install.

## Add a new recipe (about 5 minutes, all on github.com)

1. **Upload the leaflet images.** Open `assets/recipes/`, choose *Add file → Upload files*, and upload into a new folder named after the recipe, e.g. `assets/recipes/chilli-garlic-noodles/illustrated.jpg` (plus `plain.jpg` if you have one).
2. **Add the recipe file.** Open `_recipes/`, choose *Add file → Create new file*, name it `chilli-garlic-noodles.md`, and paste the block below.
3. **Commit.** The site updates within about a minute.

```markdown
---
title: "Chilli Garlic Noodles"
tagline: "a short, playful line in your voice"
date: 2026-11-01
serves: 2
time: 15
closing: "Two short lines. Like this."
leaflet: /assets/recipes/chilli-garlic-noodles/illustrated.jpg
leaflet_plain: /assets/recipes/chilli-garlic-noodles/plain.jpg
ingredients:
  - first ingredient
  - second ingredient
steps:
  - First step.
  - Second step.
---

The story, in your own words. A few lines is plenty.
```

The file name becomes the web address: `_recipes/chilli-garlic-noodles.md` → `/recipes/chilli-garlic-noodles/`.
The newest `date` shows first on the home page.

## Where things live

| What | Where |
|---|---|
| Site name, tagline | `_config.yml` |
| Recipes | `_recipes/*.md` |
| Leaflet images | `assets/recipes/<recipe>/` |
| Kitchen backgrounds (wide = desktop, tall = phone) | `assets/img/bg-wide.jpg`, `assets/img/bg-tall.jpg` |
| Look and feel | `assets/css/style.css` |
