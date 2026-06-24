import * as React from 'react';

import {
  Accordion,
  Button,
  ButtonGroupItem,
  CommandMenu,
  ConfirmModal,
  ContextMenu,
  Dialog,
  DialogType,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownSubmenu,
  Icon,
  Icons,
  Popover,
  Portal,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography
} from '../../src';
import { ComponentDoc } from '../types';

const DialogDoc: ComponentDoc = {
  slug: 'dialog',
  title: 'Dialog',
  category: 'Overlays',
  description: 'A centered modal with a title, description, and action buttons.',
  importStatement: "import { Dialog, DialogType, ButtonGroupItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Demo dialog"
  description="Showcasing the Dialog component."
  type={DialogType.DEFAULT}
>
  <ButtonGroupItem label="Close" onClick={() => setOpen(false)} />
</Dialog>`,
      Component: () => {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <Button onClick={() => setOpen(true)}>Open dialog</Button>
            <Dialog
              description='Showcasing the Dialog component.'
              open={open}
              title='Demo dialog'
              type={DialogType.DEFAULT}
              onClose={() => setOpen(false)}
            >
              <ButtonGroupItem label='Close' onClick={() => setOpen(false)} />
            </Dialog>
          </>
        );
      }
    }
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'onClose', type: '() => Promise<void> | void', description: 'Closes the dialog.', required: true },
    {
      name: 'children',
      type: 'ButtonGroupItemComponent[] | React.ReactNode',
      description: 'Action buttons, or custom content when customContent is set.'
    },
    { name: 'title', type: 'string', description: 'Title text.' },
    { name: 'description', type: 'string', description: 'Description text below the title.' },
    {
      name: 'type',
      type: 'DialogType',
      description: 'Visual variant: default, confirm, input, promotional, search, settings, landscape.',
      default: 'DialogType.DEFAULT'
    },
    {
      name: 'customContent',
      type: 'boolean',
      description: 'Renders children directly instead of wrapping in a ButtonGroup.'
    },
    { name: 'width', type: 'number | string', description: 'Custom width.' }
  ]
};

const DrawerDoc: ComponentDoc = {
  slug: 'drawer',
  title: 'Drawer',
  category: 'Overlays',
  description: 'A panel that slides in from an edge of the screen, optionally with swipe-to-dismiss.',
  importStatement: "import { Drawer } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} showCloseButton title="Filter emails">
  <Typography color="secondary">Drawer content goes here.</Typography>
</Drawer>`,
      Component: () => {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <Button onClick={() => setOpen(true)}>Open drawer</Button>
            <Drawer showCloseButton open={open} title='Filter emails' onClose={() => setOpen(false)}>
              <Typography color='secondary'>Drawer content goes here.</Typography>
            </Drawer>
          </>
        );
      }
    }
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'onClose', type: '() => void', description: 'Closes the drawer.', required: true },
    { name: 'children', type: 'React.ReactNode', description: 'Drawer content.', required: true },
    {
      name: 'anchor',
      type: "'bottom' | 'left' | 'right' | 'top'",
      description: 'Edge the drawer slides in from.',
      default: "'bottom'"
    },
    { name: 'title', type: 'string', description: 'Title text.' },
    { name: 'titleIcon', type: 'Icon', description: 'Icon rendered before the title.' },
    { name: 'showCloseButton', type: 'boolean', description: 'Shows a close button in the header; requires title.' },
    { name: 'swipeable', type: 'boolean', description: 'Enables swipe-to-dismiss on touch devices.' },
    { name: 'maxHeight', type: 'number | string', description: "Caps the content area's height." }
  ]
};

