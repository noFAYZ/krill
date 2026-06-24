import { Size } from '../../types';
import { Icon, IconColor } from '../Icons';

export interface CircleBadgeProps {
  icon: Icon;
  color?: IconColor;
  /** Renders just the icon over the crosshair, without the rounded background/shadow container */
  hideContainer?: boolean;
  size?: Size;
  onClick?: () => void;
}
