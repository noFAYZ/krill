import { ThemeMode } from '../../types';

export interface ActionBarProps {
  children: React.ReactNode;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  forceTheme?: ThemeMode;
  /** Percentage (0-100) for an optional progress bar pinned to the bar's top edge */
  progress?: number;
  /** Custom z-index */
  zIndex?: number;
}
