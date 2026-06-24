import * as React from 'react';

import { FilledVariant, Size } from '../../types';
import { IconButton } from '../Button';
import Divider from '../Divider';
import { Icon } from '../Icons';
import IconText from '../IconText';
import Typography, { TypographySize } from '../Typography';

import { Content, DragHandle, Header, StyledMuiDrawer, StyledSwipeableDrawer } from './Drawer.styles';
import { DrawerProps } from './Drawer.types';

const Drawer: React.FC<DrawerProps> = ({
  anchor = 'bottom',
  children,
  className,
  dataTest,
  extraSpacer,
  forceTheme,
  maxHeight,
  onClose,
  open,
  showCloseButton,
  swipeable = false,
  title,
  titleIcon
}) => {
  const content = (
    <div data-test={dataTest}>
      {anchor === 'bottom' && <DragHandle $forceTheme={forceTheme} />}
      {(title || showCloseButton) && (
        <>
          <Header>
            {title &&
              (titleIcon ? (
                <IconText forceTheme={forceTheme} label={title} size={Size.LARGE} startIcon={titleIcon} />
              ) : (
                <Typography forceTheme={forceTheme} size={TypographySize.LARGE}>
                  {title}
                </Typography>
              ))}
            {showCloseButton && (
              <IconButton
                forceTheme={forceTheme}
                icon={Icon.Close}
                onClick={onClose}
                variant={FilledVariant.UNFILLED}
              />
            )}
          </Header>
          <Divider forceTheme={forceTheme} />
        </>
      )}
      <Content $extraSpacer={extraSpacer} $maxHeight={maxHeight}>
        {children}
      </Content>
    </div>
  );

  return swipeable ? (
    <StyledSwipeableDrawer
      anchor={anchor}
      className={className}
      disableDiscovery
      disableSwipeToOpen
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      $anchor={anchor}
      $forceTheme={forceTheme}
    >
      {content}
    </StyledSwipeableDrawer>
  ) : (
    <StyledMuiDrawer anchor={anchor} className={className} open={open} onClose={onClose} $anchor={anchor} $forceTheme={forceTheme}>
      {content}
    </StyledMuiDrawer>
  );
};

export default Drawer;
