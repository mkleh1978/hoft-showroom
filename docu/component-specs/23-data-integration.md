# Data Integration Konzept: CFPB Score & Cross-Station Verknüpfung

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Product & Engineering |
| **Status** | **Implemented** |
| **Last Updated** | 2026-02-03 |
| **Version** | 2.0 |

---

## 1. Vision

> Der CFPB Financial Wellbeing Score aus Station 1 wird zur **zentralen Kennzahl**, die alle weiteren Stationen personalisiert. Statt isolierter Tools entsteht eine **zusammenhängende Financial Journey**.

---

## 2. Datenmodell

### 2.1 User Profile (Central State)

```typescript
interface UserProfile {
  // Station 1: Assessment
  cfpbScore: number | null;           // 0-100
  cfpbPersona: string | null;         // "Guardian", "Strategist", etc.
  cfpbAnswers: Record<number, number>; // {1: 4, 2: 3, ...}
  cfpbTimestamp: Date | null;

  // Station 1: Goals
  financialGoals: Goal[];

  // Station 2: Foundation
  monthlyIncome: number | null;
  monthlyExpenses: number | null;
  budgetMethod: string | null;
  emergencyFundTarget: number | null;
  emergencyFundCurrent: number | null;
  debts: Debt[];

  // Station 3: Protection
  age: number | null;
  grossIncome: number | null;
  retirementSavings: number | null;
  pensionGap: number | null;
  riskTolerance: string | null;

  // Station 4: Investment
  investorProfile: string | null;     // "Conservative", "Moderate", etc.
  riskScore: number | null;           // 1-10
  portfolioAllocation: Allocation | null;

  // Meta
  lastUpdated: Date;
  stationsCompleted: string[];
}

interface Goal {
  id: string;
  name: string;
  target: number;
  timeline: number;
  monthlyContribution: number;
}

interface Debt {
  id: string;
  name: string;
  amount: number;
  interestRate: number;
}

interface Allocation {
  stocks: number;
  bonds: number;
  alternatives: number;
}
```

---

## 3. CFPB Score als Basis für Personalisierung

### 3.1 Score-basierte Empfehlungen

| CFPB Score | Persona | Station 2 Impact | Station 3 Impact | Station 4 Impact |
|------------|---------|------------------|------------------|------------------|
| **0-35** | Pioneer | Fokus auf Budget-Basics, Notfallfonds aufbauen | Berufsunfähigkeit priorisieren | Konservatives Profil empfehlen |
| **36-49** | Seeker | Schuldenabbau priorisieren | Pensionslücke berechnen | Ausgewogenes Profil |
| **50-64** | Builder | Sparrate optimieren | Monte Carlo für Zuversicht | Balanced Growth |
| **65-79** | Strategist | Subscription Audit für mehr Investitionen | Detaillierte Planung | ESG-Fokus ermöglichen |
| **80-100** | Guardian | Optimierung statt Basics | Feintuning | Aggressive Growth Option |

### 3.2 Konkrete Anpassungen pro Station

#### Station 2: Financial Foundation

```javascript
// Budget-Empfehlung basierend auf CFPB Score
const getRecommendedBudgetMethod = (cfpbScore) => {
  if (cfpbScore < 50) return '50-30-20';        // Einfach, strukturiert
  if (cfpbScore < 70) return 'pay-yourself';    // Sparen priorisieren
  return 'zero-based';                           // Maximale Kontrolle
};

// Emergency Fund Multiplier
const getEmergencyMonths = (cfpbScore, situation) => {
  const baseMonths = emergencyMultipliers[situation].months;
  if (cfpbScore < 40) return Math.ceil(baseMonths * 1.5);  // Mehr Puffer
  return baseMonths;
};

// Messaging anpassen
const getFoundationMessage = (cfpbScore) => {
  if (cfpbScore < 50) {
    return "Lass uns gemeinsam die Grundlagen schaffen. Schritt für Schritt.";
  }
  if (cfpbScore < 70) {
    return "Du hast eine gute Basis. Zeit für Optimierung.";
  }
  return "Deine Finanzen sind stabil. Fokussiere auf Wachstum.";
};
```

