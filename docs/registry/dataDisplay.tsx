import * as React from 'react';

import {
  AnimatedArrowIcon,
  Avatar,
  Badge,
  Chip,
  CircleBadge,
  CodeBlock,
  CopyToClipboardButton,
  EncryptionBadge,
  EncryptionBadgeType,
  EventDot,
  EventDotType,
  Facepile,
  Icon,
  IconText,
  IconTextWithEndActions,
  Icons,
  IconButton,
  KeyCodeSequence,
  ListItem,
  MonoTag,
  Stepper,
  Table,
  Typography,
  TypographySize,
  TypographyWeight,
  VirtualizedList
} from '../../src';
import { ComponentDoc } from '../types';

const AvatarDoc: ComponentDoc = {
  slug: 'avatar',
  title: 'Avatar',
  category: 'Data display',
  description: 'A circular user avatar, showing initials or an icon, with an optional status badge.',
  importStatement: "import { Avatar } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Avatar label="FA" />
<Avatar icon={Icon.User} showBadge active />`,
      Component: () => (
        <>
          <Avatar label='FA' />
          <Avatar active icon={Icon.User} showBadge />
        </>
      )
    }
  ],
  props: [
    { name: 'label', type: 'string', description: 'Initials shown when no icon is given.' },
    { name: 'icon', type: 'Icon', description: 'Icon shown instead of initials.' },
    { name: 'showBadge', type: 'boolean', description: 'Shows a small status badge.' },
    { name: 'active', type: 'boolean', description: 'Colors the badge as active/online.' },
    { name: 'size', type: 'Size', description: 'Avatar size.', default: 'Size.MEDIUM' }
  ]
};

const ChipDoc: ComponentDoc = {
  slug: 'chip',
  title: 'Chip',
  category: 'Data display',
  description: 'A small, colored label tag.',
  importStatement: "import { Chip } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Chip label="Chip" color="blue" icon={Icon.Tag} />`,
      Component: () => <Chip color='blue' icon={Icon.Tag} label='Chip' />
    }
  ],
  props: [
    { name: 'label', type: 'string', description: 'Chip text.', required: true },
    { name: 'color', type: 'AccentColor', description: 'Accent color.' },
    { name: 'icon', type: 'Icon', description: 'Leading icon.' },
    { name: 'size', type: 'ChipSize', description: 'Chip size.' }
  ]
};

const ListItemDoc: ComponentDoc = {
  slug: 'list-item',
  title: 'ListItem',
  category: 'Data display',
  description: 'A row with a leading visual, title, optional subtitle/trailing content, and hover-revealed actions.',
  importStatement: "import { ListItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<ListItem
  leading={<Avatar label="JS" />}
  title="Jane Smith"
  subtitle="Let's catch up tomorrow"
  trailing={<Typography color="secondary" size={TypographySize.SMALL}>2:45 PM</Typography>}
  unread
/>`,
      Component: () => (
        <div style={{ width: 320 }}>
          <ListItem
            leading={<Typography>JS</Typography>}
            subtitle="Let's catch up tomorrow"
            title='Jane Smith'
            trailing={
              <Typography color='secondary' size={TypographySize.SMALL}>
                2:45 PM
              </Typography>
            }
            unread
          />
        </div>
      )
    }
  ],
  props: [
    { name: 'title', type: 'string | React.ReactNode', description: 'Primary text.', required: true },
    { name: 'active', type: 'boolean', description: "Controls the row's selected/highlighted state." },
    { name: 'leading', type: 'React.ReactNode', description: 'Leading visual, e.g. an Avatar.' },
    { name: 'subtitle', type: 'string | React.ReactNode', description: 'Secondary text below the title.' },
    { name: 'trailing', type: 'React.ReactNode', description: 'Trailing content, e.g. a timestamp.' },
    { name: 'actions', type: 'React.ReactNode', description: 'Hover-revealed trailing actions.' },
    { name: 'unread', type: 'boolean', description: 'Shows the unread dot and bolds the title.' },
    { name: 'disabled', type: 'boolean', description: 'Disables hover/click interactions.' }
  ]
};

type SenderRow = { id: string; name: string; count: number };

const TableDoc: ComponentDoc = {
  slug: 'table',
  title: 'Table',
  category: 'Data display',
  description: 'A data table with custom column renderers and optional row selection.',
  importStatement: "import { Table } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Table
  columns={[
    { key: 'name', label: 'Sender', render: (row) => <Typography>{row.name}</Typography> },
    { key: 'count', label: 'Messages', render: (row) => <Typography color="secondary">{row.count}</Typography> }
  ]}
  rows={rows}
  getRowKey={(row) => row.id}
/>`,
      Component: () => {
        const rows: SenderRow[] = [
          { id: '1', name: 'newsletter@example.com', count: 128 },
          { id: '2', name: 'updates@example.com', count: 42 }
        ];
        return (
          <div style={{ width: 360 }}>
            <Table
              columns={[
                { key: 'name', label: 'Sender', render: (row) => <Typography>{row.name}</Typography>, width: '2' },
                {
                  key: 'count',
                  label: 'Messages',
                  render: (row) => <Typography color='secondary'>{row.count}</Typography>
                }
              ]}
              getRowKey={(row) => row.id}
              rows={rows}
            />
          </div>
        );
      }
    }
  ],
  props: [
    {
      name: 'columns',
      type: 'TableColumn<T>[]',
      description: 'Column definitions with custom cell renderers.',
      required: true
    },
    { name: 'rows', type: 'T[]', description: 'Row data.', required: true },
    { name: 'getRowKey', type: '(row: T) => string', description: 'Returns a unique key per row.', required: true },
    { name: 'selectable', type: 'boolean', description: 'Enables row selection checkboxes.' },
    { name: 'selectedKeys', type: 'string[]', description: 'Controlled selected row keys.' },
    { name: 'onSelectedKeysChange', type: '(keys: string[]) => void', description: 'Called when selection changes.' }
  ]
};

