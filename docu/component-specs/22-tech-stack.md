# Tech Stack Documentation

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Engineering Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Version** | 1.0 |

---

## 1. Overview

Der HoFT Ecosystem Showroom ist eine React Single-Page Application (SPA), die mit Vite als Build-Tool entwickelt wurde. Die Anwendung ist client-seitig und benötigt kein Backend für die Basisfunktionalität.

---

## 2. Core Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | React | 18.x | UI Library |
| **Build Tool** | Vite | 5.x | Dev Server & Bundler |
| **Language** | JavaScript (JSX) | ES2022 | Primary Language |
| **Styling** | Inline Styles (CSS-in-JS) | - | Component Styling |

---

## 3. Project Structure

```
hoft-showroom-app/
├── src/
│   ├── main.jsx              # Entry Point
│   ├── App.jsx               # Main App + Router Logic
│   └── stations/
│       ├── FinancialEducation.jsx   # Station 1 (~1100 LOC)
│       ├── FinancialFoundation.jsx  # Station 2 (~950 LOC)
│       ├── Protection.jsx           # Station 3 (~1030 LOC)
│       └── Investment.jsx           # Station 4 (~1600 LOC)
├── public/                   # Static Assets
├── docs/                     # Analysis Documents
├── docu/                     # Component Specs
├── index.html               # HTML Entry
├── package.json             # Dependencies
└── vite.config.js           # Vite Configuration
```

---

## 4. Dependencies

### 4.1 Production Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x"
}
```

### 4.2 Development Dependencies

```json
{
  "@vitejs/plugin-react": "^4.x",
  "vite": "^5.x"
}
```

### 4.3 Keine externen UI Libraries

Die Anwendung verwendet **keine** externen UI Libraries wie:
- ❌ Material UI
- ❌ Chakra UI
- ❌ Tailwind CSS
- ❌ Bootstrap

Alle Komponenten sind custom-built mit Inline Styles.

---

## 5. State Management

### 5.1 Current Approach

**Local Component State (useState)**

Jede Station verwaltet ihren eigenen State:

```jsx
// FinancialEducation.jsx
const [activeSection, setActiveSection] = useState('welcome');
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState({});
const [finalScore, setFinalScore] = useState(null);
const [goals, setGoals] = useState([]);
// ... etc.
```

### 5.2 State Sharing

**Aktuell:** Kein State Sharing zwischen Stationen.

**Problem:** Daten aus Station 1 (CFPB Score) sind in anderen Stationen nicht verfügbar.

### 5.3 Geplante Verbesserung

Siehe [Data Integration Konzept](./23-data-integration.md)

---

## 6. Routing

### 6.1 Current Approach

**Kein React Router** - Simples bedingtes Rendering:

```jsx
// App.jsx
const [currentStation, setCurrentStation] = useState(null);

if (currentStation === 'education') {
  return <FinancialEducation />;
}
if (currentStation === 'foundation') {
  return <FinancialFoundation />;
}
// ...

return <MainMenu onSelectStation={setCurrentStation} />;
```

### 6.2 Limitierungen

- ❌ Keine Browser History
- ❌ Kein Deep Linking
- ❌ Kein URL Sharing
- ❌ Back-Button funktioniert nicht wie erwartet

### 6.3 Geplante Verbesserung

Migration zu `react-router-dom`:

```jsx
// Future
<BrowserRouter>
  <Routes>
    <Route path="/" element={<MainMenu />} />
    <Route path="/education/*" element={<FinancialEducation />} />
    <Route path="/foundation/*" element={<FinancialFoundation />} />
    <Route path="/protection/*" element={<ProtectionStation />} />
    <Route path="/investment/*" element={<Investment />} />
  </Routes>
</BrowserRouter>
```

---

## 7. Styling Architecture

### 7.1 Current Approach

**Inline Styles mit Style Objects:**

```jsx
const buttonPrimaryStyle = {
  backgroundColor: '#0D9488',
  color: '#FFFFFF',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '6px',
  // ...
};

