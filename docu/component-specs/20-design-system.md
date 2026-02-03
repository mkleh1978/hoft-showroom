# Design System Documentation

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Design Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Version** | 1.0 |

---

## 1. Overview

Das HoFT Design System definiert die visuellen Grundlagen für alle Komponenten des Ecosystem Showroom. Es basiert auf einem professionellen, vertrauenswürdigen Look, der Finanzthemen zugänglich macht.

---

## 2. Color Palette

### 2.1 Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Deep Navy** | `#0B1F3A` | Header, Dark Cards, Primary Text |
| **Charcoal** | `#1A1A2E` | Secondary Dark, Gradients |
| **Teal** | `#0D9488` | Primary Accent, CTAs, Highlights |
| **Light Teal** | `#CCFBF1` | Backgrounds, Tags, Subtle Accents |

### 2.2 Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| **White** | `#FFFFFF` | Cards, Backgrounds |
| **Off-White** | `#F8F9FA` | Page Background |
| **Steel Gray** | `#64748B` / `#6B7280` | Secondary Text, Captions |
| **Border** | `#E2E8F0` / `#E5E7EB` | Dividers, Input Borders |

### 2.3 Status Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Green** | `#059669` | Success, Positive Values, High Scores |
| **Amber** | `#D97706` | Warning, Medium Scores, Caution |
| **Red** | `#DC2626` | Error, Negative Values, Low Scores |

### 2.4 Score Color Logic

```javascript
const getScoreColor = (score) => {
  if (score <= 40) return '#DC2626';  // Red
  if (score <= 60) return '#D97706';  // Amber
  if (score <= 80) return '#0D9488';  // Teal
  return '#059669';                    // Green
};
```

---

## 3. Typography

### 3.1 Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

Alternative: `'Inter', -apple-system, sans-serif`

### 3.2 Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `fontSizeXs` | 10px | Micro Labels, Tags |
| `fontSizeSm` | 12px | Captions, Secondary Info |
| `fontSizeBase` | 14px | Body Text |
| `fontSizeLg` | 16px | Subheadings, Emphasis |
| `fontSizeXl` | 20px | Section Headers |
| `fontSize2xl` | 24px | Page Titles |
| `fontSize3xl` | 32px | Hero Headlines |
| `fontSize4xl` | 44px | Big Numbers, Stats |

### 3.3 Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Large Headlines (Hero) |
| Regular | 400 | Body Text |
| Medium | 500 | Emphasized Body |
| Semi-Bold | 600 | Buttons, Labels |
| Bold | 700 | Headings, Numbers |

### 3.4 Text Styles

```javascript
// Section Label (Uppercase)
{
  fontSize: '10px',
  fontWeight: 700,
  color: colors.teal,
  letterSpacing: '2px',
  textTransform: 'uppercase',
}

// Card Heading
{
  fontSize: '16px',
  fontWeight: 700,
  color: colors.deepNavy,
}

// Body Text
{
  fontSize: '14px',
  fontWeight: 400,
  color: colors.charcoal,
  lineHeight: 1.6,
}

// Caption
{
  fontSize: '11px',
  color: colors.steelGray,
}
```

---

## 4. Spacing System

Base Unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `space1` | 4px | Micro spacing |
| `space2` | 8px | Element padding |
| `space3` | 12px | Small gaps |
| `space4` | 16px | Standard padding |
| `space5` | 20px | Medium gaps |
| `space6` | 24px | Card padding |
| `space8` | 32px | Section spacing |
| `space10` | 40px | Large sections |
| `space12` | 48px | Page margins |

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radiusSm` | 4px | Tags, Small Elements |
| `radiusMd` | 6px | Buttons, Inputs |
| `radiusLg` | 8px | Cards (Small) |
| `radiusXl` | 10px | Cards (Medium) |
| `radius2xl` | 12px | Cards (Large), Modals |
| `radiusFull` | 50% | Circles, Avatars |

---

## 6. Shadows

```javascript
// Small Shadow
shadowSm: '0 2px 16px rgba(11, 31, 58, 0.06)'

// Medium Shadow
shadowMd: '0 4px 24px rgba(11, 31, 58, 0.08)'

