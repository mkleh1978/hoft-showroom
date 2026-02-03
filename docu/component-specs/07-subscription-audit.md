# Component Spec: Subscription Audit

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Foundation Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialFoundation.jsx` (Budget Section - Sidebar) |

---

## 1. Purpose & Value Proposition

> Der Subscription Audit hilft Besuchern, ihre regelmäßigen Abonnements zu überprüfen und Einsparpotenziale zu identifizieren. Durch das Togglen zwischen "needed" und "not needed" wird das monatliche Einsparpotenzial sofort sichtbar.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen mit mehreren aktiven Subscriptions |
| **Secondary** | Budget-bewusste Nutzer, die Fixkosten optimieren wollen |

---

## 3. User Journey

```
[Budget Calculator] → [Subscriptions sehen] → [Toggle "needed"] → [Potential Savings sehen]
```

| Step | Description |
|------|-------------|
| **Entry** | Automatisch sichtbar im Budget Section Sidebar |
| **Interaction** | Toggle-Buttons für jede Subscription |
| **Output** | Summierte Einsparung für "nicht benötigte" Abos |
| **Next Action** | Weiterer Budget-Optimierung oder Emergency Fund |

---

## 4. Core Features

- [x] Liste vordefinierter Subscriptions mit Preisen
- [x] Toggle "needed/not needed" per Klick
- [x] Echtzeit-Berechnung des Totals
- [x] Highlight Box mit Einsparpotenzial
- [x] Visual Feedback (Opacity für nicht-benötigte)
- [x] Checkmark für benötigte Items

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Toggle Interaction Rate | > 60% | Event Tracking |
| Items Marked "Not Needed" | > 25% | State Analytics |
| Potential Savings Display | Always visible | UI Check |

---

## 6. Dependencies & Integration

**Inputs:**
- `subscriptions` State Array (id, name, amount, needed)

**Outputs:**
- `totalSubscriptions` - Summe aller Abos
- `potentialSavings` - Summe der "nicht benötigten" Abos

**Connected Components:**
- [Budget Calculator](./06-budget-calculator.md) - Parent Section

---

## 7. Technical Implementation

```jsx
// Initial Subscriptions
const [subscriptions, setSubscriptions] = useState([
  { id: 1, name: 'Netflix', amount: 12.99, needed: true },
  { id: 2, name: 'Spotify', amount: 9.99, needed: true },
  { id: 3, name: 'Disney+', amount: 8.99, needed: false },
  { id: 4, name: 'Gym', amount: 29.99, needed: true },
  { id: 5, name: 'Fitness App', amount: 14.99, needed: false },
  { id: 6, name: 'Cloud Storage', amount: 9.99, needed: true },
  { id: 7, name: 'Magazine', amount: 7.99, needed: false },
  { id: 8, name: 'Meditation', amount: 12.99, needed: false },
]);

// Calculations
const totalSubscriptions = subscriptions.reduce((sum, s) => sum + s.amount, 0);
const potentialSavings = subscriptions
  .filter(s => !s.needed)
  .reduce((sum, s) => sum + s.amount, 0);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Eigene Subscriptions hinzufügen/entfernen | Niedrig | Hoch |
| **Hoch** | Kategorisierung (Entertainment, Utility, etc.) | Niedrig | Mittel |
| **Mittel** | Jährliche Kostenprojektion | Niedrig | Mittel |
| **Mittel** | "Last used" Indikator (simuliert) | Medium | Mittel |
| **Niedrig** | Integration mit echten Bank-Daten | Hoch | Hoch |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Bank API Integration** | Echte Daten | Komplexität, Datenschutz |
| **Drag & Drop Sorting** | Intuitive UX | Übertrieben für einfache Liste |
| **Priority Ranking** | Zeigt Wichtigkeit | Zusätzlicher Input nötig |
| **Cost-Per-Use Analyse** | Wertvolle Insights | Erfordert Nutzungsdaten |
| **Alternative Suggestions** | Actionable | Werblicher Charakter |

---

## 10. Sample Subscriptions (Default)

| Service | Monthly Cost | Category |
|---------|-------------|----------|
| Netflix | €12.99 | Entertainment |
| Spotify | €9.99 | Entertainment |
| Disney+ | €8.99 | Entertainment |
| Gym | €29.99 | Health |
| Fitness App | €14.99 | Health |
| Cloud Storage | €9.99 | Utility |
| Magazine | €7.99 | Media |
| Meditation | €12.99 | Health |

**Total:** €107.90/month
**Typical "Not Needed":** €44.96/month (41%)

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Lokalisierte Subscription-Beispiele | Open | Content |
| Persistenz der Auswahl | Open | Dev |
| Dark Patterns vermeiden | Open | Ethics |

---

*Template Version: 1.0*
