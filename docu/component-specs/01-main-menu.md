# Component Spec: Main Menu & Navigation

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Core Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/App.jsx` |

---

## 1. Purpose & Value Proposition

> Das Main Menu ist der zentrale Einstiegspunkt des HoFT Ecosystem Showroom. Es ermöglicht Besuchern die Navigation zwischen den vier interaktiven Stationen und vermittelt einen ersten Eindruck des Gesamtkonzepts "Financial Wellbeing".

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Showroom-Besucher, die einen Überblick über alle verfügbaren Stationen suchen |
| **Secondary** | Veranstaltungsteilnehmer, die gezielt eine bestimmte Station ansteuern möchten |

---

## 3. User Journey

```
[App Start] → [Main Menu] → [Station Selection] → [Station Content] → [Back to Menu]
```

| Step | Description |
|------|-------------|
| **Entry** | Automatisch beim App-Start |
| **Interaction** | Benutzer wählt eine der 4 Station Cards aus |
| **Output** | Navigation zur ausgewählten Station |
| **Next Action** | "Back to Menu" Button in jeder Station |

---

## 4. Core Features

- [x] Responsive 2x2 Grid Layout für Station Cards
- [x] Hover-Effekte mit Transform und Shadow
- [x] Station-spezifische Farbkodierung
- [x] Tag-basierte Feature-Übersicht pro Station
- [x] Floating "Back to Menu" Button in allen Stationen
- [x] Gradient Header mit HoFT Branding

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Time to First Interaction | < 5s | Analytics |
| Station Selection Rate | > 90% | Click Tracking |
| Return to Menu Usage | > 50% | Navigation Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- Station-Konfiguration (id, title, subtitle, description, icon, color, tags)
- React State für `currentStation`

**Outputs:**
- Navigation State Update bei Station-Wahl
- Conditional Rendering der Station-Komponenten

**Connected Components:**
- [FinancialEducation](./02-cfpb-assessment.md)
- [FinancialFoundation](./06-budget-calculator.md)
- [Protection](./11-ai-retirement-planner.md)
- [Investment](./16-risk-profiling.md)

---

## 7. Technical Implementation

```jsx
// Station Configuration Array
const stations = [
  { id: 'education', number: 1, title: 'Financial Education', ... },
  { id: 'foundation', number: 2, title: 'Financial Foundation', ... },
  { id: 'protection', number: 3, title: 'Protection Point', ... },
  { id: 'investment', number: 4, title: 'Investment Corner', ... },
];

// State Management
const [currentStation, setCurrentStation] = useState(null);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | React Router Integration für Deep Linking | Medium | Hoch |
| **Hoch** | Progress Tracking über alle Stationen | Medium | Hoch |
| **Mittel** | Animated Station Transitions (Framer Motion) | Niedrig | Mittel |
| **Mittel** | Keyboard Navigation (a11y) | Niedrig | Mittel |
| **Niedrig** | Station Preview on Hover | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Carousel statt Grid** | Mehr Fokus auf einzelne Station | Weniger Übersicht, mehr Klicks |
| **Sidebar Navigation** | Persistent visible | Weniger immersive Experience |
| **Numbered Journey** | Klare Reihenfolge | Einschränkung der Benutzerfreiheit |
| **Gamified Unlock** | Engagement-Boost | Kann frustrieren, komplexere UX |

---

## 10. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Mobile Responsive Design fehlt | Open | Design Team |
| State geht bei Page Refresh verloren | Open | Dev Team |
| SEO-Optimierung für SPA | Open | Marketing |

---

*Template Version: 1.0*
