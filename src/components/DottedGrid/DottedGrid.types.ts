import { ThemeMode } from '../../types';

export interface DottedGridProps {
  /** For styled components */
  className?: string;
  forceTheme?: ThemeMode;
  height?: number | string;
  /** Brightens the grid near the cursor and tracks it with a moving highlight */
  hideMotionLine?: boolean;
  isHovered?: boolean;
  left?: number;
  noAnimation?: boolean;
  top?: number;
  width?: number | string;
}
