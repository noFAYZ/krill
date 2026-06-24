import styled from 'styled-components';

export const BadgeWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
  height: fit-content;
`;

export const BadgeCount = styled.div<{ $background: string; $dot: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(40%, -40%);
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  background: ${(props) => props.$background};
  border-radius: 999px;

  ${(props) =>
    props.$dot
      ? `
    width: 8px;
    height: 8px;
  `
      : `
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
  `}
`;