#### Station 3: Protection

```javascript
// Pension Gap Urgency
const getPensionUrgency = (cfpbScore, age) => {
  if (cfpbScore < 50 && age > 40) return 'critical';
  if (cfpbScore < 70 && age > 50) return 'high';
  return 'normal';
};

// Life Events Prioritization
const getPrioritizedLifeEvents = (cfpbScore) => {
  if (cfpbScore < 50) {
    // Zeige zuerst die "dringenden" Events
    return ['disability', 'jobloss', 'illness', 'birth', 'marriage', 'divorce'];
  }
  // Standard-Reihenfolge
  return ['birth', 'marriage', 'jobloss', 'illness', 'divorce', 'disability'];
};

// Monte Carlo Interpretation
const getMonteCarloAdvice = (successRate, cfpbScore) => {
  if (successRate < 60 && cfpbScore < 50) {
    return "Dein Plan braucht Aufmerksamkeit. Der wichtigste Schritt: " +
           "Erhöhe deine Sparrate auch nur um €50/Monat.";
  }
  // ... weitere Kombinationen
};
```

#### Station 4: Investment

```javascript
// Risk Profile Adjustment
const adjustRiskProfile = (calculatedScore, cfpbScore) => {
  // Wenn CFPB niedrig, empfehle konservativer
  if (cfpbScore < 50) {
    return Math.max(1, calculatedScore - 2);
  }
  return calculatedScore;
};

// Portfolio Suggestions
const getSuggestedAllocation = (riskScore, cfpbScore) => {
  const baseAllocation = getAllocationByRisk(riskScore);

  if (cfpbScore < 50) {
    // Mehr Bonds für Stabilität
    return {
      stocks: Math.max(30, baseAllocation.stocks - 10),
      bonds: baseAllocation.bonds + 10,
      alternatives: baseAllocation.alternatives,
    };
  }
  return baseAllocation;
};

// Timeline Advice
const getTimelineAdvice = (age, cfpbScore) => {
  if (cfpbScore < 50 && age > 40) {
    return "Bevor du investierst, stelle sicher, dass du einen Notfallfonds hast.";
  }
  return null;
};
```

---

## 4. Cross-Station Insights

### 4.1 Aggregierte Dashboard-Elemente (Future Feature)

```jsx
// components/CrossStationSummary.jsx
const CrossStationSummary = ({ userProfile }) => {
  const insights = generateInsights(userProfile);

  return (
    <div className="summary-card">
      <h3>Deine Financial Journey</h3>

      <div className="score-overview">
        <CircleScore value={userProfile.cfpbScore} label="CFPB Score" />
        <CircleScore value={userProfile.riskScore * 10} label="Risk Score" />
        <CircleScore
          value={calculateOverallHealth(userProfile)}
          label="Overall Health"
        />
      </div>

      <div className="insights">
        {insights.map((insight) => (
          <InsightCard key={insight.id} {...insight} />
        ))}
      </div>

      <div className="next-actions">
        <h4>Empfohlene nächste Schritte</h4>
        <ActionList actions={getNextActions(userProfile)} />
      </div>
    </div>
  );
};
```

### 4.2 Insight Generation Engine

