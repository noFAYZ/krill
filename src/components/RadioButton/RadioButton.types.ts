import { ThemeMode } from '../../types';

export interface RadioButtonProps {
  /** Checked state */
  checked: boolean;
  /** Primary text */
  label: string;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  /** Secondary text rendered below the label */
  description?: string;
  /** Disables hover/click interactions */
  disabled?: boolean;
  forceTheme?: ThemeMode;
  onClick?: () => void;
}
