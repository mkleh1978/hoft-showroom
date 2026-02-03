# Component Spec: AI Retirement Planner

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Protection Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Protection.jsx` (Planner Section) |

---

## 1. Purpose & Value Proposition

> Der AI Retirement Planner ist ein Chat-basiertes Interface, das in 3 Fragen die persönliche Rentenlücke berechnet: Alter, Bruttoeinkommen und bisherige Ersparnisse. Das Ergebnis zeigt die erwartete monatliche Rente vs. den benötigten Betrag.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Erwerbstätige, die ihre persönliche Rentenlücke kennen möchten |
| **Secondary** | Berufseinsteiger bei der Vorsorge-Planung |

---

## 3. User Journey

```
[Three Pillars] → [Chat Start] → [Alter eingeben] → [Einkommen] → [Ersparnisse] → [Ergebnis]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Three Pillars oder direkte Navigation |
| **Interaction** | 3 Chat-Fragen beantworten |
| **Output** | Rentenlücke in €/Monat |
| **Next Action** | Weiter zur Monte Carlo Simulation |

---

## 4. Core Features

- [x] Chat-basiertes Interface
- [x] 3-Schritt Datenerfassung
- [x] Typing-Indikator Animation
- [x] Progress Sidebar (4 Steps)
- [x] Automatische Rentenberechnung
- [x] Formatierte Ergebnis-Nachricht
- [x] CTA zum Monte Carlo Simulator

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Chat Completion | > 85% | Analytics |
| Time to Complete | < 90s | Session Duration |
| Monte Carlo Conversion | > 60% | Click Through |

---

## 6. Dependencies & Integration

**Inputs:**
- `chatMessages` Array
- `chatStep` State (0-3)
- `userData` Object (age, income, savings)

**Outputs:**
- `userData.pension` - Erwartete monatliche Rente
- `userData.required` - Benötigter monatlicher Betrag
- `userData.gap` - Rentenlücke

**Connected Components:**
- [Three Pillars](./10-three-pillars.md) - Vorheriger Schritt
- [Monte Carlo](./12-monte-carlo.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// Chat Flow
const chatQuestions = [
  { field: 'age', next: 'What\'s your approximate gross annual income?' },
  { field: 'income', next: 'And your current retirement savings?' },
  { field: 'savings', next: null },  // Triggers calculation
];

// Calculation (Simplified)
const pension = Math.round(income * 0.48 / 12);  // 48% replacement rate
const required = Math.round(income * 0.75 / 12);  // 75% of income needed
const gap = required - pension;

// Result Message
`📊 Expected monthly pension: €${pension}
💰 Required monthly income: €${required}
⚠️ Your pension gap: €${gap}/month`
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Detailliertere Fragen (Familienstand, bAV, etc.) | Medium | Hoch |
| **Hoch** | Integration echter Rentenrechner-Formeln | Medium | Hoch |
| **Mittel** | Voice Input Option | Medium | Mittel |
| **Mittel** | Speicherung für späteren Vergleich | Medium | Mittel |
| **Niedrig** | Animated AI Avatar | Hoch | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Form-basiert** | Schneller | Weniger engaging |
| **Wizard Steps** | Klar strukturiert | Weniger conversational |
| **Video + Form** | Erklärend | Längere Interaktion |
| **Integration mit DRV** | Echte Daten | Komplexität, Privacy |
| **Scenario Comparison** | Zeigt Optionen | Mehr Inputs nötig |

---

## 10. Calculation Methodology

**Assumptions:**
- 48% Replacement Rate (Durchschnitt gesetzliche Rente)
- 75% Income Needed in Retirement (Standard-Annahme)
- Linear Calculation (keine Compound-Effekte)

**Limitations:**
- Keine Berücksichtigung von bAV
- Keine Inflation
- Keine Steuereffekte
- Keine individuelle Rentenhistorie

**Future Improvements:**
- Integration mit Renteninformation
- Brutto/Netto-Unterscheidung
- Regionale Lebenshaltungskosten

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Genauere Rentenformel (DRV) | Open | Finance |
| Disclaimer für Schätzwerte | Open | Legal |
| GDPR bei Datenspeicherung | Open | Legal |

---

*Template Version: 1.0*
