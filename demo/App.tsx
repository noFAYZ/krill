import dayjs, { Dayjs } from 'dayjs';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import {
  AccentColor,
  ACCENT_COLOR_VALUES,
  Accordion,
  ActionBar,
  AnimatedArrowIcon,
  Avatar,
  Badge,
  Banner,
  Breadcrumbs,
  BrowserDesktopView,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Checkbox,
  CircleBadge,
  CodeBlock,
  ColorSelector,
  ConfirmModal,
  ContextMenu,
  CopyToClipboardButton,
  Chip,
  ChipInput,
  CircularProgress,
  CodeInput,
  CommandMenu,
  DateDisplay,
  DateField,
  DatePicker,
  DateRangePicker,
  Dialog,
  DialogType,
  Divider,
  DottedGrid,
  Drawer,
  Dropdown,
  DropdownItem,
  EmptyIllustration,
  EncryptionBadge,
  EncryptionBadgeType,
  EventDot,
  EventDotType,
  Facepile,
  FileImport,
  FilterSelect,
  HourPicker,
  Icon,
  IconButton,
  Icons,
  IconText,
  IconTextWithEndActions,
  Illustration,
  Illustrations,
  InputField,
  InputFieldEndAction,
  KeyCodeSequence,
  Layout,
  ListItem,
  MobileSearch,
  MobileSelect,
  MonoTag,
  NumberInput,
  Pagination,
  PasswordField,
  Popover,
  ProgressBar,
  QrCode,
  RadioButton,
  RichTextEditor,
  Select,
  SelectBox,
  SelectedItemToolbar,
  SelectField,
  Sidebar,
  Size,
  Skeleton,
  Slider,
  Steps,
  Stepper,
  Surface,
  Table,
  Tabs,
  ThemedBanner,
  ThemeMode,
  TimeField,
  TimeZonePicker,
  Toast,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TreeView,
  Type,
  Typography,
  TypographySize,
  TypographyWeight,
  VirtualizedList,
  themeNames,
  useHotkeys,
  useSwipe
} from '../src';

class Boundary extends React.Component<{ name: string; children: React.ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Typography color='destructive'>
          {this.props.name} failed to render: {this.state.error.message}
        </Typography>
      );
    }
    return this.props.children;
  }
}

const Section: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <section style={{ marginBottom: 32 }}>
    <Typography size={TypographySize.LARGE} weight={TypographyWeight.BOLD}>
      {name}
    </Typography>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 12 }}>
      <Boundary name={name}>{children}</Boundary>
    </div>
  </section>
);

const ButtonsDemo = () => (
  <>
    <Button onClick={() => {}}>Primary action</Button>
    <IconButton icon={Icon.Plus} onClick={() => {}} />
  </>
);

const CodeInputDemo = () => {
  const [value, setValue] = React.useState('');
  return <CodeInput codeLength={6} value={value} onChange={setValue} onSubmit={() => {}} />;
};

const CheckboxDemo = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox checked={checked} onClick={() => setChecked((c) => !c)} />;
};

const ChipInputDemo = () => {
  const [items, setItems] = React.useState(['design-system', 'react']);
  return (
    <div style={{ width: 280 }}>
      <ChipInput items={items} onItemsChange={setItems} placeholder='Add a tag...' />
    </div>
  );
};

const CommandMenuDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const allLabels = ['Inbox', 'Sent', 'Drafts', 'Archive', 'Trash'];
  const items = allLabels
    .filter((label) => label.toLowerCase().includes(query.toLowerCase()))
    .map((label) => ({
      key: label,
      title: label,
      leading: <Icons icon={Icon.Folder} />,
      onSelect: () => setOpen(false)
    }));
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command menu</Button>
      <CommandMenu items={items} onClose={() => setOpen(false)} onQueryChange={setQuery} open={open} query={query} />
    </>
  );
};

const DrawerDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer onClose={() => setOpen(false)} open={open} showCloseButton title='Filter emails'>
        <Typography color='secondary'>Drawer content goes here.</Typography>
      </Drawer>
    </>
  );
};

