import styled, { css } from 'styled-components';

import { EVENT_DOT_CONTAINER_HEIGHT, EventDotType } from './EventDot.constants';

export const DotContainer = styled.div`
  width: fit-content;
  height: ${EVENT_DOT_CONTAINER_HEIGHT}px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.div<{ $dotColor: string; $type: EventDotType; $isFaded: boolean }>`
  width: 8px;
  height: 8px;

  box-sizing: border-box;
  border-radius: 50%;
  opacity: ${(props) => (props.$isFaded ? 0.4 : 1)};

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => `
    background: ${props.$type === EventDotType.FILLED ? props.$dotColor : 'transparent'};
    border: ${props.$type === EventDotType.FILLED ? 'none' : `1px solid ${props.$dotColor}`};
  `}
`;

// For "maybe"/tentative events
export const InnerDot = styled.div<{ $dotColor: string }>`
  border-radius: inherit;
  border: 2px solid transparent;
  background: ${(props) => props.$dotColor};
`;

const CROSS_CSS = ({ $dotColor }: { $dotColor: string }) => css`
  content: '';
  height: 60%;
  border-left: 1px solid ${$dotColor};
  position: absolute;
  left: 2.5px;
  top: 1.5px;
  border-radius: 25%;
`;

// For rejected/declined events
export const InnerCross = styled.div<{ $dotColor: string }>`
  width: inherit;
  height: inherit;
  position: relative;

  :after {
    ${CROSS_CSS}
    transform: rotate(45deg);
  }

  :before {
    ${CROSS_CSS}
    transform: rotate(-45deg);
  }
`;
