import { EventDotType } from './EventDot.constants';

export interface EventDotProps {
  /** CSS color value for the dot, e.g. 'var(--accent-orange-primary)' or any valid CSS color */
  color: string;
  /** For styled components */
  className?: string;
  /** Whether the dot is faded, e.g. for events outside the displayed month */
  isFaded?: boolean;
  /** Whether the dot sits on a selected/highlighted background */
  isSelected?: boolean;
  /** Dot type */
  type?: EventDotType;
}