const ActionBarDemo = () => (
  <div
    style={{
      position: 'relative',
      height: 80,
      width: 320,
      border: '1px solid var(--border-secondary)',
      overflow: 'hidden',
      transform: 'translateZ(0)'
    }}
  >
    <ActionBar progress={60}>
      <IconButton icon={Icon.Archive} onClick={() => {}} />
      <IconButton icon={Icon.Trash} onClick={() => {}} />
      <IconButton icon={Icon.Reply} onClick={() => {}} />
    </ActionBar>
  </div>
);

type SenderRow = { id: string; name: string; count: number };

const TableDemo = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const rows: SenderRow[] = [
    { id: '1', name: 'newsletter@example.com', count: 128 },
    { id: '2', name: 'updates@example.com', count: 42 }
  ];
  return (
    <div style={{ width: 420 }}>
      <Table
        columns={[
          { key: 'name', label: 'Sender', render: (row) => <Typography>{row.name}</Typography>, width: '2' },
          { key: 'count', label: 'Messages', render: (row) => <Typography color='secondary'>{row.count}</Typography> }
        ]}
        getRowKey={(row) => row.id}
        onSelectedKeysChange={setSelectedKeys}
        rows={rows}
        selectable
        selectedKeys={selectedKeys}
      />
    </div>
  );
};

const HooksDemo = () => {
  const [archived, setArchived] = React.useState(false);
  const { ref, offset } = useSwipe({ completeThreshold: 80, onSwipeComplete: () => setArchived(true) });
  useHotkeys('mod+/', () => setArchived((a) => !a));

  return (
    <div style={{ width: 280 }}>
      <Typography color='secondary' size={TypographySize.SMALL}>
        Swipe the row (touch) or press Cmd/Ctrl+/ to toggle &quot;archived&quot;
      </Typography>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ transform: `translateX(${offset}px)`, marginTop: 8 }}>
        <ListItem leading={<Avatar label='SW' />} subtitle='Demo row' title={archived ? 'Archived!' : 'Swipe me'} />
      </div>
    </div>
  );
};

const DialogDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title='Demo dialog'
        description='Showcasing the Dialog component.'
        type={DialogType.DEFAULT}
      >
        <ButtonGroupItem label='Close' onClick={() => setOpen(false)} />
      </Dialog>
    </>
  );
};

const DropdownDemo = () => (
  <Dropdown setShowDropdown={() => {}}>
    <DropdownItem label='Option 1' />
    <DropdownItem label='Option 2' />
    <DropdownItem label='Option 3' />
  </Dropdown>
);

const InputFieldDemo = () => {
  const [value, setValue] = React.useState('');
  return (
    <InputField
      value={value}
      onClick={() => {}}
      placeholder='Type something'
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const SelectDemo = () => {
  const [value, setValue] = React.useState('a');
  return (
    <Select value={value} onChange={setValue} placeholder='Choose one'>
      <DropdownItem label='Option A' value='a' />
      <DropdownItem label='Option B' value='b' />
    </Select>
  );
};

const TabsDemo = () => {
  const [active, setActive] = React.useState(0);
  const tabs = ['First', 'Second', 'Third'].map((label, i) => ({
    label,
    active: active === i,
    onClick: () => setActive(i)
  }));
  return <Tabs tabs={tabs} />;
};

const ToggleDemo = () => {
  const [checked, setChecked] = React.useState(false);
  return <Toggle checked={checked} onChange={() => setChecked((c) => !c)} />;
};

const TooltipDemo = () => (
  <Tooltip>
    <TooltipContent>{'Tooltip content'}</TooltipContent>
    <TooltipTrigger>
      <Button onClick={() => {}}>Hover me</Button>
    </TooltipTrigger>
  </Tooltip>
);

const AnimatedArrowIconDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      type='button'
      onClick={() => setOpen((o) => !o)}
      style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
    >
      <AnimatedArrowIcon isOpen={open} />
    </button>
  );
};

const ColorSelectorDemo = () => {
  const [value, setValue] = React.useState<string>('orange');
  const colorToStyling = Object.fromEntries(
    Object.entries(ACCENT_COLOR_VALUES).map(([color, [primary]]) => [color, primary])
  ) as Record<AccentColor, string>;
  return <ColorSelector colorToStyling={colorToStyling} value={value} handleChange={(v) => setValue(v)} />;
};

const ConfirmModalDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button type={Type.DESTRUCTIVE} onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <ConfirmModal
        confirmName='Delete'
        description='This cannot be undone.'
        destructive
        open={open}
        title='Delete account?'
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

const DateFieldDemo = () => {
  const [date, setDate] = React.useState<Dayjs | undefined>(dayjs());
  return <DateField date={date} showIcon onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />;
};

const DatePickerDemo = () => {
  const [date, setDate] = React.useState<Dayjs | undefined>(dayjs());
  return <DatePicker selectedDate={date} onSelectDate={(d) => setDate(d ? dayjs(d as Date) : undefined)} />;
};

const DateRangePickerDemo = () => {
  const [range, setRange] = React.useState<{ start: Dayjs | null; end: Dayjs | null }>({
    start: dayjs(),
    end: null
  });
  return <DateRangePicker selectedRange={range} onSelectRange={setRange} />;
};

const FilterSelectDemo = () => {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const filterLabels = ['Unread', 'Starred', 'Has attachment'];
  return (
    <>
      <div ref={buttonRef}>
        <Button onClick={() => setOpen(true)}>Filter</Button>
      </div>
      <FilterSelect
        buttonRef={buttonRef}
        clearAllFilters={() => setActiveFilters([])}
        filterLabels={filterLabels}
        isFilterActive={(f) => activeFilters.includes(f)}
        numActiveFilters={activeFilters.length}
        open={open}
        onClose={() => setOpen(false)}
        onSelectFilter={(f) =>
          setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
        }
      />
    </>
  );
};

const MobileSearchDemo = () => {
  const [query, setQuery] = React.useState('');
  return (
    <div style={{ width: 280 }}>
      <MobileSearch setSearchQuery={setQuery} />
      <Typography color='secondary' size={TypographySize.SMALL}>
        Query: {query || '(empty)'}
      </Typography>
    </div>
  );
};

const MobileSelectDemo = () => {
  const [value, setValue] = React.useState('a');
  return (
    <div style={{ width: 200 }}>
      <MobileSelect placeholder='Choose one' value={value} onChange={setValue}>
        <DropdownItem label='Option A' value='a' />
        <DropdownItem label='Option B' value='b' />
      </MobileSelect>
    </div>
  );
};

const RadioDemo = () => {
  const [value, setValue] = React.useState('a');
  return (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <RadioButton checked={value === 'a'} label='Option A' onClick={() => setValue('a')} />
      <RadioButton
        checked={value === 'b'}
        description='With a description'
        label='Option B'
        onClick={() => setValue('b')}
      />
    </div>
  );
};

const SelectFieldDemo = () => {
  const [value, setValue] = React.useState('a');
  return (
    <div style={{ width: 200 }}>
      <SelectField placeholder='Choose one' value={value} onChange={setValue}>
        <DropdownItem label='Option A' value='a' />
        <DropdownItem label='Option B' value='b' />
      </SelectField>
    </div>
  );
};

const SidebarDemo = () => {
  const [active, setActive] = React.useState('inbox');
  const labelIcon = (key: string, icon: Icon) => (
    <Icons color={active === key ? 'primary' : 'secondary'} icon={icon} size={Size.SMALL} />
  );

  return (
    <div style={{ height: 360, width: 240, border: '1px solid var(--border-secondary)', overflow: 'hidden' }}>
      <Sidebar
        footer={
          <Typography color='secondary' size={TypographySize.SMALL}>
            v0.1.0
          </Typography>
        }
        sections={[
          {
            key: 'mail',
            label: 'Mail',
            items: [
              {
                key: 'inbox',
                label: 'Inbox',
                icon: labelIcon('inbox', Icon.Inbox),
                active: active === 'inbox',
                onClick: () => setActive('inbox')
              },
              {
                key: 'sent',
                label: 'Sent',
                icon: labelIcon('sent', Icon.Send),
                active: active === 'sent',
                onClick: () => setActive('sent')
              }
            ]
          },
          {
            key: 'starred',
            label: 'Starred',
            collapsible: true,
            defaultOpen: false,
            emptyLabel: 'No starred items',
            items: []
          }
        ]}
      >
        <Typography weight={TypographyWeight.BOLD}>Krill Mail</Typography>
      </Sidebar>
    </div>
  );
};