const DropdownDoc: ComponentDoc = {
  slug: 'dropdown',
  title: 'Dropdown / DropdownItem',
  category: 'Overlays',
  description: 'A positioned menu of selectable items, anchored to a trigger element.',
  importStatement: "import { Dropdown, DropdownItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Dropdown setShowDropdown={() => {}}>
  <DropdownItem label="Option 1" />
  <DropdownItem label="Option 2" />
  <DropdownItem label="Option 3" />
</Dropdown>`,
      Component: () => (
        <Dropdown setShowDropdown={() => {}}>
          <DropdownItem label='Option 1' />
          <DropdownItem label='Option 2' />
          <DropdownItem label='Option 3' />
        </Dropdown>
      )
    }
  ],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode | DropdownItemComponent[]',
      description: 'Dropdown content, typically DropdownItems.',
      required: true
    },
    {
      name: 'setShowDropdown',
      type: '(open: boolean) => void',
      description: 'Updates the open state.',
      required: true
    },
    { name: 'showDropdown', type: 'boolean', description: 'Opened / closed state.' },
    { name: 'buttonRef', type: 'React.MutableRefObject<HTMLDivElement | null>', description: 'Anchor element ref.' },
    { name: 'portal', type: 'boolean', description: 'Renders the dropdown in a portal.' },
    { name: 'width', type: 'number | string', description: 'Custom width.' }
  ]
};

const TooltipDoc: ComponentDoc = {
  slug: 'tooltip',
  title: 'Tooltip',
  category: 'Overlays',
  description: 'A hover/focus tooltip wrapping a trigger element.',
  importStatement: "import { Tooltip, TooltipContent, TooltipTrigger } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Tooltip>
  <TooltipContent>Tooltip content</TooltipContent>
  <TooltipTrigger>
    <Button onClick={() => {}}>Hover me</Button>
  </TooltipTrigger>
</Tooltip>`,
      Component: () => (
        <Tooltip>
          <TooltipContent>Tooltip content</TooltipContent>
          <TooltipTrigger>
            <Button onClick={() => {}}>Hover me</Button>
          </TooltipTrigger>
        </Tooltip>
      )
    }
  ],
  props: [
    {
      name: 'children',
      type: '[TooltipContent, TooltipTrigger]',
      description: 'Must contain one TooltipContent and one TooltipTrigger.',
      required: true
    },
    { name: 'placement', type: 'TooltipPlacement', description: 'Where the tooltip renders relative to the trigger.' }
  ]
};

const ConfirmModalDoc: ComponentDoc = {
  slug: 'confirm-modal',
  title: 'ConfirmModal',
  category: 'Overlays',
  description: 'A Dialog preconfigured for confirm/cancel flows, with an optional destructive confirm button.',
  importStatement: "import { ConfirmModal } from 'krill';",
  examples: [
    {
      title: 'Destructive confirmation',
      code: `const [open, setOpen] = useState(false);
<Button type={Type.DESTRUCTIVE} onClick={() => setOpen(true)}>Delete account</Button>
<ConfirmModal
  open={open}
  title="Delete account?"
  description="This cannot be undone."
  confirmName="Delete"
  destructive
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
/>`,
      Component: () => {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <Button onClick={() => setOpen(true)}>Delete account</Button>
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
      }
    }
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'title', type: 'string', description: 'Title text.', required: true },
    { name: 'confirmName', type: 'string', description: 'Confirm button label.', required: true },
    {
      name: 'onClose',
      type: '(event?, reason?) => void',
      description: 'Closes the modal; default Cancel handler.',
      required: true
    },
    {
      name: 'onConfirm',
      type: '(e: React.MouseEvent) => void | Promise<void>',
      description: 'Confirm button handler.',
      required: true
    },
    { name: 'description', type: 'string', description: 'Description text.' },
    { name: 'destructive', type: 'boolean', description: 'Uses the destructive button style for confirm.' },
    { name: 'loading', type: 'boolean', description: 'Shows a loading state on confirm.' }
  ]
};

