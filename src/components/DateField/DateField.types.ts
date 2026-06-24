import { Dayjs } from 'dayjs';

import { ThemeMode } from '../../types';

export interface DateFieldProps {
  onSelectDate: (date: Date | null) => void;
  date?: Dayjs;
  /** dayjs format string used to display the date in the input field. Defaults to 'MM/DD/YYYY' */
  dateFormat?: string;
  error?: boolean;
  forceTheme?: ThemeMode;
  isReadOnly?: boolean;
  /** The min date that can be selected */
  minDate?: Date;
  /** Shows a calendar icon at the start of the field */
  showIcon?: boolean;
  width?: number;
}
