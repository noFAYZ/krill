import * as React from 'react';

import { Size } from '../../types';
import { IconButton } from '../Button';
import { Icon } from '../Icons';
import Typography from '../Typography';

import { NumberInputContainer, NumberInputValue } from './NumberInput.styles';
import { NumberInputProps } from './NumberInput.types';

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  className,
  dataTest,
  disabled = false,
  forceTheme,
  max = Infinity,
  min = -Infinity,
  step = 1
}) => {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <NumberInputContainer className={className} data-test={dataTest} $disabled={disabled} $forceTheme={forceTheme}>
      <IconButton
        disabled={disabled || value <= min}
        forceTheme={forceTheme}
        icon={Icon.Minus}
        size={Size.SMALL}
        onClick={() => onChange(clamp(value - step))}
      />
      <NumberInputValue>
        <Typography forceTheme={forceTheme} selectable={false}>
          {value}
        </Typography>
      </NumberInputValue>
      <IconButton
        disabled={disabled || value >= max}
        forceTheme={forceTheme}
        icon={Icon.Plus}
        size={Size.SMALL}
        onClick={() => onChange(clamp(value + step))}
      />
    </NumberInputContainer>
  );
};

export default NumberInput;
