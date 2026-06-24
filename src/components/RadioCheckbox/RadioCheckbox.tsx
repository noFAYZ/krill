import * as React from 'react';

import { Size } from '../../types';
import Icons, { Icon } from '../Icons';

import { RadioCheckboxProps } from './RadioCheckbox.types';

const RadioCheckbox: React.FC<RadioCheckboxProps> = ({
  checked,
  dataTest,
  disabled,
  forceTheme,
  onClick,
  size = Size.X_MEDIUM
}) => (
  <Icons
    color={disabled ? 'disabled' : checked ? 'orange' : 'secondary'}
    dataTest={dataTest}
    disabled={disabled}
    forceTheme={forceTheme}
    icon={checked ? Icon.RadioFilled : Icon.RadioEmpty}
    size={size}
    onClick={onClick}
  />
);

export default RadioCheckbox;