const TreeViewDemo = () => {
  const [selectedKey, setSelectedKey] = React.useState('inbox-work');
  return (
    <div style={{ width: 220 }}>
      <TreeView
        defaultExpandedKeys={['inbox']}
        nodes={[
          {
            key: 'inbox',
            label: 'Inbox',
            icon: Icon.Inbox,
            children: [
              { key: 'inbox-work', label: 'Work' },
              { key: 'inbox-personal', label: 'Personal' }
            ]
          },
          { key: 'sent', label: 'Sent', icon: Icon.Send }
        ]}
        selectedKey={selectedKey}
        onSelectNode={(node) => setSelectedKey(node.key)}
      />
    </div>
  );
};

const TimeFieldDemo = () => {
  const [time, setTime] = React.useState<Dayjs | undefined>(dayjs());
  return (
    <TimeField date={time} showIcon onSelectTime={(t) => setTime(typeof t === 'string' ? dayjs(t, 'h:mm A') : t)} />
  );
};

const TimeZonePickerDemo = () => {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [tz, setTz] = React.useState('America/Los_Angeles');
  return (
    <>
      <div ref={buttonRef}>
        <Button onClick={() => setOpen(true)}>{tz}</Button>
      </div>
      <TimeZonePicker buttonRef={buttonRef} isOpen={open} setIsOpen={setOpen} timeZone={tz} onSelectTimeZone={setTz} />
    </>
  );
};

const AccordionDemo = () => (
  <div style={{ width: 320 }}>
    <Accordion
      defaultOpenKeys={['shipping']}
      items={[
        { key: 'shipping', title: 'Shipping', content: 'Orders ship within 2 business days.' },
        { key: 'returns', title: 'Returns', content: 'Returns accepted within 30 days of delivery.' }
      ]}
    />
  </div>
);

const BreadcrumbsDemo = () => (
  <Breadcrumbs
    items={[
      { key: 'home', label: 'Home', onClick: () => {} },
      { key: 'mail', label: 'Mail', onClick: () => {} },
      { key: 'thread', label: 'Design review' }
    ]}
  />
);

const PaginationDemo = () => {
  const [page, setPage] = React.useState(4);
  return <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />;
};

const PasswordFieldDemo = () => {
  const [value, setValue] = React.useState('');
  return (
    <div style={{ width: 280 }}>
      <PasswordField showStrength value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

const BadgeDemo = () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <Badge count={3}>
      <IconButton icon={Icon.Bell} onClick={() => {}} />
    </Badge>
    <Badge count={128}>
      <IconButton icon={Icon.Envelope} onClick={() => {}} />
    </Badge>
    <Badge dot>
      <Avatar label='FA' />
    </Badge>
  </div>
);

const CodeBlockDemo = () => (
  <div style={{ width: 360 }}>
    <CodeBlock code={`const greeting: string = 'Hello, krill!';\nconsole.log(greeting);`} language='tsx' />
  </div>
);

const ContextMenuDemo = () => (
  <ContextMenu
    trigger={
      <div
        style={{
          border: '1px dashed var(--border-secondary)',
          borderRadius: 8,
          padding: '24px 32px',
          width: 'fit-content'
        }}
      >
        <Typography color='secondary'>Right-click me</Typography>
      </div>
    }
  >
    <DropdownItem icon={Icon.Reply} label='Reply' onClick={() => {}} />
    <DropdownItem icon={Icon.Archive} label='Archive' onClick={() => {}} />
    <DropdownItem icon={Icon.Trash} label='Delete' onClick={() => {}} />
  </ContextMenu>
);

const NumberInputDemo = () => {
  const [value, setValue] = React.useState(1);
  return <NumberInput max={10} min={0} value={value} onChange={setValue} />;
};

const PopoverDemo = () => {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div ref={buttonRef}>
        <Button onClick={() => setOpen(true)}>Open popover</Button>
      </div>
      <Popover buttonRef={buttonRef} open={open} width={240} onClose={() => setOpen(false)}>
        <div style={{ padding: 12 }}>
          <Typography color='secondary'>Any rich content can go here, not just a list of items.</Typography>
        </div>
      </Popover>
    </>
  );
};

const SliderDemo = () => {
  const [value, setValue] = React.useState(40);
  return (
    <div style={{ width: 240 }}>
      <Slider value={value} onChange={setValue} />
    </div>
  );
};

