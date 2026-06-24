import { Dayjs } from 'dayjs';

import { ThemeMode } from '../../types';

export type TimeFieldHourFormat = '12' | '24';

export interface TimeFieldProps {
  onSelectTime: (time: Dayjs | string) => void;
  date?: Dayjs;
  error?: boolean;
  forceTheme?: ThemeMode;
  /** 12 or 24-hour clock. Defaults to '12' */
  hourFormat?: TimeFieldHourFormat;
  isReadOnly?: boolean;
  /** Minute increment shown in the desktop time list / mobile hour wheel. Defaults to 15 */
  minuteInterval?: number;
  /** Shows a clock icon at the start of the field */
  showIcon?: boolean;
}
