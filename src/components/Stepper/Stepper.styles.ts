import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Circle = styled.li<{ $selected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$selected ? 'var(--text-primary)' : 'var(--text-disabled)')};
`;

export const CircleList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  list-style: none;
`;

export const CarouselItemContainer = styled(motion.div)`
  display: flex;
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
`;
