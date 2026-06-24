import { HexAlphaColorPicker } from 'react-colorful';
import styled from 'styled-components';

import { ThemeMode } from '../../types';
import { getThemedColor } from '../../utils/colorUtils';
import { InputField } from '../InputField';

export const COLOR_PICKER_WIDTH = 210;
export const COLOR_PICKER_HEIGHT = 220;
export const OVERFLOW_PADDING = 10;

export const SketchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--bg-emphasis);
  border-radius: 4px;
  padding: 6px;
  width: ${COLOR_PICKER_WIDTH}px;
  border: 1px solid ${getThemedColor('var(--border-primary)', ThemeMode.DARK)};
  box-shadow: var(--shadow-l2);
`;

export const StyledHexAlphaColorPicker = styled(HexAlphaColorPicker)`
  width: ${COLOR_PICKER_WIDTH}px !important;

  .react-colorful__saturation {
    border-radius: 2px !important;
  }
  .react-colorful__hue {
    height: 10px !important;
  }
  .react-colorful__alpha {
    border-radius: 0px !important;
    height: 10px !important;
    box-sizing: border-box !important;
  }
  .react-colorful__pointer {
    height: 12px !important;
    width: 12px !important;
  }
`;

export const StyledHexColorInput = styled(InputField)<{ $error?: boolean }>`
  * input {
    background: ${getThemedColor('var(--bg-overlay-secondary)', ThemeMode.DARK)} !important;
    border-radius: 2px !important;
    border: 1px solid
      ${(props) =>
        props.$error
          ? getThemedColor('var(--icon-destructive)', ThemeMode.DARK)
          : getThemedColor('var(--border-secondary)', ThemeMode.DARK)} !important;
    color: ${getThemedColor('var(--text-secondary)', ThemeMode.DARK)} !important;
    font-size: 11px !important;
    height: 24px !important;
  }
`;

export const PickerSwitch = styled.button`
  height: 16px;
  width: 16px;
  cursor: pointer;
  position: relative;
  outline: none;
  border-radius: 3px;
  border: 0;
  box-shadow: rgba(255, 255, 255, 0.15) 0px 0px 0px 1px inset;
`;

export const PickerSwatch = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
