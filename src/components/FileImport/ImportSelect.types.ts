import { IconProps } from '../Icons';

export interface ImportSelectProps {
  icon: IconProps['icon'];
  label: string;
  onClick: (e?: React.MouseEvent) => void;
  color?: 'primary' | 'secondary' | 'tertiary';
  compact?: boolean;
  dataTest?: string;
  disabled?: boolean;
  iconColor?: IconProps['color'];
  onClickLabel?: string;
  subLabel?: string;
  wrap?: boolean;
}
