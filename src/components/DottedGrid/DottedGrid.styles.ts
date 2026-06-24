import styled from 'styled-components';

export const Centered = styled.div<{
  $top?: number;
  $left?: number;
  $width?: number | string;
  $height?: number | string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${(props) => (props.$left ? `${props.$left}px` : '0')};
  top: ${(props) => (props.$top ? `${props.$top}px` : '')};
  width: ${(props) =>
    props.$width ? (typeof props.$width === 'number' ? `${props.$width}px` : props.$width) : '100%'};
  height: ${(props) =>
    props.$height ? (typeof props.$height === 'number' ? `${props.$height}px` : props.$height) : '100%'};
  z-index: 0;
  overflow: hidden;
`;

export const PatternContainer = styled.div``;
