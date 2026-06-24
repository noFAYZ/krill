import { ThemeMode } from '../../types';

export interface ListItemProps {
  /** Primary text */
  title: string | React.ReactNode;
  /** Controls the row's selected/highlighted state (e.g. keyboard navigation, active route) */
  active?: boolean;
  /** Hover-revealed trailing actions (e.g. icon buttons); always shown when active is true */
  actions?: React.ReactNode;
  /** For styled components */
  className?: string;
  /** E2E test indicator */
  dataTest?: string;
  /** Disables hover/click interactions */
  disabled?: boolean;
  forceTheme?: ThemeMode;
  /** Leading visual, e.g. an Avatar or Icons element */
  leading?: React.ReactNode;
  /** For customization */
  style?: React.CSSProperties;
  /** Secondary text rendered below the title */
  subtitle?: string | React.ReactNode;
  /** Trailing content, e.g. a timestamp, count, or CircularProgress */
  trailing?: React.ReactNode;
  /** Shows the unread indicator dot and bolds the title */
  unread?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
}
