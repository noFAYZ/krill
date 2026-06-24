import dayjs, { Dayjs } from 'dayjs';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import {
  AccentColor,
  accentColorToPrimaryColor,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  ColorSelector,
  CopyToClipboardButton,
  DateField,
  Dialog,
  DialogType,
  EncryptionBadge,
  EncryptionBadgeType,
  EventDot,
  FileImport,
  Icon,
  IconButton,
  Illustration,
  Illustrations,
  InputField,
  ProgressBar,
  QrCodeModal,
  RadioButton,
  SelectedItemToolbar,
  Size,
  Stepper,
  Table,
  ThemedBanner,
  ThemeMode,
  TimeField,
  Type,
  Typography,
  TypographySize,
  TypographyWeight,
  themeNames
} from '../../src';

const Block: React.FC<{ name: string; description: string; children: React.ReactNode }> = ({
  name,
  description,
  children
}) => (
  <section style={{ marginBottom: 40, maxWidth: 480 }}>
    <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
      {name}
    </Typography>
    <Typography color='secondary' size={TypographySize.SMALL}>
      {description}
    </Typography>
    <div style={{ marginTop: 16 }}>{children}</div>
  </section>
);

// Composes DateField + TimeField + ColorSelector + EventDot into a calendar event editor
const EventEditorBlock = () => {
  const [date, setDate] = React.useState<Dayjs | undefined>(dayjs());
  const [time, setTime] = React.useState<Dayjs | undefined>(dayjs());
  const [color, setColor] = React.useState<string>('orange');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <DateField date={date} showIcon onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />
        <TimeField date={time} onSelectTime={(t) => setTime(typeof t === 'string' ? dayjs(t, 'h:mm A') : t)} />
      </div>
      <ColorSelector colorToStyling={accentColorToPrimaryColor} value={color} handleChange={(v) => setColor(v)} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <EventDot color={accentColorToPrimaryColor[color as AccentColor]} />
        <Typography color='secondary' size={TypographySize.SMALL}>
          {date?.format('MMM D')} at {time?.format('h:mm A') ?? '—'}
        </Typography>
      </div>
    </div>
  );
};

type SenderRow = { id: string; name: string; count: number };

// Composes Table's row selection with SelectedItemToolbar's floating bulk-action bar
const BulkActionsBlock = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const rows: SenderRow[] = [
    { id: '1', name: 'newsletter@example.com', count: 128 },
    { id: '2', name: 'updates@example.com', count: 42 },
    { id: '3', name: 'receipts@example.com', count: 9 }
  ];

  return (
    <div style={{ position: 'relative', transform: 'translateZ(0)' }}>
      <Table
        columns={[
          { key: 'name', label: 'Sender', render: (row) => <Typography>{row.name}</Typography>, width: '2' },
          { key: 'count', label: 'Messages', render: (row) => <Typography color='secondary'>{row.count}</Typography> }
        ]}
        getRowKey={(row) => row.id}
        rows={rows}
        selectable
        selectedKeys={selectedKeys}
        onSelectedKeysChange={setSelectedKeys}
      />
      {selectedKeys.length > 0 && (
        <SelectedItemToolbar
          actions={[
            { key: 'archive', icon: Icon.Archive, onClick: () => setSelectedKeys([]) },
            { key: 'trash', icon: Icon.Trash, onClick: () => setSelectedKeys([]) }
          ]}
          topText={`${selectedKeys.length} selected`}
        />
      )}
    </div>
  );
};

