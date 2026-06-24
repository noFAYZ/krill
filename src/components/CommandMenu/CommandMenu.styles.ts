import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const RowWrapper = styled.div`
  position: relative;
`;

export const Highlight = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 8px;
  background: var(--bg-overlay-tertiary);
`;

export const InputContainer = styled.div`
  padding: 5px 16px 5px 16px;
  box-sizing: border-box;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  box-sizing: border-box;
  max-height: 360px;
  overflow-y: auto;
`;

export const EmptyState = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: var(--cta-secondary-hover);
  border: 1px solid var(--border-tertiary);
`;
