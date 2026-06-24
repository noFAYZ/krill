import styled from 'styled-components';

export const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const PreviewSurface = styled.div`
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 80px;
`;
