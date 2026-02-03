// ============================================================================
// HoFT DESIGN SYSTEM - Icon Paths
// SVG path definitions for all icons (stroke-based, 2px stroke)
// ============================================================================

import React from 'react';

// Navigation & UI Icons
export const play = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </>
);

export const arrowRight = (
  <>
    <path d="M5 12h14"/>
    <path d="M12 5l7 7-7 7"/>
  </>
);

export const arrowLeft = (
  <>
    <path d="M19 12H5"/>
    <path d="M12 19l-7-7 7-7"/>
  </>
);

export const check = (
  <polyline points="20 6 9 17 4 12"/>
);

export const checkCircle = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M9 12l2 2 4-4"/>
  </>
);

export const x = (
  <>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </>
);

export const plus = (
  <>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </>
);

export const minus = (
  <line x1="5" y1="12" x2="19" y2="12"/>
);

export const home = (
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </>
);

export const grid = (
  <>
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </>
);

export const menu = (
  <>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </>
);

export const info = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </>
);

export const alertCircle = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </>
);

export const alertTriangle = (
  <>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </>
);

export const send = (
  <>
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </>
);

export const refreshCw = (
  <>
    <path d="M23 4v6h-6"/>
    <path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </>
);

// Finance Icons
export const wallet = (
  <>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <circle cx="18" cy="14" r="1"/>
  </>
);

export const dollarSign = (
  <>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </>
);

export const piggyBank = (
  <>
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>
    <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
    <path d="M16 11h.01"/>
  </>
);

export const barChart = (
  <>
    <rect x="3" y="12" width="4" height="9" rx="1"/>
    <rect x="10" y="6" width="4" height="15" rx="1"/>
    <rect x="17" y="9" width="4" height="12" rx="1"/>
  </>
);

export const trendingUp = (
  <>
    <path d="M23 6l-9.5 9.5-5-5L1 18"/>
    <path d="M17 6h6v6"/>
  </>
);

export const trendingDown = (
  <>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </>
);

export const pieChart = (
  <>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
  </>
);

export const calculator = (
  <>
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <path d="M8 6h8"/>
    <path d="M8 10h8"/>
    <path d="M8 14h2"/>
    <path d="M8 18h2"/>
    <path d="M14 14h2"/>
    <path d="M14 18h2"/>
  </>
);

// Risk & Protection Icons
export const shield = (
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
);

export const shieldCheck = (
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </>
);

export const target = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </>
);

export const scale = (
  <>
    <path d="M12 3v18"/>
    <path d="M3 7l9-4 9 4"/>
    <circle cx="3" cy="17" r="3"/>
    <circle cx="21" cy="17" r="3"/>
    <path d="M3 7v7"/>
    <path d="M21 7v7"/>
  </>
);

export const triangle = (
  <path d="M12 3L3 21h18L12 3z"/>
);

export const activity = (
  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
);

// Time & Clock Icons
export const clock = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </>
);

// People Icons
export const user = (
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </>
);

export const users = (
  <>
    <circle cx="9" cy="7" r="4"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <circle cx="19" cy="7" r="3"/>
    <path d="M21 21v-2a3 3 0 0 0-2-2.83"/>
  </>
);

export const userX = (
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="18" y1="8" x2="23" y2="13"/>
    <line x1="23" y1="8" x2="18" y2="13"/>
  </>
);

export const baby = (
  <>
    <circle cx="12" cy="8" r="5"/>
    <path d="M12 13v8"/>
    <path d="M9 18h6"/>
  </>
);

// Building & Work Icons
export const building = (
  <>
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>
  </>
);

export const briefcase = (
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </>
);

// Nature & ESG Icons
export const leaf = (
  <>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </>
);

export const globe = (
  <>
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </>
);

export const droplet = (
  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
);

// Technology Icons
export const cpu = (
  <>
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
  </>
);

export const zap = (
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
);

export const lightbulb = (
  <>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </>
);

// Education & Content Icons
export const education = (
  <>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </>
);

export const mirror = (
  <>
    <ellipse cx="12" cy="12" rx="8" ry="10"/>
    <path d="M12 2v4"/>
    <circle cx="12" cy="12" r="3"/>
  </>
);

// Travel & Lifestyle Icons
export const plane = (
  <>
    <path d="M21 16v-2a4 4 0 0 0-4-4H7l-4 4 4 4h10a4 4 0 0 0 4-4z"/>
    <path d="M3 10V8a4 4 0 0 1 4-4h10l4 4"/>
  </>
);

// Layers & Structure Icons
export const layers = (
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </>
);

// Export all icon paths as an object for easy access
export const iconPaths = {
  // Navigation & UI
  play,
  arrowRight,
  arrowLeft,
  check,
  checkCircle,
  x,
  plus,
  minus,
  home,
  grid,
  menu,
  info,
  alertCircle,
  alertTriangle,
  send,
  refreshCw,
  // Finance
  wallet,
  dollarSign,
  piggyBank,
  barChart,
  trendingUp,
  trendingDown,
  pieChart,
  calculator,
  // Risk & Protection
  shield,
  shieldCheck,
  target,
  scale,
  triangle,
  activity,
  // Time
  clock,
  // People
  user,
  users,
  userX,
  baby,
  // Building & Work
  building,
  briefcase,
  // Nature & ESG
  leaf,
  globe,
  droplet,
  // Technology
  cpu,
  zap,
  lightbulb,
  // Education
  education,
  mirror,
  // Travel
  plane,
  // Layers
  layers,
};

export default iconPaths;
