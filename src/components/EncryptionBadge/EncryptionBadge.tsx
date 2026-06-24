import { FloatingDelayGroup } from '@floating-ui/react-dom-interactions';
import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import CircleBadge from '../CircleBadge';
import { Icon, IconColor } from '../Icons';
import Tooltip, { TooltipContent, TooltipTrigger } from '../Tooltip';
import Typography, { TypographySize } from '../Typography';

import { TooltipContainer } from './EncryptionBadge.styles';
import { EncryptionBadgeProps, EncryptionBadgeType } from './EncryptionBadge.types';

const getTooltipTitle = (badgeType: EncryptionBadgeType) => {
  switch (badgeType) {
    case EncryptionBadgeType.E2EE:
      return 'End-to-end encrypted';
    case EncryptionBadgeType.Pgp:
      return 'PGP encrypted';
    case EncryptionBadgeType.External:
      return 'External email';
    default:
      return '';
  }
};

const getIconProps = (
  badgeType: EncryptionBadgeType,
  isTrusted?: boolean
): { icon: Icon; color: IconColor; size: Size } => {
  switch (badgeType) {
    case EncryptionBadgeType.E2EE:
      return { icon: Icon.ShieldEncrypt, color: 'source', size: Size.X_MEDIUM };
    case EncryptionBadgeType.Pgp:
      return { icon: Icon.Key, color: isTrusted ? 'green' : 'secondary', size: Size.SMALL };
    case EncryptionBadgeType.External:
    default:
      return { icon: Icon.Lock, color: isTrusted ? 'green' : 'secondary', size: Size.SMALL };
  }
};

const EncryptionBadge: React.FC<EncryptionBadgeProps> = ({
  type = EncryptionBadgeType.External,
  tooltipSubtext,
  hideTooltip,
  isTrusted,
  onClick
}) => {
  const tooltipTitle = getTooltipTitle(type);
  const { color, size, icon } = getIconProps(type, isTrusted);

  const iconCircle = <CircleBadge color={color} icon={icon} size={size} onClick={onClick} />;

  if (hideTooltip) return iconCircle;

  return (
    <FloatingDelayGroup delay={{ open: 200, close: 200 }}>
      <Tooltip>
        <TooltipContent>
          <TooltipContainer>
            <Typography forceTheme={ThemeMode.DARK} size={TypographySize.SMALL}>
              {tooltipTitle}
            </Typography>
            {tooltipSubtext && (
              <Typography color='secondary' forceTheme={ThemeMode.DARK} size={TypographySize.SMALL} wrap>
                {tooltipSubtext}
              </Typography>
            )}
          </TooltipContainer>
        </TooltipContent>
        <TooltipTrigger>{iconCircle}</TooltipTrigger>
      </Tooltip>
    </FloatingDelayGroup>
  );
};

export default EncryptionBadge;
