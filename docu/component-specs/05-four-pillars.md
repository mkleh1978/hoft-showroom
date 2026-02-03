# Component Spec: Four Pillars of Financial Stability

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Foundation Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialFoundation.jsx` (Pillars Section) |

---

## 1. Purpose & Value Proposition

> Die Four Pillars-Übersicht präsentiert die Grundbausteine finanzieller Stabilität: Finanzüberblick, Budget & Cash Flow, Notfallfonds und Schuldenfreiheit. Sie bildet den konzeptionellen Rahmen für alle weiteren Interaktionen in Station 2.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die ihre finanzielle Basis strukturiert aufbauen möchten |
| **Secondary** | Finanz-Einsteiger, die verstehen wollen, was "Financial Foundation" bedeutet |

---

## 3. User Journey

```
[Welcome] → [Four Pillars Overview] → [Pillar Selection] → [Detail Section] → [Interactive Tool]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Welcome-Screen oder direkte Navigation |
| **Interaction** | Exploration der 4 Pillar Cards |
| **Output** | Verständnis des Konzepts, Navigation zu Details |
| **Next Action** | Klick auf "Explore" führt zum jeweiligen Tool |

---

## 4. Core Features

- [x] 4 Pillar Cards mit Icon, Titel, Beschreibung
- [x] Key-Statistik pro Pillar
- [x] Quick-Navigation zu jeweiligem Detail-Tool
- [x] "Core Message" Highlight Box
- [x] Educational Content (27% ohne Überblick, 3x mehr Sparen, etc.)

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Pillar Exploration Rate | > 60% (mind. 2 von 4) | Click Tracking |
| Core Message Read Time | > 10s | Scroll Analytics |
| Navigation to Tools | > 80% | Click Through Rate |

---

## 6. Dependencies & Integration

**Inputs:**
- Pillar Configuration (icon, title, desc, stat, statLabel, section)

**Outputs:**
- Navigation State Change zu Budget/Emergency/Debt Sections

**Connected Components:**
- [Budget Calculator](./06-budget-calculator.md)
- [Emergency Fund](./08-emergency-fund.md)
- [Debt Freedom](./09-debt-freedom.md)

---

## 7. Technical Implementation

```jsx
// Pillar Data Structure
const pillars = [
  {
    icon: Icons.barChart,
    title: 'Financial Overview',
    desc: 'Record all accounts, contracts, liabilities',
    stat: '27%',
    statLabel: 'lack overview',
    section: 'budget'
  },
  {
    icon: Icons.wallet,
    title: 'Budget & Cash Flow',
    stat: '3x',
    statLabel: 'more savings',
    section: 'budget'
  },
  // ...
];
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Progress Tracking pro Pillar (Checklist) | Medium | Hoch |
| **Hoch** | Personalisierte Empfehlung basierend auf CFPB-Score | Medium | Hoch |
| **Mittel** | Interactive Pillar "Health Check" | Medium | Mittel |
| **Mittel** | Video-Erklärungen pro Pillar | Hoch | Mittel |
| **Niedrig** | Pillar Completion Badges | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Step-by-Step Wizard** | Strukturierter Ablauf | Weniger Flexibilität |
| **Priority Matrix** | Zeigt Dringlichkeit | Komplexer für Einsteiger |
| **Pyramid Visualization** | Visualisiert Hierarchie | Kann verwirrend sein |
| **Progress Dashboard** | Gamification | Erfordert mehr User-Input |
| **Quiz-basierte Navigation** | Personalisiert | Längerer Einstieg |

---

## 10. Educational Content

**Key Statistics:**
- 27% der Deutschen haben keinen finanziellen Überblick
- 52% haben wöchentliche Geldsorgen
- Automatisches Sparen führt zu 3x mehr Erspartem
- Dispo-Zinsen: 12-15% p.a. (teuerster Kredit)

**Core Message:**
> "Budget, Notfallfonds, Schuldenfreiheit — das sind die drei Säulen der finanziellen Freiheit. Bevor man an Vermögensaufbau oder Altersvorsorge denkt, muss das Fundament stehen."

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Quellenangaben für Statistiken | Open | Content |
| Lokalisierung der Stats für DE | Open | Research |
| Mobile Layout für 4 Cards | Open | Design |

---

*Template Version: 1.0*
