import { Size, ThemeMode } from '../../types';

export interface RadioCheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** E2E test indicator */
  dataTest?: string;
  /** Disables the radio */
  disabled?: boolean;
  forceTheme?: ThemeMode;
  /** Icon size. Defaults to Size.X_MEDIUM */
  size?: Size;
  onClick?: (e: React.MouseEvent) => void;
}
