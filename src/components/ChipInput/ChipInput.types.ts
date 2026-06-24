import { ThemeMode } from '../../types';

export interface ChipInputProps {
  /** Committed chip values */
  items: string[];
  onItemsChange: (items: string[]) => void;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  disabled?: boolean;
  forceTheme?: ThemeMode;
  /** Called on every keystroke in the trailing input, e.g. to drive autocomplete suggestions */
  onInputChange?: (value: string) => void;
  placeholder?: string;
  /** Custom chip renderer; defaults to the Chip component with a delete button */
  renderChip?: (item: string, index: number) => React.ReactNode;
  /** Whether a typed, trimmed value can be committed as a chip. Defaults to non-empty */
  validate?: (value: string) => boolean;
}