// Hover Shadow
shadowHover: '0 8px 40px rgba(0, 0, 0, 0.15)'
```

---

## 7. Component Patterns

### 7.1 Standard Card

```javascript
{
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 2px 16px rgba(11, 31, 58, 0.06)',
}
```

### 7.2 Card with Top Accent

```javascript
{
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '24px',
  borderTop: '4px solid #0D9488',
  boxShadow: '0 2px 16px rgba(11, 31, 58, 0.06)',
}
```

### 7.3 Dark Card

```javascript
{
  backgroundColor: '#0B1F3A',
  borderRadius: '12px',
  padding: '24px',
}
```

### 7.4 Highlight Box

```javascript
{
  backgroundColor: '#CCFBF1',
  borderRadius: '12px',
  padding: '24px',
  borderLeft: '6px solid #0D9488',
}
```

### 7.5 Primary Button

```javascript
{
  backgroundColor: '#0D9488',
  color: '#FFFFFF',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
}
```

### 7.6 Secondary Button

```javascript
{
  backgroundColor: 'transparent',
  color: '#1A1A2E',
  padding: '14px 28px',
  border: '2px solid #E2E8F0',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
}
```

---

## 8. Icon System

### 8.1 Icon Specifications

- **Style**: Stroke-based (not filled)
- **Stroke Width**: 2px
- **Linecap/Linejoin**: Round
- **Default Size**: 20-24px
- **ViewBox**: 0 0 24 24

### 8.2 Icon Component Pattern

```jsx
const Icon = ({ name, color = 'currentColor', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {iconPaths[name]}
  </svg>
);
```

### 8.3 Available Icons

| Category | Icons |
|----------|-------|
| **Navigation** | play, arrowRight, arrowLeft, home, grid |
| **Finance** | wallet, piggyBank, dollarSign, barChart, trendingUp |
| **Protection** | shield, target, alertTriangle, clock |
| **Social** | users, user, userX |
| **Action** | check, checkCircle, plus, x, send, refreshCw |
| **Info** | lightbulb, info, alertCircle |
| **ESG** | leaf, globe, building |

---

## 9. Progress Indicators

### 9.1 Progress Bar

```javascript
// Track
{
  height: '8px',
  backgroundColor: '#CCFBF1',
  borderRadius: '4px',
  overflow: 'hidden',
}

// Fill
{
  height: '100%',
  backgroundColor: '#0D9488',  // or status color
  borderRadius: '4px',
  transition: 'width 0.3s ease',
}
```

### 9.2 Circular Progress

```javascript
// Used in Score displays
{
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.05)',
  border: '4px solid {statusColor}',
}
```

---

## 10. Transitions & Animations

```javascript
// Fast Transition (Hover)
transitionFast: '0.2s ease'

// Normal Transition (State Changes)
transitionNormal: '0.3s ease'

// Slow Transition (Charts)
transitionSlow: '0.5s ease'

// Typing Animation
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

// Spinner Animation
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 11. Responsive Breakpoints (Planned)

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 640px | Single Column |
| Tablet | 640px - 1024px | 2 Columns |
| Desktop | > 1024px | Full Layout |

**Current Status**: Desktop-only Layout. Mobile Breakpoints als Verbesserungsidee identifiziert.

---

## 12. Design Tokens Export

```javascript
const cssVars = {
  // Colors
  colorDeepNavy: '#0B1F3A',
  colorCharcoal: '#1A1A2E',
  colorWhite: '#FFFFFF',
  colorOffWhite: '#F8F9FA',
  colorTeal: '#0D9488',
  colorLightTeal: '#CCFBF1',
  colorSteelGray: '#6B7280',
  colorRed: '#DC2626',
  colorAmber: '#D97706',
  colorGreen: '#059669',
  colorBorder: '#E5E7EB',

  // Typography
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

  // Spacing
  space1: '4px',
  space2: '8px',
  // ... etc.

  // Radius
  radiusSm: '4px',
  radiusMd: '6px',
  // ... etc.

  // Shadows
  shadowSm: '0 2px 16px rgba(11, 31, 58, 0.06)',
  shadowMd: '0 4px 24px rgba(11, 31, 58, 0.08)',

  // Layout
  maxWidth: '1100px',  // or 1200px, 1280px, 1320px
};
```

---

## 13. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Design Tokens in Shared Module extrahieren | Medium | Hoch |
| **Hoch** | Dark Mode Support | Medium | Hoch |
| **Mittel** | CSS-in-JS Migration (Styled Components/Emotion) | Hoch | Mittel |
| **Mittel** | Figma Component Library erstellen | Medium | Mittel |
| **Niedrig** | Animation Library (Framer Motion) | Medium | Niedrig |

---

## 14. Known Issues

| Issue | Status | Priority |
|-------|--------|----------|
| Design Tokens in jeder Station dupliziert | Open | High |
| Keine Responsive Breakpoints | Open | High |
| Inconsistent maxWidth (1100-1320px) | Open | Medium |
| Manche Icons als Komponente, manche als Objekt | Open | Low |

---

*Template Version: 1.0*
