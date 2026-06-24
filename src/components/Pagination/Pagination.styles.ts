import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageButton = styled.div<{ $active?: boolean; $disabled?: boolean; $forceTheme?: ThemeMode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 4px;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  background: ${(props) =>
    props.$active ? getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme) : 'transparent'};

  ${(props) =>
    !props.$disabled &&
    !props.$active &&
    `
    &:hover {
      background: ${getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme)};
    }
  `}
`;

export const EllipsisItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
`;
