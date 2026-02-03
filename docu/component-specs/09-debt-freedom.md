# Component Spec: Debt Freedom Simulator

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Foundation Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialFoundation.jsx` (Debt Section) |

---

## 1. Purpose & Value Proposition

> Der Debt Freedom Simulator zeigt die Auswirkungen verschiedener Schuldenabbau-Strategien (Avalanche vs Snowball) und Extra-Zahlungen auf die Zeit bis zur Schuldenfreiheit und die gesparten Zinsen.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen mit Konsumschulden, die einen Abbauplan suchen |
| **Secondary** | Finanz-Interessierte, die Strategien verstehen wollen |

---

## 3. User Journey

```
[Four Pillars] → [Schuldenübersicht] → [Extra-Zahlung wählen] → [Strategie wählen] → [Projektion sehen]
```

| Step | Description |
|------|-------------|
| **Entry** | Via Navigation oder Pillar "Explore" |
| **Interaction** | Extra-Payment Slider, Strategie-Auswahl |
| **Output** | Sortierte Schulden-Liste, Projektion, Zinsersparnis |
| **Next Action** | Key Insights oder andere Station |

---

## 4. Core Features

- [x] Vordefinierte Beispiel-Schulden (Dispo, Elektronik, Möbel)
- [x] Extra Monthly Payment Slider (0-500)
- [x] Avalanche vs Snowball Strategie-Auswahl
- [x] Automatische Priorisierungsliste
- [x] Debt-Free-Projection (Monate)
- [x] Interest Saved Calculation
- [x] Overdraft Warning Box

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Slider Interaction | > 70% | Event Tracking |
| Strategy Toggle | > 50% | Click Tracking |
| Aha-Moment: Interest Saved | Viewed | Scroll Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `debts` Array (id, name, amount, rate, minPayment)
- `debtMethod` State ('avalanche' | 'snowball')
- `extraPayment` State (0-500)

**Outputs:**
- `sortedDebts` - Priorisierte Liste
- `debtFreeMonths` - Zeit bis Schuldenfreiheit
- `interestSaved` - Gesparte Zinsen vs Minimum

**Connected Components:**
- [Emergency Fund](./08-emergency-fund.md) - Vorheriger Schritt
- [Key Insights](./05-four-pillars.md) - Abschluss Station 2

---

## 7. Technical Implementation

```jsx
// Sample Debts
const debts = [
  { id: 1, name: 'Overdraft', amount: 2500, rate: 12, minPayment: 50 },
  { id: 2, name: 'Electronics Loan', amount: 3000, rate: 10, minPayment: 80 },
  { id: 3, name: 'Furniture Loan', amount: 3000, rate: 8, minPayment: 70 },
];

// Sorting Logic
const sortedDebts = [...debts].sort((a, b) =>
  debtMethod === 'avalanche'
    ? b.rate - a.rate  // Highest interest first
    : a.amount - b.amount  // Smallest balance first
);

// Calculations
const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
const totalInterest = debts.reduce((sum, d) => sum + (d.amount * d.rate / 100), 0);
const debtFreeMonths = Math.ceil(totalDebt / (200 + extraPayment));
const interestSaved = Math.round(totalInterest * 0.3 * (extraPayment / 100));
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Eigene Schulden eingeben | Medium | Hoch |
| **Hoch** | Monatliche Zahlungs-Timeline | Medium | Hoch |
| **Mittel** | Visual Payoff Calendar | Medium | Mittel |
| **Mittel** | Comparison: Avalanche vs Snowball Ergebnis | Niedrig | Mittel |
| **Niedrig** | Refinancing-Optionen zeigen | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Gamified Debt Payoff** | Motivierend | Kann Schulden-Ernst minimieren |
| **Progress Visualization** | Satisfaction | Erfordert Eingabe des Startpunkts |
| **Peer Comparison** | Motivation | Privacy-Bedenken |
| **Automated Payment Plan** | Actionable | Komplexität |
| **Debt Consolidation Calculator** | Hilfreich | Werblicher Charakter |

---

## 10. Strategy Comparison

**Avalanche Method (Mathematically Optimal)**
- Höchster Zinssatz zuerst abbezahlen
- Minimiert Gesamtzinsen
- Kann länger dauern für ersten "Win"

**Snowball Method (Psychologically Effective)**
- Kleinste Schuld zuerst abbezahlen
- Schnelle Erfolgserlebnisse
- Mathematisch suboptimal, aber höhere Erfolgsquote

**HoFT Recommendation:**
> "Avalanche spart mehr Geld. Snowball liefert schnelle psychologische Wins. Wähle, was dich am besten motiviert!"

---

## 11. Educational Content

**Overdraft Warning:**
- Dispo-Zinsen: 12-15% p.a.
- Teuerster Verbraucherkredit
- Sollte ERSTE Priorität sein

**General Tips:**
- Mindest-Zahlungen auf allen Schulden halten
- Extra-Zahlungen auf Fokus-Schuld konzentrieren
- Kein neues Dispo nutzen während Abbau

---

## 12. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Reale Zinsberechnung (Compound) | Open | Dev |
| Disclaimer für finanzielle Beratung | Open | Legal |
| Negative Zinsen (Dispo) genau modellieren | Open | Finance |

---

*Template Version: 1.0*
