# Church Website Header - Color Palette & Design System

## 🎨 Primary Color Palette

### Main Colors
| Color Name | HEX Code | RGB | Usage |
|-----------|----------|-----|-------|
| **Primary Blue** | `#2c5282` | rgb(44, 82, 130) | Primary actions, active states, hover effects |
| **Navy Dark** | `#1a365d` | rgb(26, 54, 93) | Brand gradient (dark end), logo border |
| **Gold Accent** | `#c9a84c` | rgb(201, 168, 76) | Brand gradient (light end), luxury accents |
| **Forest Green** | `#2e7d32` | rgb(46, 125, 50) | Give/Donate CTA button (main color) |
| **Green Light** | `#43a047` | rgb(67, 160, 71) | Give button gradient (middle) |
| **Green Dark** | `#1b5e20` | rgb(27, 94, 32) | Give button gradient (end), hover state |

---

## 🌈 Background & Surface Colors

### Backgrounds
| Color Name | HEX Code | RGB | Alpha/Opacity | Usage |
|-----------|----------|-----|----------------|-------|
| **App Bar Background** | `#ffffff` | rgb(255, 255, 255) | `0.96` (96%) | Main header background (glassmorphic) |
| **App Bar Scrolled** | `#ffffff` | rgb(255, 255, 255) | `0.92` (92%) | Header after scroll (more opaque) |
| **Dropdown Background** | `#ffffff` | rgb(255, 255, 255) | `1.0` (100%) | Ministries dropdown panel |

### Transparency/Overlays
| Element | Base Color | Opacity | Hex (approx) | Usage |
|---------|-----------|---------|-------------|-------|
| **Button Hover** | `#2c5282` | `0.08` (8%) | `#f0f4f8` | Background on nav button hover |
| **Button Active** | `#2c5282` | `0.1` (10%) | `#e8f0f8` | Background on active nav button |
| **Dropdown Hover** | `#2c5282` | `0.08` (8%) | `#f0f4f8` | Dropdown item hover |
| **Primary Overlay** | `#2c5282` | `0.15` (15%) | `#e0e8f0` | Deep interactive states |

---

## ✨ Accent & Interactive Colors

### Text Colors
| Element | Color | HEX Code | Usage |
|---------|-------|----------|-------|
| **Primary Text** | Dark Gray | `#212121` | Main navigation text |
| **Secondary Text** | Medium Gray | `#757575` | Icons, subdued labels |
| **Disabled Text** | Light Gray | `#bdbdbd` | Inactive menu items |
| **Active Link** | Primary Blue | `#2c5282` | Current page indicator |
| **Hover Link** | Primary Blue | `#2c5282` | Hovered navigation items |

### Borders & Dividers
| Element | Color | HEX Code | Opacity | Usage |
|---------|-------|----------|---------|-------|
| **Primary Divider** | `#000000` | - | `0.14` (14%) | Main borders |
| **Subtle Divider** | `#000000` | - | `0.12` (12%) | Drawer header border |
| **Logo Border** | `#2c5282` | - | `0.6` (60%) | Circle ring around logo |

---

## 🎭 Gradient Combinations

### 1. **Brand Name Gradient** (Logo Area)
```
Direction: 135°
Colors: 
  - #1a365d 0%
  - #2c5282 40%
  - #c9a84c 100%
```
✨ Creates a luxurious navy-to-gold effect

### 2. **Give Button Gradient** (CTA)
```
Direction: 135°
Colors:
  - #2e7d32 (start)
  - #43a047 (middle)
  - #1b5e20 (end)
```
🌿 Green gradient with shimmer animation

---

## 📦 Shadow & Depth System

### Box Shadows
| Level | Shadow | HEX (Base Color) | Usage |
|-------|--------|-----------------|-------|
| **Subtle** | `0 2px 8px` + color @ `0.2` opacity | `#2c5282` | Button states |
| **Medium** | `0 4px 16px` + color @ `0.35` opacity | `#2e7d32` | Give button default |
| **Large** | `0 8px 24px` + color @ `0.45` opacity | `#2e7d32` | Give button hover |
| **Dropdown** | `0 16px 48px` rgba(0,0,0,0.15) | Black | Ministries dropdown |
| **Drawer** | `-4px 0 30px` rgba(0,0,0,0.12) | Black | Mobile drawer |
| **AppBar Scrolled** | `0 4px 24px` rgba(0,0,0,0.10) | Black | Header shadow on scroll |

