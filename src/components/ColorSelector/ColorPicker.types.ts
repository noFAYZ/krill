export interface ColorPickerProps {
  buttonRef: React.RefObject<HTMLDivElement>;
  colorContainerRef: React.RefObject<HTMLDivElement>;
  handleColorChange: (color: string) => void;
  open: boolean;
  value: string;
  leftOffset?: number;
  topOffset?: number;
}
