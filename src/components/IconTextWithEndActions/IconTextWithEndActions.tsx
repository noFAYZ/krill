import uniqueId from 'lodash/uniqueId';
import * as React from 'react';

import IconText from '../IconText';

import { EndActions, IconTextContainer, StartActions, Wrapper } from './IconTextWithEndActions.styles';
import { IconTextWithEndActionsProps } from './IconTextWithEndActions.types';

const IconTextWithEndActions: React.FC<IconTextWithEndActionsProps> = ({
  endActions,
  forceTheme,
  showEndActions = true,
  startComponent,
  ...iconTextProps
}) => (
  <Wrapper>
    <StartActions>
      {startComponent}
      <IconTextContainer>
        <IconText forceTheme={forceTheme} {...iconTextProps} />
      </IconTextContainer>
    </StartActions>
    {showEndActions && (
      <EndActions>
        {endActions.map((endAction) => (
          <IconText
            color='secondary'
            forceTheme={forceTheme}
            key={uniqueId('iconText-endAction')}
            ref={endAction.buttonRef}
            startIcon={endAction.icon}
            tooltip={endAction.tooltip}
            onClick={(e?: React.MouseEvent) => {
              e?.stopPropagation();
              endAction.onClick(e);
            }}
          />
        ))}
      </EndActions>
    )}
  </Wrapper>
);

export default IconTextWithEndActions;