---

## 🎬 Animation & Effects

### 1. **Glassmorphism Effect**
```
Backdrop Filter: saturate(180%) blur(10px)
Webkit Filter: -webkit-backdrop-filter: saturate(180%) blur(10px)
Transitions:
  - Color: 0.35s ease
  - Shadow: 0.35s ease
```

### 2. **Shimmer Animation** (Give Button)
```
Animation: shimmer 4s ease infinite
Background-size: 200% 200%
Gradient shift creates a subtle shimmer effect
```

### 3. **Dropdown Slide-Down**
```
Animation: slideDown 0.2s ease
From: opacity 0, transform translateY(-8px)
To: opacity 1, transform translateY(0)
```

### 4. **Logo Hover Effect**
```
Transform: rotate(8deg) scale(1.06)
Border Color: transition to primary.main
Duration: 0.4s cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 📱 Mobile Specific Colors

### Mobile Drawer
| Element | Color | HEX Code | Usage |
|---------|-------|----------|-------|
| **Background** | White | `#ffffff` | Drawer panel |
| **Active Item BG** | Blue Light | `#e8f0f8` | Active menu item (10% opacity) |
| **Hover Item BG** | Blue Light | `#f0f4f8` | Hover menu item (8% opacity) |
| **Sub-item Text** | Blue Primary | `#2c5282` | Active sub-menu text |
| **Close Button Hover** | Error Red | `#d32f2f` | Close button hover effect |

### Mobile Chip (Give Button Badge)
```
Background: #2e7d32 @ 0.12 opacity = #f1f8f3
Text Color: #2e7d32
Font-weight: 700
```

---

## 🎯 Color Usage Guidelines

### Navigation States
| State | Background Color | Text Color | Border/Indicator |
|-------|-----------------|-----------|-----------------|
| **Default** | Transparent | Primary Text | None |
| **Hover** | `#2c5282` @ 8% | Primary Blue | None |
| **Active** | `#2c5282` @ 10% | Primary Blue | 3px bottom border |
| **Disabled** | Transparent | Disabled Gray | None |

### Button States
| Button Type | Default | Hover | Active | Disabled |
|-------------|---------|-------|--------|----------|
| **Nav Button** | BG @ 0% + Gray Text | BG @ 8% + Blue Text | BG @ 10% + Blue Text | Gray Text |
| **Give Button** | Green Gradient | Lift + Enhanced Shadow | Green Gradient | (N/A) |
| **Dropdown Item** | White BG | BG @ 8% Blue + Slide | - | - |

---

## 🔄 Dark Mode Consideration (Future)

For potential dark mode implementation:
- **App Bar**: `#121212` with lighter opacity glass effect
- **Primary Text**: `#e0e0e0`
- **Primary Color**: `#64B5F6` (lighter blue)
- **Gold Accent**: `#FFD700`
- **Green (Give)**: `#81C784`

---

## 📋 Implementation Summary

### Files Using These Colors:
1. **Header.js** - Main component with all styled components
2. **Translation files** - English & French with all keys

### Key Color References in Code:
- Primary: `theme.palette.primary.main` = `#2c5282`
- Background: `theme.palette.background.paper` = `#ffffff`
- Text: `theme.palette.text.primary`, `theme.palette.text.secondary`
- Alpha utility: `alpha(color, opacity)` for transparency

---

## ✅ Translation Keys Added

### English Translation
```json
"header": {
  "home": "Home",
  "about": "About Us",
  "ministries": "Ministries",
  "youth": "Youth Ministry",
  "women": "Women's Ministry",
  "men": "Men's Ministry",
  "children": "Children's Ministry",
  "sermons": "Sermons",
  "events": "Events",
  "give": "Give",
  "contact": "Contact Us"
}
```

### French Translation
```json
"header": {
  "home": "Accueil",
  "about": "À Propos",
  "ministries": "Ministères",
  "youth": "Ministère Jeunesse",
  "women": "Ministère Femmes",
  "men": "Ministère Hommes",
  "children": "Ministère Enfants",
  "sermons": "Prédications",
  "events": "Événements",
  "give": "Faire un Don",
  "contact": "Contactez-Nous"
}
```

---

**Last Updated**: March 23, 2026  
**Designer**: Church Website Team  
**Component**: Header/Navigation Bar

