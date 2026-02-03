# Component Spec: Community Wall

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Education Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/FinancialEducation.jsx` (Community Section) |

---

## 1. Purpose & Value Proposition

> Die Community Wall zeigt eine anonymisierte Aggregation aller CFPB-Scores und ermöglicht Besuchern, sich mit der Community zu vergleichen. Dies normalisiert die finanzielle Reise und zeigt, dass man nicht allein ist.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Besucher, die wissen möchten, wie ihr Score im Vergleich zu anderen steht |
| **Secondary** | Analysten, die Community-Trends verstehen wollen |

---

## 3. User Journey

```
[Assessment abgeschlossen] → [Community Wall] → [Verteilung sehen] → [Eigene Position finden] → [Percentile-Info]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Assessment oder über Navigation |
| **Interaction** | Exploration der Balkendiagramme |
| **Output** | Verständnis der eigenen Position im Community-Kontext |
| **Next Action** | Weiter zu Key Insights oder andere Station |

---

## 4. Core Features

- [x] Aggregierte Statistiken (Total, Average, >65% Rate)
- [x] 5-Bucket Distribution Chart (Pioneers bis Guardians)
- [x] Animated Bar Charts
- [x] User-Position Highlighting ("YOU" Badge)
- [x] Percentile Ranking
- [x] Simulated Community Data (150 Scores)

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| View Duration | > 30s | Session Analytics |
| Return Visits | > 20% | User Tracking |
| Social Sharing | > 5% | Share Button Clicks |

---

## 6. Dependencies & Integration

**Inputs:**
- `communityScores` Array (simuliert oder real)
- `finalScore` des aktuellen Benutzers

**Outputs:**
- Distribution Buckets (count per range)
- Average Score Calculation
- User Percentile

**Connected Components:**
- [CFPB Assessment](./02-cfpb-assessment.md) - Liefert neuen Score
- [Key Insights](./02-cfpb-assessment.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// Distribution Buckets
const distribution = [
  { range: '20-35', label: 'Pioneers', count: 0, color: colors.deepNavy },
  { range: '36-49', label: 'Seekers', count: 0, color: colors.charcoal },
  { range: '50-64', label: 'Builders', count: 0, color: colors.amber },
  { range: '65-79', label: 'Strategists', count: 0, color: colors.teal },
  { range: '80-100', label: 'Guardians', count: 0, color: colors.green },
];

// Percentile Calculation
const percentile = Math.round(
  (1 - communityScores.filter(s => s.score > finalScore).length
   / communityScores.length) * 100
);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Real-time Backend für echte Community-Daten | Hoch | Hoch |
| **Hoch** | Zeitbasierte Trends (letzte 7 Tage, Monat) | Medium | Hoch |
| **Mittel** | Demografische Filter (Alter, Region) | Hoch | Mittel |
| **Mittel** | Animated "Live Feed" neuer Scores | Medium | Mittel |
| **Niedrig** | Social Sharing Integration | Niedrig | Niedrig |
| **Niedrig** | Leaderboard (anonymisiert) | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Heatmap Visualization** | Moderne Optik | Weniger intuitiv |
| **Scatter Plot** | Zeigt Spreizung | Kann überfordern |
| **Timeline Animation** | Storytelling-Element | Höherer Aufwand |
| **Peer Groups** | Relevanterer Vergleich | Privacy-Bedenken |
| **Gamified Ranking** | Höheres Engagement | Kann demotivieren |

---

## 10. Data Privacy Considerations

- Alle Scores sind anonymisiert
- Keine Speicherung persönlicher Daten
- Zeitstempel nur für Sorting, nicht User-bezogen
- Keine IP-Adress-Verknüpfung
- Aggregierte Daten nur in Session-Memory

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Backend für persistente Community-Daten | Open | Dev Team |
| Minimum Sample Size für valide Statistiken | Open | Data Team |
| GDPR-Implikationen bei echten Daten | Open | Legal |
| Fake-Score-Injection verhindern | Open | Security |

---

*Template Version: 1.0*