const MonoTagDoc: ComponentDoc = {
  slug: 'mono-tag',
  title: 'MonoTag',
  category: 'Data display',
  description: 'A small monospace tag, e.g. for version numbers or status labels.',
  importStatement: "import { MonoTag } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<MonoTag label="v0.1.0" color="green" />`,
      Component: () => <MonoTag color='green' label='v0.1.0' />
    }
  ],
  props: [
    { name: 'label', type: 'string', description: 'Tag text.', required: true },
    { name: 'color', type: 'Color', description: 'Single-tone color for text and background.' },
    { name: 'icon', type: 'Icon', description: 'Leading icon.' }
  ]
};

const FacepileDoc: ComponentDoc = {
  slug: 'facepile',
  title: 'Facepile',
  category: 'Data display',
  description: 'Renders a collection of Avatars, inline or stacked, collapsing overflow into a "+N" label.',
  importStatement: "import { Facepile, Avatar } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Facepile>
  <Avatar label="AA" />
  <Avatar label="BB" />
  <Avatar label="CC" />
</Facepile>`,
      Component: () => (
        <Facepile>
          <Avatar label='AA' />
          <Avatar label='BB' />
          <Avatar label='CC' />
        </Facepile>
      )
    }
  ],
  props: [
    { name: 'children', type: 'AvatarComponent[]', description: 'Avatar elements.', required: true },
    { name: 'layout', type: 'Layout', description: 'Inline (overlapping row) or stacked.', default: 'Layout.INLINE' },
    { name: 'maxDisplayed', type: 'number', description: 'Max visible Avatars in an inline layout.', default: '4' },
    { name: 'size', type: 'FacepileSize', description: 'Avatar size.', default: 'Size.LARGE' },
    { name: 'background', type: 'string', description: 'Override background color behind each Avatar.' },
    { name: 'onMoreClick', type: '() => void', description: 'Called when the "+N" overflow label is clicked.' }
  ]
};

const IconsDoc: ComponentDoc = {
  slug: 'icons',
  title: 'Icons',
  category: 'Data display',
  description: "Renders one of the library's bundled SVG icons (the `Icon` enum) inline.",
  importStatement: "import { Icons, Icon } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Icons icon={Icon.Star} />
<Icons icon={Icon.Heart} color="destructive" />`,
      Component: () => (
        <>
          <Icons icon={Icon.Star} />
          <Icons color='destructive' icon={Icon.Heart} />
        </>
      )
    }
  ],
  props: [
    { name: 'icon', type: 'Icon', description: 'Which icon to render.', required: true },
    { name: 'color', type: "Color | 'source'", description: 'Icon color.', default: "'primary'" },
    { name: 'size', type: 'Size | number', description: 'Icon size.', default: 'Size.MEDIUM' },
    { name: 'tooltip', type: 'string', description: 'Tooltip label shown on hover.' },
    { name: 'onClick', type: '(e: React.MouseEvent) => void | Promise<void>', description: 'Click handler.' },
    { name: 'rotate', type: 'number', description: 'Rotation, in degrees.' }
  ]
};

