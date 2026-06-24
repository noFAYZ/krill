import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ItemContainer = styled.div`
  border-bottom: 1px solid var(--border-tertiary);

  &:first-of-type {
    border-top: 1px solid var(--border-tertiary);
  }
`;

export const Header = styled.div<{ $disabled?: boolean; $forceTheme?: ThemeMode }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 8px;
  box-sizing: border-box;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  ${(props) =>
    !props.$disabled &&
    `
    &:hover {
      background: ${getThemedColor('var(--bg-overlay-tertiary)', props.$forceTheme)};
    }
  `}
`;

export const TitleContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Content = styled.div`
  padding: 0 8px 12px 8px;
  box-sizing: border-box;
`;
