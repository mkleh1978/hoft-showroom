# Component Spec: European Pension Comparison

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Protection Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Protection.jsx` (Europe Section) |

---

## 1. Purpose & Value Proposition

> Die European Comparison zeigt Renten-Ersatzraten verschiedener europäischer Länder im Vergleich und verdeutlicht, dass Deutschland im Mittelfeld liegt. Dies kontextualisiert die Notwendigkeit privater Vorsorge.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die internationalen Vergleich suchen |
| **Secondary** | Expats oder Personen mit grenzüberschreitenden Karrieren |

---

## 3. User Journey

```
[Life Events] → [Ländervergleich sehen] → [Land auswählen] → [System verstehen] → [Key Insights]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Life Events oder direkte Navigation |
| **Interaction** | Animated Bar Chart betrachten, Land klicken |
| **Output** | Verständnis der unterschiedlichen Systeme |
| **Next Action** | Weiter zu Key Insights |

---

## 4. Core Features

- [x] 5 Länder im Vergleich (DE, CH, NL, AT, SE)
- [x] Animated Bar Chart
- [x] Flaggen-Icons für Länder
- [x] Click-to-expand Country Details
- [x] System-Typ-Labels (3-Pillar, Quasi-Mandatory, etc.)
- [x] Replacement Rate als Hauptmetrik

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Country Clicks | > 2 | Click Tracking |
| Animation Watch | > 80% | View Analytics |
| Detail Read | > 50% | Expansion Rate |

---

## 6. Dependencies & Integration

**Inputs:**
- `countries` Array (code, flag, name, rate, system, detail, color)
- `selectedCountry` State
- `barsAnimated` State for Animation

**Outputs:**
- User Education (keine direkten Daten-Outputs)

**Connected Components:**
- [Life Events](./13-life-events.md) - Vorheriger Schritt
- [Key Insights](./12-monte-carlo.md) - Abschluss Station 3

---

## 7. Technical Implementation

```jsx
const countries = [
  {
    code: 'DE',
    flag: '🇩🇪',
    name: 'Germany',
    rate: 48,
    system: '3-Pillar System',
    detail: 'Declining public pension with voluntary occupational and private pillars.',
    color: colors.teal
  },
  {
    code: 'NL',
    flag: '🇳🇱',
    name: 'Netherlands',
    rate: 70,
    system: 'Quasi-Mandatory',
    detail: 'Excellent occupational coverage through industry-wide pension funds.',
    color: '#6366F1'
  },
  // ...
];

// Animation Trigger
useEffect(() => {
  if (activeSection === 'europe') {
    setTimeout(() => setBarsAnimated(true), 300);
  }
}, [activeSection]);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Mehr Länder (UK, FR, IT, ES) | Niedrig | Mittel |
| **Hoch** | Interactive Map statt Bars | Medium | Hoch |
| **Mittel** | Historische Entwicklung (Trend) | Medium | Mittel |
| **Mittel** | Pro/Contra Tabelle pro System | Niedrig | Mittel |
| **Niedrig** | Expat-Relevanz-Filter | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Interactive Map** | Geografisch intuitiv | Komplexere Implementierung |
| **Radar Chart** | Multidimensional | Kann überfordern |
| **Timeline** | Zeigt Entwicklung | Mehr Daten nötig |
| **Personal Calculator** | "Was wäre wenn ich dort lebe" | Komplexe Daten |
| **Expert Interviews** | Tiefe Insights | Hoher Content-Aufwand |

---

## 10. Country Data

| Country | Flag | Rate | System | Key Feature |
|---------|------|------|--------|-------------|
| Germany | 🇩🇪 | 48% | 3-Pillar | Sinkende GRV, freiwillige bAV |
| Switzerland | 🇨🇭 | 59% | Mandatory 3-Pillar | Obligatorische 2. Säule |
| Netherlands | 🇳🇱 | 70% | Quasi-Mandatory | Starke Branchenpensionskassen |
| Austria | 🇦🇹 | 78% | Pay-as-you-go | Großzügige staatliche Rente |
| Sweden | 🇸🇪 | 55% | NDC + Premium | Notional Defined Contribution |

**Note:** Replacement Rate = Rente als % des letzten Nettoeinkommens

---

## 11. System Type Explanations

**3-Pillar System (DE, CH)**
- Säule 1: Staatliche Rente
- Säule 2: Betriebliche Vorsorge
- Säule 3: Private Vorsorge

**Pay-as-you-go (AT)**
- Aktive Zahler finanzieren aktuelle Rentner
- Generationenvertrag
- Anfällig für demografischen Wandel

**Quasi-Mandatory (NL)**
- Branchenweite Pensionskassen
- Automatische Mitgliedschaft
- Sehr hohe Abdeckung (~90%)

**NDC (SE)**
- Notional Defined Contribution
- Individuelle Konten, staatlich verwaltet
- Bonus: Private Premium-Pension

---

## 12. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Aktuelle OECD Daten | Open | Research |
| Brexit-Auswirkungen (UK) | Open | Content |
| EU-weite Rentenreformen | Ongoing | Legal |

---

*Template Version: 1.0*
