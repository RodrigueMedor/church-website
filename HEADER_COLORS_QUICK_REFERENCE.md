# Header Color Palette - Quick Reference

## 🎨 Visual Color Swatches

```
PRIMARY BLUE
████████████████████████████████████████████████████ #2c5282 | rgb(44, 82, 130)
Used for: Links, active states, accents

NAVY DARK
████████████████████████████████████████████████████ #1a365d | rgb(26, 54, 93)
Used for: Brand gradient start, logo border

GOLD ACCENT
████████████████████████████████████████████████████ #c9a84c | rgb(201, 168, 76)
Used for: Brand gradient end, luxury details

FOREST GREEN
████████████████████████████████████████████████████ #2e7d32 | rgb(46, 125, 50)
Used for: Give/Donate button primary

GREEN LIGHT
████████████████████████████████████████████████████ #43a047 | rgb(67, 160, 71)
Used for: Give button gradient middle

GREEN DARK
████████████████████████████████████████████████████ #1b5e20 | rgb(27, 94, 32)
Used for: Give button gradient end
```

---

## 📐 Header Layout Color Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                    HEADER (White bg @ 96%)                           │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ [Logo]  Brand Name          [Nav Items]         [Language]     │ │
│  │ #1a365d  #1a365d→#c9a84c   #2c5282/#000        #757575        │ │
│  │ Border   Gradient            Active/Hover        Secondary      │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌─ Ministries Dropdown ──────────────────────────────────┐          │
│  │ Background: White (#ffffff)                            │          │
│  │ ✓ Youth Ministry      (#2c5282 text on hover)         │          │
│  │ ✓ Women's Ministry    (#2c5282 text on hover)         │          │
│  │ ✓ Men's Ministry      (#2c5282 text on hover)         │          │
│  │ ✓ Children's Ministry (#2c5282 text on hover)         │          │
│  └────────────────────────────────────────────────────────┘          │
│                                                                      │
│  [Give] Button → Green Gradient (#2e7d32 → #43a047 → #1b5e20)     │
│                   with subtle shimmer animation                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Color Application Matrix

```
NAVIGATION ITEMS
┌──────────────────────┬────────────────┬─────────────────┐
│ State                │ Background     │ Text Color      │
├──────────────────────┼────────────────┼─────────────────┤
│ Default              │ Transparent    │ #212121 (dark)  │
│ Hover                │ #2c5282 @ 8%   │ #2c5282         │
│ Active               │ #2c5282 @ 10%  │ #2c5282 + line  │
│ Disabled             │ Transparent    │ #bdbdbd         │
└──────────────────────┴────────────────┴─────────────────┘

DROPDOWN ITEMS
┌──────────────────────┬────────────────┬─────────────────┐
│ State                │ Background     │ Text Color      │
├──────────────────────┼────────────────┼─────────────────┤
│ Default              │ White          │ #212121         │
│ Hover                │ #2c5282 @ 8%   │ #2c5282         │
│ Active               │ #2c5282 @ 8%   │ #2c5282 (bold)  │
└──────────────────────┴────────────────┴─────────────────┘

GIVE BUTTON
┌──────────────────────┬─────────────────────────────────────────┐
│ State                │ Style                                   │
├──────────────────────┼─────────────────────────────────────────┤
│ Default              │ Green gradient + shimmer animation      │
│                      │ (#2e7d32 → #43a047 → #1b5e20)          │
│ Hover                │ Same gradient + shadow lift effect      │
│ Active               │ Same gradient + scale(0.95)            │
└──────────────────────┴─────────────────────────────────────────┘
```

---

## 💾 CSS/Tailwind Quick Copy

```css
/* Primary Blue */
--color-primary: #2c5282;
--color-primary-light: rgba(44, 82, 130, 0.08);
--color-primary-medium: rgba(44, 82, 130, 0.1);

/* Navy Gradient Start */
--color-navy: #1a365d;

/* Gold Accent */
--color-gold: #c9a84c;

/* Green Palette */
--color-green-primary: #2e7d32;
--color-green-light: #43a047;
--color-green-dark: #1b5e20;
--color-green-shadow: rgba(46, 125, 50, 0.35);

/* Text Colors */
--color-text-primary: #212121;
--color-text-secondary: #757575;
--color-text-disabled: #bdbdbd;

/* Backgrounds */
--color-bg-primary: #ffffff;
--color-bg-primary-translucent: rgba(255, 255, 255, 0.96);
--color-bg-primary-more-translucent: rgba(255, 255, 255, 0.92);
```

---

## 🎨 Figma/Design Tool Colors (Hex)

Copy these hex codes directly into Figma or other design tools:

| Name | Hex |
|------|-----|
| Primary Blue | `#2c5282` |
| Navy Dark | `#1a365d` |
| Gold | `#c9a84c` |
| Green Primary | `#2e7d32` |
| Green Light | `#43a047` |
| Green Dark | `#1b5e20` |
| White | `#ffffff` |
| Dark Gray | `#212121` |
| Medium Gray | `#757575` |
| Light Gray | `#bdbdbd` |

---

## 📱 Mobile Drawer Specific

```
┌─────────────────────────┐
│  DRAWER HEADER          │
│  [Logo] FHBCK      [✕]  │
│  bg: #ffffff            │
│  border: #000 @ 12%     │
├─────────────────────────┤
│  Navigation Items       │
│  (same colors as above) │
│  Active bg: #2c5282@10% │
├─────────────────────────┤
│                         │
│                         │
│  [    Give Button    ]  │
│  Green Gradient         │
│  Full Width             │
│                         │
└─────────────────────────┘
```

---

## ✨ Special Effects Colors

### Shimmer Animation
```
Background-size: 200% 200%
Gradient: #2e7d32 → #43a047 → #1b5e20
Animation Duration: 4s infinite ease
Creates subtle color shift across give button
```

### Glass Morphism
```
Backdrop-filter: saturate(180%) blur(10px)
-webkit-backdrop-filter: saturate(180%) blur(10px)
Applied to: Header bar
Effect: Frosted glass appearance with transparency
```

### Shadow Depths
```
Subtle:     0 2px 8px rgba(44, 82, 130, 0.2)
Medium:     0 4px 16px rgba(46, 125, 50, 0.35)
Large:      0 8px 24px rgba(46, 125, 50, 0.45)
Dropdown:   0 16px 48px rgba(0, 0, 0, 0.15)
Drawer:     -4px 0 30px rgba(0, 0, 0, 0.12)
```

---

## 📋 Translation Keys Status

✅ **English** - header.home, header.about, header.ministries, header.youth, header.women, header.men, header.children, header.sermons, header.events, header.give, header.contact

✅ **French** - Accueil, À Propos, Ministères, Ministère Jeunesse, Ministère Femmes, Ministère Hommes, Ministère Enfants, Prédications, Événements, Faire un Don, Contactez-Nous

---

**Design System Version**: 1.0  
**Last Updated**: March 23, 2026

