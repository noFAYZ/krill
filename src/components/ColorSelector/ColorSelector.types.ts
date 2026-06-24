import { ThemeMode } from '../../types';
import { AccentColor } from '../../utils/colorUtils';

export interface ColorSelectorProps {
  colorToStyling: Record<AccentColor, string>;
  value: string;
  handleChange: (newValue: AccentColor | string, evt?: React.MouseEvent) => void;
  /** Renders an extra custom-color swatch that opens a hex/eyedropper picker */
  handlePickerChange?: (newValue: string) => void;
  disabled?: boolean;
  forceTheme?: ThemeMode;
  hideSelected?: boolean;
  isHighlight?: boolean;
  pickerColorContainerRef?: React.RefObject<HTMLDivElement>;
  pickerLeftOffset?: number;
  pickerTopOffset?: number;
  showHover?: boolean;
}
