import { Icon } from '../Icons';

export interface ActionIcon {
  icon: Icon;
  key: string;
  onClick: (e?: React.MouseEvent) => void;
  dataTest?: string;
  ref?: React.ForwardedRef<HTMLDivElement | null>;
  tooltip?: string;
}

export interface SelectedItemToolbarProps {
  actions: ActionIcon[];
  topText: string;
  subText?: string;
}
