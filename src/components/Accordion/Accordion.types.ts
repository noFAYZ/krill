import { ThemeMode } from '../../types';
import { Icon } from '../Icons';

export interface AccordionItem {
  /** Unique key for the item */
  key: string;
  /** Header text */
  title: string;
  /** Content rendered when expanded */
  content: React.ReactNode;
  /** Leading icon shown before the title */
  icon?: Icon;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allows more than one item to be open at a time. Defaults to false (single-open) */
  allowMultiple?: boolean;
  /** Item keys expanded on first render */
  defaultOpenKeys?: string[];
  /** For styled components */
  className?: string;
  forceTheme?: ThemeMode;
}
