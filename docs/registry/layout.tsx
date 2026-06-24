import * as React from 'react';

import {
  ActionBar,
  Breadcrumbs,
  BrowserDesktopView,
  ButtonGroup,
  ButtonGroupItem,
  Divider,
  DottedGrid,
  Icon,
  IconButton,
  Icons,
  Layout,
  Pagination,
  SelectedItemToolbar,
  Sidebar,
  Steps,
  Surface,
  Tabs,
  ThemedBanner,
  ThemeMode,
  TreeView,
  Typography
} from '../../src';
import { ComponentDoc } from '../types';

const SidebarDoc: ComponentDoc = {
  slug: 'sidebar',
  title: 'Sidebar',
  category: 'Layout',
  description: 'A navigation sidebar with optional collapsible sections, a header slot, and a footer slot.',
  importStatement: "import { Sidebar } from 'krill';",
  examples: [
    {
      title: 'Sections with a collapsible group',
      code: `<Sidebar
  sections={[
    { key: 'mail', label: 'Mail', items: [{ key: 'inbox', label: 'Inbox', active: true }, { key: 'sent', label: 'Sent' }] },
    { key: 'starred', label: 'Starred', collapsible: true, defaultOpen: false, emptyLabel: 'No starred messages', items: [] }
  ]}
>
  <Typography weight={TypographyWeight.BOLD}>My App</Typography>
</Sidebar>`,
      Component: () => (
        <div style={{ height: 280, width: 220, border: '1px solid var(--border-secondary)', overflow: 'hidden' }}>
          <Sidebar
            sections={[
              {
                key: 'mail',
                label: 'Mail',
                items: [
                  {
                    key: 'inbox',
                    label: 'Inbox',
                    active: true,
                    icon: <Icons color='primary' icon={Icon.Inbox} size={16} />
                  },
                  { key: 'sent', label: 'Sent', icon: <Icons color='secondary' icon={Icon.Send} size={16} /> }
                ]
              },
              {
                key: 'starred',
                label: 'Starred',
                collapsible: true,
                defaultOpen: false,
                emptyLabel: 'No starred messages',
                items: []
              }
            ]}
          >
            <Typography>My App</Typography>
          </Sidebar>
        </div>
      )
    }
  ],
  props: [
    {
      name: 'sections',
      type: 'SidebarSection[]',
      description: 'Nav sections rendered below children.',
      required: true
    },
    { name: 'children', type: 'React.ReactNode', description: 'Free-form header content, e.g. a logo row.' },
    { name: 'footer', type: 'React.ReactNode', description: 'Rendered below the sections, pinned to the bottom.' },
    { name: 'width', type: 'number | string', description: 'Sidebar width.', default: '240px' }
  ]
};

const TreeViewDoc: ComponentDoc = {
  slug: 'tree-view',
  title: 'TreeView',
  category: 'Layout',
  description: 'A nested, expandable/collapsible list for hierarchical data, e.g. folders or threaded items.',
  importStatement: "import { TreeView } from 'krill';",
  examples: [
    {
      title: 'Nested folders',
      code: `<TreeView
  defaultExpandedKeys={['inbox']}
  nodes={[
    { key: 'inbox', label: 'Inbox', icon: Icon.Inbox, children: [
      { key: 'inbox-work', label: 'Work' },
      { key: 'inbox-personal', label: 'Personal' }
    ] },
    { key: 'sent', label: 'Sent', icon: Icon.Send }
  ]}
  selectedKey={selectedKey}
  onSelectNode={(node) => setSelectedKey(node.key)}
/>`,
      Component: () => {
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
      }
    }
  ],
  props: [
    {
      name: 'nodes',
      type: 'TreeViewNode[]',
      description: 'Root-level nodes; each may have a nested children array.',
      required: true
    },
    { name: 'defaultExpandedKeys', type: 'string[]', description: 'Node keys expanded on first render.' },
    { name: 'selectedKey', type: 'string', description: 'Currently selected node key.' },
    { name: 'onSelectNode', type: '(node: TreeViewNode) => void', description: 'Called when a row is clicked.' }
  ]
};

