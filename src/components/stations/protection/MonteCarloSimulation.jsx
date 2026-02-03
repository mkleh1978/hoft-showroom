// ============================================================================
// MonteCarloSimulation Component
// 500-scenario retirement simulation with canvas visualization
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { colors, typography, spacing, radius } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

/**
 * MonteCarloSimulation Component
 *
 * @param {Object} userData - User data from AI planner (calculatedAge, calculatedIncome, savings)
 * @param {function} onComplete - Called when simulation completes with result
 * @param {function} onContinue - Called when user wants to proceed
 */
const MonteCarloSimulation = ({ userData = {}, onComplete, onContinue }) => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [scenarioCount, setScenarioCount] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const canvasRef = useRef(null);

  const age = userData.calculatedAge || 45;
  const income = userData.calculatedIncome || 55000;
  const savings = userData.savings || 50000;

  // Run Monte Carlo simulation
  const runSimulation = () => {
    setSimulationRunning(true);
    setScenarioCount(0);
    setSimulationResult(null);
    setScenarios([]);

    const yearsToRetirement = Math.max(67 - age, 1);
    const retirementYears = 25;
    const totalYears = yearsToRetirement + retirementYears;
    const monthlyContribution = 500;
    const monthlyPension = (income * 0.48) / 12;
    const monthlyNeeds = (income * 0.75) / 12;

    const newScenarios = [];
    const totalScenarios = 500;
    let successCount = 0;

    const runBatch = (start, batchSize) => {
      for (let i = start; i < Math.min(start + batchSize, totalScenarios); i++) {
        const scenario = [];
        let balance = savings;
        let failed = false;

        for (let year = 0; year <= totalYears; year++) {
          const returnRate = 0.04 + (Math.random() - 0.5) * 0.16;
          const inflation = 0.02 + Math.random() * 0.02;

          if (year < yearsToRetirement) {
            balance = balance * (1 + returnRate) + monthlyContribution * 12;
          } else {
            const withdrawalNeeded =
              (monthlyNeeds - monthlyPension) *
              12 *
              Math.pow(1 + inflation, year - yearsToRetirement);
            balance = balance * (1 + returnRate * 0.6) - withdrawalNeeded;
          }

          if (balance < 0 && !failed) {
            failed = true;
            balance = 0;
          }

          scenario.push({
            year: age + year,
            balance: Math.max(0, balance),
            failed,
          });
        }

        if (!failed) successCount++;
        newScenarios.push(scenario);
      }

      setScenarios([...newScenarios]);
      setScenarioCount(Math.min(start + batchSize, totalScenarios));

      if (start + batchSize < totalScenarios) {
        setTimeout(() => runBatch(start + batchSize, batchSize), 30);
      } else {
        const successRate = Math.round((successCount / totalScenarios) * 100);
        const result = {
          successRate,
          scenariosRun: totalScenarios,
          status: successRate >= 80 ? 'green' : successRate >= 60 ? 'yellow' : 'red',
        };
        setSimulationResult(result);
        setSimulationRunning(false);

        if (onComplete) {
          onComplete(result);
        }
      }
    };

    runBatch(0, 20);
  };

  // Draw Monte Carlo chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || scenarios.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 30, right: 30, bottom: 50, left: 70 };

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = colors.offWhite;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + ((height - padding.top - padding.bottom) * i) / 4;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Y-axis labels
    ctx.fillStyle = colors.steelGray;
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ['€800k', '€600k', '€400k', '€200k', '€0'].forEach((label, i) => {
      const y = padding.top + ((height - padding.top - padding.bottom) * i) / 4;
      ctx.fillText(label, padding.left - 12, y + 4);
    });

    // X-axis labels
    ctx.textAlign = 'center';
    const xLabels = [age, Math.round(age + 10), Math.round(age + 20), Math.round(age + 30), Math.round(age + 40)];
    xLabels.forEach((yearLabel, i) => {
      if (yearLabel <= 95) {
        const x = padding.left + ((width - padding.left - padding.right) * i) / 4;
        ctx.fillText(`Age ${yearLabel}`, x, height - 20);
      }
    });

    // Draw scenarios
    const maxBalance = 800000;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    scenarios.forEach((scenario) => {
      const failed = scenario[scenario.length - 1]?.failed;
      ctx.strokeStyle = failed ? 'rgba(220, 38, 38, 0.15)' : 'rgba(13, 148, 136, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      scenario.forEach((point, i) => {
        const x = padding.left + (i / (scenario.length - 1)) * chartWidth;
        const y = padding.top + (1 - Math.min(point.balance, maxBalance) / maxBalance) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Draw median line if complete
    if (simulationResult) {
      const sortedScenarios = [...scenarios].sort((a, b) => {
        return (b[b.length - 1]?.balance || 0) - (a[a.length - 1]?.balance || 0);
      });
      const medianScenario = sortedScenarios[Math.floor(scenarios.length / 2)];

      if (medianScenario) {
        ctx.strokeStyle = colors.teal;
        ctx.lineWidth = 3;
        ctx.beginPath();
        medianScenario.forEach((point, i) => {
          const x = padding.left + (i / (medianScenario.length - 1)) * chartWidth;
          const y = padding.top + (1 - Math.min(point.balance, maxBalance) / maxBalance) * chartHeight;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Retirement line
        const yearsToRetirement = Math.max(67 - age, 1);
        const retirementX = padding.left + (yearsToRetirement / (medianScenario.length - 1)) * chartWidth;
        ctx.strokeStyle = 'rgba(107, 114, 128, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(retirementX, padding.top);
        ctx.lineTo(retirementX, height - padding.bottom);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = colors.steelGray;
        ctx.fillText('Retirement (67)', retirementX, padding.top - 10);
      }
    }
  }, [scenarios, simulationResult, age]);

  const statusColor =
    simulationResult?.status === 'green'
      ? colors.green
      : simulationResult?.status === 'yellow'
      ? colors.amber
      : colors.red;

  return (
    <div>
      <div style={{
        fontSize: typography.fontSizeXs,
        fontWeight: typography.fontWeightBold,
        color: colors.teal,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: spacing.space2,
      }}>
        Monte Carlo Simulation
      </div>
      <h2 style={{
        fontSize: typography.fontSize2xl,
        fontWeight: typography.fontWeightBold,
        color: colors.deepNavy,
        margin: `0 0 ${spacing.space3} 0`,
      }}>
        Probability Analysis
      </h2>
      <p style={{
        color: colors.steelGray,
        marginBottom: spacing.space8,
        maxWidth: '800px',
      }}>
        Instead of a single "best guess" projection, we simulate 500 different possible futures to show the range of outcomes.
      </p>

      {/* Explanation Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: spacing.space5,
        marginBottom: spacing.space8,
      }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space3, marginBottom: spacing.space4 }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.lightTeal,
              borderRadius: radius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="target" color={colors.teal} size={22} />
            </div>
            <h3 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: 0 }}>
              What is Monte Carlo?
            </h3>
          </div>
          <p style={{ fontSize: typography.fontSizeBase, color: colors.charcoal, lineHeight: 1.7, margin: 0 }}>
            Named after the famous casino, Monte Carlo simulation uses <strong>randomness</strong> to model uncertainty.
            We run your retirement plan through 500 different market scenarios — some with great returns, some with crashes,
            some with high inflation — to see how often your money lasts.
          </p>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space3, marginBottom: spacing.space4 }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.lightTeal,
              borderRadius: radius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="activity" color={colors.teal} size={22} />
            </div>
            <h3 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: 0 }}>
              Why Not Just One Projection?
            </h3>
          </div>
          <p style={{ fontSize: typography.fontSizeBase, color: colors.charcoal, lineHeight: 1.7, margin: 0 }}>
            A single projection assumes "average" returns every year. But markets don't work that way —
            a crash early in retirement is far more damaging than one later. Monte Carlo captures this
            <strong> sequence of returns risk</strong> that simple calculators miss.
          </p>
        </Card>
      </div>

      {/* Simulation Parameters */}
      <Card variant="dark" style={{ marginBottom: spacing.space6 }}>
        <h3 style={{
          fontSize: typography.fontSizeBase,
          fontWeight: typography.fontWeightBold,
          color: colors.teal,
          letterSpacing: '1px',
          margin: `0 0 ${spacing.space5} 0`,
        }}>
          SIMULATION PARAMETERS
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: spacing.space4 }}>
          {[
            { label: 'Your Age', value: age, unit: 'years' },
            { label: 'Retirement Age', value: 67, unit: 'years' },
            { label: 'Planning Horizon', value: 'Age 92', unit: '25+ years' },
            { label: 'Monthly Savings', value: '€500', unit: 'until 67' },
            { label: 'Scenarios', value: '500', unit: 'simulations' },
          ].map((param, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightBold, color: colors.white }}>
                {param.value}
              </div>
              <div style={{ fontSize: typography.fontSizeXs, color: colors.lightTeal, marginTop: spacing.space1 }}>
                {param.label}
              </div>
              <div style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                {param.unit}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Variables Explanation */}
      <div style={{ ...highlightBoxStyle, marginBottom: spacing.space6 }}>
        <h4 style={{ fontSize: typography.fontSizeBase, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: `0 0 ${spacing.space3} 0` }}>
          📊 What Varies in Each Scenario?
        </h4>
        <div style={{ display: 'flex', gap: spacing.space8, flexWrap: 'wrap' }}>
          <div style={{ fontSize: typography.fontSizeSm, color: colors.charcoal }}>
            <strong>Market Returns:</strong> -4% to +12% annually (random)
          </div>
          <div style={{ fontSize: typography.fontSizeSm, color: colors.charcoal }}>
            <strong>Inflation:</strong> 2% to 4% annually (random)
          </div>
          <div style={{ fontSize: typography.fontSizeSm, color: colors.charcoal }}>
            <strong>Sequence:</strong> When crashes happen matters
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <Card variant="accent" style={{ padding: spacing.space6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.space4 }}>
          <h3 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: 0 }}>
            Portfolio Value Over Time
          </h3>
          <div style={{ display: 'flex', gap: spacing.space4, fontSize: typography.fontSizeSm }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space2 }}>
              <div style={{ width: '20px', height: '3px', background: 'rgba(13,148,136,0.3)', borderRadius: '2px' }} />
              <span style={{ color: colors.steelGray }}>Success paths</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space2 }}>
              <div style={{ width: '20px', height: '3px', background: 'rgba(220,38,38,0.3)', borderRadius: '2px' }} />
              <span style={{ color: colors.steelGray }}>Failure paths</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space2 }}>
              <div style={{ width: '20px', height: '3px', background: colors.teal, borderRadius: '2px' }} />
              <span style={{ color: colors.steelGray }}>Median outcome</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', marginBottom: spacing.space6 }}>
          <canvas
            ref={canvasRef}
            width={1000}
            height={400}
            style={{ width: '100%', height: '400px', borderRadius: radius.lg }}
          />

          {!simulationRunning && !simulationResult && scenarios.length === 0 && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(248,249,250,0.98)',
              borderRadius: radius.lg,
            }}>
              <Icon name="trendingUp" color={colors.teal} size={56} />
              <h3 style={{ fontSize: typography.fontSizeXl, color: colors.deepNavy, marginTop: spacing.space5 }}>
                Ready to Run Simulation
              </h3>
              <p style={{
                fontSize: typography.fontSizeBase,
                color: colors.steelGray,
                marginTop: spacing.space2,
                textAlign: 'center',
                maxWidth: '400px',
              }}>
                Click below to generate 500 different market scenarios and see your probability of retirement success.
              </p>
              <Button onClick={runSimulation} size="lg" style={{ marginTop: spacing.space6 }}>
                <Icon name="play" color={colors.white} size={20} /> Run 500 Scenarios
              </Button>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: spacing.space5,
          borderTop: `1px solid ${colors.border}`,
        }}>
          {simulationRunning ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space3 }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: `3px solid ${colors.lightTeal}`,
                borderTopColor: colors.teal,
                borderRadius: radius.full,
                animation: 'spin 1s linear infinite',
              }} />
              <span style={{ color: colors.steelGray }}>Running scenario {scenarioCount} of 500...</span>
              <div style={{
                width: '200px',
                height: '6px',
                background: colors.border,
                borderRadius: radius.sm,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(scenarioCount / 500) * 100}%`,
                  height: '100%',
                  background: colors.teal,
                  transition: 'width 0.1s ease',
                }} />
              </div>
            </div>
          ) : simulationResult ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.space3,
              padding: `${spacing.space3} ${spacing.space5}`,
              background: `${statusColor}15`,
              borderRadius: radius.lg,
            }}>
              <Icon name="checkCircle" color={statusColor} size={22} />
              <span style={{ fontWeight: typography.fontWeightSemibold, color: statusColor }}>
                {simulationResult.successRate}% of scenarios succeeded
              </span>
            </div>
          ) : (
            <span style={{ color: colors.steelGray }}>Click "Run 500 Scenarios" to start the simulation</span>
          )}

          {simulationResult && (
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space3 }}>
              <span style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>Risk Level:</span>
              {['green', 'yellow', 'red'].map((status) => (
                <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.space1 }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: radius.full,
                    background: simulationResult.status === status
                      ? (status === 'green' ? colors.green : status === 'yellow' ? colors.amber : colors.red)
                      : colors.border,
                    boxShadow: simulationResult.status === status
                      ? `0 0 12px ${status === 'green' ? colors.green : status === 'yellow' ? colors.amber : colors.red}`
                      : 'none',
                  }} />
                  <span style={{ fontSize: '9px', color: colors.steelGray }}>
                    {status === 'green' ? '≥80%' : status === 'yellow' ? '60-79%' : '<60%'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Results Interpretation */}
      {simulationResult && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing.space5,
          marginTop: spacing.space6,
        }}>
          <Card>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightBold,
              color: colors.deepNavy,
              margin: `0 0 ${spacing.space4} 0`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.space2,
            }}>
              <Icon name="checkCircle" color={colors.teal} size={20} />
              What Does This Mean?
            </h3>
            <p style={{ fontSize: typography.fontSizeBase, color: colors.charcoal, lineHeight: 1.7, margin: 0 }}>
              In <strong>{simulationResult.successRate}% of the 500 simulated futures</strong>, your money lasted until age 92.
              {simulationResult.successRate >= 80
                ? ' This is considered a solid retirement plan — you have good odds of financial security.'
                : simulationResult.successRate >= 60
                ? ' This is borderline — consider increasing savings or adjusting expectations.'
                : ' This needs attention — significant changes to your plan are recommended.'}
            </p>
          </Card>

          <Card>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightBold,
              color: colors.deepNavy,
              margin: `0 0 ${spacing.space4} 0`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.space2,
            }}>
              <Icon name="lightbulb" color={colors.teal} size={20} />
              How to Improve Your Odds
            </h3>
            <ul style={{
              fontSize: typography.fontSizeBase,
              color: colors.charcoal,
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: spacing.space5,
            }}>
              <li>Save €100 more monthly → +5-8% success rate</li>
              <li>Work 2 years longer → +10-15% success rate</li>
              <li>Reduce withdrawal needs by 10% → +8-12% success rate</li>
            </ul>
          </Card>
        </div>
      )}

      {simulationResult && onContinue && (
        <div style={{ textAlign: 'center', marginTop: spacing.space10 }}>
          <Button onClick={onContinue} size="lg">
            Continue to Life Events
            <Icon name="arrowRight" color={colors.white} size={18} />
          </Button>
        </div>
      )}

      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default MonteCarloSimulation;
