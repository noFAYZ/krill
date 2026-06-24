import { Size } from '../../types';
import { SelectProps } from '../Select';

export type MobileSelectSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

export interface MobileSelectProps extends SelectProps {
  menuControls?: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
}
