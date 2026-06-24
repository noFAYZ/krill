import { ThemeMode } from '../../types';
import { Icon } from '../Icons';

export type DrawerAnchor = 'bottom' | 'left' | 'right' | 'top';

export interface DrawerProps {
  children: React.ReactNode;
  /** Opened / closed state */
  open: boolean;
  /** Closes the drawer */
  onClose: () => void;
  /** Edge the drawer slides in from. Defaults to 'bottom' */
  anchor?: DrawerAnchor;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  /** Adds bottom margin inside the content area, e.g. to clear a floating action button */
  extraSpacer?: boolean;
  forceTheme?: ThemeMode;
  /** Caps the content area's height */
  maxHeight?: number | string;
  /** Shows a close button in the header; requires title */
  showCloseButton?: boolean;
  /** Enables swipe-to-dismiss on touch devices. Defaults to false */
  swipeable?: boolean;
  title?: string;
  /** Icon rendered before the title */
  titleIcon?: Icon;
}
