import { ThemeMode } from '../../types';
import { Color } from '../../utils/colorUtils';

export interface ProgressBarProps {
  /** Percentage of the bar that is filled, 0-100 */
  progress: number;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  forceTheme?: ThemeMode;
  /** Bar thickness in px */
  height?: number;
  /** Color of the filled portion */
  progressColor?: Color | string;
  /** Color of the unfilled track */
  trackColor?: Color | string;
}
