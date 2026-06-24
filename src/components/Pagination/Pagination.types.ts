import { ThemeMode } from '../../types';

export interface PaginationProps {
  /** Current page, 1-indexed */
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** For styled components */
  className?: string;
  forceTheme?: ThemeMode;
  /** Number of sibling pages shown on each side of the current page. Defaults to 1 */
  siblingCount?: number;
}
