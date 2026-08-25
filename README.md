# A. Hernandez Junk Removal — Website

Modern, responsive marketing site for **A. Hernandez Junk Removal**, a licensed and insured
same-day junk hauling company serving Houston, TX.

## Stack

Vanilla HTML, CSS, and JavaScript — no build step, no dependencies, no external APIs.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — all page sections and structured data |
| `styles.css` | Full design system: tokens, layout, components, responsive rules |
| `script.js` | Mobile nav, scroll reveals, stat counters, quote-form validation |
| `favicon.svg` | Site icon (haul truck mark) |

## Sections

Hero · Trust strip · About + stats · Services · How it works · Service areas ·
Pricing · Reviews · Free quote form + contact · CTA band · Footer

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Business details

- **Phone:** 346 599-8378
- **Email:** ahernandezjunkremoval@gmail.com
- **Hours:** Monday – Sunday, 7:00 AM – 7:00 PM
- **Area:** Houston, TX — River Oaks, Bellaire, West University Place, Energy Corridor,
  Downtown Houston, Sugar Land, Hedwig Village, Kingwood, Fulshear

## Notes

- The quote form is client-side only (validation + confirmation message); wire it to a
  backend or form service to receive submissions.
- Photography is sourced from Pexels.
