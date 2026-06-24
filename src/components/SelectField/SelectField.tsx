import * as React from 'react';
import { isMobile } from 'react-device-detect';

import MobileSelect from '../MobileSelect';
import Select from '../Select';

import { SelectFieldProps } from './SelectField.types';

const SelectField: React.FC<SelectFieldProps> = ({ children, menuControls, ...selectProps }) =>
  isMobile ? (
    <MobileSelect menuControls={menuControls} {...selectProps}>
      {children}
    </MobileSelect>
  ) : (
    <Select {...selectProps}>{children}</Select>
  );

export default SelectField;
