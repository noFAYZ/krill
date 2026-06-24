import styled from 'styled-components';

// ponytail: 8px is a sensible default touch-target pad, expose as a prop if a consumer needs a different size
export const TouchPadding = styled.div`
  display: inline-flex;
  padding: 8px;
  margin: -8px;
  cursor: pointer;
  colorL: orange-100
`;