const IconTextDoc: ComponentDoc = {
  slug: 'icon-text',
  title: 'IconText',
  category: 'Data display',
  description: 'A label with an optional leading and/or trailing icon, sharing hover/disabled states.',
  importStatement: "import { IconText, Icon } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<IconText label="Icon text" startIcon={Icon.Tag} />`,
      Component: () => <IconText label='Icon text' startIcon={Icon.Tag} />
    }
  ],
  props: [
    { name: 'label', type: 'string | React.ReactNode', description: 'Text content.' },
    { name: 'startIcon', type: 'Icon | IconComponent', description: 'Icon before the text.' },
    { name: 'endIcon', type: 'Icon | IconComponent', description: 'Icon after the text.' },
    { name: 'color', type: "Color | 'source'", description: 'Content color.' },
    { name: 'size', type: 'IconTextSize', description: 'Overall size.', default: 'Size.MEDIUM' },
    { name: 'disabled', type: 'boolean', description: 'Disabled state.' },
    { name: 'onClick', type: '(e?: React.MouseEvent) => Promise<void> | void', description: 'Click handler.' }
  ]
};

const CircleBadgeDoc: ComponentDoc = {
  slug: 'circle-badge',
  title: 'CircleBadge',
  category: 'Data display',
  description: 'An icon in a small rounded badge container with a subtle shadow.',
  importStatement: "import { CircleBadge, Icon } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<CircleBadge icon={Icon.Star} />`,
      Component: () => <CircleBadge icon={Icon.Star} />
    }
  ],
  props: [
    { name: 'icon', type: 'Icon', description: 'Icon to render.', required: true },
    { name: 'color', type: "Color | 'source'", description: 'Icon color.' },
    { name: 'size', type: 'Size', description: 'Badge size.' },
    {
      name: 'hideContainer',
      type: 'boolean',
      description: 'Renders just the icon, without the badge background/shadow.'
    },
    { name: 'onClick', type: '() => void', description: 'Click handler.' }
  ]
};

const KeyCodeSequenceDoc: ComponentDoc = {
  slug: 'key-code-sequence',
  title: 'KeyCodeSequence',
  category: 'Data display',
  description: 'Renders a keyboard shortcut as styled key caps, e.g. for shortcut hints in menus.',
  importStatement: "import { KeyCodeSequence } from 'krill';",
  examples: [
    {
      title: 'Simultaneous and sequential shortcuts',
      code: `<KeyCodeSequence shortcut="cmd+k" />
<KeyCodeSequence shortcut="g i" />`,
      Component: () => (
        <>
          <KeyCodeSequence shortcut='cmd+k' />
          <KeyCodeSequence shortcut='g i' />
        </>
      )
    }
  ],
  props: [
    {
      name: 'shortcut',
      type: 'string',
      description:
        "Keys joined by '+' render together (pressed at once); joined by ' ' render with \"THEN\" (pressed in sequence).",
      required: true
    },
    { name: 'size', type: 'KeyCodeSequenceSize', description: 'Key cap size.' }
  ]
};

const CopyToClipboardButtonDoc: ComponentDoc = {
  slug: 'copy-to-clipboard-button',
  title: 'CopyToClipboardButton',
  category: 'Data display',
  description: 'An icon button that swaps to a checkmark briefly after being clicked, for copy confirmations.',
  importStatement: "import { CopyToClipboardButton } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<CopyToClipboardButton onClick={() => navigator.clipboard?.writeText('Copied!')} />`,
      Component: () => <CopyToClipboardButton onClick={() => navigator.clipboard?.writeText('Copied!')} />
    }
  ],
  props: [
    { name: 'onClick', type: '(evt?: React.MouseEvent) => void', description: 'Performs the copy.', required: true }
  ]
};

