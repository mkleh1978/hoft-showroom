# Component Spec: Budget Calculator

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Foundation Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialFoundation.jsx` (Budget Section) |

---

## 1. Purpose & Value Proposition

> Der Budget Calculator ermöglicht die interaktive Anwendung verschiedener Budgetierungsmethoden (50-30-20, Zero-Based, Pay Yourself First) auf das persönliche Nettoeinkommen und visualisiert die resultierende Aufteilung.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die eine Budgetierungsmethode für sich finden möchten |
| **Secondary** | Finanz-Einsteiger, die Budgetierung verstehen wollen |

---

## 3. User Journey

```
[Four Pillars] → [Einkommen eingeben] → [Methode wählen] → [Aufteilung sehen] → [Subscriptions prüfen]
```

| Step | Description |
|------|-------------|
| **Entry** | Via "Explore" Button vom Four Pillars oder Navigation |
| **Interaction** | Einkommen eingeben, Budgetmethode auswählen |
| **Output** | Visualisierte Aufteilung in Needs/Wants/Savings |
| **Next Action** | Subscription Audit durchführen |

---

## 4. Core Features

- [x] Netto-Einkommens-Eingabe mit Currency Prefix
- [x] 3 Budgetmethoden mit Beschreibung
- [x] Stacked Bar Visualization der Aufteilung
- [x] Betragsberechnung pro Kategorie
- [x] Radio-Button-Style Methodenauswahl
- [x] Integration mit Subscription Audit

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Method Selection Rate | > 90% | Click Tracking |
| Income Input Completion | > 85% | Form Analytics |
| Subscription Audit Engagement | > 50% | Section View |

---

## 6. Dependencies & Integration

**Inputs:**
- `budgetIncome` State (Default: 3500)
- `budgetMethod` State (Default: '50-30-20')
- budgetMethods Configuration Object

**Outputs:**
- Calculated amounts for Needs, Wants, Savings
- Integration mit Subscription Audit Savings

**Connected Components:**
- [Subscription Audit](./07-subscription-audit.md) - Sidebar Integration
- [Emergency Fund](./08-emergency-fund.md) - Uses savings rate

---

## 7. Technical Implementation

```jsx
// Budget Methods Configuration
const budgetMethods = {
  '50-30-20': { needs: 50, wants: 30, savings: 20 },
  'zero-based': { needs: 55, wants: 25, savings: 20 },
  'pay-yourself': { needs: 50, wants: 20, savings: 30 },
};

// Calculation
const currentBudget = budgetMethods[budgetMethod];
const monthlySavings = Math.round(budgetIncome * currentBudget.savings / 100);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Custom-Prozentsatz-Anpassung | Niedrig | Hoch |
| **Hoch** | Kategorie-Breakdown (Rent, Food, etc.) | Medium | Hoch |
| **Mittel** | Historischer Vergleich (wenn wiederholt) | Medium | Mittel |
| **Mittel** | Export als Budget-Plan PDF | Medium | Mittel |
| **Niedrig** | "Recommended" Badge für Einsteiger | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Expense Tracker Integration** | Echte Daten | Datenschutz, Komplexität |
| **AI-basierte Empfehlung** | Personalisiert | Black-Box-Effekt |
| **Gamified Budget Game** | Engagement | Kann unseriös wirken |
| **Envelope Budgeting** | Visuell ansprechend | Komplexere UI |
| **Monatliche Challenge** | Motivation | Erfordert Persistenz |

---

## 10. Budget Methods Explained

**50-30-20 Rule (Elizabeth Warren)**
- 50% Needs: Fixkosten, Miete, Versicherung
- 30% Wants: Entertainment, Hobbies, Essen gehen
- 20% Savings: Notfallfonds, Investitionen, Schuldenabbau

**Zero-Based Budgeting**
- Jeder Euro bekommt eine Aufgabe
- Höherer Kontrollgrad, mehr Aufwand
- 55% Needs, 25% Wants, 20% Savings

**Pay Yourself First**
- Sparen hat höchste Priorität
- Automatische Überweisungen am Monatsanfang
- 50% Needs, 20% Wants, 30% Savings

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Steuerliche Aspekte (Brutto vs Netto) | Open | Content |
| Validierung der Eingabe (Min/Max) | Open | Dev |
| Mobile Input Optimierung | Open | UX |

---

*Template Version: 1.0*
