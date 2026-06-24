import { IconComponent, IconTextProps } from '../IconText';
import { Icon } from '../Icons';

export interface IconTextEndAction {
  icon: Icon | IconComponent;
  onClick: (e?: React.MouseEvent) => void;
  buttonRef?: React.RefObject<HTMLDivElement>;
  dataTest?: string;
  tooltip?: string;
}

export interface IconTextWithEndActionsProps extends IconTextProps {
  endActions: IconTextEndAction[];
  showEndActions?: boolean;
  startComponent?: JSX.Element;
}
