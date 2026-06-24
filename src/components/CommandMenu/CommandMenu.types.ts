import { ThemeMode } from '../../types';

export interface CommandMenuItem {
  /** Unique key for the item */
  key: string;
  /** Primary text */
  title: string;
  /** Secondary text rendered below the title */
  subtitle?: string;
  /** Leading visual, e.g. an Avatar or Icons element */
  leading?: React.ReactNode;
  /** Trailing content, e.g. a keyboard shortcut hint */
  trailing?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandMenuProps {
  /** Opened / closed state */
  open: boolean;
  /** Search query, controlled by the consumer so it can drive filtering elsewhere too */
  query: string;
  /** Items to render below the search input, already filtered by the consumer */
  items: CommandMenuItem[];
  /** Closes the menu */
  onClose: () => void;
  onQueryChange: (query: string) => void;
  /** E2E test indicator */
  dataTest?: string;
  /** Content shown when items is empty */
  emptyState?: React.ReactNode;
  forceTheme?: ThemeMode;
  /** Custom height; falls back to the Dialog default */
  height?: number;
  placeholder?: string;
}
