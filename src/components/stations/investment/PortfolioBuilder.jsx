// ============================================================================
// PortfolioBuilder Component
// Interactive portfolio allocation with simulation
// ============================================================================

import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, radius, transitions, getScoreColor } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Slider from '../../ui/Slider';
import ProgressBar from '../../ui/ProgressBar';

// Asset class definitions
const ASSET_CLASSES = [
  { key: 'stocks', label: 'Global Equities (ETFs)', color: colors.teal, icon: 'trendingUp', returnRate: 0.08 },
  { key: 'bonds', label: 'Investment Grade Bonds', color: colors.deepNavy, icon: 'shield', returnRate: 0.04 },
  { key: 'alternatives', label: 'Alternatives (REITs, Gold)', color: colors.steelGray, icon: 'building', returnRate: 0.06 },
];

/**
 * PortfolioBuilder Component
 *
 * @param {Object} initialAllocation - Starting allocation { stocks, bonds, alternatives }
 * @param {function} onAllocationChange - Called when allocation changes
 * @param {function} onContinue - Called when user wants to proceed
 */
const PortfolioBuilder = ({
  initialAllocation = { stocks: 60, bonds: 30, alternatives: 10 },
  onAllocationChange,
  onContinue,
}) => {
  const [allocation, setAllocation] = useState(initialAllocation);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationYear, setSimulationYear] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(100000);

  // Run simulation effect
  useEffect(() => {
    if (simulationRunning && simulationYear < 10) {
      const timer = setTimeout(() => {
        const baseReturn =
          (allocation.stocks * 0.08 + allocation.bonds * 0.04 + allocation.alternatives * 0.06) / 100;
        const volatility = allocation.stocks * 0.002;
        const yearReturn = baseReturn + (Math.random() - 0.5) * volatility;
        setPortfolioValue((prev) => Math.round(prev * (1 + yearReturn)));
        setSimulationYear((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (simulationYear >= 10) {
      setSimulationRunning(false);
    }
  }, [simulationRunning, simulationYear, allocation]);

  const runSimulation = () => {
    setSimulationYear(0);
    setPortfolioValue(100000);
    setSimulationRunning(true);
  };

  const handleAllocationChange = (key, newVal) => {
    const others = Object.keys(allocation).filter((k) => k !== key);
    const currentOthers = allocation[others[0]] + allocation[others[1]];
    const remaining = 100 - newVal;

    let newAllocation;
    if (currentOthers === 0) {
      newAllocation = {
        ...allocation,
        [key]: newVal,
        [others[0]]: Math.round(remaining / 2),
        [others[1]]: remaining - Math.round(remaining / 2),
      };
    } else {
      const ratio = allocation[others[0]] / currentOthers;
      newAllocation = {
        ...allocation,
        [key]: newVal,
        [others[0]]: Math.round(remaining * ratio),
        [others[1]]: remaining - Math.round(remaining * ratio),
      };
    }

    setAllocation(newAllocation);
    if (onAllocationChange) onAllocationChange(newAllocation);
  };

  const expectedReturn =
    allocation.stocks * 0.08 + allocation.bonds * 0.04 + allocation.alternatives * 0.06;

  // AI Evaluation metrics
  const diversificationScore = allocation.stocks < 80 && allocation.bonds > 10 ? 88 : 55;
  const costScore = 94;
  const esgScore = allocation.stocks > 50 ? 82 : 70;
  const riskReturnScore = allocation.stocks > 40 && allocation.stocks < 80 ? 79 : 52;

  return (
    <div>
      <div style={{ marginBottom: spacing.space6 }}>
        <h2 style={{
          fontSize: typography.fontSizeXl,
          fontWeight: typography.fontWeightBold,
          color: colors.deepNavy,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          Portfolio Builder Challenge
        </h2>
        <p style={{
          fontSize: typography.fontSizeBase,
          color: colors.steelGray,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Allocate €100,000 across asset classes and run a 10-year market simulation.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: spacing.space6,
      }}>
        {/* Allocation Controls */}
        <Card>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing.space6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space3 }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: colors.lightTeal,
                borderRadius: radius.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="pieChart" color={colors.teal} size={20} />
              </div>
              <h3 style={{
                fontSize: typography.fontSizeLg,
                fontWeight: typography.fontWeightBold,
                color: colors.deepNavy,
                margin: 0,
              }}>
                Asset Allocation
              </h3>
            </div>
            <span style={{
              display: 'inline-block',
              backgroundColor: colors.lightTeal,
              color: colors.teal,
              padding: `${spacing.space1} ${spacing.space3}`,
              borderRadius: radius.sm,
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightBold,
              textTransform: 'uppercase',
            }}>
              Total: {allocation.stocks + allocation.bonds + allocation.alternatives}%
            </span>
          </div>

          {ASSET_CLASSES.map((asset) => (
            <div key={asset.key} style={{ marginBottom: spacing.space6 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.space3,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space2 }}>
                  <Icon name={asset.icon} color={asset.color} size={18} />
                  <span style={{
                    fontSize: typography.fontSizeBase,
                    fontWeight: typography.fontWeightMedium,
                    color: colors.charcoal,
                  }}>
                    {asset.label}
                  </span>
                </div>
                <span style={{
                  fontSize: typography.fontSizeLg,
                  fontWeight: typography.fontWeightBold,
                  color: asset.color,
                  backgroundColor: asset.key === 'stocks' ? colors.lightTeal : colors.offWhite,
                  padding: `${spacing.space1} ${spacing.space3}`,
                  borderRadius: radius.sm,
                }}>
                  {allocation[asset.key]}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocation[asset.key]}
                onChange={(e) => handleAllocationChange(asset.key, parseInt(e.target.value))}
                style={{ width: '100%', accentColor: asset.color }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: spacing.space2,
              }}>
                <span style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                  €{(allocation[asset.key] * 1000).toLocaleString('de-DE')}
                </span>
                <span style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                  of €100,000
                </span>
              </div>
            </div>
          ))}

          {/* Visual Allocation Bar */}
          <div style={{
            borderTop: `1px solid ${colors.lightTeal}`,
            paddingTop: spacing.space5,
            marginTop: spacing.space5,
          }}>
            <div style={{
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightSemibold,
              color: colors.steelGray,
              marginBottom: spacing.space3,
            }}>
              Visual Allocation
            </div>
            <div style={{
              display: 'flex',
              borderRadius: radius.lg,
              overflow: 'hidden',
              height: '48px',
            }}>
              {ASSET_CLASSES.map((asset) => (
                <div
                  key={asset.key}
                  style={{
                    width: `${allocation[asset.key]}%`,
                    backgroundColor: asset.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontSize: typography.fontSizeSm,
                    fontWeight: typography.fontWeightBold,
                    transition: transitions.normal,
                  }}
                >
                  {allocation[asset.key] > 15 && `${allocation[asset.key]}%`}
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="dark"
            fullWidth
            onClick={runSimulation}
            disabled={simulationRunning}
            style={{ marginTop: spacing.space5 }}
          >
            <Icon name={simulationRunning ? 'refreshCw' : 'zap'} color={colors.white} size={18} />
            {simulationRunning ? `Simulating Year ${simulationYear}/10...` : 'Run 10-Year Simulation'}
          </Button>
        </Card>

        {/* Results Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space5 }}>
          {/* AI Evaluation */}
          <Card>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.space3,
              marginBottom: spacing.space5,
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                backgroundColor: colors.lightTeal,
                borderRadius: radius.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="cpu" color={colors.teal} size={18} />
              </div>
              <h4 style={{
                fontSize: '15px',
                fontWeight: typography.fontWeightBold,
                color: colors.deepNavy,
                margin: 0,
              }}>
                AI Evaluation
              </h4>
            </div>

            {[
              { label: 'Diversification', score: diversificationScore },
              { label: 'Cost Efficiency', score: costScore },
              { label: 'ESG Compliance', score: esgScore },
              { label: 'Risk-Return', score: riskReturnScore },
            ].map((metric, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? spacing.space4 : 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: spacing.space2,
                }}>
                  <span style={{ fontSize: typography.fontSizeSm, color: colors.charcoal }}>
                    {metric.label}
                  </span>
                  <span style={{
                    fontSize: typography.fontSizeSm,
                    fontWeight: typography.fontWeightBold,
                    color: getScoreColor(metric.score),
                  }}>
                    {metric.score}/100
                  </span>
                </div>
                <ProgressBar value={metric.score} />
              </div>
            ))}
          </Card>

          {/* Portfolio Value */}
          <Card>
            <div style={{
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightSemibold,
              color: colors.steelGray,
              marginBottom: spacing.space2,
            }}>
              Portfolio Value (Year {simulationYear})
            </div>
            <div style={{
              fontSize: typography.fontSize3xl,
              color: portfolioValue >= 100000 ? colors.green : colors.red,
              fontWeight: typography.fontWeightBold,
            }}>
              €{portfolioValue.toLocaleString('de-DE')}
            </div>
            <div style={{
              fontSize: typography.fontSizeBase,
              color: portfolioValue >= 100000 ? colors.green : colors.red,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.space2,
              marginTop: spacing.space2,
            }}>
              <Icon
                name="trendingUp"
                size={16}
                color={portfolioValue >= 100000 ? colors.green : colors.red}
              />
              {portfolioValue >= 100000 ? '+' : ''}
              {((portfolioValue - 100000) / 1000).toFixed(1)}% total
            </div>
          </Card>

          {/* Expected Return */}
          <Card variant="dark" style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightBold,
              color: colors.teal,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Expected Annual Return
            </div>
            <div style={{
              fontSize: typography.fontSize3xl,
              color: colors.white,
              fontWeight: typography.fontWeightBold,
            }}>
              {expectedReturn.toFixed(1)}%
            </div>
            <div style={{
              fontSize: typography.fontSizeXs,
              color: colors.steelGray,
              marginTop: spacing.space1,
            }}>
              Based on historical averages
            </div>
          </Card>
        </div>
      </div>

      {onContinue && (
        <div style={{ marginTop: spacing.space8, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onContinue}>
            Next: ESG Analysis
            <Icon name="arrowRight" color={colors.white} size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioBuilder;
export { ASSET_CLASSES };
