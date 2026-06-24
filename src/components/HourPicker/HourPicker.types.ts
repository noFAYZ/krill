import { Dayjs } from 'dayjs';

import { ThemeMode } from '../../types';

import { TimeFormat } from './HourPicker.utils';

export interface HourPickerProps {
  /** Height of each scrollable item, in pixels. Controls the wheel's overall size */
  itemHeight: number;
  onChange: (value: string) => void;
  timeFormat: TimeFormat;
  forceTheme?: ThemeMode;
  initialHour?: Dayjs | null;
  /** Minute increment shown in the minute wheel. Defaults to 1 */
  minuteInterval?: number;
  /** Debounce interval (ms) before onChange fires after the wheel stops moving. Defaults to 300 */
  onChangeDebounceInterval?: number;
}