```javascript
const generateInsights = (profile) => {
  const insights = [];

  // CFPB vs Budget Consistency
  if (profile.cfpbScore && profile.monthlyIncome && profile.monthlyExpenses) {
    const savingsRate = (profile.monthlyIncome - profile.monthlyExpenses)
                        / profile.monthlyIncome * 100;

    if (profile.cfpbScore < 50 && savingsRate < 10) {
      insights.push({
        type: 'warning',
        title: 'Sparrate und Wellbeing korrelieren',
        text: `Dein CFPB Score von ${profile.cfpbScore} und deine Sparrate ` +
              `von ${savingsRate.toFixed(0)}% hängen zusammen. Kleine Erhöhungen ` +
              `der Sparrate können dein finanzielles Wohlbefinden verbessern.`,
        action: { label: 'Budget optimieren', station: 'foundation' },
      });
    }
  }

  // Emergency Fund vs Risk Tolerance
  if (profile.emergencyFundCurrent && profile.emergencyFundTarget && profile.riskScore) {
    const fundRatio = profile.emergencyFundCurrent / profile.emergencyFundTarget;

    if (fundRatio < 0.5 && profile.riskScore > 6) {
      insights.push({
        type: 'caution',
        title: 'Risiko ohne Sicherheitsnetz',
        text: `Du hast ein aggressives Risikoprofil (${profile.riskScore}/10), ` +
              `aber nur ${(fundRatio * 100).toFixed(0)}% deines Notfallfonds. ` +
              `Baue zuerst den Puffer auf.`,
        action: { label: 'Notfallfonds-Plan', station: 'foundation' },
      });
    }
  }

  // Pension Gap vs Goals
  if (profile.pensionGap && profile.financialGoals.length > 0) {
    const monthlyGoalTotal = profile.financialGoals.reduce(
      (sum, g) => sum + g.monthlyContribution, 0
    );

    if (profile.pensionGap > 800 && monthlyGoalTotal > profile.pensionGap) {
      insights.push({
        type: 'info',
        title: 'Ziele vs. Rentenlücke',
        text: `Du sparst €${monthlyGoalTotal}/Monat für Ziele, aber deine ` +
              `Rentenlücke beträgt €${profile.pensionGap}. Überlege, einen ` +
              `Teil für Altersvorsorge umzuleiten.`,
        action: { label: 'Altersvorsorge planen', station: 'protection' },
      });
    }
  }

  return insights;
};
```

---

## 5. Implementierungs-Strategie

### 5.1 Phase 1: Shared State Foundation

**Aufwand:** 2-3 Tage

```jsx
// src/store/UserContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  cfpbScore: null,
  cfpbPersona: null,
  // ... alle Felder
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_CFPB_RESULT':
      return {
        ...state,
        cfpbScore: action.payload.score,
        cfpbPersona: action.payload.persona,
        cfpbAnswers: action.payload.answers,
        cfpbTimestamp: new Date(),
      };
    case 'SET_BUDGET_DATA':
      return { ...state, ...action.payload };
    // ... weitere Actions
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState, (initial) => {
    // LocalStorage Hydration
    const saved = localStorage.getItem('hoft_user_profile');
    return saved ? JSON.parse(saved) : initial;
  });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('hoft_user_profile', JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
```

### 5.2 Phase 2: Station Integration

**Aufwand:** 3-4 Tage

```jsx
// src/stations/FinancialEducation.jsx (angepasst)
import { useUser } from '../store/UserContext';

const FinancialEducation = () => {
  const { state, dispatch } = useUser();

  const handleAssessmentComplete = (score, answers) => {
    const persona = getPersona(score);
    dispatch({
      type: 'SET_CFPB_RESULT',
      payload: { score, persona: persona.name, answers },
    });
  };

  // Zeige personalisierte Message wenn Score existiert
  const welcomeMessage = state.cfpbScore
    ? `Willkommen zurück, ${state.cfpbPersona}!`
    : 'Entdecke dein finanzielles Wohlbefinden';

  // ...
};
```

```jsx
// src/stations/FinancialFoundation.jsx (angepasst)
import { useUser } from '../store/UserContext';

const FinancialFoundation = () => {
  const { state, dispatch } = useUser();

  // Personalisierte Empfehlung basierend auf CFPB Score
  const recommendedMethod = state.cfpbScore
    ? getRecommendedBudgetMethod(state.cfpbScore)
    : '50-30-20';

  // Adaptive Messaging
  const introMessage = state.cfpbScore < 50
    ? "Lass uns gemeinsam die Grundlagen aufbauen."
    : "Du bist auf gutem Weg. Optimieren wir deine Finanzen.";

  // ...
};
```

### 5.3 Phase 3: Cross-Station Insights

**Aufwand:** 4-5 Tage

