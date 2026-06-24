import styled, { css } from 'styled-components';

const THUMB_SIZE = 16;

const THUMB_CSS = css<{ $color: string; $disabled: boolean }>`
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border-radius: 50%;
  border: none;
  background: ${(props) => props.$color};
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  box-shadow: var(--shadow-l1);
`;

export const SliderInput = styled.input<{
  $color: string;
  $disabled: boolean;
  $percent: number;
  $trackColor: string;
}>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  margin: 0;
  border-radius: 2px;
  outline: none;

  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  background: ${(props) =>
    `linear-gradient(to right, ${props.$color} 0%, ${props.$color} ${props.$percent}%, ${props.$trackColor} ${props.$percent}%, ${props.$trackColor} 100%)`};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${THUMB_CSS}
  }

  &::-moz-range-thumb {
    ${THUMB_CSS}
  }

  &::-moz-range-track {
    background: transparent;
  }
`;
