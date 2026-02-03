# UX Guidelines & User Experience Documentation

| Field | Description |
|-------|-------------|
| **Owner** | HoFT UX Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Version** | 1.0 |

---

## 1. UX Vision

> **"Financial Wellbeing für alle zugänglich machen"**
>
> Der HoFT Ecosystem Showroom soll komplexe Finanzthemen verständlich, interaktiv und einladend präsentieren. Der Besucher soll sich informiert, nicht überfordert fühlen.

---

## 2. Design Principles

### 2.1 Clarity Over Cleverness
- Klare, selbsterklärende Labels
- Keine Fachbegriffe ohne Erklärung
- Konsistente Terminologie

### 2.2 Progressive Disclosure
- Erst Überblick, dann Details
- Expandable Sections für Tiefe
- "Learn More" statt Info-Overload

### 2.3 Immediate Feedback
- Jede Interaktion hat sichtbares Ergebnis
- Real-time Berechnungen
- Visual State Changes

### 2.4 Empowerment Over Fear
- Positive Framing (Chancen, nicht nur Risiken)
- Actionable Insights
- "You're not alone" Messaging

---

## 3. User Personas

### 3.1 Der Finanz-Neuling (Primary)

| Attribut | Beschreibung |
|----------|--------------|
| **Alter** | 25-35 |
| **Erfahrung** | Gering, erste Berührung mit Finanzplanung |
| **Motivation** | "Ich weiß, ich sollte mich darum kümmern" |
| **Pain Points** | Überforderung, Fachjargon, "Wo anfangen?" |
| **Needs** | Struktur, Validation, Quick Wins |

### 3.2 Der Optimierer (Secondary)

| Attribut | Beschreibung |
|----------|--------------|
| **Alter** | 35-50 |
| **Erfahrung** | Mittel, hat bereits Produkte |
| **Motivation** | "Mache ich das richtig?" |
| **Pain Points** | Zu viele Optionen, keine Benchmark |
| **Needs** | Vergleich, Validierung, Optimierung |

### 3.3 Der Interessierte Besucher (Tertiary)

| Attribut | Beschreibung |
|----------|--------------|
| **Alter** | Variabel |
| **Erfahrung** | Variabel |
| **Motivation** | Neugier, Showroom-Besuch |
| **Pain Points** | Begrenzte Zeit |
| **Needs** | Schnelle Einblicke, "Aha-Momente" |

---

## 4. User Flows

### 4.1 Haupt-Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│                        MAIN MENU                                 │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│    │Station 1 │ │Station 2 │ │Station 3 │ │Station 4 │         │
│    │Education │ │Foundation│ │Protection│ │Investment│         │
│    └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘         │
└─────────┼────────────┼────────────┼────────────┼────────────────┘
          │            │            │            │
          ▼            ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Welcome  │ │ Welcome  │ │ Welcome  │ │ Welcome  │
    └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
         │            │            │            │
         ▼            ▼            ▼            ▼
    [Sub-Sections] [Sub-Sections] [Sub-Sections] [Sub-Sections]
```

### 4.2 Intra-Station Flow (Beispiel: Station 1)

```
Welcome → Assessment → Results → Goals → Community → Insights
    │                              │
    └──────────────────────────────┘
              (Skip möglich)
```

### 4.3 Cross-Station Data Flow (Konzept)

```
Station 1: CFPB Score ────┬─────► Station 2: Budget-Empfehlung
                          │
                          ├─────► Station 3: Renten-Projektion
                          │
                          └─────► Station 4: Risk-Profil-Anpassung
```

---

## 5. Information Architecture

### 5.1 Content Hierarchy

```
Level 0: Showroom Entry (Main Menu)
│
├── Level 1: Station Welcome (Überblick, Why it matters)
│   │
│   ├── Level 2: Core Features (Interactive Tools)
│   │   │
│   │   └── Level 3: Deep Dive (Details on Expand)
│   │
│   └── Level 2: Key Insights (Aha Moments)
│
└── Level 1: Global Navigation (Back to Menu)
```

### 5.2 Navigation Patterns

| Pattern | Wo verwendet | Verhalten |
|---------|--------------|-----------|
| Tab Navigation | Intra-Station | Sticky, numbered |
| Card Selection | Main Menu | Click = Navigate |
| Expandable Cards | Three Pillars, Life Events | Click = Toggle Detail |
| Floating Button | Alle Stationen | "Back to Menu" |

---

## 6. Interaction Patterns

### 6.1 Input Types

| Input | UI Element | Feedback |
|-------|------------|----------|
| Single Choice | Radio Buttons / Cards | Highlight Selection |
| Range Value | Slider | Real-time Value Display |
| Numeric Input | Text Field + € Prefix | Validation |
| Multi-Step | Chat Interface | Typing Indicator |
| Toggle | Clickable Card | Opacity + Checkmark |

### 6.2 Feedback Patterns

| Action | Feedback | Timing |
|--------|----------|--------|
| Hover | Transform + Shadow | Instant |
| Click | Color Change | Instant |
| Submit | Loading State → Result | 300-800ms |
| Calculation | Animated Number | 500ms |
| Simulation | Progressive Reveal | Real-time |

### 6.3 Micro-Interactions

```javascript
// Button Hover
onMouseEnter: transform: 'scale(1.05)', boxShadow: 'elevated'
onMouseLeave: transform: 'scale(1)', boxShadow: 'default'

// Card Selection
onClick: border: '2px solid teal', background: 'lightTeal'

