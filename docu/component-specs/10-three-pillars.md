# Component Spec: Three Pillars (German Pension System)

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Protection Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Protection.jsx` (Pillars Section) |

---

## 1. Purpose & Value Proposition

> Die Three Pillars Komponente erklärt das deutsche Drei-Säulen-Rentensystem (Gesetzliche, Betriebliche, Private Vorsorge) und macht deutlich, warum private Vorsorge notwendig ist, um die "Rentenlücke" zu schließen.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Erwerbstätige, die das Rentensystem verstehen möchten |
| **Secondary** | Berufseinsteiger, die Vorsorge-Entscheidungen treffen müssen |

---

## 3. User Journey

```
[Welcome] → [Three Pillars] → [Pillar auswählen] → [Detail lesen] → [AI Planner]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Welcome oder direkte Navigation |
| **Interaction** | Klick auf Pillar Card für Details |
| **Output** | Verständnis des Systems und der Notwendigkeit |
| **Next Action** | Weiter zum AI Retirement Planner |

---

## 4. Core Features

- [x] 3 Pillar Cards mit Nummer, Titel, Beschreibung
- [x] Key-Metrik pro Pillar (48%, ~50%, €800-1200)
- [x] Expandable Detail-View per Klick
- [x] Educational Content pro Pillar
- [x] Teal-Accent Border für aktive Pillar

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Pillar Exploration | > 2 von 3 | Click Tracking |
| Detail Read Time | > 15s | Analytics |
| Navigation to AI Planner | > 70% | Click Through |

---

## 6. Dependencies & Integration

**Inputs:**
- `pillars` Array (num, title, desc, value, label, detail)
- `activePillar` State

**Outputs:**
- User Education (keine direkten Daten-Outputs)

**Connected Components:**
- [AI Retirement Planner](./11-ai-retirement-planner.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
const pillars = [
  {
    num: 1,
    title: 'Public Pension',
    desc: 'Pay-as-you-go financed state pension. Declining from 48% to 43% by 2040.',
    value: '48%',
    label: 'replacement rate',
    detail: 'The German public pension (Gesetzliche Rentenversicherung)...'
  },
  {
    num: 2,
    title: 'Occupational Pension',
    desc: 'Employer (co-)financed pension schemes.',
    value: '~50%',
    label: 'penetration',
    detail: 'Betriebliche Altersvorsorge (bAV) offers tax advantages...'
  },
  {
    num: 3,
    title: 'Private Provision',
    desc: 'Riester, Rürup, life insurance, ETF savings plans.',
    value: '€800-1,200',
    label: 'monthly gap',
    detail: 'Personal responsibility is crucial...'
  },
];
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Interaktive Grafik: Wer zahlt was | Medium | Hoch |
| **Hoch** | Altersabhängige Projektion | Medium | Hoch |
| **Mittel** | Vergleich mit anderen Ländern (Teaser) | Niedrig | Mittel |
| **Mittel** | Video-Erklärung pro Pillar | Hoch | Mittel |
| **Niedrig** | Quiz: Teste dein Wissen | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Animated Pyramid** | Visuell ansprechend | Kann Hierarchie suggerieren |
| **Timeline View** | Zeigt historische Entwicklung | Komplexer |
| **Personal Story** | Emotionale Verbindung | Nicht für jeden relevant |
| **Calculator First** | Hands-on Ansatz | Überspringt Grundlagen |

---

## 10. Educational Content

**Pillar 1: Gesetzliche Rentenversicherung**
- Umlagefinanziert (Aktive zahlen für Rentner)
- Sinkender Rentensatz: 48% → 43% bis 2040
- Demografischer Wandel: Immer weniger Beitragszahler

**Pillar 2: Betriebliche Altersvorsorge (bAV)**
- Steuervorteile und oft Arbeitgeber-Matching
- Nicht universell verfügbar
- Entgeltumwandlung: Brutto-Beitrag

**Pillar 3: Private Vorsorge**
- Riester (für Angestellte)
- Rürup (für Selbstständige)
- ETF-Sparpläne (Flexibel, kostengünstig)
- Lebensversicherung (Oft teuer)

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Aktuelle Rentensatz-Prognosen | Open | Research |
| Rechtliche Änderungen | Ongoing | Legal |
| Riester-Reform berücksichtigen | Open | Content |

---

*Template Version: 1.0*
