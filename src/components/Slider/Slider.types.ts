import { ThemeMode } from '../../types';
import { AccentColor } from '../../utils/colorUtils';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  /** For styled components */
  className?: string;
  /** Accent color for the filled track and thumb */
  color?: AccentColor;
  /** Indicator for E2E tests */
  dataTest?: string;
  disabled?: boolean;
  forceTheme?: ThemeMode;
  max?: number;
  min?: number;
  step?: number;
}
