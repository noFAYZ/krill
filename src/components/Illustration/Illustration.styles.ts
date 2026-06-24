import styled from 'styled-components';

export const StyledIllustration = styled.span<{ $scale: number; $includeBorderRadius?: boolean }>`
  display: inline-flex;
  transform: scale(${(props) => props.$scale});

  svg {
    width: unset;
    border-radius: ${(props) => (props.$includeBorderRadius ? 4 : 0)}px;
  }
`;
