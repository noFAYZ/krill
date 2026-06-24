import * as React from 'react';

import RadioCheckbox from '../RadioCheckbox';
import Typography, { TypographyWeight } from '../Typography';

import {
  ContentContainer,
  IllustrationContainer,
  LabelContainer,
  RadioContainer,
  RadioPosition,
  SvgContainer
} from './SelectBox.styles';
import { SelectBoxProps } from './SelectBox.types';

const SelectBox: React.FC<SelectBoxProps> = ({
  bgColor,
  checked,
  dataTest,
  description,
  forceTheme,
  illustration,
  label,
  onClick,
  position = 'center',
  size = 'small'
}) => (
  <SvgContainer
    data-test={dataTest}
    onClick={onClick}
    $bgColor={bgColor}
    $checked={checked}
    $large={size === 'large'}
    $position={position}
  >
    <IllustrationContainer>{illustration}</IllustrationContainer>
    <ContentContainer>
      <LabelContainer>
        <Typography color='primary' forceTheme={forceTheme} weight={TypographyWeight.MEDIUM}>
          {label}
        </Typography>
        {description && (
          <Typography color='secondary' forceTheme={forceTheme} wrap>
            {description}
          </Typography>
        )}
      </LabelContainer>
      <RadioContainer>
        <RadioPosition>
          <RadioCheckbox checked={checked} forceTheme={forceTheme} />
        </RadioPosition>
      </RadioContainer>
    </ContentContainer>
  </SvgContainer>
);

export default SelectBox;