```jsx
// src/components/InsightBanner.jsx
const InsightBanner = () => {
  const { state } = useUser();

  if (!state.cfpbScore) return null;

  const insight = getTopInsight(state);
  if (!insight) return null;

  return (
    <div className={`insight-banner insight-${insight.type}`}>
      <Icon name={insight.icon} />
      <div>
        <strong>{insight.title}</strong>
        <p>{insight.text}</p>
      </div>
      {insight.action && (
        <button onClick={() => navigateTo(insight.action.station)}>
          {insight.action.label}
        </button>
      )}
    </div>
  );
};
```

### 5.4 Phase 4: Progress Dashboard (Optional)

**Aufwand:** 5-7 Tage

```jsx
// src/components/JourneyDashboard.jsx
const JourneyDashboard = () => {
  const { state } = useUser();

  return (
    <div className="journey-dashboard">
      <h2>Deine Financial Journey</h2>

      <div className="progress-overview">
        <StationProgress
          station="education"
          completed={!!state.cfpbScore}
          score={state.cfpbScore}
        />
        <StationProgress
          station="foundation"
          completed={state.stationsCompleted.includes('foundation')}
          metrics={{ budget: state.budgetMethod, emergency: state.emergencyFundTarget }}
        />
        <StationProgress
          station="protection"
          completed={state.stationsCompleted.includes('protection')}
          metrics={{ gap: state.pensionGap }}
        />
        <StationProgress
          station="investment"
          completed={state.stationsCompleted.includes('investment')}
          metrics={{ risk: state.riskScore }}
        />
      </div>

      <CrossStationInsights profile={state} />

      <RecommendedNextSteps profile={state} />
    </div>
  );
};
```

---

## 6. Datenfluss-Diagramm

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER CONTEXT                                   │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────────────┐  │
│  │cfpbScore │  goals   │  budget  │ pension  │   investment         │  │
│  │ persona  │  debts   │ emergency│   gap    │   riskProfile        │  │
│  └────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬─────────────────┘  │
│       │          │          │          │          │                     │
│  ┌────┴────┐┌────┴────┐┌────┴────┐┌────┴────┐┌────┴────┐               │
│  │Station 1││Station 2││Station 3││Station 4││Dashboard│               │
│  │ WRITES  ││ READS   ││ READS   ││ READS   ││ READS   │               │
│  │ READS   ││ WRITES  ││ WRITES  ││ WRITES  ││ ONLY    │               │
│  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘               │
│                                                                         │
│                    ┌──────────────────────┐                            │
│                    │   LOCAL STORAGE      │                            │
│                    │   (Persistence)      │                            │
│                    └──────────────────────┘                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. API für Cross-Station Queries

