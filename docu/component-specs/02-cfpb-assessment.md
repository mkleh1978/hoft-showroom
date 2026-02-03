# Component Spec: CFPB-10 Financial Wellbeing Assessment

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Education Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialEducation.jsx` (Financial Mirror Section) |

---

## 1. Purpose & Value Proposition

> Das CFPB-10 Assessment ermöglicht Besuchern eine wissenschaftlich validierte Selbsteinschätzung ihres finanziellen Wohlbefindens. Basierend auf dem Consumer Financial Protection Bureau Fragebogen liefert es einen objektiven Score (0-100) und ordnet den Benutzer einer "Financial Persona" zu.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die ihre finanzielle Situation objektiv einschätzen möchten |
| **Secondary** | Finanzberater, die Kunden-Baseline-Messungen durchführen wollen |

---

## 3. User Journey

```
[Welcome] → [Start Assessment] → [10 Questions] → [Score Reveal] → [Persona Display] → [Next Station]
```

| Step | Description |
|------|-------------|
| **Entry** | Klick auf "Start Assessment" oder Navigation zu "Financial Mirror" |
| **Interaction** | Beantwortung von 10 Likert-Scale Fragen (1-5) |
| **Output** | Numerischer Score (0-100) + Persona-Zuordnung |
| **Next Action** | Weiter zum Builder's Table oder Community Wall |

---

## 4. Core Features

- [x] 10 standardisierte CFPB Fragen
- [x] 5-stufige Likert-Skala mit visuellen Dots
- [x] Fortschrittsanzeige während Assessment
- [x] Reversed-Scoring für negativ formulierte Fragen
- [x] Animierter Score-Reveal
- [x] Persona-Zuordnung mit Farb-Kodierung
- [x] Retake-Funktion

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Completion Rate | > 85% | Analytics (Started vs Completed) |
| Time to Complete | 2-4 min | Session Duration |
| Retake Rate | < 20% | Click Tracking |

---

## 6. Dependencies & Integration

**Inputs:**
- CFPB_QUESTIONS Array mit id, text, category, reversed
- SCALE_OPTIONS Array mit value und label

**Outputs:**
- `finalScore` (0-100)
- Persona-Objekt (name, desc, color)
- Score wird zu `communityScores` Array hinzugefügt

**Connected Components:**
- [Community Wall](./04-community-wall.md) - Erhält neuen Score
- [Goal Builder](./03-goal-builder.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// Score Calculation
const calculateScore = (answers) => {
  let total = 0;
  CFPB_QUESTIONS.forEach((q) => {
    const answer = answers[q.id] || 3;
    total += q.reversed ? (6 - answer) : answer;
  });
  return Math.round(((total - 10) / 40) * 100);
};

// Persona Mapping
const getPersona = (score) => {
  if (score >= 80) return { name: "The Guardian", ... };
  if (score >= 65) return { name: "The Strategist", ... };
  if (score >= 50) return { name: "The Builder", ... };
  if (score >= 35) return { name: "The Seeker", ... };
  return { name: "The Pioneer", ... };
};
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | LocalStorage Persistenz des Scores | Niedrig | Hoch |
| **Hoch** | Detaillierte Dimension-Analyse (8 Kategorien) | Medium | Hoch |
| **Mittel** | Animated Question Transitions | Niedrig | Mittel |
| **Mittel** | Accessibility: Keyboard Navigation + ARIA | Niedrig | Mittel |
| **Mittel** | PDF Export des Ergebnisses | Medium | Mittel |
| **Niedrig** | Vergleich mit vorherigem Score (Trend) | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Gamified Assessment** | Höheres Engagement | Kann unseriös wirken |
| **Adaptive Testing** | Kürzere Zeit, präziser | Komplexere Implementierung |
| **Chat-basiertes Assessment** | Modern, conversational | Längere Completion-Zeit |
| **Video-Fragen** | Immersiver | Accessibility-Probleme, hoher Aufwand |
| **Split-Assessment** | Kurz-Version für Schnelltest | Weniger validierte Ergebnisse |

---

## 10. Wissenschaftliche Grundlage

Das CFPB-10 basiert auf dem "Financial Well-Being Scale" des Consumer Financial Protection Bureau (USA, 2015). Die 10 Fragen messen vier Dimensionen:

1. **Control over finances** - Tägliche Finanzkontrolle
2. **Capacity to absorb shocks** - Resilienz bei unerwarteten Ausgaben
3. **On track to meet goals** - Fortschritt bei finanziellen Zielen
4. **Financial freedom** - Freiheit für gewünschte Lebensweise

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Deutsche Validierung der Fragen? | Open | Research |
| GDPR-Konformität bei Score-Speicherung | Open | Legal |
| Benchmark-Daten für DE-Markt | Open | Data Team |

---

*Template Version: 1.0*
