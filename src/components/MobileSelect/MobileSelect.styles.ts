import styled from 'styled-components';

export const SelectContainer = styled.div<{ $width?: number | string }>`
  ${({ $width }) => $width && `width: ${typeof $width === 'string' ? $width : `${$width}px`};`}
`;