const AnimatedArrowIconDoc: ComponentDoc = {
  slug: 'animated-arrow-icon',
  title: 'AnimatedArrowIcon',
  category: 'Data display',
  description: 'A chevron that animates between expanded and collapsed orientations, for disclosure triggers.',
  importStatement: "import { AnimatedArrowIcon } from 'krill';",
  examples: [
    {
      title: 'Toggle on click',
      code: `const [open, setOpen] = useState(false);
<button type='button' onClick={() => setOpen((o) => !o)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
  <AnimatedArrowIcon isOpen={open} />
</button>`,
      Component: () => {
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
      }
    }
  ],
  props: [
    {
      name: 'isOpen',
      type: 'boolean',
      description: "Whether the arrow points outward/expanded ('open') or inward/collapsed ('closed').",
      required: true
    }
  ]
};

const StepperDoc: ComponentDoc = {
  slug: 'stepper',
  title: 'Stepper',
  category: 'Data display',
  description: 'A vertical list of numbered steps, each with bold and regular text segments.',
  importStatement: "import { Stepper } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Stepper
  items={[
    { bold: 'Step 1', text: ' – Create account' },
    { bold: 'Step 2', text: ' – Verify email' }
  ]}
/>`,
      Component: () => (
        <div style={{ height: 120, width: 280 }}>
          <Stepper
            items={[
              { bold: 'Step 1', text: ' – Create account' },
              { bold: 'Step 2', text: ' – Verify email' }
            ]}
          />
        </div>
      )
    }
  ],
  props: [
    { name: 'items', type: 'StepperItem[]', description: 'Steps, each with a bold and text segment.', required: true }
  ]
};

const EventDotDoc: ComponentDoc = {
  slug: 'event-dot',
  title: 'EventDot',
  category: 'Data display',
  description: 'A small colored dot, used by DatePicker to mark days that have events.',
  importStatement: "import { EventDot } from 'krill';",
  examples: [
    {
      title: 'Filled and empty',
      code: `<EventDot color="var(--accent-orange-primary)" />
<EventDot color="var(--accent-blue-primary)" type={EventDotType.EMPTY} />`,
      Component: () => (
        <>
          <EventDot color='var(--accent-orange-primary)' />
          <EventDot color='var(--accent-blue-primary)' type={EventDotType.EMPTY} />
        </>
      )
    }
  ],
  props: [
    {
      name: 'color',
      type: 'string',
      description: "CSS color value, e.g. 'var(--accent-orange-primary)'.",
      required: true
    },
    { name: 'type', type: 'EventDotType', description: 'Filled or outlined.', default: 'EventDotType.FILLED' },
    { name: 'isFaded', type: 'boolean', description: 'Fades the dot, e.g. for days outside the displayed month.' },
    { name: 'isSelected', type: 'boolean', description: 'Whether the dot sits on a selected/highlighted background.' }
  ]
};

const EncryptionBadgeDoc: ComponentDoc = {
  slug: 'encryption-badge',
  title: 'EncryptionBadge',
  category: 'Data display',
  description: 'A small badge communicating the encryption status of a message: end-to-end, PGP, or external.',
  importStatement: "import { EncryptionBadge, EncryptionBadgeType } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<EncryptionBadge tooltipSubtext="Only you and the recipient can read this" type={EncryptionBadgeType.E2EE} />`,
      Component: () => (
        <EncryptionBadge tooltipSubtext='Only you and the recipient can read this' type={EncryptionBadgeType.E2EE} />
      )
    }
  ],
  props: [
    {
      name: 'type',
      type: 'EncryptionBadgeType',
      description: 'Which icon to show: the E2EE shield, the PGP key, or the external lock.',
      default: 'EncryptionBadgeType.E2EE'
    },
    { name: 'tooltipSubtext', type: 'string', description: 'Tooltip subtext rendered below the title.' },
    { name: 'hideTooltip', type: 'boolean', description: 'Suppresses the tooltip entirely.' },
    { name: 'isTrusted', type: 'boolean', description: 'Tints the icon green to indicate a trusted/verified key.' },
    { name: 'onClick', type: '() => void', description: 'Click handler.' }
  ]
};

