import { Size, ThemeMode } from '../../types';
import { Icon } from '../Icons';

export interface InputFieldEndActionProps {
  icon: Icon;
  onClick: () => void;
  forceTheme?: ThemeMode;
  size?: Size;
  /** Tooltip label */
  tooltip?: string;
}
