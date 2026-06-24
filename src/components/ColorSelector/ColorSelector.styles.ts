import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

export const ColorList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ColorOption = styled.div<{
  $color?: string;
  $isSelected?: boolean;
  $disabled?: boolean;
  $showHover?: boolean;
  $forceTheme?: ThemeMode;
}>`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  ${(props) => props.$showHover && 'margin: 2px;'}
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  ${(props) =>
    props.$isSelected &&
    `
    border: 2px ${props.$color ?? ''} solid !important;
    box-shadow: var(--shadow-l1);
  `}

  &:hover {
    border: 2px solid
      rgba(
        ${(props) =>
          getThemedColor(props.$color ?? '', props.$forceTheme)
            .substring(4)
            .slice(0, -1)},
        0.3
      );
    cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  }
`;

export const ColorCircle = styled.div<{
  $color: string;
  $isSelected?: boolean;
  $showHover?: boolean;
  $isHighlight?: boolean;
}>`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: ${(props) => props.$color};

  ${(props) => props.$showHover && `border: 1px solid ${getThemedColor('var(--border-primary)', ThemeMode.DARK)};`}
  ${(props) => props.$isHighlight && 'box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.3);'}
  ${(props) => !props.$isHighlight && props.$isSelected && 'box-shadow: var(--shadow-l1);'}
`;

export const CustomColorContainer = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  margin: 2px;
  display: flex;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  cursor: pointer;
`;

export const CustomColor = styled.div`
  background: conic-gradient(
    rgb(235, 87, 87),
    rgb(242, 201, 76),
    rgb(76, 183, 130),
    rgb(78, 167, 252),
    rgb(250, 96, 122)
  );
  box-sizing: border-box;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  aspect-ratio: 1;
`;
