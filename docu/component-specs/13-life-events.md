# Component Spec: Life Events Simulator

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Protection Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Protection.jsx` (Events Section) |

---

## 1. Purpose & Value Proposition

> Der Life Events Simulator zeigt die finanziellen Auswirkungen wichtiger Lebensereignisse (Geburt, Heirat, Jobverlust, Krankheit, Scheidung, Berufsunfähigkeit) und sensibilisiert für notwendige Absicherungen.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Erwerbstätige, die Risiken verstehen und absichern wollen |
| **Secondary** | Junge Erwachsene vor wichtigen Lebensentscheidungen |

---

## 3. User Journey

```
[Monte Carlo] → [Event Cards sehen] → [Event auswählen] → [Impact lesen] → [Handlungsempfehlung]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Monte Carlo oder direkte Navigation |
| **Interaction** | Klick auf Life Event Card |
| **Output** | Finanzielle Auswirkung und Empfehlung |
| **Next Action** | Weitere Events oder EU Comparison |

---

## 4. Core Features

- [x] 6 vordefinierte Life Events mit Icons
- [x] Farbkodierte Dringlichkeit (Teal, Green, Amber, Red)
- [x] Click-to-expand Detail Card
- [x] Financial Impact Statement
- [x] Action/Urgency Recommendation
- [x] Grid Layout (3x2)

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Events Explored | > 2 | Click Tracking |
| Detail Read Rate | > 60% | Expansion Analytics |
| Urgency Badges Viewed | > 80% | Display Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `lifeEvents` Array (id, icon, name, impact, color, detail, urgency)
- `selectedEvent` State

**Outputs:**
- User Education (keine direkten Daten-Outputs)

**Connected Components:**
- [Monte Carlo](./12-monte-carlo.md) - Vorheriger Schritt
- [European Comparison](./14-european-comparison.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
const lifeEvents = [
  {
    id: 'birth',
    icon: Icons.baby,
    name: 'Birth',
    impact: '~€250k/child',
    color: colors.teal,
    detail: 'Having a child costs approximately €250,000 until age 18...',
    urgency: 'Start education savings early.'
  },
  {
    id: 'disability',
    icon: Icons.shield,
    name: 'Disability',
    impact: '30-40% coverage',
    color: colors.red,
    detail: '1 in 4 workers becomes disabled...',
    urgency: 'HIGH PRIORITY: Get BU insurance.'
  },
  // ...
];
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Interaktive Impact-Simulation auf eigene Daten | Hoch | Hoch |
| **Hoch** | Versicherungs-Checklist pro Event | Medium | Hoch |
| **Mittel** | Timeline: Wann Events typisch passieren | Medium | Mittel |
| **Mittel** | Success Stories / Case Studies | Medium | Mittel |
| **Niedrig** | Links zu Versicherungspartnern | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Interactive Timeline** | Chronologischer Kontext | Komplexere UI |
| **Risk Assessment Quiz** | Personalisiert | Mehr User-Input |
| **Scenario Planner** | "Was wäre wenn" | Hoher Aufwand |
| **Real-life Stories** | Emotionale Verbindung | Kann beunruhigen |
| **Insurance Comparison** | Actionable | Werblicher Charakter |

---

## 10. Life Events Details

| Event | Financial Impact | Key Risk | Urgency |
|-------|-----------------|----------|---------|
| **Birth** | ~€250k/Kind bis 18 | Bildungskosten | Früh sparen |
| **Marriage** | Tax Benefits | Risikokonzentration | Begünstigte prüfen |
| **Job Loss** | 60-67% Einkommen | 12-24 Monate Limit | 6 Monate Notfallfonds |
| **Illness** | 70% für 78 Wochen | Erwerbsminderung | BU prüfen |
| **Divorce** | 50/50 Split | Doppelte Kosten | Individuelle Vorsorge |
| **Disability** | 30-40% Coverage | 1 von 4 betroffen | HOHE PRIORITÄT |

---

## 11. Educational Content

**Statistiken:**
- 1 von 4 Arbeitnehmern wird vor der Rente berufsunfähig
- Nur 30-40% Absicherung durch staatliche Erwerbsminderungsrente
- Krankengeld: 6 Wochen 100%, dann 78 Wochen 70%

**Empfehlungen:**
- Berufsunfähigkeitsversicherung (BU) frühzeitig abschließen
- Notfallfonds vor großen Lebensereignissen aufbauen
- Regelmäßige Überprüfung der Begünstigten

---

## 12. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Aktuelle Sozialversicherungs-Zahlen | Open | Research |
| Länder-spezifische Unterschiede | Open | Content |
| Fear-Factor vs. Information Balance | Open | UX |

---

*Template Version: 1.0*
