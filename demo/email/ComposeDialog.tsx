import * as React from 'react';

import {
  Button,
  ChipInput,
  ConfirmModal,
  Dialog,
  DialogType,
  DropdownItem,
  FileImport,
  FilledVariant,
  Icon,
  IconButton,
  InputField,
  Select,
  Size,
  TextArea,
  Type,
  Typography,
  TypographySize,
  useHotkeys
} from '../../src';

import { AttachmentChip, AttachmentsRow, CcBccToggle, Form, FromRow, SendRow } from './ComposeDialog.styles';

const FROM_ALIASES = ['alex@krillmail.com', 'alex.rivera@krillmail.com', 'a.rivera@krillmail.com'];

interface ComposeDialogProps {
  open: boolean;
  initialSubject?: string;
  initialTo?: string;
  onClose: () => void;
  onSend: (data: { to: string[]; subject: string; body: string; attachments: string[] }) => void;
}

const ComposeDialog: React.FC<ComposeDialogProps> = ({ initialSubject, initialTo, onClose, onSend, open }) => {
  const [fromAddress, setFromAddress] = React.useState(FROM_ALIASES[0]);
  const [to, setTo] = React.useState<string[]>(initialTo ? [initialTo] : []);
  const [cc, setCc] = React.useState<string[]>([]);
  const [bcc, setBcc] = React.useState<string[]>([]);
  const [showCcBcc, setShowCcBcc] = React.useState(false);
  const [subject, setSubject] = React.useState(initialSubject ?? '');
  const [body, setBody] = React.useState('');
  const [attachments, setAttachments] = React.useState<string[]>([]);
  const [confirmDiscardOpen, setConfirmDiscardOpen] = React.useState(false);

  // Reset the form whenever the dialog (re)opens with new initial values, without an Effect
  const resetKey = `${open ? '1' : '0'}:${initialTo ?? ''}:${initialSubject ?? ''}`;
  const [trackedResetKey, setTrackedResetKey] = React.useState(resetKey);
  if (resetKey !== trackedResetKey) {
    setTrackedResetKey(resetKey);
    setFromAddress(FROM_ALIASES[0]);
    setTo(initialTo ? [initialTo] : []);
    setCc([]);
    setBcc([]);
    setShowCcBcc(false);
    setSubject(initialSubject ?? '');
    setBody('');
    setAttachments([]);
  }

  const hasContent = to.length > 0 || cc.length > 0 || bcc.length > 0 || !!subject || !!body || attachments.length > 0;

  const handleFilesAdded = (files: File[]) => {
    setAttachments((prev) => [...prev, ...files.map((file) => file.name)]);
  };

  const removeAttachment = (name: string) => setAttachments((prev) => prev.filter((a) => a !== name));

  const handleSend = () => {
    if (to.length === 0) return;
    onSend({ to: [...to, ...cc, ...bcc], subject, body, attachments });
    onClose();
  };

  const requestClose = () => {
    if (hasContent) setConfirmDiscardOpen(true);
    else onClose();
  };

  useHotkeys('mod+enter', handleSend, { enabled: open && to.length > 0, ignoreWhenTyping: false });

  return (
    <>
      <Dialog customContent open={open} title='New message' type={DialogType.DEFAULT} width={480} onClose={requestClose}>
        <Form>
          <FromRow>
            <Typography color='secondary' size={TypographySize.SMALL}>
              From
            </Typography>
            <Select value={fromAddress} variant={FilledVariant.UNFILLED} onChange={setFromAddress}>
              {FROM_ALIASES.map((alias) => (
                <DropdownItem key={alias} label={alias} value={alias} />
              ))}
            </Select>
          </FromRow>
          <ChipInput items={to} placeholder='To' validate={(value) => value.includes('@')} onItemsChange={setTo} />
          {!showCcBcc && (
            <CcBccToggle>
              <Typography color='link' size={TypographySize.SMALL} onClick={() => setShowCcBcc(true)}>
                Cc, Bcc
              </Typography>
            </CcBccToggle>
          )}
          {showCcBcc && (
            <>
              <ChipInput items={cc} placeholder='Cc' validate={(value) => value.includes('@')} onItemsChange={setCc} />
              <ChipInput
                items={bcc}
                placeholder='Bcc'
                validate={(value) => value.includes('@')}
                onItemsChange={setBcc}
              />
            </>
          )}
          <InputField onChange={(e) => setSubject(e.target.value)} placeholder='Subject' value={subject} />
          <TextArea onChange={(e) => setBody(e.target.value)} placeholder='Write your message...' rows={8} value={body} />
          <FileImport variant='BOX' onFilesAdded={handleFilesAdded} />
          {attachments.length > 0 && (
            <AttachmentsRow>
              {attachments.map((name) => (
                <AttachmentChip key={name}>
                  <Typography size={TypographySize.SMALL}>{name}</Typography>
                  <IconButton
                    icon={Icon.Close}
                    size={Size.SMALL}
                    type={Type.SECONDARY}
                    onClick={() => removeAttachment(name)}
                  />
                </AttachmentChip>
              ))}
            </AttachmentsRow>
          )}
          <SendRow>
            {to.length === 0 && (
              <Typography color='secondary' size={TypographySize.SMALL}>
                Add at least one recipient
              </Typography>
            )}
            <Button disabled={to.length === 0} onClick={handleSend}>
              Send
            </Button>
          </SendRow>
        </Form>
      </Dialog>

      <ConfirmModal
        confirmName='Discard'
        description="This message hasn't been sent."
        destructive
        open={confirmDiscardOpen}
        title='Discard draft?'
        onClose={() => setConfirmDiscardOpen(false)}
        onConfirm={() => {
          setConfirmDiscardOpen(false);
          onClose();
        }}
      />
    </>
  );
};

export default ComposeDialog;
