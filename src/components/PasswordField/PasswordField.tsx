import * as React from 'react';

import { Icon } from '../Icons';
import { InputField, InputType } from '../InputField';
import InputFieldEndAction from '../InputFieldEndAction';
import ProgressBar from '../ProgressBar';
import Typography, { TypographySize } from '../Typography';

import { Container, StrengthBar, StrengthRow } from './PasswordField.styles';
import { PasswordFieldProps } from './PasswordField.types';
import { getPasswordStrength, PASSWORD_STRENGTH_COLOR, PASSWORD_STRENGTH_LABEL } from './PasswordField.utils';

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  className,
  dataTest,
  disabled,
  error,
  forceTheme,
  placeholder = 'Password',
  size,
  showStrength
}) => {
  const [visible, setVisible] = React.useState(false);
  const { score, strength } = getPasswordStrength(value);

  return (
    <Container className={className}>
      <InputField
        dataTest={dataTest}
        disabled={disabled}
        endAdornment={
          <InputFieldEndAction
            forceTheme={forceTheme}
            icon={visible ? Icon.EyeSlash : Icon.Eye}
            tooltip={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((v) => !v)}
          />
        }
        error={error}
        forceTheme={forceTheme}
        placeholder={placeholder}
        size={size}
        type={visible ? InputType.DEFAULT : InputType.PASSWORD}
        value={value}
        onChange={onChange}
      />
      {showStrength && value && (
        <StrengthRow>
          <StrengthBar>
            <ProgressBar progress={(score / 5) * 100} progressColor={PASSWORD_STRENGTH_COLOR[strength]} />
          </StrengthBar>
          <Typography color='secondary' size={TypographySize.SMALL}>
            {PASSWORD_STRENGTH_LABEL[strength]}
          </Typography>
        </StrengthRow>
      )}
    </Container>
  );
};

export default PasswordField;
