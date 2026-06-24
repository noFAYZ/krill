import * as React from 'react';

import { getAccentColorValues, getThemedColor } from '../../utils/colorUtils';

import { SliderInput } from './Slider.styles';
import { SliderProps } from './Slider.types';

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  className,
  color = 'blue',
  dataTest,
  disabled = false,
  forceTheme,
  max = 100,
  min = 0,
  step = 1
}) => {
  const [primaryColor] = getAccentColorValues(color, forceTheme);
  const trackColor = getThemedColor('var(--border-secondary)', forceTheme);
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <SliderInput
      className={className}
      data-test={dataTest}
      disabled={disabled}
      max={max}
      min={min}
      step={step}
      type='range'
      value={value}
      $color={primaryColor}
      $disabled={disabled}
      $percent={percent}
      $trackColor={trackColor}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};

export default Slider;