// Composes FileImport + Dialog + ProgressBar into an attachment upload flow
const FileUploadBlock = () => {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const simulateUpload = (files: File[]) => {
    setFileName(files[0]?.name ?? 'file');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 200);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Upload attachment</Button>
      <Dialog open={open} title='Upload a file' type={DialogType.DEFAULT} onClose={() => setOpen(false)}>
        <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FileImport variant='BOX' onFilesAdded={simulateUpload} />
          {fileName && (
            <>
              <Typography color='secondary' size={TypographySize.SMALL}>
                {fileName}
              </Typography>
              <ProgressBar progress={progress} />
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

// Composes EncryptionBadge + CopyToClipboardButton + QrCodeModal into a share panel
const ShareBlock = () => {
  const [qrOpen, setQrOpen] = React.useState(false);
  const link = 'https://example.com/share/abc123';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <EncryptionBadge tooltipSubtext='End-to-end encrypted link' type={EncryptionBadgeType.E2EE} />
      <Typography color='secondary' size={TypographySize.SMALL}>
        {link}
      </Typography>
      <CopyToClipboardButton onClick={() => navigator.clipboard?.writeText(link)} />
      <Button type={Type.SECONDARY} onClick={() => setQrOpen(true)}>
        Show QR
      </Button>
      <QrCodeModal
        description='Open this link on your phone'
        link={link}
        open={qrOpen}
        title='Scan to open'
        onClose={() => setQrOpen(false)}
      />
    </div>
  );
};

// Composes Illustration + Stepper into an onboarding carousel
const OnboardingBlock = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
    <Illustration illustration={Illustrations.CustomizeProfile} />
    <div style={{ width: '100%', height: 100 }}>
      <Stepper
        items={[
          { bold: 'Welcome', text: ' – set up your profile' },
          { bold: 'Stay notified', text: ' – enable notifications' },
          { bold: 'All set', text: ' – start exploring' }
        ]}
      />
    </div>
  </div>
);

// Composes ThemedBanner + RadioButton + ColorSelector into an appearance settings panel
const SettingsPanelBlock: React.FC<{ mode: ThemeMode }> = ({ mode }) => {
  const [density, setDensity] = React.useState('comfortable');
  const [accent, setAccent] = React.useState('orange');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ThemedBanner currentTheme={mode} icon={Icon.Info} label='Appearance settings save automatically' />
      <RadioButton checked={density === 'comfortable'} label='Comfortable' onClick={() => setDensity('comfortable')} />
      <RadioButton checked={density === 'compact'} label='Compact' onClick={() => setDensity('compact')} />
      <ColorSelector colorToStyling={accentColorToPrimaryColor} value={accent} handleChange={setAccent} />
    </div>
  );
};

// Composes InputField + ColorSelector + Dialog(type=INPUT) into a "create label" flow
const CreateLabelBlock = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('orange');
  const [labels, setLabels] = React.useState<{ name: string; color: string }[]>([]);

  const submit = () => {
    if (!name.trim()) return;
    setLabels((prev) => [...prev, { name: name.trim(), color }]);
    setName('');
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <Button onClick={() => setOpen(true)}>New label</Button>
      </div>
      {labels.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {labels.map((label) => (
            <div key={label.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EventDot color={accentColorToPrimaryColor[label.color as AccentColor]} />
              <Typography>{label.name}</Typography>
            </div>
          ))}
        </div>
      )}
      <Dialog customContent open={open} title='Create label' type={DialogType.INPUT} onClose={() => setOpen(false)}>
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
          <ButtonGroupItem disabled={!name.trim()} label='Create' onClick={submit} />
          <ButtonGroupItem label='Cancel' onClick={() => setOpen(false)} />
        </ButtonGroup>
      </Dialog>
    </div>
  );
};

const ThemeSwitcher: React.FC<{ mode: ThemeMode; onChange: (mode: ThemeMode) => void }> = ({ mode, onChange }) => (
  <IconButton
    icon={mode === ThemeMode.DARK ? Icon.Sun : Icon.Moon}
    tooltip={mode === ThemeMode.DARK ? 'Switch to light theme' : 'Switch to dark theme'}
    onClick={() => onChange(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
  />
);

const App = () => {
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.DARK);

  React.useEffect(() => {
    const vars = themeNames[mode];
    Object.entries(vars).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
    document.body.style.background = 'var(--bg-l0-solid)';
    document.body.style.color = 'var(--text-primary)';
    document.body.style.fontFamily = 'sans-serif';
    document.body.style.padding = '32px';
  }, [mode]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Typography size={TypographySize.H1} weight={TypographyWeight.BOLD}>
          Krill block demos
        </Typography>
        <ThemeSwitcher mode={mode} onChange={setMode} />
      </div>
      <Typography color='secondary'>
        Composed UI patterns built from multiple krill primitives. See <a href='/'>component showcase</a> for individual
        components, or the <a href='/email/'>email demo</a> for a full app built from krill.
      </Typography>

      <div style={{ marginTop: 32 }}>
        <Block description='DateField + TimeField + ColorSelector + EventDot' name='Event editor'>
          <EventEditorBlock />
        </Block>

        <Block description='Table row selection + SelectedItemToolbar' name='Bulk actions'>
          <BulkActionsBlock />
        </Block>

        <Block description='FileImport + Dialog + ProgressBar' name='File upload'>
          <FileUploadBlock />
        </Block>

        <Block description='EncryptionBadge + CopyToClipboardButton + QrCodeModal' name='Share & security'>
          <ShareBlock />
        </Block>

        <Block description='Illustration + Stepper' name='Onboarding carousel'>
          <OnboardingBlock />
        </Block>

        <Block description='ThemedBanner + RadioButton + ColorSelector' name='Appearance settings'>
          <SettingsPanelBlock mode={mode} />
        </Block>

        <Block description='InputField + ColorSelector + Dialog' name='Create label'>
          <CreateLabelBlock />
        </Block>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
);