const TabsDoc: ComponentDoc = {
  slug: 'tabs',
  title: 'Tabs',
  category: 'Layout',
  description: 'A pill-style tab switcher. Tabs only renders the control; the consumer manages which panel is shown.',
  importStatement: "import { Tabs } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [active, setActive] = useState(0);
<Tabs
  tabs={['First', 'Second', 'Third'].map((label, i) => ({
    label,
    active: active === i,
    onClick: () => setActive(i)
  }))}
/>`,
      Component: () => {
        const [active, setActive] = React.useState(0);
        return (
          <Tabs
            tabs={['First', 'Second', 'Third'].map((label, i) => ({
              label,
              active: active === i,
              onClick: () => setActive(i)
            }))}
          />
        );
      }
    }
  ],
  props: [
    {
      name: 'tabs',
      type: '{ active: boolean; label?: string; icon?: Icon; onClick?: () => void }[]',
      description: 'Tab definitions.',
      required: true
    },
    { name: 'fullWidth', type: 'boolean', description: 'Stretches the tab bar to its container width.' },
    { name: 'size', type: 'TabsSize', description: 'Tab size.', default: 'Size.MEDIUM' }
  ]
};

const SurfaceDoc: ComponentDoc = {
  slug: 'surface',
  title: 'Surface',
  category: 'Layout',
  description:
    'A themed elevation container; the underlying building block for Dialog, Dropdown, and other floating panels.',
  importStatement: "import { Surface } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Surface level="l1" size="full-width">
  <Typography>Surface content</Typography>
</Surface>`,
      Component: () => (
        <Surface level='l1' size='full-width'>
          <Typography>Surface content</Typography>
        </Surface>
      )
    }
  ],
  props: [
    { name: 'level', type: "'l0' | 'l1' | 'l2' | 'l3'", description: 'Elevation level, mapped to a background token.' },
    { name: 'size', type: "Size | 'full-width' | 'full-screen'", description: 'Width preset.' },
    { name: 'modal', type: 'boolean', description: 'Renders as a centered modal with a scrim.' },
    { name: 'open', type: 'boolean', description: 'Opened / closed state when used as a modal.' }
  ]
};

const DividerDoc: ComponentDoc = {
  slug: 'divider',
  title: 'Divider',
  category: 'Layout',
  description: 'A horizontal or vertical rule.',
  importStatement: "import { Divider } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Divider />`,
      Component: () => (
        <div style={{ width: 200 }}>
          <Divider />
        </div>
      )
    }
  ],
  props: [
    { name: 'type', type: 'DividerType', description: 'Horizontal or vertical.', default: 'DividerType.HORIZONTAL' },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'tertiary' | string",
      description: 'Divider color.',
      default: "'secondary'"
    },
    { name: 'width', type: 'number | string', description: 'Custom width.' },
    { name: 'height', type: 'number | string', description: 'Custom height.' }
  ]
};

