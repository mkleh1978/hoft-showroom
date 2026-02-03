// ============================================================================
// ESGAnalysis Component
// ESG investing principles with company analysis
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions, getScoreColor } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import ProgressBar from '../../ui/ProgressBar';

// ESG Pillars
const ESG_PILLARS = [
  {
    letter: 'E',
    title: 'Environmental',
    color: colors.green,
    factors: ['Carbon emissions', 'Resource efficiency', 'Climate risk'],
  },
  {
    letter: 'S',
    title: 'Social',
    color: colors.teal,
    factors: ['Labor practices', 'Diversity', 'Human rights'],
  },
  {
    letter: 'G',
    title: 'Governance',
    color: colors.deepNavy,
    factors: ['Board independence', 'Ethics', 'Transparency'],
  },
];

// Sample companies for ESG analysis
const ESG_COMPANIES = [
  { name: 'TechGreen Inc.', sector: 'Technology', e: 88, s: 82, g: 91, carbon: 8, risk: 'Low' },
  { name: 'PetroMax Corp.', sector: 'Energy', e: 35, s: 58, g: 65, carbon: 124, risk: 'Critical' },
  { name: 'EcoFinance AG', sector: 'Finance', e: 76, s: 89, g: 94, carbon: 12, risk: 'Low' },
  { name: 'HeavyMetal GmbH', sector: 'Manufacturing', e: 42, s: 61, g: 72, carbon: 89, risk: 'High' },
];

/**
 * ESGAnalysis Component
 *
 * @param {function} onContinue - Called when user wants to proceed
 */