// Progress Animation
transition: 'width 0.3s ease'
```

---

## 7. Content Guidelines

### 7.1 Tone of Voice

| Prinzip | Beispiel |
|---------|----------|
| **Informativ, nicht belehrend** | "27% der Deutschen..." statt "Sie sollten wissen..." |
| **Ermutigend, nicht alarmierend** | "Du bist auf gutem Weg" statt "Das reicht nicht" |
| **Konkret, nicht vage** | "€800-1.200/Monat" statt "signifikante Summe" |
| **Handlungsorientiert** | "Start Assessment" statt "Mehr erfahren" |

### 7.2 Number Formatting

| Type | Format | Example |
|------|--------|---------|
| Currency | €X.XXX | €12.500 |
| Percentage | X% | 48% |
| Large Numbers | Xk | 250k |
| Decimals | X,X% | 7,5% |

### 7.3 Error Messages (Geplant)

| Situation | Message |
|-----------|---------|
| Input Required | "Bitte gib einen Wert ein" |
| Invalid Number | "Bitte gib eine gültige Zahl ein" |
| Out of Range | "Wert muss zwischen X und Y liegen" |

---

## 8. Accessibility (Current State)

### 8.1 Implemented

- [x] Semantische HTML-Struktur (header, nav, main, footer)
- [x] Farben mit ausreichendem Kontrast (meistens)
- [x] Fokus-States auf Buttons

### 8.2 Missing (Verbesserungspotenzial)

- [ ] ARIA Labels auf allen interaktiven Elementen
- [ ] Keyboard Navigation (Tab Order)
- [ ] Screen Reader Announcements
- [ ] Skip Links
- [ ] Focus Visible Styles
- [ ] Reduced Motion Support

### 8.3 Color Contrast Check

| Combination | Ratio | Status |
|-------------|-------|--------|
| Deep Navy on White | 14.5:1 | ✅ AAA |
| Teal on White | 4.8:1 | ✅ AA |
| Steel Gray on White | 4.7:1 | ⚠️ AA (borderline) |
| White on Teal | 4.8:1 | ✅ AA |

---

## 9. Performance UX

### 9.1 Perceived Performance

| Technik | Implementiert |
|---------|---------------|
| Skeleton Screens | ❌ |
| Optimistic Updates | ✅ (Real-time calculations) |
| Progress Indicators | ✅ (Simulations) |
| Lazy Loading | ❌ |

### 9.2 Loading States

```javascript
// Simulation Running
{simulationRunning && (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Spinner />
    <span>Running scenario {count} of 500...</span>
    <ProgressBar value={count/500} />
  </div>
)}

// Chat Typing
{isTyping && (
  <div style={{ display: 'flex', gap: '6px' }}>
    <Dot animate /> <Dot animate delay={0.2} /> <Dot animate delay={0.4} />
  </div>
)}
```

---

## 10. Mobile UX (Planned)

### 10.1 Current Issues

- Grid Layouts nicht responsive
- Fixed Widths (z.B. 1100px, 1280px)
- Hover-Effekte nicht touch-freundlich
- Sidebar Layouts (2-Column) problematisch

### 10.2 Mobile Adaptations (Geplant)

| Desktop | Mobile |
|---------|--------|
| 2x2 Station Grid | Vertical Stack |
| Sidebar Layout | Stacked Sections |
| Tab Navigation | Scrollable Tabs oder Dropdown |
| Floating Button | Bottom Fixed Bar |

---

## 11. Gamification Elements

### 11.1 Implemented

| Element | Wo |
|---------|-----|
| Progress Indicators | Assessment (X of 10) |
| Persona Assignment | CFPB Results |
| Community Comparison | Community Wall |
| Achievement Feeling | Score Reveal Animation |

### 11.2 Potential Additions

| Element | Impact | Aufwand |
|---------|--------|---------|
| Completion Badges | Medium | Low |
| Station Progress Tracker | High | Medium |
| Streak Counter (Return Visits) | Low | Medium |
| Leaderboard (Anonymous) | Low | High |

---

## 12. UX Metrics (To Be Tracked)

| Metric | Ziel | Messmethode |
|--------|------|-------------|
| Task Completion Rate | > 80% | Funnel Analytics |
| Time on Task | Optimal per Section | Session Analytics |
| Error Rate | < 5% | Error Tracking |
| User Satisfaction | > 4/5 | Post-Session Survey |
| Return Visit Rate | > 20% | User Tracking |

---

## 13. Verbesserungsideen (UX-Fokus)

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Onboarding Tour für Erstbesucher | Medium | Hoch |
| **Hoch** | Progress Saving (LocalStorage) | Niedrig | Hoch |
| **Hoch** | Mobile Responsive Design | Hoch | Hoch |
| **Mittel** | Animated Transitions zwischen Sektionen | Niedrig | Mittel |
| **Mittel** | Contextual Help (?) Icons | Niedrig | Mittel |
| **Mittel** | Undo/Redo für Slider-Inputs | Niedrig | Niedrig |
| **Niedrig** | Voice Input für Chat | Hoch | Niedrig |

---

## 14. Open Questions

| Frage | Status | Owner |
|-------|--------|-------|
| A/B Test für Assessment Length? | Open | UX Research |
| Wie viel Gamification ist seriös? | Open | Product |
| Print/PDF Export Priorität? | Open | Product |
| Multi-Language Support? | Open | Product |

---

*Template Version: 1.0*
