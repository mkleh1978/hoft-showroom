// ============================================================================
// HoFT User Context
// Cross-station state management with LocalStorage persistence
// ============================================================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  // Station 1: Assessment (CFPB)
  cfpbScore: null,
  cfpbPersona: null,
  cfpbAnswers: {},
  cfpbTimestamp: null,

  // Station 1: Goals
  financialGoals: [],

  // Station 2: Foundation
  monthlyIncome: null,
  monthlyExpenses: null,
  budgetMethod: null,
  emergencyFundTarget: null,
  emergencyFundCurrent: null,
  emergencySituation: null,
  subscriptions: [],
  debts: [],

  // Station 3: Protection
  age: null,
  grossIncome: null,
  retirementSavings: null,
  pensionGap: null,
  expectedPension: null,
  requiredMonthly: null,
  simulationResult: null,

  // Station 4: Investment
  investorProfile: null,
  riskScore: null,
  riskAnswers: {},
  portfolioAllocation: null,
  esgPreference: null,

  // Meta
  lastUpdated: null,
  stationsCompleted: [],
};

// ============================================================================
// ACTION TYPES
// ============================================================================

export const ActionTypes = {
  // CFPB Assessment
  SET_CFPB_RESULT: 'SET_CFPB_RESULT',
  RESET_CFPB: 'RESET_CFPB',

  // Goals
  ADD_GOAL: 'ADD_GOAL',
  REMOVE_GOAL: 'REMOVE_GOAL',
  UPDATE_GOAL: 'UPDATE_GOAL',
  SET_GOALS: 'SET_GOALS',

  // Budget & Foundation
  SET_BUDGET_DATA: 'SET_BUDGET_DATA',
  SET_EMERGENCY_DATA: 'SET_EMERGENCY_DATA',
  SET_SUBSCRIPTIONS: 'SET_SUBSCRIPTIONS',
  SET_DEBTS: 'SET_DEBTS',

  // Protection
  SET_PROTECTION_DATA: 'SET_PROTECTION_DATA',
  SET_SIMULATION_RESULT: 'SET_SIMULATION_RESULT',

  // Investment
  SET_RISK_PROFILE: 'SET_RISK_PROFILE',
  SET_PORTFOLIO_ALLOCATION: 'SET_PORTFOLIO_ALLOCATION',
  SET_ESG_PREFERENCE: 'SET_ESG_PREFERENCE',

  // Meta
  MARK_STATION_COMPLETE: 'MARK_STATION_COMPLETE',
  RESET_ALL: 'RESET_ALL',
  HYDRATE: 'HYDRATE',
};

// ============================================================================
// REDUCER
// ============================================================================

