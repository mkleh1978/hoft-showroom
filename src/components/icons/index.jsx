// ============================================================================
// HoFT DESIGN SYSTEM - Icon Component
// Unified Icon component with stroke-based SVGs (2px stroke, round linecap/linejoin)
// ============================================================================

import React from 'react';
import { iconPaths } from './iconPaths';

/**
 * Icon Component
 *
 * @param {string} name - Name of the icon (e.g., 'wallet', 'play', 'target')
 * @param {string} color - Stroke color (default: 'currentColor')
 * @param {number} size - Width and height in pixels (default: 20)
 * @param {object} style - Additional inline styles
 * @param {string} className - CSS class name
 *
 * @example
 * <Icon name="wallet" color="#0D9488" size={24} />
 * <Icon name="play" />
 */
const Icon = ({
  name,
  color = 'currentColor',
  size = 20,
  style = {},
  className = '',
  strokeWidth = 2,
  ...props
}) => {
  const path = iconPaths[name];

  if (!path) {
    console.warn(`Icon "${name}" not found. Available icons: ${Object.keys(iconPaths).join(', ')}`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      className={className}
      aria-hidden="true"
      {...props}
    >
      {path}
    </svg>
  );
};

// Export individual icon components for convenience
export const PlayIcon = (props) => <Icon name="play" {...props} />;
export const ArrowRightIcon = (props) => <Icon name="arrowRight" {...props} />;
export const ArrowLeftIcon = (props) => <Icon name="arrowLeft" {...props} />;
export const CheckIcon = (props) => <Icon name="check" {...props} />;
export const CheckCircleIcon = (props) => <Icon name="checkCircle" {...props} />;
export const XIcon = (props) => <Icon name="x" {...props} />;
export const PlusIcon = (props) => <Icon name="plus" {...props} />;
export const MinusIcon = (props) => <Icon name="minus" {...props} />;
export const HomeIcon = (props) => <Icon name="home" {...props} />;
export const GridIcon = (props) => <Icon name="grid" {...props} />;
export const MenuIcon = (props) => <Icon name="menu" {...props} />;
export const InfoIcon = (props) => <Icon name="info" {...props} />;
export const AlertCircleIcon = (props) => <Icon name="alertCircle" {...props} />;
export const AlertTriangleIcon = (props) => <Icon name="alertTriangle" {...props} />;
export const SendIcon = (props) => <Icon name="send" {...props} />;
export const RefreshCwIcon = (props) => <Icon name="refreshCw" {...props} />;
export const WalletIcon = (props) => <Icon name="wallet" {...props} />;
export const DollarSignIcon = (props) => <Icon name="dollarSign" {...props} />;
export const PiggyBankIcon = (props) => <Icon name="piggyBank" {...props} />;
export const BarChartIcon = (props) => <Icon name="barChart" {...props} />;
export const TrendingUpIcon = (props) => <Icon name="trendingUp" {...props} />;
export const TrendingDownIcon = (props) => <Icon name="trendingDown" {...props} />;
export const PieChartIcon = (props) => <Icon name="pieChart" {...props} />;
export const CalculatorIcon = (props) => <Icon name="calculator" {...props} />;
export const ShieldIcon = (props) => <Icon name="shield" {...props} />;
export const ShieldCheckIcon = (props) => <Icon name="shieldCheck" {...props} />;
export const TargetIcon = (props) => <Icon name="target" {...props} />;
export const ScaleIcon = (props) => <Icon name="scale" {...props} />;
export const TriangleIcon = (props) => <Icon name="triangle" {...props} />;
export const ActivityIcon = (props) => <Icon name="activity" {...props} />;
export const ClockIcon = (props) => <Icon name="clock" {...props} />;
export const UserIcon = (props) => <Icon name="user" {...props} />;
export const UsersIcon = (props) => <Icon name="users" {...props} />;
export const UserXIcon = (props) => <Icon name="userX" {...props} />;
export const BabyIcon = (props) => <Icon name="baby" {...props} />;
export const BuildingIcon = (props) => <Icon name="building" {...props} />;
export const BriefcaseIcon = (props) => <Icon name="briefcase" {...props} />;
export const LeafIcon = (props) => <Icon name="leaf" {...props} />;
export const GlobeIcon = (props) => <Icon name="globe" {...props} />;
export const DropletIcon = (props) => <Icon name="droplet" {...props} />;
export const CpuIcon = (props) => <Icon name="cpu" {...props} />;
export const ZapIcon = (props) => <Icon name="zap" {...props} />;
export const LightbulbIcon = (props) => <Icon name="lightbulb" {...props} />;
export const EducationIcon = (props) => <Icon name="education" {...props} />;
export const MirrorIcon = (props) => <Icon name="mirror" {...props} />;
export const PlaneIcon = (props) => <Icon name="plane" {...props} />;
export const LayersIcon = (props) => <Icon name="layers" {...props} />;

// Export the main Icon component as default
export { Icon };
export default Icon;

// Export iconPaths for advanced use cases
export { iconPaths } from './iconPaths';
