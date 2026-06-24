import * as React from 'react';

import { useOnClickOutside } from '../../hooks';
import { CorrectedColorSelect } from '../../utils/colorUtils';

import ColorPicker from './ColorPicker';
import { ColorCircle, ColorList, ColorOption, CustomColor, CustomColorContainer } from './ColorSelector.styles';
import { ColorSelectorProps } from './ColorSelector.types';

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colorToStyling,
  value,
  handleChange,
  handlePickerChange,
  pickerColorContainerRef,
  disabled,
  forceTheme,
  hideSelected,
  showHover,
  isHighlight,
  pickerLeftOffset = -100,
  pickerTopOffset = 30
}) => {
  const [openPicker, setOpenPicker] = React.useState(false);
  const customColorButtonRef = React.useRef<HTMLDivElement>(null);
  const fallbackRef = React.useRef<HTMLDivElement>(null);
  const colorContainerRef = pickerColorContainerRef ?? fallbackRef;

  useOnClickOutside(colorContainerRef, (e) => {
    e.stopPropagation();
    if (openPicker) setOpenPicker(false);
  });

  return (
    <ColorList>
      {Object.entries(colorToStyling).map(([colorValue, colorStyling]) => {
        const isSelected = !hideSelected && colorValue === value;
        return (
          <ColorOption
            $color={showHover ? colorStyling : CorrectedColorSelect[colorStyling]}
            $disabled={disabled}
            $forceTheme={forceTheme}
            $isSelected={isSelected}
            $showHover={showHover}
            key={colorValue}
            onClick={(evt) => {
              if (disabled) return;
              evt.stopPropagation();
              handleChange(colorValue);
            }}
          >
            <ColorCircle
              $color={showHover ? colorStyling : CorrectedColorSelect[colorStyling]}
              $isHighlight={isHighlight}
              $isSelected={isSelected}
              $showHover={showHover}
            />
          </ColorOption>
        );
      })}
      {!!handlePickerChange && (
        <>
          <CustomColorContainer ref={customColorButtonRef}>
            <CustomColor onClick={() => setOpenPicker(true)} />
          </CustomColorContainer>
          <ColorPicker
            buttonRef={customColorButtonRef}
            colorContainerRef={colorContainerRef}
            handleColorChange={handlePickerChange}
            leftOffset={pickerLeftOffset}
            open={openPicker}
            topOffset={pickerTopOffset}
            value={value}
          />
        </>
      )}
    </ColorList>
  );
};

export default ColorSelector;
