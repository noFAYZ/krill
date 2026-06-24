import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Row = styled.div<{
  $depth: number;
  $disabled?: boolean;
  $forceTheme?: ThemeMode;
  $selected?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  padding-left: ${(props) => 8 + props.$depth * 16}px;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  background: ${(props) =>
    props.$selected ? getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme) : 'transparent'};

  ${(props) =>
    !props.$disabled &&
    !props.$selected &&
    `
    &:hover {
      background: ${getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme)};
    }
  `}
`;

export const ChevronSpacer = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

export const Label = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
