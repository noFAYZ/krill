import * as React from 'react';

import { useOnClickOutside } from '../../hooks';
import { Size } from '../../types';
import BackgroundBlocker from '../../utils/BackgroundBlocker';
import Portal from '../Portal';
import { DROPDOWN_CALLER_CLASSNAME } from '../Surface';

import { ColorPickerProps } from './ColorPicker.types';
import {
  COLOR_PICKER_HEIGHT,
  COLOR_PICKER_WIDTH,
  OVERFLOW_PADDING,
  PickerSwatch,
  PickerSwitch,
  SketchContainer,
  StyledHexAlphaColorPicker,
  StyledHexColorInput
} from './ColorPicker.styles';

const PRESET_COLORS = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000000',
  '#9b9b9b',
  '#ffffff'
];

const isHexColor = (value: string) => /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);

/** The color picker pane that opens when the user clicks the custom color swatch in ColorSelector */
const ColorPicker: React.FC<ColorPickerProps> = ({
  handleColorChange,
  colorContainerRef,
  buttonRef,
  open,
  value,
  leftOffset = 0,
  topOffset = 0
}) => {
  const hexInputRef = React.useRef<HTMLInputElement>(null);
  const [hexInputClicked, setHexInputClicked] = React.useState(false);

  const color = value || '#000000';
  const [hexInput, setHexInput] = React.useState(isHexColor(color) ? color : '');
  const hexErrorState = !!hexInput && !isHexColor(hexInput);

  // Resync the hex input buffer whenever the external color or open state changes
  const prevSyncRef = React.useRef({ color, open });
  if (prevSyncRef.current.color !== color || prevSyncRef.current.open !== open) {
    prevSyncRef.current = { color, open };
    if (!open) setHexInput('');
    else if (isHexColor(color)) setHexInput(color);
  }

  const handleChangeComplete = (newColor: string) => {
    handleColorChange(newColor);
    setHexInput(newColor);
  };

  useOnClickOutside(hexInputRef, () => setHexInputClicked(false));

  const left = buttonRef.current?.getBoundingClientRect().left ?? 0;
  const top = buttonRef.current?.getBoundingClientRect().top ?? 0;

  let adjustedLeft = left + leftOffset;
  let adjustedTop = top + topOffset;

  if (adjustedLeft + COLOR_PICKER_WIDTH > window.innerWidth) {
    adjustedLeft = window.innerWidth - COLOR_PICKER_WIDTH - OVERFLOW_PADDING;
  }
  if (adjustedTop + COLOR_PICKER_HEIGHT > window.innerHeight) {
    adjustedTop = window.innerHeight - COLOR_PICKER_HEIGHT - OVERFLOW_PADDING;
  }

  if (!open) return null;

  return (
    <Portal>
      <BackgroundBlocker />
      <SketchContainer
        className={DROPDOWN_CALLER_CLASSNAME}
        ref={colorContainerRef}
        style={{ zIndex: 99999999999999, position: 'absolute', left: adjustedLeft, top: adjustedTop }}
        onClick={(e) => e.stopPropagation()}
      >
        <StyledHexAlphaColorPicker color={color} onChange={handleChangeComplete} />
        <StyledHexColorInput
          $error={!!hexInput && hexErrorState}
          innerRef={hexInputRef}
          placeholder='Color'
          size={Size.SMALL}
          value={hexInput.toUpperCase()}
          onBlur={() => {
            if (hexInputClicked) hexInputRef.current?.focus();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setHexInput(val.length > 0 && val[0] !== '#' ? `#${val}` : val);
          }}
          onClick={() => setHexInputClicked(true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && hexInput && isHexColor(hexInput)) handleChangeComplete(hexInput);
          }}
        />
        <PickerSwatch>
          {PRESET_COLORS.map((presetColor) => (
            <PickerSwitch
              key={presetColor}
              style={{ background: presetColor }}
              onClick={() => handleChangeComplete(presetColor)}
            />
          ))}
        </PickerSwatch>
      </SketchContainer>
    </Portal>
  );
};

export default ColorPicker;
