import { ThemeMode } from '../../types';
import { AccentColor } from '../../utils/colorUtils';

export interface StepItem {
  key: string;
  label: string;
}

export interface StepsProps {
  steps: StepItem[];
  /** Index (0-based) of the current step; earlier steps render as completed */
  currentStep: number;
  /** For styled components */
  className?: string;
  /** Accent color for completed/active steps */
  color?: AccentColor;
  forceTheme?: ThemeMode;
}
