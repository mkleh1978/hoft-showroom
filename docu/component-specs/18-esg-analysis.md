# Component Spec: ESG Analysis

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Investment Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Investment.jsx` (ESG Section) |

---

## 1. Purpose & Value Proposition

> Die ESG Analysis erklärt die drei Dimensionen nachhaltigen Investierens (Environmental, Social, Governance) und ermöglicht die Analyse von Beispielunternehmen mit dem "ESG Detective" Tool.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Anleger, die nachhaltig investieren möchten |
| **Secondary** | Impact-orientierte Millennials/Gen Z |

---

## 3. User Journey

```
[Portfolio Builder] → [ESG Pillars verstehen] → [Unternehmen analysieren] → [Scores vergleichen] → [Insight lesen]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Portfolio Builder oder direkte Navigation |
| **Interaction** | ESG Pillars lesen, Unternehmen im Detective auswählen |
| **Output** | Verständnis der ESG-Dimensionen, Unternehmensvergleich |
| **Next Action** | Life Planning oder Station wechseln |

---

## 4. Core Features

- [x] 3 ESG Pillar Cards (E, S, G) mit Faktoren-Listen
- [x] ESG Detective Tool
- [x] 4 Beispielunternehmen (TechGreen bis HeavyMetal)
- [x] E/S/G Scores mit Progress Bars
- [x] Carbon Footprint Metrik
- [x] Risk Level Indicator
- [x] Insight Box: "ESG Does Not Sacrifice Returns"

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Pillar Card Views | > 2 von 3 | Scroll Tracking |
| Company Analysis | > 2 | Click Tracking |
| Insight Read | > 60% | View Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `esgCompanies` Array (name, sector, e, s, g, carbon, risk)
- `esgCompany` State (selected index)

**Outputs:**
- User Education (keine direkten Daten-Outputs)

**Connected Components:**
- [Portfolio Builder](./17-portfolio-builder.md) - Vorheriger Schritt
- [Life Planning](./19-life-planning.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
const esgCompanies = [
  {
    name: 'TechGreen Inc.',
    sector: 'Technology',
    e: 88, s: 82, g: 91,
    carbon: 8,
    risk: 'Low'
  },
  {
    name: 'PetroMax Corp.',
    sector: 'Energy',
    e: 35, s: 58, g: 65,
    carbon: 124,
    risk: 'Critical'
  },
  {
    name: 'EcoFinance AG',
    sector: 'Finance',
    e: 76, s: 89, g: 94,
    carbon: 12,
    risk: 'Low'
  },
  {
    name: 'HeavyMetal GmbH',
    sector: 'Manufacturing',
    e: 42, s: 61, g: 72,
    carbon: 89,
    risk: 'High'
  },
];

// Score Color Logic
const getScoreColor = (score) => {
  if (score <= 40) return cssVars.colorRed;
  if (score <= 60) return cssVars.colorAmber;
  if (score <= 80) return cssVars.colorTeal;
  return cssVars.colorGreen;
};
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Echte Unternehmensdaten (API Integration) | Hoch | Hoch |
| **Hoch** | Portfolio ESG Score Aggregation | Medium | Hoch |
| **Mittel** | Controversy Screening | Medium | Mittel |
| **Mittel** | SDG Alignment Visualization | Medium | Mittel |
| **Niedrig** | Sector Benchmarking | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Search by Company** | Flexibler | Erfordert Daten-Backend |
| **Interactive ESG Calculator** | Hands-on | Komplexität |
| **Impact Visualization** | Emotionaler | Daten-Verfügbarkeit |
| **News Feed** | Aktuell | Maintenance-Aufwand |
| **Certification Explainer** | Tiefe | Kann trocken sein |

---

## 10. ESG Pillar Details

**Environmental (E)**
- Carbon Emissions
- Resource Efficiency
- Climate Risk Exposure
- Waste Management
- Biodiversity Impact

**Social (S)**
- Labor Practices
- Diversity & Inclusion
- Human Rights
- Community Relations
- Product Safety

**Governance (G)**
- Board Independence
- Executive Compensation
- Business Ethics
- Transparency
- Shareholder Rights

---

## 11. Sample Companies

| Company | Sector | E | S | G | Carbon (tCO₂e) | Risk |
|---------|--------|---|---|---|----------------|------|
| TechGreen Inc. | Technology | 88 | 82 | 91 | 8 | Low |
| PetroMax Corp. | Energy | 35 | 58 | 65 | 124 | Critical |
| EcoFinance AG | Finance | 76 | 89 | 94 | 12 | Low |
| HeavyMetal GmbH | Manufacturing | 42 | 61 | 72 | 89 | High |

**Carbon Footprint** = tCO₂ equivalent per €1M revenue

---

## 12. Key Insight

> "Meta-Analysen zeigen, dass ESG-Portfolios mindestens genauso gut performen wie konventionelle Portfolios. Sie übertreffen oft in Krisenzeiten aufgrund von besserem Risikomanagement."

---

## 13. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| ESG Rating Provider Integration | Open | Partnerships |
| Greenwashing Detection | Open | Research |
| EU Taxonomy Compliance | Open | Legal |

---

*Template Version: 1.0*
