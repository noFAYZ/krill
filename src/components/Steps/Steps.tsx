import * as React from 'react';

import { Alignment } from '../../types';
import { getAccentColorValues, getThemedColor } from '../../utils/colorUtils';
import Icons, { Icon } from '../Icons';
import Typography, { TypographySize, TypographyWeight } from '../Typography';

import { StepCircle, StepConnector, StepNode, StepsContainer } from './Steps.styles';
import { StepsProps } from './Steps.types';

const Steps: React.FC<StepsProps> = ({ steps, currentStep, className, color = 'green', forceTheme }) => {
  const [accentColor] = getAccentColorValues(color, forceTheme);
  const trackColor = getThemedColor('var(--border-secondary)', forceTheme);

  return (
    <StepsContainer className={className}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={step.key}>
            <StepNode>
              <StepCircle
                $background={isCompleted ? accentColor : 'transparent'}
                $border={isCompleted || isActive ? accentColor : trackColor}
              >
                {isCompleted ? (
                  <Icons color='white' icon={Icon.Check} size={14} />
                ) : (
                  <Typography
                    color={isActive ? 'primary' : 'disabled'}
                    forceTheme={forceTheme}
                    selectable={false}
                    size={TypographySize.SMALL}
                    weight={TypographyWeight.MEDIUM}
                  >
                    {index + 1}
                  </Typography>
                )}
              </StepCircle>
              <Typography
                align={Alignment.CENTER}
                color={isActive ? 'primary' : isCompleted ? 'secondary' : 'disabled'}
                forceTheme={forceTheme}
                selectable={false}
                size={TypographySize.SMALL}
                weight={isActive ? TypographyWeight.MEDIUM : TypographyWeight.REGULAR}
              >
                {step.label}
              </Typography>
            </StepNode>
            {index < steps.length - 1 && <StepConnector $background={isCompleted ? accentColor : trackColor} />}
          </React.Fragment>
        );
      })}
    </StepsContainer>
  );
};

export default Steps;
