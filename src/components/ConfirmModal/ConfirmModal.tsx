import * as React from 'react';

import { Type } from '../../types';
import ButtonGroupItem from '../ButtonGroupItem';
import Dialog, { DialogType } from '../Dialog';

import { ConfirmModalProps } from './ConfirmModal.types';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  onConfirm,
  open,
  confirmName,
  description,
  title,
  destructive,
  dataTest,
  secondaryName,
  onSecondary,
  disableOffClick,
  forceTheme,
  loading
}) => {
  if (!open) return null;

  return (
    <Dialog
      dataTest={dataTest}
      description={description}
      disableOffClick={disableOffClick}
      forceTheme={forceTheme}
      open={open}
      title={title}
      type={DialogType.CONFIRM}
      onClose={onClose}
    >
      <ButtonGroupItem
        dataTest={`confirm-${confirmName}`}
        label={confirmName}
        loading={loading}
        type={destructive ? Type.DESTRUCTIVE : undefined}
        onClick={onConfirm}
      />
      {secondaryName && onSecondary && (
        <ButtonGroupItem dataTest='dialog-secondary' label={secondaryName} onClick={onSecondary} />
      )}
      {!secondaryName && <ButtonGroupItem dataTest='dialog-cancel' label='Cancel' onClick={onClose} />}
    </Dialog>
  );
};

export default ConfirmModal;
