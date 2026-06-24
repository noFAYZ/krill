import { Dayjs } from 'dayjs';

import { ThemeMode } from '../../types';

export interface DateRange {
  /** Start of the range, or null if not yet picked */
  start: Dayjs | null;
  /** End of the range, or null if not yet picked */
  end: Dayjs | null;
}

export interface DateRangePickerProps {
  onSelectRange: (range: DateRange) => void;
  /** For styled components */
  className?: string;
  forceTheme?: ThemeMode;
  /** The min date that can be selected */
  minDate?: Date;
  selectedRange?: DateRange;
  /** Shows the month/year header with prev/next month arrows. Defaults to true */
  showHeader?: boolean;
}
