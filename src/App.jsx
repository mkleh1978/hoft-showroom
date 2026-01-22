import React, { useState } from 'react';
import FinancialEducation from './stations/FinancialEducation';
import FinancialFoundation from './stations/FinancialFoundation';
import Protection from './stations/Protection';
import Investment from './stations/Investment';

// HoFT Design Tokens
const colors = {
  deepNavy: '#0B1F3A',
  charcoal: '#1A1A2E',
  teal: '#0D9488',
  lightTeal: '#CCFBF1',
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
  steelGray: '#64748B',
  amber: '#D97706',
  green: '#059669',
};

// Icons
const Icons = {
  mirror: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="8" ry="10" />
      <path d="M12 2v4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  wallet: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/>
    </svg>
  ),
  shield: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  trendingUp: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  home: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  arrowLeft: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
};

// Station configurations
const stations = [
  {
    id: 'education',
    number: 1,
    title: 'Financial Education',
    subtitle: 'Measurement Station',
    description: 'Discover your financial wellbeing with the CFPB-10 assessment, set personalized goals, and see how you compare.',
    icon: Icons.mirror,
    color: colors.teal,
    tags: ['CFPB-10', 'Goals', 'Community'],
  },
  {
    id: 'foundation',
    number: 2,
    title: 'Financial Foundation',
    subtitle: 'Budget & Security',
    description: 'Build your financial base with smart budgeting, emergency fund planning, and debt freedom strategies.',
    icon: Icons.wallet,
    color: colors.deepNavy,
    tags: ['Budget', 'Emergency Fund', 'Debt Freedom'],
  },
  {
    id: 'protection',
    number: 3,
    title: 'Protection Point',
    subtitle: 'Retirement & Risk',
    description: 'Plan your retirement with AI, run Monte Carlo simulations, and understand life event impacts.',
    icon: Icons.shield,
    color: colors.amber,
    tags: ['Pension', 'Monte Carlo', 'Insurance'],
  },
  {
    id: 'investment',
    number: 4,
    title: 'Investment Corner',
    subtitle: 'Wealth Building',
    description: 'Master investing with risk profiling, portfolio building, ESG analysis, and compound growth planning.',
    icon: Icons.trendingUp,
    color: colors.green,
    tags: ['Risk Profile', 'Portfolio', 'ESG'],
  },
];

// Back to Menu Button Component
export const BackToMenuButton = ({ onBack }) => (
  <button
    onClick={onBack}
    style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 24px',
      background: colors.deepNavy,
      color: colors.white,
      border: 'none',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(11, 31, 58, 0.3)',
      zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 6px 24px rgba(11, 31, 58, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(11, 31, 58, 0.3)';
    }}
  >
    <Icons.home color={colors.teal} size={20} />
    Back to Menu
  </button>
);

// Main Menu Component
const MainMenu = ({ onSelectStation }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.deepNavy} 0%, ${colors.charcoal} 100%)`,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        padding: '32px 40px',
        borderBottom: `1px solid rgba(13, 148, 136, 0.2)`,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '8px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: colors.teal,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '800',
              color: colors.white,
              letterSpacing: '1px',
            }}>
              HoFT
            </div>
            <div>
              <div style={{
                color: colors.teal,
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '3px',
                marginBottom: '2px',
              }}>
                INTERACTIVE EXPERIENCE
              </div>
              <h1 style={{
                color: colors.white,
                fontSize: '28px',
                fontWeight: '700',
                margin: 0,
              }}>
                Financial Ecosystem Showroom
              </h1>
            </div>
          </div>
          <p style={{
            color: colors.steelGray,
            fontSize: '15px',
            marginLeft: '64px',
            marginTop: '4px',
          }}>
            House of Finance & Tech Berlin
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              color: colors.teal,
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '3px',
              marginBottom: '12px',
            }}>
              SELECT YOUR JOURNEY
            </div>
            <h2 style={{
              color: colors.white,
              fontSize: '36px',
              fontWeight: '300',
              margin: 0,
            }}>
              Explore the <span style={{ color: colors.teal, fontWeight: '600' }}>4 Stations</span>
            </h2>
          </div>

          {/* Station Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}>
            {stations.map((station) => {
              const IconComponent = station.icon;
              return (
                <button
                  key={station.id}
                  onClick={() => onSelectStation(station.id)}
                  style={{
                    background: colors.white,
                    border: 'none',
                    borderRadius: '20px',
                    padding: '32px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Station Number Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    width: '40px',
                    height: '40px',
                    background: station.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontSize: '16px',
                    fontWeight: '800',
                  }}>
                    {station.number}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: `${station.color}15`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <IconComponent color={station.color} size={32} />
                  </div>

                  {/* Content */}
                  <div style={{
                    color: station.color,
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    marginBottom: '6px',
                  }}>
                    {station.subtitle.toUpperCase()}
                  </div>
                  <h3 style={{
                    color: colors.deepNavy,
                    fontSize: '22px',
                    fontWeight: '700',
                    margin: '0 0 12px 0',
                  }}>
                    {station.title}
                  </h3>
                  <p style={{
                    color: colors.steelGray,
                    fontSize: '14px',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                    paddingRight: '40px',
                  }}>
                    {station.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {station.tags.map((tag, i) => (
                      <span key={i} style={{
                        background: colors.offWhite,
                        color: colors.charcoal,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Accent */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: station.color,
                  }} />
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px 40px',
        borderTop: `1px solid rgba(13, 148, 136, 0.2)`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ color: colors.steelGray, fontSize: '13px' }}>
            Tap a station to begin your interactive experience
          </div>
          <div style={{
            color: colors.teal,
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '1px',
          }}>
            EUROPE'S LEADING FINANCIAL WELLBEING ECOSYSTEM
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentStation, setCurrentStation] = useState(null);

  const handleBackToMenu = () => {
    setCurrentStation(null);
  };

  // Render current station or menu
  if (currentStation === 'education') {
    return (
      <>
        <FinancialEducation />
        <BackToMenuButton onBack={handleBackToMenu} />
      </>
    );
  }

  if (currentStation === 'foundation') {
    return (
      <>
        <FinancialFoundation />
        <BackToMenuButton onBack={handleBackToMenu} />
      </>
    );
  }

  if (currentStation === 'protection') {
    return (
      <>
        <Protection />
        <BackToMenuButton onBack={handleBackToMenu} />
      </>
    );
  }

  if (currentStation === 'investment') {
    return (
      <>
        <Investment />
        <BackToMenuButton onBack={handleBackToMenu} />
      </>
    );
  }

  return <MainMenu onSelectStation={setCurrentStation} />;
};

export default App;
