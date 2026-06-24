import * as React from 'react';

import { FilledVariant, Size } from '../../types';
import Drawer from '../Drawer';
import { Icon } from '../Icons';
import IconText from '../IconText';
import { InputField } from '../InputField';
import { TypographyWeight } from '../Typography';

import { SelectContainer } from './MobileSelect.styles';
import { MobileSelectProps } from './MobileSelect.types';

export default function MobileSelect({
  children,
  onChange,
  dataTest,
  disabled,
  forceTheme,
  ghostColor,
  maxHeight,
  menuControls,
  placeholder,
  size = Size.LARGE,
  value,
  width,
  variant = FilledVariant.UNFILLED
}: MobileSelectProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isOpen = menuControls?.isOpen || menuOpen;

  const endIcon = menuOpen ? Icon.ChevronUp : Icon.ChevronDown;
  const typographyWeight = TypographyWeight.REGULAR;

  const selectTriggerRef = React.useRef<HTMLDivElement | null>(null);
  const selectedLabel = children.find((child) => value === child.props.value)?.props.label;

  const toggleOpen = () => {
    if (menuControls) menuControls.setIsOpen(!isOpen);
    else setMenuOpen(!isOpen);
  };

  const renderDisabledField = () => (
    <IconText
      dataTest={dataTest}
      disabled
      forceTheme={forceTheme}
      label={selectedLabel ?? placeholder}
      size={size}
      weight={typographyWeight}
    />
  );

  const renderEnabledField = () =>
    variant === FilledVariant.FILLED ? (
      <InputField
        active={menuOpen}
        dataTest={dataTest}
        disabled
        endAdornment={endIcon}
        forceTheme={forceTheme}
        placeholder={placeholder}
        ref={selectTriggerRef}
        size={size}
        value={typeof selectedLabel === 'string' ? selectedLabel : ''}
        onClick={toggleOpen}
      />
    ) : (
      <IconText
        color={ghostColor}
        dataTest={dataTest}
        endIcon={endIcon}
        forceTheme={forceTheme}
        label={selectedLabel ?? placeholder}
        ref={selectTriggerRef}
        size={size}
        weight={typographyWeight}
        onClick={toggleOpen}
      />
    );

  const renderSelectItems = () =>
    children.map((child) =>
      React.cloneElement(child, {
        active: value === child.props.value,
        key: typeof child.props.label === 'string' ? child.props.label : child.props.value,
        onClick: async (e?: React.MouseEvent<HTMLDivElement>) => {
          if (child.props.onClick) await child.props.onClick(e);
          else if (child.props.value) onChange(child.props.value);
          toggleOpen();
        }
      })
    );

  return (
    <SelectContainer $width={width}>
      {disabled ? renderDisabledField() : renderEnabledField()}
      <Drawer forceTheme={forceTheme} maxHeight={maxHeight} open={isOpen} onClose={toggleOpen}>
        {renderSelectItems()}
      </Drawer>
    </SelectContainer>
  );
}