<button style={buttonPrimaryStyle}>Click me</button>
```

### 7.2 Design Tokens (Dupliziert)

Jede Station definiert eigene `cssVars` / `colors` Objekte (~50-60 Zeilen pro Datei).

### 7.3 Geplante Verbesserung

**Option A: Shared Module**
```jsx
// src/styles/tokens.js
export const colors = { ... };
export const spacing = { ... };
export const typography = { ... };
```

**Option B: CSS-in-JS Library**
```jsx
// styled-components oder emotion
const Button = styled.button`
  background: ${props => props.theme.colors.teal};
  padding: ${props => props.theme.spacing.md};
`;
```

---

## 8. Canvas & Visualizations

### 8.1 Monte Carlo Chart

Die Monte Carlo Simulation verwendet **HTML5 Canvas**:

```jsx
const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  // Draw grid, axes, scenario lines
  scenarios.forEach((scenario) => {
    ctx.beginPath();
    scenario.forEach((point, i) => {
      const x = ..., y = ...;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
}, [scenarios]);

<canvas ref={canvasRef} width={1000} height={400} />
```

### 8.2 SVG Graphics

Andere Visualisierungen verwenden **Inline SVG**:
- Magic Triangle
- European Comparison Bars
- Progress Bars

### 8.3 Geplante Verbesserung

Migration zu **charting library** für komplexere Charts:
- `recharts` (React-native)
- `visx` (Low-level, flexible)
- `Chart.js` (Canvas-based)

---

## 9. Performance Considerations

### 9.1 Current Issues

| Issue | Impact | Lösung |
|-------|--------|--------|
| Alle Stationen in Bundle | Große Initial Load | Code Splitting |
| Monte Carlo im Main Thread | UI Blocking | Web Workers |
| Design Tokens dupliziert | Bundle Size | Shared Module |
| Keine Memoization | Unnecessary Re-renders | useMemo/useCallback |

### 9.2 Geplante Optimierungen

**Code Splitting mit React.lazy:**
```jsx
const FinancialEducation = React.lazy(
  () => import('./stations/FinancialEducation')
);

<Suspense fallback={<Loading />}>
  <FinancialEducation />
</Suspense>
```

**Web Worker für Monte Carlo:**
```javascript
// simulation.worker.js
self.onmessage = (e) => {
  const result = runMonteCarloSimulation(e.data);
  self.postMessage(result);
};
```

---

## 10. Data Flow

### 10.1 Current

```
User Input → useState → Component Re-render → UI Update
              │
              └── (Lost on Page Refresh)
```

### 10.2 Planned

```
User Input → Context/Store → Components
              │
              ├── LocalStorage (Persistence)
              │
              └── (Optional) Backend API
```

---

## 11. Testing (Nicht implementiert)

### 11.1 Geplante Testing-Strategie

| Test Type | Tool | Coverage Target |
|-----------|------|-----------------|
| Unit Tests | Vitest | Calculation Functions |
| Component Tests | React Testing Library | Interactive Components |
| E2E Tests | Playwright | Critical User Flows |

### 11.2 Example Test Cases

```javascript
// calculations.test.js
describe('CFPB Score Calculation', () => {
  it('should return 50 for neutral answers', () => {
    const answers = { 1: 3, 2: 3, 3: 3, ... };
    expect(calculateScore(answers)).toBe(50);
  });
});
```

---

## 12. Build & Deployment

### 12.1 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 12.2 Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js    # Main Bundle
│   └── index-[hash].css   # (wenn vorhanden)
```

### 12.3 Deployment Options

| Platform | Complexity | Features |
|----------|------------|----------|
| Vercel | Low | Auto Deploy, Preview URLs |
| Netlify | Low | Auto Deploy, Forms |
| GitHub Pages | Low | Free, Manual |
| AWS S3 + CloudFront | Medium | Full Control |

---

## 13. Future Architecture (Empfehlung)

### 13.1 Recommended Stack Additions

| Addition | Purpose | Priority |
|----------|---------|----------|
| TypeScript | Type Safety | High |
| React Router | Proper Routing | High |
| Zustand/Jotai | State Management | High |
| Styled Components | Consistent Styling | Medium |
| Vitest | Unit Testing | Medium |
| Playwright | E2E Testing | Low |
| Storybook | Component Documentation | Low |

### 13.2 Folder Structure (Future)

```
src/
├── components/
│   ├── ui/           # Reusable UI Components
│   ├── layout/       # Layout Components
│   └── icons/        # Icon System
├── stations/         # Station Pages
├── hooks/            # Custom Hooks
├── store/            # State Management
├── utils/            # Calculation Functions
├── styles/           # Design Tokens
├── types/            # TypeScript Types
└── tests/            # Test Files
```

---

## 14. Known Technical Debt

| Issue | Priority | Effort to Fix |
|-------|----------|---------------|
| Design Tokens Duplication | High | Low |
| No State Persistence | High | Medium |
| No Type Safety | High | High |
| No Routing Library | Medium | Medium |
| No Tests | Medium | High |
| Monte Carlo on Main Thread | Low | Medium |
| No Error Boundaries | Low | Low |

---

## 15. Verbesserungsideen (Tech-Fokus)

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Shared Design Token Module | Low | High |
| **Hoch** | React Context für State Sharing | Medium | High |
| **Hoch** | LocalStorage Persistence | Low | High |
| **Mittel** | TypeScript Migration | High | Medium |
| **Mittel** | React Router Integration | Medium | Medium |
| **Mittel** | Code Splitting mit Lazy Loading | Medium | Medium |
| **Niedrig** | Unit Tests für Calculations | Medium | Low |
| **Niedrig** | Storybook für Components | Medium | Low |

---

*Template Version: 1.0*
