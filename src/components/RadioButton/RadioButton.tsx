import * as React from 'react';

import RadioCheckbox from '../RadioCheckbox';
import Typography, { TypographySize } from '../Typography';

import { Container, LabelAndDescription } from './RadioButton.styles';
import { RadioButtonProps } from './RadioButton.types';

const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  className,
  dataTest,
  description,
  disabled,
  forceTheme,
  label,
  onClick
}) => (
  <Container
    className={className}
    data-test={dataTest}
    onClick={disabled ? undefined : onClick}
    $checked={checked}
    $disabled={disabled}
    $forceTheme={forceTheme}
  >
    <LabelAndDescription>
      <Typography forceTheme={forceTheme} size={TypographySize.SMALL}>
        {label}
      </Typography>
      {description && (
        <Typography color={checked ? 'secondary' : 'disabled'} forceTheme={forceTheme} size={TypographySize.SMALL} wrap>
          {description}
        </Typography>
      )}
    </LabelAndDescription>
    <RadioCheckbox checked={checked} disabled={disabled} forceTheme={forceTheme} />
  </Container>
);

export default RadioButton;
