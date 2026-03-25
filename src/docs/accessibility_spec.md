# EquityLetter — Accessibility Specification

## Standards
- WCAG 2.1 Level AA compliance target

## Implementation

### Semantic HTML
- Single `<h1>` on page (hero headline)
- `<h2>` for section titles
- `<h3>` for feature/card titles
- `<nav>` for navigation
- `<main>` wrapping content
- `<footer>` for footer
- `<section>` with descriptive content for each page section

### Interactive Elements
- All links have descriptive text or `aria-label`
- FAQ uses native `<details>/<summary>` (no JS required)
- Mobile menu uses `<details>/<summary>` (no JS required)
- Minimum touch target: 44x44px on all interactive elements
- Focus indicators visible on all interactive elements

### Color & Contrast
- Text on white: minimum 4.5:1 ratio
- Text on colored backgrounds: verified against WCAG AA
- Dark mode: equivalent contrast ratios
- No information conveyed by color alone

### Images & Icons
- Decorative elements have `aria-hidden="true"`
- Avatar placeholders are decorative (aria-hidden)
- SVG icons have appropriate roles

### Motion
- Animations respect `prefers-reduced-motion`
- No auto-playing video or audio
