import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  gap: 24px;
  height: 460px;
`;

export const NavColumn = styled.div`
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-right: 1px solid var(--border-secondary);
  padding-right: 16px;
  box-sizing: border-box;
`;

export const ContentColumn = styled.div`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
