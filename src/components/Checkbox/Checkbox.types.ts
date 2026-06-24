import { Size, ThemeMode } from '../../types';
import { IconColor } from '../Icons';

export type CheckboxSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Overrides the checked/indeterminate icon color. Defaults to 'orange' */
  checkedColor?: IconColor;
  /** E2E test indicator */
  dataTest?: string;
  /** Disables the checkbox */
  disabled?: boolean;
  /** Shows a destructive color when unchecked, e.g. for a required-field validation error */
  error?: boolean;
  forceTheme?: ThemeMode;
  /** Indeterminate state; takes priority over checked, similar to MUI */
  indeterminate?: boolean;
  /** Widens the clickable area without changing the icon's visual size */
  padding?: boolean;
  /** Checkbox size */
  size?: CheckboxSize;
  onClick: (e: React.MouseEvent) => void;
}