const DropdownSubmenuDoc: ComponentDoc = {
  slug: 'dropdown-submenu',
  title: 'DropdownSubmenu',
  category: 'Overlays',
  description: 'A DropdownItem that opens a nested Dropdown on hover, for multi-level menus.',
  importStatement: "import { Dropdown, DropdownItem, DropdownSubmenu } from 'krill';",
  examples: [
    {
      title: 'Nested menu',
      code: `<Dropdown showDropdown setShowDropdown={() => {}}>
  <DropdownItem label="Reply" />
  <DropdownSubmenu label="Move to">
    <DropdownItem label="Archive" />
    <DropdownItem label="Trash" />
  </DropdownSubmenu>
</Dropdown>`,
      Component: () => (
        <Dropdown showDropdown setShowDropdown={() => {}}>
          <DropdownItem label='Reply' />
          <DropdownSubmenu label='Move to'>
            <DropdownItem label='Archive' />
            <DropdownItem label='Trash' />
          </DropdownSubmenu>
        </Dropdown>
      )
    }
  ],
  props: [
    {
      name: 'children',
      type: 'DropdownItemComponent[] | React.ReactElement',
      description: 'Items rendered in the nested submenu.',
      required: true
    },
    { name: 'label', type: 'string', description: 'The triggering DropdownItem label.', required: true },
    { name: 'icon', type: 'Icon', description: 'The triggering DropdownItem icon.' },
    { name: 'width', type: 'number | string', description: 'Custom width for the nested submenu.' }
  ]
};

const CommandMenuDoc: ComponentDoc = {
  slug: 'command-menu',
  title: 'CommandMenu',
  category: 'Overlays',
  description: 'A search-driven command palette (⌘K style), with filtering left to the consumer.',
  importStatement: "import { CommandMenu } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [open, setOpen] = useState(false);
const [query, setQuery] = useState('');
const allLabels = ['Inbox', 'Sent', 'Drafts', 'Archive', 'Trash'];
const items = allLabels
  .filter((label) => label.toLowerCase().includes(query.toLowerCase()))
  .map((label) => ({ key: label, title: label, leading: <Icons icon={Icon.Folder} />, onSelect: () => setOpen(false) }));

<Button onClick={() => setOpen(true)}>Open command menu</Button>
<CommandMenu items={items} onClose={() => setOpen(false)} onQueryChange={setQuery} open={open} query={query} />`,
      Component: () => {
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
            <CommandMenu
              items={items}
              open={open}
              query={query}
              onClose={() => setOpen(false)}
              onQueryChange={setQuery}
            />
          </>
        );
      }
    }
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'query', type: 'string', description: 'Search query, controlled by the consumer.', required: true },
    {
      name: 'items',
      type: 'CommandMenuItem[]',
      description: 'Items to render, already filtered by the consumer.',
      required: true
    },
    { name: 'onClose', type: '() => void', description: 'Closes the menu.', required: true },
    {
      name: 'onQueryChange',
      type: '(query: string) => void',
      description: 'Called as the user types.',
      required: true
    },
    { name: 'emptyState', type: 'React.ReactNode', description: 'Content shown when items is empty.' },
    { name: 'placeholder', type: 'string', description: 'Search input placeholder.' },
    { name: 'height', type: 'number', description: 'Custom height; falls back to the Dialog default.' }
  ]
};

const AccordionDoc: ComponentDoc = {
  slug: 'accordion',
  title: 'Accordion',
  category: 'Overlays',
  description: 'A list of expandable/collapsible items, single-open by default.',
  importStatement: "import { Accordion } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Accordion
  items={[
    { key: 'a', title: 'What is krill?', content: <Typography color="secondary">A design system.</Typography> },
    { key: 'b', title: 'Is it free?', content: <Typography color="secondary">Yes, MIT licensed.</Typography> }
  ]}
/>`,
      Component: () => (
        <Accordion
          items={[
            { key: 'a', title: 'What is krill?', content: <Typography color='secondary'>A design system.</Typography> },
            { key: 'b', title: 'Is it free?', content: <Typography color='secondary'>Yes, MIT licensed.</Typography> }
          ]}
        />
      )
    }
  ],
  props: [
    {
      name: 'items',
      type: 'AccordionItem[]',
      description: 'Items, each with key, title, content, icon?, disabled?.',
      required: true
    },
    {
      name: 'allowMultiple',
      type: 'boolean',
      description: 'Allows more than one item open at a time.',
      default: 'false'
    },
    { name: 'defaultOpenKeys', type: 'string[]', description: 'Item keys expanded on first render.' }
  ]
};

