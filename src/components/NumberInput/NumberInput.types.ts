import { ThemeMode } from '../../types';

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  /** For styled components */
  className?: string;
  /** Indicator for E2E tests */
  dataTest?: string;
  disabled?: boolean;
  forceTheme?: ThemeMode;
  max?: number;
  min?: number;
  step?: number;
}
