import styled from 'styled-components';

export const Shell = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 40px 48px;
  box-sizing: border-box;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
`;
