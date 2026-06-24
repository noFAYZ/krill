import { Dayjs } from 'dayjs';

import { Color } from '../../utils/colorUtils';
import { TypographySize } from '../Typography';

export type DateDisplayType = 'absolute' | 'relative';

export interface DateDisplayProps {
  value: string | number | Date | Dayjs;
  color?: Color;
  /** dayjs format string used for the date portion when type is 'absolute'. Defaults to 'MMM D, YYYY' */
  dateFormat?: string;
  /** Whether to include the date portion in absolute display. Defaults to true */
  displayDate?: boolean;
  /** Whether to include the time portion in absolute display. Defaults to true */
  displayTime?: boolean;
  /** 12 or 24 hour clock for the time portion. Defaults to '12' */
  hourFormat?: '12' | '24';
  size?: TypographySize;
  /** 'relative' renders e.g. "3 hours ago"; 'absolute' renders the formatted date/time. Defaults to 'relative' */
  type?: DateDisplayType;
}
