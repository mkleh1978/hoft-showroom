---
marp: true
theme: uncover
paginate: true
backgroundColor: #0B1F3A
color: #FFFFFF
style: |
  section {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  h1 {
    color: #0D9488;
    font-size: 2.5em;
  }
  h2 {
    color: #FFFFFF;
    font-size: 1.8em;
  }
  h3 {
    color: #0D9488;
  }
  a {
    color: #0D9488;
  }
  strong {
    color: #0D9488;
  }
  table {
    font-size: 0.7em;
  }
  th {
    background-color: #0D9488;
  }
  code {
    background-color: #1A1A2E;
  }
  .teal { color: #0D9488; }
  .amber { color: #D97706; }
  .green { color: #059669; }
---

<!-- _class: lead -->
<!-- _backgroundColor: #0B1F3A -->

# HoFT Ecosystem Showroom

### Interactive Financial Wellbeing Experience

![width:200px](https://via.placeholder.com/200x80/0D9488/FFFFFF?text=HoFT)

**House of Finance & Tech Berlin**

---

# Agenda

1. **Vision & Konzept**
2. **Die 4 Stationen**
3. **Technische Architektur**
4. **Cross-Station Datenfluss**
5. **Design System**
6. **Live Demo**
7. **Roadmap**

---

<!-- _backgroundColor: #1A1A2E -->

# Vision

> *"Eine zusammenhängende Financial Journey statt isolierter Tools"*

Der HoFT Ecosystem Showroom demonstriert interaktiv, wie moderne FinTech-Lösungen das finanzielle Wohlbefinden verbessern.

**Zielgruppe:** Showroom-Besucher, Partner, Investoren

---

# Das Konzept

### 4 Stationen = 1 Journey

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Station 1  │ → │  Station 2  │ → │  Station 3  │ → │  Station 4  │
│  Education  │   │  Foundation │   │  Protection │   │  Investment │
│   (Messen)  │   │   (Budget)  │   │   (Rente)   │   │  (Anlegen)  │
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
       ↓                 ↓                 ↓                 ↓
   CFPB Score    Budget-Methode     Rentenlücke      Risikoprofil
```

---

<!-- _backgroundColor: #0D9488 -->
<!-- _color: #FFFFFF -->

# Station 1
## Financial Education
### *"Measurement Station"*

**Was du misst, kannst du managen**

---

# Station 1: Tools

| Tool | Funktion |
|------|----------|
| **CFPB-10 Assessment** | Wissenschaftlich validierter Financial Wellbeing Score (0-100) |
| **Goal Builder** | Finanzielle Ziele setzen mit Zinseszins-Projektion |
| **Community Wall** | Anonymer Vergleich mit anderen Besuchern |

### Output → **CFPB Score** beeinflusst alle anderen Stationen

---

<!-- _backgroundColor: #1A1A2E -->

# CFPB-10 Assessment

### 10 Fragen → 1 Score → 5 Personas

| Score | Persona | Empfehlung |
|-------|---------|------------|
| 0-35 | Pioneer | Basics aufbauen |
| 36-49 | Seeker | Schulden reduzieren |
| 50-64 | Builder | Sparrate optimieren |
| 65-79 | Strategist | Investieren beginnen |
| 80-100 | Guardian | Feintuning |

---

<!-- _backgroundColor: #0B1F3A -->
<!-- _color: #FFFFFF -->

# Station 2
## Financial Foundation
### *"Budget · Emergency Fund · Debt Freedom"*

**Die 3 Säulen vor dem Vermögensaufbau**

---

# Station 2: Tools

| Tool | Funktion |
|------|----------|
| **Four Pillars** | Übersicht: Überblick, Budget, Notfallfonds, Schuldenfreiheit |
| **Budget Calculator** | 50-30-20, Pay-Yourself-First, Zero-Based |
| **Subscription Audit** | Abo-Fallen identifizieren |
| **Emergency Fund** | Notfallfonds-Ziel berechnen |
| **Debt Freedom** | Avalanche vs. Snowball Strategien |

### Input ← **CFPB Score** empfiehlt Budget-Methode

---

<!-- _backgroundColor: #D97706 -->
<!-- _color: #FFFFFF -->

# Station 3
## Protection Point
### *"InsurTech · Retirement · Pension"*

**KI macht Komplexität beherrschbar**

---

# Station 3: Tools

| Tool | Funktion |
|------|----------|
| **Three Pillars** | Deutsches Rentensystem erklärt |
| **AI Retirement Planner** | Chat-basierte Rentenlücken-Berechnung |
| **Monte Carlo Simulation** | 500 Szenarien, Erfolgswahrscheinlichkeit |
| **Life Events Simulator** | Jobverlust, Krankheit, Scheidung |
| **European Comparison** | Rentensysteme in 5 EU-Ländern |

### Input ← **Monthly Income** aus Station 2

---

<!-- _backgroundColor: #059669 -->
<!-- _color: #FFFFFF -->

# Station 4
## Investment Corner
### *"WealthTech · Wealth Building"*

**Professionelles Investieren für alle**

---

# Station 4: Tools

| Tool | Funktion |
|------|----------|
| **Magic Triangle** | Rendite-Sicherheit-Liquidität |
| **AI Risk Profiling** | 5 Fragen → Risikoprofil |
| **Portfolio Builder** | Interaktive Asset Allocation |
| **ESG Analysis** | Nachhaltiges Investieren |
| **Life Planning Calculator** | Vermögensprojektion nach Lebensphase |

### Input ← **CFPB Score** (Risiko-Adjustment), **Age/Gap** aus Station 3

---

<!-- _backgroundColor: #0B1F3A -->

# Cross-Station Datenfluss

```
Station 1 ──► CFPB Score ──► Station 2 (Budget-Empfehlung)
    │                        Station 4 (Risiko -2 wenn <50)
    │
    └──► Goals ────────────► Station 4 (Life Planning)

Station 2 ──► Income ──────► Station 3 (Renten-Planer)

Station 3 ──► Age ─────────► Station 4 (Life Planning)
         └──► Pension Gap ─► Station 4 (Sparrate)
```

---

# Intelligente Empfehlungen

| CFPB Score | Budget-Methode | Risiko-Adjustment | Emergency Fund |
|------------|----------------|-------------------|----------------|
| **< 50** | 50-30-20 (einfach) | -2 (konservativer) | 1.5x Multiplier |
| **50-70** | Pay-Yourself-First | 0 | 1x |
| **> 70** | Zero-Based (Profi) | 0 | 1x |

### → Personalisierte Journey basierend auf Ausgangssituation

---

<!-- _backgroundColor: #1A1A2E -->

# Technische Architektur

```
┌─────────────────────────────────────────────┐
│              React 18 + Vite 5              │
├─────────────────────────────────────────────┤
│           UserContext (State Mgmt)          │
│  ┌─────────┬─────────┬─────────┬─────────┐  │
│  │  CFPB   │  Budget │Protection│Investment│  │
│  └─────────┴─────────┴─────────┴─────────┘  │
├─────────────────────────────────────────────┤
│         LocalStorage (Persistence)          │
└─────────────────────────────────────────────┘
```

**Keine Backend-Abhängigkeit** → Reine Client-Anwendung

---

# Tech Stack

| Technologie | Zweck |
|-------------|-------|
| **React 18** | UI Framework |
| **Vite 5** | Build Tool & Dev Server |
| **CSS-in-JS** | Styling (keine externen Libraries) |
| **Context API** | Cross-Station State |
| **LocalStorage** | Datenpersistenz |
| **Netlify** | Hosting & Deployment |

### Keine externen UI-Bibliotheken → Volle Kontrolle

---

<!-- _backgroundColor: #0B1F3A -->

# Design System

### HoFT Brand Colors

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| **Deep Navy** | #0B1F3A | Primary, Headers |
| **Teal** | #0D9488 | Accent, Interactive |
| **Steel Gray** | #64748B | Secondary Text |
| **Green** | #059669 | Success |
| **Amber** | #D97706 | Warning |

---

# UI Komponenten

### Wiederverwendbare Building Blocks

- **Button** - Primary, Secondary, Light
- **Card** - Default, Accent, Highlight, Dark
- **Slider** - Range Input mit Labels
- **RadioOption** - Auswahl-Karten
- **ProgressBar** - Animierte Fortschrittsanzeige
- **StationHeader** - Station-Titel mit Icon
- **StationNav** - Section-Navigation

---

# Datenpersistenz

### LocalStorage Key: `hoft_user_profile`

```json
{
  "cfpbScore": 65,
  "cfpbPersona": "Builder",
  "financialGoals": [...],
  "monthlyIncome": 3500,
  "budgetMethod": "50-30-20",
  "age": 45,
  "pensionGap": 800,
  "riskScore": 6,
  "lastUpdated": "2026-02-03T..."
}
```

**→ Besucher können ihre Journey unterbrechen und fortsetzen**

---

<!-- _backgroundColor: #0D9488 -->
<!-- _color: #FFFFFF -->

# Live Demo

### hoft-showroom.netlify.app

1. Station 1: CFPB Assessment ausfüllen
2. Station 2: Budget-Empfehlung sehen
3. Station 3: Rentenlücke berechnen
4. Station 4: Risikoprofil mit Adjustment

---

# Projekt-Struktur

```
src/
├── App.jsx                  # Main + UserProvider
├── context/UserContext.jsx  # State Management
├── styles/                  # Design Tokens
├── components/
│   ├── ui/                  # Wiederverwendbare UI
│   └── stations/            # Station-spezifisch
│       ├── education/
│       ├── foundation/
│       ├── protection/
│       └── investment/
└── stations/                # Haupt-Station Pages
```

---

# Deployment

### Automatisiert via GitHub → Netlify

1. Code Push auf `master`
2. Netlify erkennt Änderungen
3. Automatischer Build (`npm run build`)
4. Deploy auf CDN

**Build Zeit:** ~2 Sekunden
**Bundle Size:** ~300 KB (gzipped: ~82 KB)

---

<!-- _backgroundColor: #1A1A2E -->

# Roadmap

### Implementiert
- [x] 4 interaktive Stationen
- [x] 19 Tools & Kalkulatoren
- [x] Cross-Station Datenfluss
- [x] LocalStorage Persistenz
- [x] Visuelle Indikatoren

### Geplant
- [ ] Journey Dashboard (Gesamtübersicht)
- [ ] PDF Export der Ergebnisse
- [ ] Multi-Language Support

---

# Key Metrics

| Metrik | Wert |
|--------|------|
| **Stationen** | 4 |
| **Interactive Tools** | 19 |
| **UI Komponenten** | 10 |
| **Lines of Code** | ~15,000 |
| **Bundle Size** | 300 KB |
| **Build Time** | 2s |

---

<!-- _backgroundColor: #0B1F3A -->

# Zusammenfassung

### Das HoFT Ecosystem Showroom ist:

1. **Interaktiv** - Hands-on Erlebnis statt Powerpoint
2. **Personalisiert** - CFPB Score steuert die Journey
3. **Persistent** - Fortschritt wird gespeichert
4. **Modern** - React, Vite, CSS-in-JS
5. **Skalierbar** - Modulare Architektur

---

<!-- _class: lead -->
<!-- _backgroundColor: #0D9488 -->

# Vielen Dank!

### Fragen?

**House of Finance & Tech Berlin**

hoft-showroom.netlify.app

---

<!-- _backgroundColor: #0B1F3A -->

# Anhang: UserContext Hooks

```javascript
// CFPB Assessment
const { score, setCFPBResult } = useCFPB();

// Financial Goals
const { goals, addGoal } = useGoals();

// Budget
const { monthlyIncome, setBudgetData } = useBudget();

// Protection
const { age, pensionGap, setProtectionData } = useProtection();

// Investment
const { riskScore, setRiskProfile } = useInvestment();

// Recommendations
const { recommendedBudgetMethod, riskAdjustment } = useRecommendations();
```

---

<!-- _backgroundColor: #1A1A2E -->

# Anhang: Visuelle Indikatoren

| Station | Komponente | Indikator |
|---------|------------|-----------|
| 2 | BudgetCalculator | Teal Banner: "Based on your CFPB Score" |
| 3 | AIRetirementPlanner | Hint: "From your budget: €XX/year" |
| 4 | RiskProfiling | Banner: "CFPB Score Impact" |
| 4 | LifePlanningCalculator | Card: "Pre-filled with Your Data" |

---

<!-- _backgroundColor: #0B1F3A -->

# Anhang: CFPB-10 Fragen

1. Ich kann Ausgaben problemlos decken
2. Ich sichere meine finanzielle Zukunft
3. Ich habe genug Notfall-Rücklagen
4. Ich bezahle Rechnungen pünktlich
5. Schulden hindern meine Lebensplanung
6. Ich übertreffe meine finanziellen Ziele
7. Mein Einkommen ermöglicht meinen Lifestyle
8. Ich mache mir Sorgen um Geld
9. Ich kontrolliere meine Finanzen
10. Ich kann mir Extras leisten

*Skala: 1-5 (gar nicht → vollständig)*