const StepsDemo = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  return (
    <div style={{ width: 360 }}>
      <Steps
        currentStep={currentStep}
        steps={[
          { key: 'account', label: 'Account' },
          { key: 'profile', label: 'Profile' },
          { key: 'confirm', label: 'Confirm' }
        ]}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Button type={Type.SECONDARY} onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}>
          Back
        </Button>
        <Button onClick={() => setCurrentStep((s) => Math.min(2, s + 1))}>Next</Button>
      </div>
    </div>
  );
};

const RichTextEditorDemo = () => {
  const [value, setValue] = React.useState('<p>Hey team, quick update on the launch timeline...</p>');
  return (
    <div style={{ width: 480 }}>
      <RichTextEditor value={value} onChange={setValue} />
    </div>
  );
};

type FakeEmailRow = { id: string; sender: string; subject: string; time: string };

const FAKE_INBOX: FakeEmailRow[] = Array.from({ length: 5000 }, (_, i) => ({
  id: `email-${i}`,
  sender: `sender${i}@example.com`,
  subject: `Subject line for email #${i}`,
  time: `${(i % 12) + 1}:00 PM`
}));

const VirtualizedListDemo = () => (
  <div style={{ width: 420, border: '1px solid var(--border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
    <VirtualizedList
      height={320}
      itemHeight={56}
      items={FAKE_INBOX}
      getItemKey={(row) => row.id}
      renderItem={(row) => (
        <ListItem
          leading={<Avatar label={row.sender} />}
          subtitle={row.sender}
          title={row.subject}
          trailing={
            <Typography color='secondary' size={TypographySize.SMALL}>
              {row.time}
            </Typography>
          }
        />
      )}
    />
  </div>
);

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
          Krill component showcase
        </Typography>
        <ThemeSwitcher mode={mode} onChange={setMode} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <Typography color='secondary'>
          See <a href='/blocks/'>block demos</a> for composed patterns, or the <a href='/email/'>email demo</a> for a
          full app built from krill.
        </Typography>
      </div>

      <Section name='ActionBar'>
        <ActionBarDemo />
      </Section>

      <Section name='Avatar'>
        <Avatar label='FA' />
        <Avatar icon={Icon.User} showBadge active />
      </Section>

      <Section name='Banner'>
        <Banner label='This is a banner' icon={Icon.Info} ctas={[{ label: 'Action', onClick: () => {} }]} />
      </Section>

      <Section name='Button / IconButton'>
        <ButtonsDemo />
      </Section>

      <Section name='ButtonGroup'>
        <ButtonGroup layout={Layout.INLINE}>
          <ButtonGroupItem label='Cancel' onClick={() => {}} />
          <ButtonGroupItem label='Confirm' onClick={() => {}} />
        </ButtonGroup>
      </Section>

      <Section name='Checkbox'>
        <CheckboxDemo />
      </Section>

      <Section name='Chip'>
        <Chip label='Chip' color='blue' icon={Icon.Tag} />
      </Section>

      <Section name='ChipInput'>
        <ChipInputDemo />
      </Section>

      <Section name='CircularProgress'>
        <CircularProgress progress={40} />
        <CircularProgress spinner />
      </Section>

      <Section name='CodeInput'>
        <CodeInputDemo />
      </Section>

      <Section name='CommandMenu'>
        <CommandMenuDemo />
      </Section>

      <Section name='Dialog'>
        <DialogDemo />
      </Section>

      <Section name='Divider'>
        <div style={{ width: 200 }}>
          <Divider />
        </div>
      </Section>

      <Section name='Drawer'>
        <DrawerDemo />
      </Section>

      <Section name='Dropdown / DropdownItem'>
        <DropdownDemo />
      </Section>

      <Section name='Facepile'>
        <Facepile>
          <Avatar label='AA' />
          <Avatar label='BB' />
          <Avatar label='CC' />
        </Facepile>
      </Section>

      <Section name='Icons'>
        <Icons icon={Icon.Star} />
        <Icons icon={Icon.Heart} color='destructive' />
      </Section>

      <Section name='IconText'>
        <IconText label='Icon text' startIcon={Icon.Tag} />
      </Section>

      <Section name='InputField'>
        <InputFieldDemo />
      </Section>

      <Section name='ListItem'>
        <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ListItem
            leading={<Avatar label='JS' />}
            subtitle="Let's catch up tomorrow"
            title='Jane Smith'
            trailing={
              <Typography color='secondary' size={TypographySize.SMALL}>
                2:45 PM
              </Typography>
            }
            unread
          />
          <ListItem
            actions={<IconButton icon={Icon.Archive} onClick={() => {}} />}
            active
            leading={<Avatar label='AB' />}
            subtitle='Sounds good, see you then'
            title='Alex Brown'
          />
        </div>
      </Section>

      <Section name='MonoTag'>
        <MonoTag label='v0.1.0' color='green' />
      </Section>

      <Section name='ProgressBar'>
        <div style={{ width: 200 }}>
          <ProgressBar progress={60} />
        </div>
      </Section>

      <Section name='Select'>
        <SelectDemo />
      </Section>

      <Section name='Skeleton'>
        <Skeleton width={120} height={16} />
      </Section>

      <Section name='Surface'>
        <Surface level='l1' size='full-width'>
          <Typography>Surface content</Typography>
        </Surface>
      </Section>

      <Section name='Table'>
        <TableDemo />
      </Section>

      <Section name='Tabs'>
        <TabsDemo />
      </Section>

      <Section name='Toast'>
        <Toast
          {...({
            toastKey: 'demo-toast',
            closeToast: () => {},
            persist: true,
            title: 'Toast title',
            body: 'Toast body text'
          } as React.ComponentProps<typeof Toast>)}
        />
      </Section>

      <Section name='Toggle'>
        <ToggleDemo />
      </Section>

      <Section name='Tooltip'>
        <TooltipDemo />
      </Section>

      <Section name='Typography'>
        <Typography weight={TypographyWeight.BOLD}>Bold typography</Typography>
        <Typography color='secondary'>Secondary typography</Typography>
      </Section>

      <Section name='Hooks (useSwipe / useHotkeys)'>
        <HooksDemo />
      </Section>

      <Section name='Accordion'>
        <AccordionDemo />
      </Section>

      <Section name='AnimatedArrowIcon'>
        <AnimatedArrowIconDemo />
      </Section>

      <Section name='Badge'>
        <BadgeDemo />
      </Section>

      <Section name='Breadcrumbs'>
        <BreadcrumbsDemo />
      </Section>

      <Section name='BrowserDesktopView'>
        <BrowserDesktopView>
          <Typography color='secondary'>Visible on desktop browsers only</Typography>
        </BrowserDesktopView>
      </Section>

      <Section name='CircleBadge'>
        <CircleBadge icon={Icon.Star} />
      </Section>

      <Section name='CodeBlock'>
        <CodeBlockDemo />
      </Section>

      <Section name='ColorSelector'>
        <ColorSelectorDemo />
      </Section>

      <Section name='ConfirmModal'>
        <ConfirmModalDemo />
      </Section>

      <Section name='ContextMenu'>
        <ContextMenuDemo />
      </Section>

      <Section name='CopyToClipboardButton'>
        <CopyToClipboardButton onClick={() => navigator.clipboard?.writeText('Copied!')} />
      </Section>

      <Section name='DateDisplay'>
        <DateDisplay type='relative' value={new Date()} />
        <DateDisplay type='absolute' value={new Date()} />
      </Section>

      <Section name='DateField'>
        <DateFieldDemo />
      </Section>

      <Section name='DatePicker'>
        <DatePickerDemo />
      </Section>

      <Section name='DateRangePicker'>
        <DateRangePickerDemo />
      </Section>

      <Section name='DottedGrid'>
        <div style={{ position: 'relative', width: 240, height: 120, transform: 'translateZ(0)' }}>
          <DottedGrid forceTheme={mode} />
        </div>
      </Section>

      <Section name='EmptyIllustration'>
        <div style={{ width: 320, height: 200 }}>
          <EmptyIllustration
            action={{ label: 'Compose', onClick: () => {} }}
            subtitle='Your inbox is empty'
            title='No messages'
          />
        </div>
      </Section>

      <Section name='EncryptionBadge'>
        <EncryptionBadge tooltipSubtext='Only you and the recipient can read this' type={EncryptionBadgeType.E2EE} />
      </Section>

      <Section name='EventDot'>
        <EventDot color='var(--accent-orange-primary)' />
        <EventDot color='var(--accent-blue-primary)' type={EventDotType.EMPTY} />
      </Section>

      <Section name='FileImport'>
        <div style={{ width: 320 }}>
          <FileImport variant='BOX' onFilesAdded={() => {}} />
        </div>
      </Section>

      <Section name='FilterSelect'>
        <FilterSelectDemo />
      </Section>

      <Section name='HourPicker'>
        <HourPicker itemHeight={40} timeFormat='h:mm A' onChange={() => {}} />
      </Section>

      <Section name='IconTextWithEndActions'>
        <div style={{ width: 280 }}>
          <IconTextWithEndActions
            endActions={[
              { icon: Icon.Edit, onClick: () => {} },
              { icon: Icon.Trash, onClick: () => {} }
            ]}
            label='Project Alpha'
            startIcon={Icon.Folder}
          />
        </div>
      </Section>

      <Section name='Illustration'>
        <Illustration illustration={Illustrations.NoResultsFound} />
        <Illustration illustration={Illustrations.EnableNotifications} />
      </Section>

      <Section name='InputFieldEndAction'>
        <InputFieldEndAction icon={Icon.Close} tooltip='Clear' onClick={() => {}} />
      </Section>

      <Section name='KeyCodeSequence'>
        <KeyCodeSequence shortcut='cmd+k' />
        <KeyCodeSequence shortcut='g i' />
      </Section>

      <Section name='MobileSearch'>
        <MobileSearchDemo />
      </Section>

      <Section name='MobileSelect'>
        <MobileSelectDemo />
      </Section>

      <Section name='NumberInput'>
        <NumberInputDemo />
      </Section>

      <Section name='Pagination'>
        <PaginationDemo />
      </Section>

      <Section name='PasswordField'>
        <PasswordFieldDemo />
      </Section>

      <Section name='Popover'>
        <PopoverDemo />
      </Section>

      <Section name='QrCode'>
        <div style={{ width: 120, overflow: 'hidden' }}>
          <QrCode forceTheme={mode} link='https://example.com' />
        </div>
      </Section>

      <Section name='RadioButton / RadioCheckbox'>
        <RadioDemo />
      </Section>

      <Section name='RichTextEditor'>
        <RichTextEditorDemo />
      </Section>

      <Section name='SelectBox'>
        <div style={{ width: 200 }}>
          <SelectBox
            checked
            illustration={<Illustration illustration={Illustrations.LightMode} />}
            label='Light'
            onClick={() => {}}
          />
        </div>
      </Section>

      <Section name='SelectedItemToolbar'>
        <div
          style={{
            position: 'relative',
            height: 60,
            width: 320,
            border: '1px solid var(--border-secondary)',
            overflow: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          <SelectedItemToolbar
            actions={[
              { key: 'archive', icon: Icon.Archive, onClick: () => {} },
              { key: 'trash', icon: Icon.Trash, onClick: () => {} }
            ]}
            topText='3 selected'
          />
        </div>
      </Section>

      <Section name='SelectField'>
        <SelectFieldDemo />
      </Section>

      <Section name='Sidebar'>
        <SidebarDemo />
      </Section>

      <Section name='TreeView'>
        <TreeViewDemo />
      </Section>

      <Section name='Slider'>
        <SliderDemo />
      </Section>

      <Section name='Steps'>
        <StepsDemo />
      </Section>

      <Section name='Stepper'>
        <div style={{ width: 280, height: 120 }}>
          <Stepper
            items={[
              { bold: 'Step 1', text: ' – Create account' },
              { bold: 'Step 2', text: ' – Verify email' }
            ]}
          />
        </div>
      </Section>

      <Section name='ThemedBanner'>
        <ThemedBanner currentTheme={mode} icon={Icon.Info} label='Always shown in the opposite theme' />
      </Section>

      <Section name='TimeField'>
        <TimeFieldDemo />
      </Section>

      <Section name='TimeZonePicker'>
        <TimeZonePickerDemo />
      </Section>

      <Section name='VirtualizedList'>
        <VirtualizedListDemo />
      </Section>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
);