const ActionBarDoc: ComponentDoc = {
  slug: 'action-bar',
  title: 'ActionBar',
  category: 'Layout',
  description: 'A bottom-anchored bar for bulk actions, with an optional progress indicator pinned to its top edge.',
  importStatement: "import { ActionBar } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<ActionBar progress={60}>
  <IconButton icon={Icon.Archive} onClick={() => {}} />
  <IconButton icon={Icon.Trash} onClick={() => {}} />
  <IconButton icon={Icon.Reply} onClick={() => {}} />
</ActionBar>`,
      Component: () => (
        <div style={{ height: 80, overflow: 'hidden', position: 'relative', transform: 'translateZ(0)', width: 320 }}>
          <ActionBar progress={60}>
            <IconButton icon={Icon.Archive} onClick={() => {}} />
            <IconButton icon={Icon.Trash} onClick={() => {}} />
            <IconButton icon={Icon.Reply} onClick={() => {}} />
          </ActionBar>
        </div>
      )
    }
  ],
  props: [
    { name: 'children', type: 'React.ReactNode', description: 'Action buttons.', required: true },
    { name: 'progress', type: 'number', description: 'Percentage (0-100) for a progress bar pinned to the top edge.' },
    { name: 'zIndex', type: 'number', description: 'Custom z-index.' }
  ]
};

const ButtonGroupDoc: ComponentDoc = {
  slug: 'button-group',
  title: 'ButtonGroup / ButtonGroupItem',
  category: 'Layout',
  description: 'A row (or stack) of buttons sharing consistent size and spacing, used for dialog/form actions.',
  importStatement: "import { ButtonGroup, ButtonGroupItem } from 'krill';",
  examples: [
    {
      title: 'Inline group',
      code: `<ButtonGroup layout={Layout.INLINE}>
  <ButtonGroupItem label="Cancel" onClick={() => {}} />
  <ButtonGroupItem label="Confirm" onClick={() => {}} />
</ButtonGroup>`,
      Component: () => (
        <ButtonGroup layout={Layout.INLINE}>
          <ButtonGroupItem label='Cancel' onClick={() => {}} />
          <ButtonGroupItem label='Confirm' onClick={() => {}} />
        </ButtonGroup>
      )
    }
  ],
  props: [
    { name: 'children', type: 'ButtonGroupItemComponent[]', description: 'ButtonGroupItem elements.', required: true },
    { name: 'layout', type: 'Layout', description: 'Inline (row) or stacked.', default: 'Layout.INLINE' },
    { name: 'size', type: 'Size.SMALL | Size.MEDIUM | Size.LARGE', description: 'Button size.' },
    { name: 'fullWidth', type: 'boolean', description: 'Buttons take the full width of the container.' },
    { name: 'iconOnly', type: 'boolean', description: 'Only display the icon for secondary buttons.' }
  ]
};

const SelectedItemToolbarDoc: ComponentDoc = {
  slug: 'selected-item-toolbar',
  title: 'SelectedItemToolbar',
  category: 'Layout',
  description: 'A floating toolbar showing a selection count and quick actions, e.g. for bulk list selection.',
  importStatement: "import { SelectedItemToolbar } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<SelectedItemToolbar
  actions={[
    { key: 'archive', icon: Icon.Archive, onClick: () => {} },
    { key: 'trash', icon: Icon.Trash, onClick: () => {} }
  ]}
  topText="3 selected"
/>`,
      Component: () => (
        <div style={{ height: 60, overflow: 'hidden', position: 'relative', transform: 'translateZ(0)', width: 320 }}>
          <SelectedItemToolbar
            actions={[
              { key: 'archive', icon: Icon.Archive, onClick: () => {} },
              { key: 'trash', icon: Icon.Trash, onClick: () => {} }
            ]}
            topText='3 selected'
          />
        </div>
      )
    }
  ],
  props: [
    {
      name: 'actions',
      type: 'ActionIcon[]',
      description: 'Icon buttons, each with key, icon, onClick.',
      required: true
    },
    { name: 'topText', type: 'string', description: 'Primary text, e.g. a selection count.', required: true },
    { name: 'subText', type: 'string', description: 'Secondary text below topText.' }
  ]
};

const ThemedBannerDoc: ComponentDoc = {
  slug: 'themed-banner',
  title: 'ThemedBanner',
  category: 'Layout',
  description: 'A Banner that always renders in the opposite of the app theme, for high-contrast callouts.',
  importStatement: "import { ThemedBanner } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<ThemedBanner currentTheme={ThemeMode.LIGHT} icon={Icon.Info} label="Always shown in the opposite theme" />`,
      Component: () => (
        <ThemedBanner currentTheme={ThemeMode.LIGHT} icon={Icon.Info} label='Always shown in the opposite theme' />
      )
    }
  ],
  props: [
    {
      name: 'currentTheme',
      type: 'ThemeMode',
      description: "The app's current theme; the banner renders in the opposite theme.",
      required: true
    },
    { name: 'label', type: 'string', description: 'Banner text.', required: true },
    { name: 'icon', type: 'Icon', description: 'Leading icon.' }
  ]
};

const DottedGridDoc: ComponentDoc = {
  slug: 'dotted-grid',
  title: 'DottedGrid',
  category: 'Layout',
  description:
    'A decorative dotted-grid background that brightens near the cursor, used behind empty/onboarding states.',
  importStatement: "import { DottedGrid } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<DottedGrid forceTheme={ThemeMode.DARK} />`,
      Component: () => (
        <div style={{ height: 120, position: 'relative', transform: 'translateZ(0)', width: 240 }}>
          <DottedGrid forceTheme={ThemeMode.DARK} />
        </div>
      )
    }
  ],
  props: [
    { name: 'width', type: 'number | string', description: "Defaults to the parent's width." },
    { name: 'height', type: 'number | string', description: "Defaults to the parent's height." },
    { name: 'hideMotionLine', type: 'boolean', description: 'Hides the moving cursor-tracking highlight.' },
    { name: 'noAnimation', type: 'boolean', description: 'Disables the highlight animation entirely.' }
  ]
};

