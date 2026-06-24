import { ThemeMode } from '../../types';
import { AccentColor } from '../../utils/colorUtils';

export interface BadgeProps {
  /** The element the badge is anchored to */
  children: React.ReactNode;
  /** For styled components */
  className?: string;
  color?: AccentColor;
  /** Renders a plain dot instead of a count */
  dot?: boolean;
  forceTheme?: ThemeMode;
  /** Counts above this render as "{max}+". Defaults to 99 */
  max?: number;
  /** Renders the badge even when count is 0. Defaults to false */
  showZero?: boolean;
  /** Badge count; omit along with dot to render nothing */
  count?: number;
}
