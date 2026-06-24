import { ThemeMode } from '../../types';
import { Icon } from '../Icons';

export interface BreadcrumbItem {
  key: string;
  label: string;
  /** Omit for the current page (rendered as plain, non-clickable text) */
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** For styled components */
  className?: string;
  forceTheme?: ThemeMode;
  /** Icon rendered between items. Defaults to Icon.ChevronRight */
  separator?: Icon;
}
