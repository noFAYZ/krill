import { ThemeMode } from '../../types';
import { InputFieldSize } from '../InputField';

export interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  /** Disables editing */
  disabled?: boolean;
  /** Error state / message */
  error?: boolean | string;
  forceTheme?: ThemeMode;
  /** Placeholder text */
  placeholder?: string;
  /** Field size */
  size?: InputFieldSize;
  /** Shows a strength meter below the field */
  showStrength?: boolean;
}
