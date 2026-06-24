import styled from 'styled-components';

// Width is fixed via a wrapper div (rather than on InputField directly) to avoid layout shift
// when this component is used in a flex container with a gap value set
export const DateFieldContainer = styled.div<{ $width?: number }>`
  width: ${(props) => (props.$width ? `${props.$width}px` : '100%')};
`;
