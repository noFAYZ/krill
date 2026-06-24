import * as React from 'react';

import ProgressBar from '../ProgressBar';

import { Bar, Container } from './ActionBar.styles';
import { ActionBarProps } from './ActionBar.types';

// Slides up on mount; wrap conditional rendering in the consumer's own <AnimatePresence> for an exit animation too
const ActionBar: React.FC<ActionBarProps> = ({ children, className, dataTest, forceTheme, progress, zIndex }) => (
  <Container
    animate={{ y: 0 }}
    className={className}
    data-test={dataTest}
    exit={{ y: '100%' }}
    initial={{ y: '100%' }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    $zIndex={zIndex}
  >
    {progress !== undefined && <ProgressBar forceTheme={forceTheme} progress={progress} />}
    <Bar $forceTheme={forceTheme}>{children}</Bar>
  </Container>
);

export default ActionBar;
