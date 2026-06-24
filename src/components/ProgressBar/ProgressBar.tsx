import * as React from 'react';

import { ProgressBarFill, ProgressBarTrack } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';
import { getColorValue } from './ProgressBar.utils';

const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  dataTest,
  forceTheme,
  height = 2,
  progress,
  progressColor = 'link',
  trackColor = 'var(--border-secondary)'
}) => {
  const progressColorValue = getColorValue(progressColor, forceTheme);
  const trackColorValue = getColorValue(trackColor, forceTheme);
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <ProgressBarTrack className={className} data-test={dataTest} $color={trackColorValue} $height={height}>
      <ProgressBarFill $color={progressColorValue} $height={height} $progress={clampedProgress} />
    </ProgressBarTrack>
  );
};

export default ProgressBar;