const PopoverDoc: ComponentDoc = {
  slug: 'popover',
  title: 'Popover',
  category: 'Overlays',
  description: 'A click-triggered floating panel for arbitrary rich content, built on Dropdown’s positioning.',
  importStatement: "import { Popover } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open popover</Button>
<Popover buttonRef={buttonRef} open={open} onClose={() => setOpen(false)} width={240}>
  <div style={{ padding: 12 }}>
    <Typography color="secondary">Any rich content can go here, not just a list of items.</Typography>
  </div>
</Popover>`,
      Component: () => {
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
      }
    }
  ],
  props: [
    {
      name: 'buttonRef',
      type: 'MutableRefObject<HTMLDivElement | null>',
      description: 'Anchor element ref.',
      required: true
    },
    { name: 'open', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'onClose', type: '() => void', description: 'Closes the popover.', required: true },
    { name: 'children', type: 'React.ReactNode', description: 'Arbitrary content.', required: true },
    { name: 'width', type: 'number | string', description: 'Custom width.' },
    { name: 'gapFromAnchor', type: 'number', description: 'Gap, in px, between the anchor and the popover.' },
    { name: 'portal', type: 'boolean', description: 'Renders the popover in a portal.', default: 'true' }
  ]
};

const ContextMenuDoc: ComponentDoc = {
  slug: 'context-menu',
  title: 'ContextMenu',
  category: 'Overlays',
  description: "A right-click menu positioned at the cursor, built on Dropdown's customAnchor.",
  importStatement: "import { ContextMenu, DropdownItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<ContextMenu trigger={<div>Right-click me</div>}>
  <DropdownItem icon={Icon.Reply} label="Reply" onClick={() => {}} />
  <DropdownItem icon={Icon.Archive} label="Archive" onClick={() => {}} />
  <DropdownItem icon={Icon.Trash} label="Delete" onClick={() => {}} />
</ContextMenu>`,
      Component: () => (
        <ContextMenu
          trigger={
            <div style={{ border: '1px dashed var(--border-secondary)', borderRadius: 8, padding: '24px 32px' }}>
              <Typography color='secondary'>Right-click me</Typography>
            </div>
          }
        >
          <DropdownItem icon={Icon.Reply} label='Reply' onClick={() => {}} />
          <DropdownItem icon={Icon.Archive} label='Archive' onClick={() => {}} />
          <DropdownItem icon={Icon.Trash} label='Delete' onClick={() => {}} />
        </ContextMenu>
      )
    }
  ],
  props: [
    { name: 'trigger', type: 'React.ReactElement', description: 'The right-clickable trigger area.', required: true },
    {
      name: 'children',
      type: 'DropdownItemComponent[] | React.ReactElement',
      description: 'Menu items shown at the cursor.',
      required: true
    }
  ]
};

const PortalDoc: ComponentDoc = {
  slug: 'portal',
  title: 'Portal',
  category: 'Overlays',
  description:
    'Renders children into a div appended to document.body, escaping any clipping/stacking-context ancestors. The low-level primitive Dropdown, Surface, and Popover build on.',
  importStatement: "import { Portal } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Portal>
  <Typography>Rendered at the end of document.body</Typography>
</Portal>`,
      Component: () => (
        <Portal>
          <Typography>Rendered at the end of document.body</Typography>
        </Portal>
      )
    }
  ],
  props: [
    { name: 'children', type: 'React.ReactNode', description: 'Content rendered into the portal.', required: true }
  ]
};

export const OVERLAY_DOCS: ComponentDoc[] = [
  DialogDoc,
  DrawerDoc,
  DropdownDoc,
  DropdownSubmenuDoc,
  CommandMenuDoc,
  TooltipDoc,
  ConfirmModalDoc,
  AccordionDoc,
  PopoverDoc,
  ContextMenuDoc,
  PortalDoc
];
