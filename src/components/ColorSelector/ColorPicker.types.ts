import { NullableRef } from '../../types';

export interface ColorPickerProps {
  buttonRef: NullableRef<HTMLDivElement>;
  colorContainerRef: NullableRef<HTMLDivElement>;
  handleColorChange: (color: string) => void;
  open: boolean;
  value: string;
  leftOffset?: number;
  topOffset?: number;
}
