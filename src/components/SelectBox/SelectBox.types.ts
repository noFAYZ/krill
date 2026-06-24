import { ThemeMode } from '../../types';

export type SelectBoxSize = 'small' | 'large';
export type SelectBoxIllustrationPosition = 'left' | 'right' | 'center';

export interface SelectBoxProps {
  checked: boolean;
  /** Decorative visual rendered behind the label, e.g. an Illustration element */
  illustration: React.ReactNode;
  label: string;
  onClick: () => void;
  bgColor?: string;
  dataTest?: string;
  description?: string;
  forceTheme?: ThemeMode;
  position?: SelectBoxIllustrationPosition;
  size?: SelectBoxSize;
}
