// ============================================================================
// CommunityWall Component
// Anonymous community score comparison
// ============================================================================

import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, radius } from '../../../styles/designTokens';
import Card from '../../ui/Card';

// Distribution buckets
const DISTRIBUTION_BUCKETS = [
  { range: '20-35', label: 'Pioneers', min: 0, max: 35, color: colors.deepNavy },
  { range: '36-49', label: 'Seekers', min: 36, max: 49, color: colors.charcoal },
  { range: '50-64', label: 'Builders', min: 50, max: 64, color: colors.amber },
  { range: '65-79', label: 'Strategists', min: 65, max: 79, color: colors.teal },
  { range: '80-100', label: 'Guardians', min: 80, max: 100, color: colors.green },
];

/**
 * CommunityWall Component
 *
 * @param {number} userScore - User's CFPB score (optional)
 * @param {Array} initialScores - Initial community scores
 */
const CommunityWall = ({
  userScore = null,
  initialScores = [],
}) => {
  const [communityScores, setCommunityScores] = useState(initialScores);

  // Generate simulated community data on mount
  useEffect(() => {
    if (communityScores.length === 0) {
      const scores = Array.from({ length: 150 }, () => ({
        score: Math.floor(Math.random() * 50) + 35,
        timestamp: Date.now() - Math.random() * 86400000,
      }));

      // Add user score if available
      if (userScore) {
        scores.push({ score: userScore, timestamp: Date.now() });
      }

      setCommunityScores(scores);
    }
  }, []);

  // Calculate distribution
  const distribution = DISTRIBUTION_BUCKETS.map(bucket => ({
    ...bucket,
    count: communityScores.filter(s => s.score >= bucket.min && s.score <= bucket.max).length,
  }));

  const maxCount = Math.max(...distribution.map(d => d.count), 1);
  const avgScore = communityScores.length > 0
    ? Math.round(communityScores.reduce((a, b) => a + b.score, 0) / communityScores.length)
    : 0;

  // Find user's bucket
  const getUserBucket = () => {
    if (!userScore) return null;
    return distribution.findIndex(d => userScore >= d.min && userScore <= d.max);
  };

  const userBucketIndex = getUserBucket();
  const userPercentile = userScore
    ? Math.round((1 - communityScores.filter(s => s.score > userScore).length / communityScores.length) * 100)
    : null;

  return (
    <div>
      <div style={{ marginBottom: spacing.space8 }}>
        <div style={{
          color: colors.teal,
          fontSize: typography.fontSizeXs,
          fontWeight: typography.fontWeightBold,
          letterSpacing: '2px',
          marginBottom: spacing.space2,
        }}>
          COMMUNITY WALL
        </div>
        <h2 style={{
          color: colors.deepNavy,
          fontSize: typography.fontSize2xl,
          fontWeight: typography.fontWeightSemibold,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          The Financial Wellbeing Tapestry
        </h2>
        <p style={{ color: colors.steelGray, fontSize: typography.fontSizeBase }}>
          Anonymous aggregate of {communityScores.length} community members
        </p>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing.space6,
        marginBottom: spacing.space8,
      }}>
        {[
          { value: communityScores.length, label: 'Total Assessments' },
          { value: avgScore, label: 'Community Average' },
          { value: `${Math.round((distribution[3].count + distribution[4].count) / communityScores.length * 100)}%`, label: 'Score 65+' },
        ].map((stat, i) => (
          <Card key={i} style={{ textAlign: 'center' }}>
            <div style={{
              color: colors.teal,
              fontSize: typography.fontSize3xl,
              fontWeight: typography.fontWeightLight,
            }}>
              {stat.value}
            </div>
            <div style={{ color: colors.steelGray, fontSize: '13px' }}>
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Distribution Chart */}
      <Card variant="dark" style={{ padding: spacing.space8, marginBottom: spacing.space6 }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '200px',
        }}>
          {distribution.map((bucket, i) => {
            const isUserBucket = i === userBucketIndex;
            return (
              <div key={bucket.range} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  color: colors.white,
                  fontSize: typography.fontSizeLg,
                  fontWeight: typography.fontWeightSemibold,
                  marginBottom: spacing.space2,
                }}>
                  {bucket.count}
                </div>

                <div style={{
                  height: `${(bucket.count / maxCount) * 150}px`,
                  minHeight: '20px',
                  background: bucket.color,
                  borderRadius: `${radius.lg} ${radius.lg} 0 0`,
                  margin: `0 ${spacing.space2}`,
                  transition: 'height 0.5s ease',
                  border: isUserBucket ? '3px solid white' : 'none',
                  boxShadow: isUserBucket ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
                }} />

                <div style={{
                  color: bucket.color,
                  fontSize: '13px',
                  fontWeight: typography.fontWeightSemibold,
                  marginTop: spacing.space3,
                }}>
                  {bucket.label}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                  marginTop: spacing.space1,
                }}>
                  {bucket.range}
                </div>

                {isUserBucket && (
                  <div style={{
                    marginTop: spacing.space2,
                    background: colors.amber,
                    color: colors.white,
                    padding: `${spacing.space1} ${spacing.space2}`,
                    borderRadius: radius.sm,
                    fontSize: typography.fontSizeXs,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    YOU
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* User Position */}
      {userScore && (
        <Card variant="highlight" style={{ textAlign: 'center' }}>
          <div style={{
            color: colors.teal,
            fontSize: typography.fontSizeBase,
            fontWeight: typography.fontWeightBold,
            marginBottom: spacing.space2,
          }}>
            Your Position
          </div>
          <div style={{
            color: colors.charcoal,
            fontSize: '15px',
            lineHeight: typography.lineHeightRelaxed,
          }}>
            With a score of <strong>{userScore}</strong>, you rank in the top{' '}
            <strong>{userPercentile}%</strong> of our community.
          </div>
        </Card>
      )}
    </div>
  );
};

export default CommunityWall;
export { DISTRIBUTION_BUCKETS };
