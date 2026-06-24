import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const BOTTOM_BAR_HEIGHT = 36;

export const BottomBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: ${BOTTOM_BAR_HEIGHT}px;
  width: fit-content;
  padding: 2px;

  position: fixed;
  left: 50%;
  bottom: 21px;
  transform: translateX(-50%);

  background: var(--bg-emphasis);

  box-shadow: var(--shadow-l3);
  border-radius: 8px;
  z-index: 99999999999;
`;

export const DividerContainer = styled.div`
  padding: 4px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  gap: 8px;
`;

export const ToolbarIconButtonContainer = styled.div`
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${getThemedColor('var(--bg-cell-hover)', ThemeMode.DARK)};
  }
`;
