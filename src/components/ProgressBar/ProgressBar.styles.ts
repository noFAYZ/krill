import styled from 'styled-components';

export const ProgressBarTrack = styled.div<{ $height: number; $color: string }>`
  width: 100%;
  height: ${(props) => props.$height}px;
  border-radius: ${(props) => props.$height}px;
  overflow: hidden;
  background: ${(props) => props.$color};
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.08);
`;

export const ProgressBarFill = styled.div<{ $progress: number; $color: string; $height: number }>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  border-radius: ${(props) => props.$height}px;
  background: ${(props) => props.$color};
  box-shadow: 0px 0px 6px ${(props) => props.$color};
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;