const ESGAnalysis = ({ onContinue }) => {
  const [selectedCompany, setSelectedCompany] = useState(0);

  const company = ESG_COMPANIES[selectedCompany];
  const riskColor =
    company.risk === 'Low' ? colors.green : company.risk === 'High' ? colors.amber : colors.red;

  return (
    <div>
      <div style={{ marginBottom: spacing.space6 }}>
        <h2 style={{
          fontSize: typography.fontSizeXl,
          fontWeight: typography.fontWeightBold,
          color: colors.deepNavy,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          ESG Investing
        </h2>
        <p style={{
          fontSize: typography.fontSizeBase,
          color: colors.steelGray,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Returns with responsibility. AI-powered analysis of Environmental, Social, and Governance factors.
        </p>
      </div>

      {/* ESG Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing.space5,
        marginBottom: spacing.space8,
      }}>
        {ESG_PILLARS.map((pillar) => (
          <Card key={pillar.letter} variant="accent" style={{ borderTopColor: pillar.color }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.space4,
              marginBottom: spacing.space5,
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                backgroundColor: pillar.color,
                borderRadius: radius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  color: colors.white,
                  fontSize: typography.fontSize2xl,
                  fontWeight: typography.fontWeightBold,
                }}>
                  {pillar.letter}
                </span>
              </div>
              <h3 style={{
                fontSize: typography.fontSizeLg,
                fontWeight: typography.fontWeightBold,
                color: colors.deepNavy,
                margin: 0,
              }}>
                {pillar.title}
              </h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pillar.factors.map((factor, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: typography.fontSizeBase,
                    color: colors.charcoal,
                    padding: `${spacing.space3} 0`,
                    borderBottom: j < pillar.factors.length - 1 ? `1px solid ${colors.lightTeal}` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.space3,
                  }}
                >
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: radius.full,
                    backgroundColor: pillar.color,
                  }} />
                  {factor}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* ESG Detective */}
      <Card variant="accent" style={{
        borderTop: `4px solid ${colors.deepNavy}`,
        overflow: 'hidden',
        padding: 0,
      }}>
        <div style={{
          backgroundColor: colors.deepNavy,
          padding: `${spacing.space5} ${spacing.space6}`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.space4,
        }}>
          <Icon name="target" color={colors.teal} size={24} />
          <div>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              color: colors.white,
              margin: 0,
              fontWeight: typography.fontWeightBold,
            }}>
              ESG Detective
            </h3>
            <p style={{
              fontSize: typography.fontSizeSm,
              color: colors.steelGray,
              margin: `${spacing.space1} 0 0`,
            }}>
              Analyze companies and identify sustainability risks
            </p>
          </div>
        </div>

        <div style={{ padding: spacing.space6 }}>
          {/* Company Selector */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: spacing.space3,
            marginBottom: spacing.space6,
          }}>
            {ESG_COMPANIES.map((comp, i) => (
              <button
                key={i}
                onClick={() => setSelectedCompany(i)}
                style={{
                  padding: spacing.space4,
                  border: `2px solid ${selectedCompany === i ? colors.teal : colors.lightTeal}`,
                  borderRadius: radius.lg,
                  backgroundColor: selectedCompany === i ? colors.lightTeal : colors.white,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: transitions.fast,
                  fontFamily: 'inherit',
                }}
              >
                <div style={{
                  fontSize: '15px',
                  fontWeight: typography.fontWeightBold,
                  color: colors.deepNavy,
                }}>
                  {comp.name}
                </div>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  color: colors.steelGray,
                }}>
                  {comp.sector}
                </div>
              </button>
            ))}
          </div>

          {/* Company Analysis */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing.space6,
          }}>
            {/* ESG Scores */}
            <div>
              <div style={{
                fontSize: typography.fontSizeXs,
                fontWeight: typography.fontWeightSemibold,
                color: colors.steelGray,
                marginBottom: spacing.space4,
              }}>
                ESG Scores
              </div>
              {[
                { label: 'Environmental', score: company.e, color: colors.green },
                { label: 'Social', score: company.s, color: colors.teal },
                { label: 'Governance', score: company.g, color: colors.deepNavy },
              ].map((metric, i) => (
                <div key={i} style={{ marginBottom: spacing.space4 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: spacing.space2,
                  }}>
                    <span style={{ fontSize: typography.fontSizeBase, color: colors.charcoal }}>
                      {metric.label}
                    </span>
                    <span style={{
                      fontSize: typography.fontSizeBase,
                      fontWeight: typography.fontWeightBold,
                      color: getScoreColor(metric.score),
                    }}>
                      {metric.score}/100
                    </span>
                  </div>
                  <ProgressBar value={metric.score} height="10px" />
                </div>
              ))}
            </div>

            {/* Key Findings */}
            <div>
              <div style={{
                fontSize: typography.fontSizeXs,
                fontWeight: typography.fontWeightSemibold,
                color: colors.steelGray,
                marginBottom: spacing.space4,
              }}>
                Key Findings
              </div>

              {/* Carbon Footprint */}
              <div style={{
                backgroundColor: colors.offWhite,
                padding: spacing.space5,
                borderRadius: radius.xl,
                marginBottom: spacing.space4,
              }}>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightSemibold,
                  color: colors.steelGray,
                  marginBottom: spacing.space1,
                }}>
                  Carbon Footprint
                </div>
                <div style={{
                  fontSize: typography.fontSize2xl,
                  fontWeight: typography.fontWeightBold,
                  color: company.carbon < 50 ? colors.green : colors.red,
                }}>
                  {company.carbon} tCO₂e
                </div>
                <div style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                  per €1M revenue
                </div>
              </div>

              {/* Risk Level */}
              <div style={{
                backgroundColor:
                  company.risk === 'Low'
                    ? colors.lightTeal
                    : company.risk === 'High'
                    ? 'rgba(217, 119, 6, 0.2)'
                    : 'rgba(220, 38, 38, 0.2)',
                padding: spacing.space5,
                borderRadius: radius.xl,
                borderLeft: `6px solid ${riskColor}`,
              }}>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightSemibold,
                  color: colors.steelGray,
                  marginBottom: spacing.space1,
                }}>
                  ESG Risk Level
                </div>
                <div style={{
                  fontSize: typography.fontSizeXl,
                  fontWeight: typography.fontWeightBold,
                  color: riskColor,
                }}>
                  {company.risk}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Insight */}
      <Card variant="dark" style={{
        marginTop: spacing.space6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.space6,
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          backgroundColor: colors.teal,
          borderRadius: radius.xl,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="lightbulb" color={colors.white} size={28} />
        </div>
        <div>
          <h4 style={{
            fontSize: typography.fontSizeLg,
            color: colors.white,
            margin: `0 0 ${spacing.space3} 0`,
            fontWeight: typography.fontWeightBold,
          }}>
            Insight: ESG Does Not Sacrifice Returns
          </h4>
          <p style={{
            fontSize: '15px',
            color: colors.steelGray,
            margin: 0,
            lineHeight: 1.7,
          }}>
            Meta-analyses show ESG portfolios perform{' '}
            <strong style={{ color: colors.white }}>at least as well</strong> as conventional portfolios.
            They often{' '}
            <span style={{ color: colors.teal, fontWeight: typography.fontWeightSemibold }}>
              outperform during crises
            </span>{' '}
            due to superior risk management.
          </p>
        </div>
      </Card>

      {onContinue && (
        <div style={{ marginTop: spacing.space8, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onContinue}>
            Next: Life Planning
            <Icon name="arrowRight" color={colors.white} size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ESGAnalysis;
export { ESG_PILLARS, ESG_COMPANIES };