const BadgeDoc: ComponentDoc = {
  slug: 'badge',
  title: 'Badge',
  category: 'Data display',
  description: 'A count or dot overlay anchored to the corner of an icon, avatar, or other element.',
  importStatement: "import { Badge } from 'krill';",
  examples: [
    {
      title: 'Count and dot',
      code: `<Badge count={3}>
  <IconButton icon={Icon.Bell} onClick={() => {}} />
</Badge>
<Badge count={128}>
  <IconButton icon={Icon.Envelope} onClick={() => {}} />
</Badge>
<Badge dot>
  <Avatar label="FA" />
</Badge>`,
      Component: () => (
        <>
          <Badge count={3}>
            <IconButton icon={Icon.Bell} onClick={() => {}} />
          </Badge>
          <Badge count={128}>
            <IconButton icon={Icon.Envelope} onClick={() => {}} />
          </Badge>
          <Badge dot>
            <Avatar label='FA' />
          </Badge>
        </>
      )
    }
  ],
  props: [
    { name: 'children', type: 'React.ReactNode', description: 'The element the badge is anchored to.', required: true },
    { name: 'count', type: 'number', description: 'Badge count; omit along with dot to render nothing.' },
    { name: 'dot', type: 'boolean', description: 'Renders a plain dot instead of a count.' },
    { name: 'color', type: 'AccentColor', description: 'Badge background color.', default: "'red'" },
    { name: 'max', type: 'number', description: 'Counts above this render as "{max}+".', default: '99' },
    { name: 'showZero', type: 'boolean', description: 'Renders the badge even when count is 0.', default: 'false' }
  ]
};

const CodeBlockDoc: ComponentDoc = {
  slug: 'code-block',
  title: 'CodeBlock',
  category: 'Data display',
  description: 'A read-only syntax-highlighted code snippet with a copy button, themed via CSS vars.',
  importStatement: "import { CodeBlock } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<CodeBlock code={\`const greeting: string = 'Hello, krill!';\nconsole.log(greeting);\`} language="tsx" />`,
      Component: () => (
        <CodeBlock code={`const greeting: string = 'Hello, krill!';\nconsole.log(greeting);`} language='tsx' />
      )
    }
  ],
  props: [
    { name: 'code', type: 'string', description: 'Source code to render.', required: true },
    { name: 'language', type: "'tsx' | 'bash'", description: 'Prism language used for highlighting.', default: "'tsx'" }
  ]
};

type DemoRow = { id: string; sender: string; subject: string };

const VirtualizedListDoc: ComponentDoc = {
  slug: 'virtualized-list',
  title: 'VirtualizedList',
  category: 'Data display',
  description:
    'Windowed list rendering for lists too large to render in full, e.g. a 10k+ row inbox. Built on react-window.',
  importStatement: "import { VirtualizedList } from 'krill';",
  examples: [
    {
      title: '5,000 rows',
      code: `const rows = Array.from({ length: 5000 }, (_, i) => ({
  id: \`row-\${i}\`,
  sender: \`sender\${i}@example.com\`,
  subject: \`Subject line for email #\${i}\`
}));

<VirtualizedList
  items={rows}
  itemHeight={56}
  height={240}
  getItemKey={(row) => row.id}
  renderItem={(row) => (
    <ListItem leading={<Avatar label={row.sender} />} subtitle={row.sender} title={row.subject} />
  )}
/>`,
      Component: () => {
        const rows: DemoRow[] = Array.from({ length: 5000 }, (_, i) => ({
          id: `row-${i}`,
          sender: `sender${i}@example.com`,
          subject: `Subject line for email #${i}`
        }));
        return (
          <div style={{ border: '1px solid var(--border-secondary)', borderRadius: 8, overflow: 'hidden', width: 360 }}>
            <VirtualizedList
              height={240}
              itemHeight={56}
              items={rows}
              getItemKey={(row) => row.id}
              renderItem={(row) => (
                <ListItem leading={<Avatar label={row.sender} />} subtitle={row.sender} title={row.subject} />
              )}
            />
          </div>
        );
      }
    }
  ],
  props: [
    { name: 'items', type: 'T[]', description: 'The full (unwindowed) list of items.', required: true },
    { name: 'itemHeight', type: 'number', description: 'Fixed height of each row, in pixels.', required: true },
    { name: 'height', type: 'number', description: 'Visible height of the list, in pixels.', required: true },
    {
      name: 'renderItem',
      type: '(item: T, index: number) => React.ReactNode',
      description: 'Renders a single row.',
      required: true
    },
    { name: 'getItemKey', type: '(item: T, index: number) => string', description: 'Returns a unique key per item.' },
    { name: 'overscanCount', type: 'number', description: 'Rows rendered outside the visible window.', default: '4' },
    { name: 'emptyState', type: 'React.ReactNode', description: 'Content shown when items is empty.' },
    { name: 'width', type: 'number | string', description: 'List width.', default: "'100%'" }
  ]
};