function userReducer(state, action) {
  const timestamp = new Date().toISOString();

  switch (action.type) {
    // ========== CFPB Assessment ==========
    case ActionTypes.SET_CFPB_RESULT:
      return {
        ...state,
        cfpbScore: action.payload.score,
        cfpbPersona: action.payload.persona,
        cfpbAnswers: action.payload.answers || state.cfpbAnswers,
        cfpbTimestamp: timestamp,
        lastUpdated: timestamp,
      };

    case ActionTypes.RESET_CFPB:
      return {
        ...state,
        cfpbScore: null,
        cfpbPersona: null,
        cfpbAnswers: {},
        cfpbTimestamp: null,
        lastUpdated: timestamp,
      };

    // ========== Goals ==========
    case ActionTypes.ADD_GOAL:
      return {
        ...state,
        financialGoals: [...state.financialGoals, { ...action.payload, id: action.payload.id || Date.now().toString() }],
        lastUpdated: timestamp,
      };

    case ActionTypes.REMOVE_GOAL:
      return {
        ...state,
        financialGoals: state.financialGoals.filter(g => g.id !== action.payload),
        lastUpdated: timestamp,
      };

    case ActionTypes.UPDATE_GOAL:
      return {
        ...state,
        financialGoals: state.financialGoals.map(g =>
          g.id === action.payload.id ? { ...g, ...action.payload } : g
        ),
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_GOALS:
      return {
        ...state,
        financialGoals: action.payload,
        lastUpdated: timestamp,
      };

    // ========== Budget & Foundation ==========
    case ActionTypes.SET_BUDGET_DATA:
      return {
        ...state,
        monthlyIncome: action.payload.monthlyIncome ?? state.monthlyIncome,
        monthlyExpenses: action.payload.monthlyExpenses ?? state.monthlyExpenses,
        budgetMethod: action.payload.budgetMethod ?? state.budgetMethod,
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_EMERGENCY_DATA:
      return {
        ...state,
        emergencyFundTarget: action.payload.target ?? state.emergencyFundTarget,
        emergencyFundCurrent: action.payload.current ?? state.emergencyFundCurrent,
        emergencySituation: action.payload.situation ?? state.emergencySituation,
        monthlyExpenses: action.payload.monthlyExpenses ?? state.monthlyExpenses,
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_DEBTS:
      return {
        ...state,
        debts: action.payload,
        lastUpdated: timestamp,
      };

    // ========== Protection ==========
    case ActionTypes.SET_PROTECTION_DATA:
      return {
        ...state,
        age: action.payload.age ?? state.age,
        grossIncome: action.payload.grossIncome ?? state.grossIncome,
        retirementSavings: action.payload.retirementSavings ?? state.retirementSavings,
        pensionGap: action.payload.pensionGap ?? state.pensionGap,
        expectedPension: action.payload.expectedPension ?? state.expectedPension,
        requiredMonthly: action.payload.requiredMonthly ?? state.requiredMonthly,
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_SIMULATION_RESULT:
      return {
        ...state,
        simulationResult: action.payload,
        lastUpdated: timestamp,
      };

    // ========== Investment ==========
    case ActionTypes.SET_RISK_PROFILE:
      return {
        ...state,
        investorProfile: action.payload.profile,
        riskScore: action.payload.score,
        riskAnswers: action.payload.answers || state.riskAnswers,
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_PORTFOLIO_ALLOCATION:
      return {
        ...state,
        portfolioAllocation: action.payload,
        lastUpdated: timestamp,
      };

    case ActionTypes.SET_ESG_PREFERENCE:
      return {
        ...state,
        esgPreference: action.payload,
        lastUpdated: timestamp,
      };

    // ========== Meta ==========
    case ActionTypes.MARK_STATION_COMPLETE:
      return {
        ...state,
        stationsCompleted: state.stationsCompleted.includes(action.payload)
          ? state.stationsCompleted
          : [...state.stationsCompleted, action.payload],
        lastUpdated: timestamp,
      };

    case ActionTypes.RESET_ALL:
      return { ...initialState, lastUpdated: timestamp };

    case ActionTypes.HYDRATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

const UserContext = createContext(null);

const STORAGE_KEY = 'hoft_user_profile';

// ============================================================================
// PROVIDER
// ============================================================================

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState, (initial) => {
    // Hydrate from LocalStorage on initial load
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...initial, ...parsed };
        }
      } catch (e) {
        console.warn('Failed to load user profile from LocalStorage:', e);
      }
    }
    return initial;
  });

  // Persist to LocalStorage on every state change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.warn('Failed to save user profile to LocalStorage:', e);
      }
    }
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Main hook to access user context
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

/**
 * Hook for CFPB score and persona
 */
export function useCFPB() {
  const { state, dispatch } = useUser();

  const setCFPBResult = (score, persona, answers) => {
    dispatch({
      type: ActionTypes.SET_CFPB_RESULT,
      payload: { score, persona, answers },
    });
  };

  const resetCFPB = () => {
    dispatch({ type: ActionTypes.RESET_CFPB });
  };

  return {
    score: state.cfpbScore,
    persona: state.cfpbPersona,
    answers: state.cfpbAnswers,
    timestamp: state.cfpbTimestamp,
    setCFPBResult,
    resetCFPB,
  };
}

/**
 * Hook for financial goals
 */
export function useGoals() {
  const { state, dispatch } = useUser();

  const addGoal = (goal) => {
    dispatch({ type: ActionTypes.ADD_GOAL, payload: goal });
  };

  const removeGoal = (goalId) => {
    dispatch({ type: ActionTypes.REMOVE_GOAL, payload: goalId });
  };

  const updateGoal = (goalId, updates) => {
    dispatch({ type: ActionTypes.UPDATE_GOAL, payload: { id: goalId, ...updates } });
  };

  return {
    goals: state.financialGoals,
    addGoal,
    removeGoal,
    updateGoal,
  };
}

