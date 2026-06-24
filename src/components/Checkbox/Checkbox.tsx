import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { Size } from '../../types';
import Icons, { Icon, IconColor } from '../Icons';

import { TouchPadding } from './Checkbox.styles';
import { CheckboxProps, CheckboxSize } from './Checkbox.types';

const CHECKBOX_ICON_SIZE: Record<CheckboxSize, Size> = {
  [Size.SMALL]: Size.SMALL,
  [Size.MEDIUM]: Size.MEDIUM,
  [Size.LARGE]: Size.X_MEDIUM
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  checkedColor,
  dataTest,
  disabled,
  error,
  forceTheme,
  indeterminate,
  onClick,
  padding,
  size = Size.MEDIUM
}) => {
  // Indeterminate takes priority over checked, matching MUI's checkbox semantics
  const icon = indeterminate ? Icon.CheckboxHalfFilled : checked ? Icon.CheckboxFilled : Icon.CheckboxEmpty;
  const color: IconColor = disabled
    ? 'disabled'
    : checked || indeterminate
      ? checkedColor ?? 'orange'
      : error
        ? 'destructive'
        : 'secondary';
  const iconSize = CHECKBOX_ICON_SIZE[size];

  // Pops the new icon in (and the old one out) whenever the checked/indeterminate state changes
  const renderIcon = (onIconClick?: (e: React.MouseEvent) => void) => (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.span
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        initial={{ scale: 0.5, opacity: 0 }}
        key={icon}
        style={{ display: 'inline-flex' }}
        transition={{ duration: 0.05, ease: 'easeOut' }}
      >
        <Icons
          color={color}
          dataTest={dataTest}
          disabled={disabled}
          forceTheme={forceTheme}
          icon={icon}
          onClick={onIconClick}
          size={iconSize}
        />
      </motion.span>
    </AnimatePresence>
  );

  if (padding) {
    return <TouchPadding onClick={disabled ? undefined : onClick}>{renderIcon()}</TouchPadding>;
  }

  return renderIcon(onClick);
};

export default Checkbox;
