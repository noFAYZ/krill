import MuiDrawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import styled, { css } from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

const DRAWER_PAPER_CSS = css<{ $anchor: string; $forceTheme?: ThemeMode }>`
  .MuiDrawer-paper {
    background: ${(props) => getThemedColor('var(--bg-l2-solid)', props.$forceTheme)};
    box-shadow: ${(props) => getThemedColor('var(--shadow-l2)', props.$forceTheme)};
    border-top-left-radius: ${(props) => (props.$anchor === 'bottom' ? '20px' : '0px')};
    border-top-right-radius: ${(props) => (props.$anchor === 'bottom' ? '20px' : '0px')};
    box-sizing: border-box;
  }

  .MuiBackdrop-root {
    background: ${(props) => getThemedColor('var(--bg-scrim)', props.$forceTheme)};
  }
`;

export const StyledMuiDrawer = styled(MuiDrawer)<{ $anchor: string; $forceTheme?: ThemeMode }>`
  ${DRAWER_PAPER_CSS}
`;

export const StyledSwipeableDrawer = styled(SwipeableDrawer)<{ $anchor: string; $forceTheme?: ThemeMode }>`
  ${DRAWER_PAPER_CSS}
`;

export const DragHandle = styled.div<{ $forceTheme?: ThemeMode }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px 4px 0px;

  &::after {
    content: '';
    width: 18%;
    height: 4px;
    border-radius: 4px;
    background: ${(props) => getThemedColor('var(--border-secondary)', props.$forceTheme)};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 8px 16px;
`;

export const Content = styled.div<{ $maxHeight?: number | string; $extraSpacer?: boolean }>`
  padding: 0px 16px 16px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  ${(props) => props.$extraSpacer && 'margin-bottom: 48px;'}
  ${(props) =>
    props.$maxHeight &&
    `max-height: ${typeof props.$maxHeight === 'string' ? props.$maxHeight : `${props.$maxHeight}px`};`}
`;