/**
 * Hook for budget and foundation data
 */
export function useBudget() {
  const { state, dispatch } = useUser();

  const setBudgetData = (data) => {
    dispatch({ type: ActionTypes.SET_BUDGET_DATA, payload: data });
  };

  const setEmergencyData = (data) => {
    dispatch({ type: ActionTypes.SET_EMERGENCY_DATA, payload: data });
  };

  const setSubscriptions = (subscriptions) => {
    dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: subscriptions });
  };

  const setDebts = (debts) => {
    dispatch({ type: ActionTypes.SET_DEBTS, payload: debts });
  };

  return {
    monthlyIncome: state.monthlyIncome,
    monthlyExpenses: state.monthlyExpenses,
    budgetMethod: state.budgetMethod,
    emergencyFundTarget: state.emergencyFundTarget,
    emergencyFundCurrent: state.emergencyFundCurrent,
    emergencySituation: state.emergencySituation,
    subscriptions: state.subscriptions,
    debts: state.debts,
    setBudgetData,
    setEmergencyData,
    setSubscriptions,
    setDebts,
  };
}

/**
 * Hook for protection/retirement data
 */
export function useProtection() {
  const { state, dispatch } = useUser();

  const setProtectionData = (data) => {
    dispatch({ type: ActionTypes.SET_PROTECTION_DATA, payload: data });
  };

  const setSimulationResult = (result) => {
    dispatch({ type: ActionTypes.SET_SIMULATION_RESULT, payload: result });
  };

  return {
    age: state.age,
    grossIncome: state.grossIncome,
    retirementSavings: state.retirementSavings,
    pensionGap: state.pensionGap,
    expectedPension: state.expectedPension,
    requiredMonthly: state.requiredMonthly,
    simulationResult: state.simulationResult,
    setProtectionData,
    setSimulationResult,
  };
}

/**
 * Hook for investment data
 */
export function useInvestment() {
  const { state, dispatch } = useUser();

  const setRiskProfile = (profile, score, answers) => {
    dispatch({
      type: ActionTypes.SET_RISK_PROFILE,
      payload: { profile, score, answers },
    });
  };

  const setPortfolioAllocation = (allocation) => {
    dispatch({ type: ActionTypes.SET_PORTFOLIO_ALLOCATION, payload: allocation });
  };

  const setESGPreference = (preference) => {
    dispatch({ type: ActionTypes.SET_ESG_PREFERENCE, payload: preference });
  };

  return {
    investorProfile: state.investorProfile,
    riskScore: state.riskScore,
    riskAnswers: state.riskAnswers,
    portfolioAllocation: state.portfolioAllocation,
    esgPreference: state.esgPreference,
    setRiskProfile,
    setPortfolioAllocation,
    setESGPreference,
  };
}

/**
 * Hook for cross-station recommendations based on CFPB score
 */
export function useRecommendations() {
  const { state } = useUser();

  const getRecommendedBudgetMethod = () => {
    if (!state.cfpbScore) return '50-30-20';
    if (state.cfpbScore < 50) return '50-30-20';
    if (state.cfpbScore < 70) return 'pay-yourself';
    return 'zero-based';
  };

  const getEmergencyMonthsMultiplier = () => {
    if (!state.cfpbScore) return 1;
    if (state.cfpbScore < 40) return 1.5;
    return 1;
  };

  const getRiskAdjustment = () => {
    if (!state.cfpbScore) return 0;
    if (state.cfpbScore < 50) return -2;
    return 0;
  };

  return {
    recommendedBudgetMethod: getRecommendedBudgetMethod(),
    emergencyMonthsMultiplier: getEmergencyMonthsMultiplier(),
    riskAdjustment: getRiskAdjustment(),
    cfpbScore: state.cfpbScore,
    cfpbPersona: state.cfpbPersona,
  };
}

/**
 * Hook to clear all user data
 */
export function useClearData() {
  const { dispatch } = useUser();

  const clearAllData = () => {
    dispatch({ type: ActionTypes.RESET_ALL });
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { clearAllData };
}

export default UserContext;
