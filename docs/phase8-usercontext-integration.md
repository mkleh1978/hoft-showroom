# Phase 8: UserContext Integration - Documentation

**Status:** Implemented
**Date:** February 2026

## Overview

This phase wired up the existing UserContext to enable cross-station data sharing, LocalStorage persistence, and intelligent recommendations based on user data from previous stations.

### What This Enables

1. **Data Persistence** - User progress is saved to LocalStorage and restored on page refresh
2. **Cross-Station Recommendations** - CFPB score influences budget methods and risk profiles
3. **Pre-filled Data** - Income, age, and goals flow between stations automatically
4. **Visual Indicators** - Users see banners showing when data from other stations is being used

## Changes Made

### 1. App.jsx - UserProvider Wrapper
- Wrapped the entire app with `<UserProvider>` to enable context access in all stations
- All stations now have access to shared state via UserContext hooks

### 2. Station 1: Financial Education (Write to Context)
**File:** `src/stations/FinancialEducation.jsx`

**Hooks used:** `useCFPB`, `useGoals`

**Data written:**
- CFPB score, persona, and answers via `setCFPBResult()`
- Financial goals via `addGoal()`

**Data restored:**
- Saved CFPB score on component mount
- Saved goals on component mount

### 3. Station 2: Financial Foundation (Write + Read)
**File:** `src/stations/FinancialFoundation.jsx`

**Hooks used:** `useBudget`, `useRecommendations`

**Data written:**
- Monthly income and budget method via `setBudgetData()`

**Data read:**
- `recommendedBudgetMethod` - suggests budget method based on CFPB score
- `cfpbScore` - passed to BudgetCalculator for display

**Visual indicator:** BudgetCalculator shows a teal banner "Based on your CFPB Score (XX)" when CFPB data is available.

### 4. Station 3: Protection (Write + Read Budget)
**File:** `src/stations/Protection.jsx`

**Hooks used:** `useProtection`, `useBudget`

**Data written:**
- Age, gross income, pension gap, expected pension, required monthly via `setProtectionData()`
- Simulation results via `setSimulationResult()`

**Data read:**
- `monthlyIncome` from Station 2 for pre-filling

**Visual indicator:** AIRetirementPlanner shows "From your budget: €XX/year" hint with "Use this" button when income data is available.

### 5. Station 4: Investment (Write + Read All)
**File:** `src/stations/Investment.jsx`

**Hooks used:** `useInvestment`, `useRecommendations`, `useProtection`, `useGoals`

**Data written:**
- Risk profile, score, answers via `setRiskProfile()`
- Portfolio allocation via `setPortfolioAllocation()`

**Data read:**
- `riskAdjustment` - adjusts risk score based on CFPB
- `cfpbScore` - for display in RiskProfiling
- `age`, `pensionGap` - from Protection station
- `goals` - from Station 1 for life planning

**Visual indicators:**
- RiskProfiling shows amber/teal banner "CFPB Score Impact" when adjustment applies
- LifePlanningCalculator shows "Pre-filled with Your Data" banner with age/gap/goals info

---

## Component Updates

### BudgetCalculator
- Added props: `cfpbScore`, `recommendedMethod`
- Shows CFPB recommendation banner when score is available
- Marks recommended method with "Recommended" label

### AIRetirementPlanner
- Added prop: `prefillIncome`
- Shows "Use this" button to pre-fill income from Station 2 budget

### RiskProfiling
- Added props: `cfpbScore`, `riskAdjustment`
- Shows CFPB impact banner when risk adjustment is non-zero

### LifePlanningCalculator
- Added props: `prefillAge`, `prefillPensionGap`, `prefillGoals`
- Shows "Pre-filled with Your Data" banner when station data is available
- Pre-sets sliders based on Protection station data

---

## Data Flow Diagram

```
Station 1 (Education)
    │
    ├─► CFPB Score ──► Station 2 (recommendedBudgetMethod)
    │                  Station 4 (riskAdjustment)
    │
    └─► Goals ────────► Station 4 (prefillGoals)

Station 2 (Foundation)
    │
    └─► monthlyIncome ─► Station 3 (prefillIncome)

Station 3 (Protection)
    │
    ├─► age ──────────► Station 4 (prefillAge)
    │
    └─► pensionGap ───► Station 4 (prefillPensionGap)
```

---

## How to Test

### Test 1: LocalStorage Persistence
1. Go to Station 1 → Complete CFPB assessment
2. Note your score
3. Refresh the browser (F5)
4. Go to Station 1 → Score should still be visible in Insights section

### Test 2: CFPB to Budget Recommendation
1. Go to Station 1 → Complete assessment with LOW score (<50)
2. Go to Station 2 → Budget section
3. **Expected:** Teal banner shows "Based on your CFPB Score (XX) - We recommend the 50-30-20 Rule"

### Test 3: Budget to Retirement Pre-fill
1. Go to Station 2 → Set monthly income (e.g., €4,000)
2. Go to Station 3 → AI Planner section
3. **Expected:** When asked for income, hint shows "From your budget: €48,000/year" with "Use this" button

### Test 4: CFPB Risk Adjustment
1. Go to Station 1 → Complete assessment with LOW score (<50)
2. Go to Station 4 → Risk Profile section
3. **Expected:** Amber banner shows "CFPB Score Impact" explaining conservative adjustment

### Test 5: Protection to Investment Pre-fill
1. Go to Station 3 → Complete AI Planner (enter age: 45, income: 50000)
2. Go to Station 4 → Life Planning section
3. **Expected:** Banner shows "Pre-filled with Your Data - Age: 45"

### Test 6: Clear Data
1. Open browser DevTools → Application → Local Storage
2. Delete `hoft_user_profile` key
3. Refresh browser
4. All stations should work with default values

---

## LocalStorage Key

All user data is stored under the key: `hoft_user_profile`

Sample stored data structure:
```json
{
  "cfpbScore": 65,
  "cfpbPersona": "Steady Builders",
  "cfpbAnswers": {...},
  "financialGoals": [...],
  "monthlyIncome": 3500,
  "budgetMethod": "50-30-20",
  "age": 45,
  "pensionGap": 800,
  "investorProfile": "Balanced Growth",
  "riskScore": 6,
  "lastUpdated": "2026-02-03T..."
}
```

---

## Recommendation Logic

### Budget Method Recommendation (useRecommendations)
- CFPB < 50: `50-30-20` (simple, structured)
- CFPB 50-70: `pay-yourself` (automation)
- CFPB > 70: `zero-based` (maximum control)

### Risk Adjustment (useRecommendations)
- CFPB < 50: `-2` (more conservative)
- CFPB >= 50: `0` (no adjustment)

### Emergency Fund Multiplier (useRecommendations)
- CFPB < 40: `1.5x` (longer runway)
- CFPB >= 40: `1x` (standard)
