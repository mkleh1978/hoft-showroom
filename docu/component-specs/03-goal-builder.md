# Component Spec: Goal Builder (Builder's Table)

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Education Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialEducation.jsx` (Builder Section) |

---

## 1. Purpose & Value Proposition

> Der Goal Builder ermöglicht Besuchern, persönliche Finanzziele zu definieren und mit interaktiven Projektionen zu visualisieren. Durch die Kombination von Zielauswahl, Timeline und monatlicher Sparrate wird die Kraft des Zinseszins greifbar gemacht.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die konkrete Sparziele setzen und visualisieren möchten |
| **Secondary** | Finanz-Einsteiger, die Zinseszins-Effekte verstehen wollen |

---

## 3. User Journey

```
[Assessment abgeschlossen] → [Ziel auswählen] → [Parameter anpassen] → [Projektion sehen] → [Zum Plan hinzufügen]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach CFPB-Assessment oder direkte Navigation |
| **Interaction** | Zielauswahl, Slider-Anpassung (Timeline, Sparrate) |
| **Output** | Projektion mit/ohne Wachstum, Progress-Visualisierung |
| **Next Action** | Ziel zum persönlichen Plan hinzufügen |

---

## 4. Core Features

- [x] 6 vordefinierte Zielkategorien mit Icons
- [x] Anpassbare Zielbeträge pro Kategorie
- [x] Timeline-Slider (1-20 Jahre)
- [x] Monthly Contribution Slider (50-2000)
- [x] 7% Wachstums-Projektion (Compound Interest)
- [x] Progress Bar zum Ziel
- [x] Goal Collection ("My Plan")
- [x] Custom Goal Eingabe

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Goals Added to Plan | > 1.5 avg | Analytics |
| Slider Interaction Rate | > 70% | Event Tracking |
| Time on Builder | 2-5 min | Session Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- GOALS Array (id, name, desc, icon, color)
- goalTargets State Object
- timeline, monthlyContribution State

**Outputs:**
- goals Array (gesammelte Ziele mit Parametern)
- projection Object (total, withGrowth)

**Connected Components:**
- [CFPB Assessment](./02-cfpb-assessment.md) - Vorheriger Schritt
- [Community Wall](./04-community-wall.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// Predefined Goals
const GOALS = [
  { id: 'home', name: 'Home', desc: 'Down payment', icon: Icons.home },
  { id: 'education', name: 'Education', desc: 'Skills investment', ... },
  { id: 'travel', name: 'Travel', desc: 'Experience world', ... },
  { id: 'emergency', name: 'Emergency', desc: '6mo expenses', ... },
  { id: 'retire', name: 'Retirement', desc: 'Long-term security', ... },
  { id: 'business', name: 'Business', desc: 'Start a venture', ... },
];

// Compound Interest Calculation
const calculateProjection = () => {
  const months = timeline * 12;
  const total = monthlyContribution * months;
  const withGrowth = monthlyContribution *
    ((Math.pow(1 + 0.07/12, months) - 1) / (0.07/12));
  return { total, withGrowth: Math.round(withGrowth) };
};
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Einstellbare Rendite-Annahme (nicht nur 7%) | Niedrig | Hoch |
| **Hoch** | Inflation-bereinigt Projektion | Niedrig | Hoch |
| **Mittel** | Multi-Goal Visualization (Gesamtportfolio) | Medium | Mittel |
| **Mittel** | Export als PDF/Bild | Medium | Mittel |
| **Mittel** | Risk-Szenarien (Bull/Bear/Base Case) | Medium | Mittel |
| **Niedrig** | Gamification: Achievements für Ziele | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Wizard-Flow** | Geführter Prozess | Weniger Flexibilität |
| **Chat-basierte Zieleingabe** | Natürlichere Interaktion | Komplexere Implementierung |
| **Template-basierte Pläne** | Schneller Start | Weniger Personalisierung |
| **Timeline-Visualization (Gantt)** | Bessere Übersicht | Komplexer für Einsteiger |
| **Monthly Budget Integration** | Realistischere Sparrate | Mehr Input vom User nötig |

---

## 10. Calculation Details

**Compound Interest Formula:**
```
FV = PMT × [((1 + r)^n - 1) / r]

Where:
- FV = Future Value
- PMT = Monthly Payment
- r = Monthly Rate (0.07/12)
- n = Number of Months
```

**Assumptions:**
- 7% Annual Return (historischer Aktienmarkt-Durchschnitt)
- Monatliche Einzahlung am Monatsende
- Keine Steuern berücksichtigt
- Keine Inflation berücksichtigt

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| 7% Rendite-Annahme zu optimistisch? | Open | Research |
| Rechtlicher Disclaimer nötig? | Open | Legal |
| Steuerliche Aspekte erwähnen? | Open | Content |
| Lokale Währungsformatierung | Open | i18n |

---

*Template Version: 1.0*
