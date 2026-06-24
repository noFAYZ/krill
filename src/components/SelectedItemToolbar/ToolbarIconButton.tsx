import * as React from 'react';

import { Size, ThemeMode } from '../../types';
import Icons, { Icon } from '../Icons';
import Tooltip, { TooltipContent, TooltipTrigger } from '../Tooltip';

import { ToolbarIconButtonContainer } from './SelectedItemToolbar.styles';
import { ActionIcon } from './SelectedItemToolbar.types';

function ToolbarIconButton(
  { icon, onClick, tooltip, dataTest }: ActionIcon,
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  return (
    <Tooltip>
      <TooltipContent>{tooltip}</TooltipContent>
      <TooltipTrigger>
        <ToolbarIconButtonContainer data-test={dataTest} ref={ref} onClick={onClick}>
          <Icons
            color={icon === Icon.Trash ? 'destructive' : undefined}
            forceTheme={ThemeMode.DARK}
            icon={icon}
            size={Size.MEDIUM}
          />
        </ToolbarIconButtonContainer>
      </TooltipTrigger>
    </Tooltip>
  );
}

export default React.forwardRef<HTMLDivElement | null, ActionIcon>(ToolbarIconButton);
