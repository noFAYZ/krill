import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';

// Number of items visible in the scroll wheel at once
export const VISIBLE_ITEM_COUNT = 7;
const SCROLL_CONTAINER_LEFT_PADDING = 12;

export const Container = styled.div<{ $height: number }>`
  height: ${(props) => props.$height * VISIBLE_ITEM_COUNT}px;
  position: relative;
  isolation: isolate;
  scrollbar-width: none;
  display: flex;
  justify-content: center;
`;

export const ScrollContainer = styled.div<{ $height: number; $rightPadding: number }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  width: fit-content;

  // Needs to be padding and NOT margin to register as a scrollable area
  padding: 0 ${(props) => props.$rightPadding}px 0 ${SCROLL_CONTAINER_LEFT_PADDING}px;

  // Must be higher than HighlightedSection's z-index
  z-index: 9999;

  &::-webkit-scrollbar {
    display: none;
  }

  // Lets the first/last items reach the center of the wheel
  &::before,
  &::after {
    display: inline-block;
    width: 1px;
    content: '';
    padding: ${(props) =>
      `${props.$height * 2}px ${props.$rightPadding}px ${props.$height * 2}px ${SCROLL_CONTAINER_LEFT_PADDING}px`};
  }
`;

export const ScrollItem = styled.div<{ $height: number }>`
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 ${(props) => props.$height}px;
`;

export const HighlightedSection = styled.div<{ $forceTheme?: ThemeMode; $height: number }>`
  height: ${(props) => props.$height}px;
  position: absolute;
  width: 100%;
  border-radius: 999px;
  background-color: ${(props) => getThemedColor('var(--bg-field-default)', props.$forceTheme)};
  top: 50%;
  transform: translateY(-50%);

  // Must be lower than ScrollContainer's z-index
  z-index: 1;
`;

export const GradientBackground = styled.div<{ $forceTheme?: ThemeMode }>`
  pointer-events: none;
  box-shadow: inset 0 0 25px 25px ${(props) => getThemedColor('var(--bg-l3-solid)', props.$forceTheme)};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
