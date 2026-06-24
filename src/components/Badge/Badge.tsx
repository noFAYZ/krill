import * as React from 'react';

import { getAccentColorValues } from '../../utils/colorUtils';
import Typography, { TypographySize, TypographyWeight } from '../Typography';

import { BadgeCount, BadgeWrapper } from './Badge.styles';
import { BadgeProps } from './Badge.types';

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  color = 'red',
  dot = false,
  forceTheme,
  max = 99,
  showZero = false,
  count
}) => {
  const [background] = getAccentColorValues(color, forceTheme);
  const hasCount = count !== undefined && (count > 0 || showZero);

  if (!dot && !hasCount) return <>{children}</>;

  return (
    <BadgeWrapper className={className}>
      {children}
      <BadgeCount $background={background} $dot={dot}>
        {!dot && (
          <Typography
            color='white'
            forceTheme={forceTheme}
            selectable={false}
            size={TypographySize.CAPTION}
            weight={TypographyWeight.MEDIUM}
          >
            {count! > max ? `${max}+` : count}
          </Typography>
        )}
      </BadgeCount>
    </BadgeWrapper>
  );
};

export default Badge;