const TypographyDoc: ComponentDoc = {
  slug: 'typography',
  title: 'Typography',
  category: 'Data display',
  description: 'The base text component every other component renders its labels through.',
  importStatement: "import { Typography, TypographySize, TypographyWeight } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Typography weight={TypographyWeight.BOLD}>Bold typography</Typography>
<Typography color="secondary">Secondary typography</Typography>`,
      Component: () => (
        <>
          <Typography weight={TypographyWeight.BOLD}>Bold typography</Typography>
          <Typography color='secondary'>Secondary typography</Typography>
        </>
      )
    }
  ],
  props: [
    { name: 'children', type: 'React.ReactNode', description: 'Text content.' },
    { name: 'color', type: 'Color', description: 'Text color.', default: "'primary'" },
    { name: 'size', type: 'TypographySize', description: 'Text size.', default: 'TypographySize.MEDIUM' },
    { name: 'weight', type: 'TypographyWeight', description: 'Font weight.', default: 'TypographyWeight.REGULAR' },
    { name: 'align', type: 'Alignment', description: 'Text alignment.' },
    { name: 'mono', type: 'boolean', description: 'Renders in the monospace typeface.' },
    { name: 'uppercase', type: 'boolean', description: 'Uppercases the text.' },
    { name: 'capitalize', type: 'boolean', description: 'Capitalizes the text.' },
    { name: 'wrap', type: 'boolean', description: 'Whether text lines may wrap at soft-wrap opportunities.' },
    { name: 'selectable', type: 'boolean', description: 'Whether the text is user-selectable.', default: 'true' },
    { name: 'inline', type: 'boolean', description: 'Renders as an inline element instead of a block.' },
    { name: 'textDecoration', type: 'TextDecoration', description: 'Underline or strike-through text.' },
    { name: 'onClick', type: '(e: React.MouseEvent) => void', description: 'Click handler.' }
  ]
};

const IconTextWithEndActionsDoc: ComponentDoc = {
  slug: 'icon-text-with-end-actions',
  title: 'IconTextWithEndActions',
  category: 'Data display',
  description: 'An IconText row with hover-revealed end-action icon buttons, e.g. edit/delete on a settings row.',
  importStatement: "import { IconTextWithEndActions, Icon } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<IconTextWithEndActions
  label="Project Alpha"
  startIcon={Icon.Folder}
  endActions={[
    { icon: Icon.Edit, onClick: () => {} },
    { icon: Icon.Trash, onClick: () => {} }
  ]}
/>`,
      Component: () => (
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
      )
    }
  ],
  props: [
    {
      name: 'endActions',
      type: 'IconTextEndAction[]',
      description: 'Hover-revealed icon buttons, each with icon, onClick, optional tooltip.',
      required: true
    },
    {
      name: 'showEndActions',
      type: 'boolean',
      description: 'Forces the end actions to stay visible (instead of hover-only).'
    },
    {
      name: 'startComponent',
      type: 'JSX.Element',
      description: 'Custom element rendered before the label, instead of startIcon.'
    }
  ]
};

export const DATA_DISPLAY_DOCS: ComponentDoc[] = [
  AvatarDoc,
  ChipDoc,
  ListItemDoc,
  TableDoc,
  MonoTagDoc,
  FacepileDoc,
  IconsDoc,
  IconTextDoc,
  CircleBadgeDoc,
  KeyCodeSequenceDoc,
  CopyToClipboardButtonDoc,
  AnimatedArrowIconDoc,
  StepperDoc,
  EventDotDoc,
  EncryptionBadgeDoc,
  BadgeDoc,
  CodeBlockDoc,
  VirtualizedListDoc,
  TypographyDoc,
  IconTextWithEndActionsDoc
];
