# Component Spec: Emergency Fund Calculator

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Foundation Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialFoundation.jsx` (Emergency Section) |

---

## 1. Purpose & Value Proposition

> Der Emergency Fund Calculator hilft Besuchern, ihren persönlichen Notfallfonds-Zielwert zu berechnen, basierend auf monatlichen Ausgaben und persönlicher Situation. Er zeigt auch den Aufbauplan mit der aktuellen Sparrate.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die verstehen wollen, wie viel Notfallreserve sie brauchen |
| **Secondary** | Einsteiger ohne bestehenden Notfallfonds |

---

## 3. User Journey

```
[Four Pillars] → [Ausgaben eingeben] → [Situation wählen] → [Zielwert sehen] → [Aufbauplan verstehen]
```

| Step | Description |
|------|-------------|
| **Entry** | Via Navigation oder "Explore" bei Emergency Pillar |
| **Interaction** | Monatliche Ausgaben eingeben, Lebensituation wählen |
| **Output** | Persönlicher Notfallfonds-Zielwert |
| **Next Action** | Building Plan ansehen, weiter zu Debt Freedom |

---

## 4. Core Features

- [x] Eingabe monatlicher Fixausgaben
- [x] 4 Situationsprofile mit unterschiedlichen Multiplikatoren
- [x] Automatische Zielwert-Berechnung
- [x] Building Plan mit Sparrate aus Budget
- [x] Monate-bis-Ziel-Berechnung
- [x] Progress Bar (startet bei 0)
- [x] Educational Hint Box

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Calculation Completion | > 90% | Form Analytics |
| Situation Selection | > 95% | Click Tracking |
| "Important" Box Read | > 50% | Scroll Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `monthlyExpenses` State (Default: 2200)
- `emergencySituation` State (Default: 'single')
- `currentBudget.savings` from Budget Calculator

**Outputs:**
- `emergencyTarget` - Calculated target amount
- `monthsToGoal` - Time to reach target

**Connected Components:**
- [Budget Calculator](./06-budget-calculator.md) - Liefert Sparrate
- [Debt Freedom](./09-debt-freedom.md) - Nächster logischer Schritt

---

## 7. Technical Implementation

```jsx
// Situation Multipliers
const emergencyMultipliers = {
  single: { months: 3, label: 'Single, secure job' },
  family: { months: 4, label: 'Family, two incomes' },
  sole: { months: 6, label: 'Sole earner' },
  self: { months: 9, label: 'Self-employed' },
};

// Calculations
const emergencyTarget = monthlyExpenses *
  emergencyMultipliers[emergencySituation].months;

const monthlySavings = Math.round(budgetIncome * currentBudget.savings / 100);
const monthsToGoal = Math.ceil(emergencyTarget / monthlySavings);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Aktueller Notfallfonds-Stand eingeben | Niedrig | Hoch |
| **Hoch** | Progressive Goal (Start mit 1 Monat) | Niedrig | Mittel |
| **Mittel** | Expense Breakdown (Rent, Food, etc.) | Medium | Mittel |
| **Mittel** | Where to Keep Emergency Fund (Tagesgeld) | Niedrig | Mittel |
| **Niedrig** | Goal Achievement Celebration | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Tiered Goals** | Motivierender | Komplexere Darstellung |
| **Expense Categories** | Genauere Berechnung | Mehr User-Input |
| **Risk Assessment** | Personalisierter | Zusätzliche Fragen |
| **Visual Savings Jar** | Gamification | Kann kindisch wirken |
| **Emergency Scenarios** | Verständnis | Kann Angst machen |

---

## 10. Emergency Fund Guidelines

**Situation-based Recommendations:**

| Situation | Months | Rationale |
|-----------|--------|-----------|
| Single, secure job | 3 | Geringes Risiko, schnelle Job-Suche |
| Family, two incomes | 4 | Backup vorhanden, aber mehr Ausgaben |
| Sole earner | 6 | Höheres Risiko, Familie abhängig |
| Self-employed | 9-12 | Variable Einkommen, längerer Puffer |

**What to Include in Monthly Expenses:**
- Miete / Hypothek
- Nebenkosten (Strom, Gas, Wasser)
- Lebensmittel
- Versicherungen
- Mindest-Kreditraten
- Transport

**NOT included:**
- Entertainment
- Dining out
- Non-essential subscriptions

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Empfehlung für Anlageform | Open | Content |
| Inflation-Anpassung | Open | Finance |
| Regional angepasste Empfehlungen | Open | Research |

---

*Template Version: 1.0*
