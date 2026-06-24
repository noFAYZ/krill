import * as React from 'react';
import { isMobile } from 'react-device-detect';

import { FilledVariant, Size, Type } from '../../types';
import { Button } from '../Button';
import Icons, { Icon } from '../Icons';
import IconText from '../IconText';
import Typography, { TypographySize } from '../Typography';

import { ImportClientIcon, LargeItemContainer, Textbox } from './ImportSelect.styles';
import { ImportSelectProps } from './ImportSelect.types';

const ImportSelect: React.FC<ImportSelectProps> = ({
  icon,
  compact,
  label,
  subLabel,
  onClick,
  dataTest,
  color,
  disabled,
  iconColor,
  wrap = false,
  onClickLabel
}) => {
  const renderCompactButton = () => (
    <IconText
      color={color}
      disabled={disabled}
      label={label}
      startIcon={!isMobile ? <Icons color={iconColor} icon={icon} /> : undefined}
      variant={FilledVariant.FILLED}
      onClick={onClick}
    />
  );

  const renderImportButton = () => {
    if (isMobile) return <Icons color='secondary' icon={Icon.ChevronRight} />;
    return (
      <Button disabled={disabled} type={Type.SECONDARY} onClick={onClick}>
        {onClickLabel || 'Import'}
      </Button>
    );
  };

  const renderFullButton = () => (
    <LargeItemContainer data-test={dataTest} onClick={isMobile ? onClick : undefined}>
      <ImportClientIcon>
        <Icons color={iconColor} disabled={disabled} icon={icon} size={Size.X_MEDIUM} />
      </ImportClientIcon>
      <Textbox>
        <Typography color={disabled ? 'disabled' : color}>{label}</Typography>
        {subLabel && (
          <Typography color={disabled ? 'disabled' : 'tertiary'} size={TypographySize.SMALL} wrap={wrap}>
            {subLabel}
          </Typography>
        )}
      </Textbox>
      {renderImportButton()}
    </LargeItemContainer>
  );

  return compact ? renderCompactButton() : renderFullButton();
};

export default ImportSelect;
