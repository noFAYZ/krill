import { Dayjs } from 'dayjs';

import { ThemeMode } from '../../types';

export interface DatePickerEvent {
  date: Dayjs;
  /** CSS color values rendered as dots under this day, e.g. ['var(--accent-orange-primary)'] */
  colors: string[];
}

export interface DatePickerProps {
  onSelectDate: (date: Date | null) => void;
  /** For styled components */
  className?: string;
  /** Renders colored dots under days that have events */
  events?: DatePickerEvent[];
  forceTheme?: ThemeMode;
  /** The min date that can be selected */
  minDate?: Date;
  selectedDate?: Dayjs;
  /** Shows the month/year header with prev/next month arrows. Defaults to true */
  showHeader?: boolean;
}
