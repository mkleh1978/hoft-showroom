# Component Spec: Magic Triangle of Investing

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Investment Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Investment.jsx` (Triangle Section) |

---

## 1. Purpose & Value Proposition

> Das Magic Triangle visualisiert den fundamentalen Trade-off zwischen Rendite, Risiko und Liquidität. Jede Investition kann nur zwei dieser drei Faktoren maximieren, nie alle drei gleichzeitig.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Anleger-Einsteiger, die Investment-Grundlagen verstehen wollen |
| **Secondary** | Fortgeschrittene Anleger als Konzept-Refresher |

---

## 3. User Journey

```
[Welcome] → [Triangle Visualisierung] → [Factor Cards lesen] → [Golden Rule verstehen] → [Risk Profiling]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Welcome oder direkte Navigation |
| **Interaction** | Exploration der drei Faktoren |
| **Output** | Verständnis des Grundprinzips |
| **Next Action** | Weiter zum Risk Profiling |

---

## 4. Core Features

- [x] SVG Triangle Visualisierung
- [x] 3 Factor-Nodes mit Icons
- [x] "Choose Two" Message im Zentrum
- [x] Farbkodierte Factor Cards (Teal, Navy, Gray)
- [x] Beispiele pro Faktor
- [x] "Golden Rule" Highlight Box

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Section View Duration | > 45s | Analytics |
| Factor Card Reads | > 2 von 3 | Scroll Tracking |
| Golden Rule Engagement | > 70% | View Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- Factor Configuration (label, icon, color, desc, example)

**Outputs:**
- User Education (keine direkten Daten-Outputs)

**Connected Components:**
- [Risk Profiling](./16-risk-profiling.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// SVG Triangle with Gradient
<svg width="100%" height="320" viewBox="0 0 400 320">
  <polygon
    points="200,30 40,280 360,280"
    fill="url(#triGrad)"
    stroke={cssVars.colorDeepNavy}
    strokeWidth="3"
  />

  // Factor Nodes
  <circle cx="200" cy="30" r="26" fill={cssVars.colorTeal}/>  // Return
  <circle cx="40" cy="280" r="26" fill={cssVars.colorDeepNavy}/>  // Risk
  <circle cx="360" cy="280" r="26" fill={cssVars.colorSteelGray}/>  // Liquidity

  // Center Message
  <text x="200" y="165">Choose Two</text>
</svg>
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Interactive Slider: Wähle 2, sieh Konsequenz | Medium | Hoch |
| **Hoch** | Asset Class Mapping auf Triangle | Medium | Hoch |
| **Mittel** | Animated Examples | Medium | Mittel |
| **Mittel** | Quiz: "Welche 2 priorisierst du?" | Niedrig | Mittel |
| **Niedrig** | Historical Examples (Dot-com, 2008) | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **3D Pyramid** | Moderner Look | Komplexer zu verstehen |
| **Venn Diagram** | Überlappungen zeigen | Weniger ikonisch |
| **Slider Interface** | Interaktiver | Kann irreführen |
| **Asset Class Grid** | Praktischer | Verliert Konzept-Fokus |
| **Video Explanation** | Engaging | Höherer Aufwand |

---

## 10. Educational Content

**Return (Rendite)**
- Erwartete Wertsteigerung
- Höhere Rendite = Höheres Risiko ODER geringere Liquidität
- Beispiel: Aktien 7-10% historischer Durchschnitt

**Risk (Risiko)**
- Wahrscheinlichkeit und Ausmaß von Verlusten
- Gemessen durch Volatilität
- Beispiel: Aktien können 50%+ in Crashs verlieren

**Liquidity (Liquidität)**
- Wie schnell in Cash umwandelbar
- Illiquide Assets zahlen oft Prämie
- Beispiel: Immobilien brauchen Wochen zum Verkauf

**The Golden Rule:**
> "Keine Anlage maximiert alle drei Faktoren. Wer hohe Rendite mit niedrigem Risiko UND hoher Liquidität verspricht, lügt oder versteckt Kosten."

---

## 11. Asset Class Mapping

| Asset Class | Return | Risk | Liquidity |
|-------------|--------|------|-----------|
| Savings Account | Low | Low | High |
| Government Bonds | Low-Med | Low | Medium |
| Corporate Bonds | Medium | Medium | Medium |
| Blue Chip Stocks | Medium-High | Medium-High | High |
| Small Cap Stocks | High | High | Medium |
| Real Estate | Medium-High | Medium | Low |
| Private Equity | High | High | Very Low |
| Crypto | Very High | Very High | High |

---

## 12. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Interaktive Version | Open | Dev |
| Mobile SVG Rendering | Open | QA |
| Zugänglichkeit (Screen Reader) | Open | a11y |

---

*Template Version: 1.0*
