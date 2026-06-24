import { motion, SVGMotionProps } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components';

export const Path = (
  props: JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>
) => <motion.path fill='transparent' stroke='hsl(0, 0%, 18%)' strokeLinecap='round' strokeWidth='3' {...props} />;

export const IconContainer = styled.div`
  z-index: 1;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
