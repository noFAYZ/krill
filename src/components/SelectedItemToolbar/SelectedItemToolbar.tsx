import * as React from 'react';

import { ThemeMode } from '../../types';
import Divider, { DividerType } from '../Divider';
import Typography from '../Typography';

import { BOTTOM_BAR_HEIGHT, BottomBarContainer, DividerContainer, TextContainer } from './SelectedItemToolbar.styles';
import { SelectedItemToolbarProps } from './SelectedItemToolbar.types';
import ToolbarIconButton from './ToolbarIconButton';

const SelectedItemToolbar: React.FC<SelectedItemToolbarProps> = ({ topText, actions, subText }) => (
  <BottomBarContainer>
    <TextContainer>
      <Typography forceTheme={ThemeMode.DARK}>{topText}</Typography>
      {!!subText && (
        <Typography color='secondary' forceTheme={ThemeMode.DARK}>
          {subText}
        </Typography>
      )}
    </TextContainer>
    <DividerContainer>
      <Divider
        color='primary'
        forceTheme={ThemeMode.DARK}
        height={`${BOTTOM_BAR_HEIGHT - 8}px`}
        type={DividerType.VERTICAL}
      />
    </DividerContainer>
    {actions.map(({ icon, onClick, tooltip, key, dataTest, ref }) => (
      <ToolbarIconButton dataTest={dataTest} icon={icon} key={key} ref={ref} tooltip={tooltip} onClick={onClick} />
    ))}
  </BottomBarContainer>
);

export default SelectedItemToolbar;
