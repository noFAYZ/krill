import * as React from 'react';

import {
  accentColorToPrimaryColor,
  ButtonGroup,
  ButtonGroupItem,
  ColorSelector,
  Dialog,
  DialogType,
  InputField,
  Size
} from '../../src';

interface CreateLabelModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (label: { name: string; color: string }) => void;
}

const CreateLabelModal: React.FC<CreateLabelModalProps> = ({ open, onClose, onCreate }) => {
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('orange');

  // Reset the form whenever the dialog (re)opens, without an Effect
  const [trackedOpen, setTrackedOpen] = React.useState(open);
  if (open !== trackedOpen) {
    setTrackedOpen(open);
    if (open) {
      setName('');
      setColor('orange');
    }
  }

  const isReadyToSubmit = name.trim().length > 0;

  const submit = () => {
    if (!isReadyToSubmit) return;
    onCreate({ name: name.trim(), color });
    onClose();
  };

  return (
    <Dialog customContent open={open} title='Create label' type={DialogType.INPUT} onClose={onClose}>
      <InputField
        // eslint-disable-next-line jsx-a11y/no-autofocus -- dialog input, focused when the user explicitly opens it
        autoFocus
        placeholder='Label name'
        size={Size.SMALL}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
      <ColorSelector colorToStyling={accentColorToPrimaryColor} value={color} handleChange={setColor} />
      <ButtonGroup>
        <ButtonGroupItem disabled={!isReadyToSubmit} label='Create' onClick={submit} />
        <ButtonGroupItem label='Cancel' onClick={onClose} />
      </ButtonGroup>
    </Dialog>
  );
};

export default CreateLabelModal;