const BreadcrumbsDoc: ComponentDoc = {
  slug: 'breadcrumbs',
  title: 'Breadcrumbs',
  category: 'Layout',
  description: 'A horizontal trail of links showing the current location in a hierarchy.',
  importStatement: "import { Breadcrumbs } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Breadcrumbs
  items={[
    { key: 'mail', label: 'Mail', onClick: () => {} },
    { key: 'inbox', label: 'Inbox', onClick: () => {} },
    { key: 'thread', label: 'Welcome email' }
  ]}
/>`,
      Component: () => (
        <Breadcrumbs
          items={[
            { key: 'mail', label: 'Mail', onClick: () => {} },
            { key: 'inbox', label: 'Inbox', onClick: () => {} },
            { key: 'thread', label: 'Welcome email' }
          ]}
        />
      )
    }
  ],
  props: [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      description: 'Items with key, label, and onClick. Omit onClick for the current (non-clickable) page.',
      required: true
    },
    { name: 'separator', type: 'Icon', description: 'Icon rendered between items.', default: 'Icon.ChevronRight' }
  ]
};

const PaginationDoc: ComponentDoc = {
  slug: 'pagination',
  title: 'Pagination',
  category: 'Layout',
  description: 'Page navigation with prev/next arrows and an ellipsis-collapsed page range.',
  importStatement: "import { Pagination } from 'krill';",
  examples: [
    {
      title: 'Controlled pagination',
      code: `const [page, setPage] = useState(1);
<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />`,
      Component: () => {
        const [page, setPage] = React.useState(1);
        return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
      }
    }
  ],
  props: [
    { name: 'currentPage', type: 'number', description: 'Current page, 1-indexed.', required: true },
    { name: 'totalPages', type: 'number', description: 'Total number of pages.', required: true },
    {
      name: 'onPageChange',
      type: '(page: number) => void',
      description: 'Called when a page is selected.',
      required: true
    },
    {
      name: 'siblingCount',
      type: 'number',
      description: 'Sibling pages shown on each side of the current page.',
      default: '1'
    }
  ]
};

const StepsDoc: ComponentDoc = {
  slug: 'steps',
  title: 'Steps',
  category: 'Layout',
  description: 'A numbered step-progress indicator for multi-step flows like signup or checkout.',
  importStatement: "import { Steps } from 'krill';",
  examples: [
    {
      title: 'Controlled steps',
      code: `const [currentStep, setCurrentStep] = useState(1);
<Steps
  currentStep={currentStep}
  steps={[
    { key: 'account', label: 'Account' },
    { key: 'profile', label: 'Profile' },
    { key: 'confirm', label: 'Confirm' }
  ]}
/>`,
      Component: () => {
        const [currentStep] = React.useState(1);
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
          </div>
        );
      }
    }
  ],
  props: [
    { name: 'steps', type: 'StepItem[]', description: 'Steps, each with a key and label.', required: true },
    {
      name: 'currentStep',
      type: 'number',
      description: 'Index (0-based) of the current step; earlier steps render as completed.',
      required: true
    },
    { name: 'color', type: 'AccentColor', description: 'Accent color for completed/active steps.', default: "'green'" }
  ]
};

const BrowserDesktopViewDoc: ComponentDoc = {
  slug: 'browser-desktop-view',
  title: 'BrowserDesktopView',
  category: 'Layout',
  description: 'Renders children only on desktop browsers, hiding them on mobile and tablet viewports.',
  importStatement: "import { BrowserDesktopView } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<BrowserDesktopView>
  <Typography color="secondary">Visible on desktop browsers only</Typography>
</BrowserDesktopView>`,
      Component: () => (
        <BrowserDesktopView>
          <Typography color='secondary'>Visible on desktop browsers only</Typography>
        </BrowserDesktopView>
      )
    }
  ],
  props: [{ name: 'children', type: 'React.ReactNode', description: 'Content shown only on desktop browsers.' }]
};

export const LAYOUT_DOCS: ComponentDoc[] = [
  SidebarDoc,
  TreeViewDoc,
  TabsDoc,
  SurfaceDoc,
  DividerDoc,
  ActionBarDoc,
  ButtonGroupDoc,
  SelectedItemToolbarDoc,
  ThemedBannerDoc,
  DottedGridDoc,
  BreadcrumbsDoc,
  PaginationDoc,
  StepsDoc,
  BrowserDesktopViewDoc
];