```javascript
// src/utils/profileAnalysis.js

export const getFinancialHealthScore = (profile) => {
  const weights = {
    cfpb: 0.3,
    emergencyFund: 0.2,
    debtFree: 0.15,
    pensionPlanning: 0.2,
    investmentDiversity: 0.15,
  };

  let score = 0;

  // CFPB Component
  if (profile.cfpbScore) {
    score += weights.cfpb * profile.cfpbScore;
  }

  // Emergency Fund Component
  if (profile.emergencyFundCurrent && profile.emergencyFundTarget) {
    const ratio = Math.min(1, profile.emergencyFundCurrent / profile.emergencyFundTarget);
    score += weights.emergencyFund * ratio * 100;
  }

  // Debt-Free Component
  if (profile.debts) {
    const totalDebt = profile.debts.reduce((sum, d) => sum + d.amount, 0);
    const debtScore = totalDebt === 0 ? 100 : Math.max(0, 100 - totalDebt / 500);
    score += weights.debtFree * debtScore;
  }

  // Pension Planning Component
  if (profile.pensionGap !== null && profile.grossIncome) {
    const gapRatio = profile.pensionGap / (profile.grossIncome / 12);
    const pensionScore = Math.max(0, 100 - gapRatio * 100);
    score += weights.pensionPlanning * pensionScore;
  }

  // Investment Diversity Component
  if (profile.portfolioAllocation) {
    const { stocks, bonds, alternatives } = profile.portfolioAllocation;
    const diversityScore = (stocks > 20 && stocks < 80 && bonds > 10) ? 80 : 50;
    score += weights.investmentDiversity * diversityScore;
  }

  return Math.round(score);
};

export const getPersonalizedRecommendations = (profile) => {
  const recommendations = [];

  // Based on CFPB Score
  if (!profile.cfpbScore) {
    recommendations.push({
      priority: 'high',
      action: 'Starte mit dem Financial Wellbeing Assessment',
      station: 'education',
    });
  } else if (profile.cfpbScore < 50) {
    if (!profile.emergencyFundTarget) {
      recommendations.push({
        priority: 'high',
        action: 'Berechne deinen Notfallfonds-Bedarf',
        station: 'foundation',
      });
    }
    if (!profile.budgetMethod) {
      recommendations.push({
        priority: 'high',
        action: 'Wähle eine Budgetmethode',
        station: 'foundation',
      });
    }
  }

  // Debt Recommendations
  if (profile.debts && profile.debts.length > 0) {
    const highInterestDebt = profile.debts.find(d => d.interestRate > 10);
    if (highInterestDebt) {
      recommendations.push({
        priority: 'high',
        action: `Tilge ${highInterestDebt.name} (${highInterestDebt.interestRate}% Zinsen) zuerst`,
        station: 'foundation',
      });
    }
  }

  // Protection Recommendations
  if (profile.age && !profile.pensionGap) {
    recommendations.push({
      priority: profile.age > 40 ? 'high' : 'medium',
      action: 'Berechne deine Rentenlücke',
      station: 'protection',
    });
  }

  // Investment Recommendations
  if (profile.cfpbScore > 60 && !profile.riskScore) {
    recommendations.push({
      priority: 'medium',
      action: 'Ermittle dein Risikoprofil',
      station: 'investment',
    });
  }

  return recommendations.sort((a, b) =>
    a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0
  );
};
```

---

## 8. Implementation Status

### 8.1 Completed Phases

| Phase | Status | Deliverable |
|-------|--------|-------------|
| **Phase 1** | DONE | UserContext + LocalStorage |
| **Phase 2** | DONE | Station 1 & 2 Integration |
| **Phase 3** | DONE | Station 3 & 4 Integration |
| **Phase 4** | DONE | Cross-Station Visual Indicators |
| **Phase 5** | Planned | Journey Dashboard (Future)

### 8.2 Breaking Changes

- Keine Breaking Changes für bestehende Funktionalität
- Additiv: Neue Features on top
- Graceful Degradation: Funktioniert auch ohne gespeicherte Daten

### 8.3 Testing Strategy

```javascript
describe('Cross-Station Data Integration', () => {
  it('should persist CFPB score to context', () => {
    // ...
  });

  it('should adjust budget recommendation based on CFPB', () => {
    // ...
  });

  it('should generate insights from combined data', () => {
    // ...
  });
});
```

---

## 9. Privacy & Data Handling

### 9.1 Data Storage

- **Wo:** Nur LocalStorage (Client-side)
- **Was:** Anonyme Finanz-Metriken, keine PII
- **Retention:** Bis User löscht oder Browser-Daten cleared

### 9.2 User Control

```jsx
// Clear Data Button
<button onClick={() => {
  localStorage.removeItem('hoft_user_profile');
  dispatch({ type: 'RESET' });
}}>
  Meine Daten löschen
</button>
```

### 9.3 GDPR Considerations

- Keine Server-seitige Speicherung = Kein GDPR-Problem
- Optional: Cookie-Banner für LocalStorage (je nach Interpretation)

---

## 10. Erfolgsmessung

| Metrik | Baseline | Ziel |
|--------|----------|------|
| Stations Visited per Session | 1.5 | 2.5+ |
| Return Visit Rate | 10% | 25% |
| Cross-Station Navigation | 20% | 50% |
| Assessment Completion | 70% | 85% |
| Full Journey Completion | 5% | 20% |

---

*Template Version: 1.0*
