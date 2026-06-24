import * as React from 'react';

import Typography, { TypographySize, TypographyWeight } from '../Typography';

import { ActionsContainer, Container, Content, Leading, Trailing, UnreadDot } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

const ListItem: React.FC<ListItemProps> = ({
  active,
  actions,
  className,
  dataTest,
  disabled,
  forceTheme,
  leading,
  style,
  subtitle,
  title,
  trailing,
  unread,
  onClick,
  onMouseEnter
}) => (
  <Container
    className={className}
    data-test={dataTest}
    style={style}
    onClick={disabled ? undefined : onClick}
    onMouseEnter={disabled ? undefined : onMouseEnter}
    whileTap={!disabled && onClick ? { scale: 0.98 } : undefined}
    $active={active}
    $disabled={disabled}
    $forceTheme={forceTheme}
  >
    {leading && <Leading>{leading}</Leading>}
    <Content>
      <Typography forceTheme={forceTheme} weight={unread ? TypographyWeight.BOLD : TypographyWeight.REGULAR}>
        {title}
      </Typography>
      {subtitle && (
        <Typography color='secondary' forceTheme={forceTheme} size={TypographySize.SMALL}>
          {subtitle}
        </Typography>
      )}
    </Content>
    {(trailing || unread) && (
      <Trailing>
        {unread && <UnreadDot $forceTheme={forceTheme} />}
        {trailing}
      </Trailing>
    )}
    {actions && <ActionsContainer $active={active}>{actions}</ActionsContainer>}
  </Container>
);

export default ListItem;
