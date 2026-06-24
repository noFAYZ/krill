import * as React from 'react';

import {
  accentColorToPrimaryColor,
  Button,
  Checkbox,
  ChipInput,
  CodeInput,
  ColorSelector,
  DropdownItem,
  FilterSelect,
  Icon,
  IconButton,
  Illustration,
  Illustrations,
  InputField,
  InputFieldEndAction,
  MobileSearch,
  MobileSelect,
  NumberInput,
  PasswordField,
  RadioButton,
  RadioCheckbox,
  RichTextEditor,
  Select,
  SelectBox,
  SelectField,
  Slider,
  TextArea,
  Toggle,
  Type,
  Typography
} from '../../src';
import { ComponentDoc } from '../types';

const ButtonDoc: ComponentDoc = {
  slug: 'button',
  title: 'Button',
  category: 'Inputs',
  description: 'A clickable action with primary, secondary, and destructive variants.',
  importStatement: "import { Button } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<Button onClick={() => {}}>Primary action</Button>
<Button type={Type.SECONDARY} onClick={() => {}}>Secondary</Button>
<Button type={Type.DESTRUCTIVE} onClick={() => {}}>Delete</Button>`,
      Component: () => (
        <>
          <Button onClick={() => {}}>Primary action</Button>
          <Button type={Type.SECONDARY} onClick={() => {}}>
            Secondary
          </Button>
          <Button type={Type.DESTRUCTIVE} onClick={() => {}}>
            Delete
          </Button>
        </>
      )
    },
    {
      title: 'With icon',
      code: `<Button icon={Icon.Plus} onClick={() => {}}>Add</Button>`,
      Component: () => (
        <Button icon={Icon.Plus} onClick={() => {}}>
          Add
        </Button>
      )
    }
  ],
  props: [
    { name: 'children', type: 'React.ReactNode', description: 'Button label content.', required: true },
    {
      name: 'onClick',
      type: '(e: React.MouseEvent) => void | Promise<void>',
      description: 'Click handler.',
      required: true
    },
    { name: 'type', type: 'Type', description: 'Visual variant.', default: 'Type.PRIMARY' },
    { name: 'icon', type: 'Icon', description: 'Optional leading icon.' },
    { name: 'size', type: 'Size', description: 'Button size.', default: 'Size.MEDIUM' },
    { name: 'disabled', type: 'boolean', description: 'Disables the button.' },
    { name: 'loading', type: 'boolean', description: 'Shows a spinner in place of the label.' },
    { name: 'fullWidth', type: 'boolean', description: 'Stretches the button to its container width.' }
  ]
};

const IconButtonDoc: ComponentDoc = {
  slug: 'icon-button',
  title: 'IconButton',
  category: 'Inputs',
  description: 'A square, icon-only button, useful for toolbars and compact actions.',
  importStatement: "import { IconButton } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<IconButton icon={Icon.Plus} onClick={() => {}} />
<IconButton icon={Icon.Trash} type={Type.DESTRUCTIVE} onClick={() => {}} />`,
      Component: () => (
        <>
          <IconButton icon={Icon.Plus} onClick={() => {}} />
          <IconButton icon={Icon.Trash} type={Type.DESTRUCTIVE} onClick={() => {}} />
        </>
      )
    }
  ],
  props: [
    { name: 'icon', type: 'Icon | IconComponent', description: 'The icon to render.', required: true },
    {
      name: 'onClick',
      type: '(e: React.MouseEvent) => void | Promise<void>',
      description: 'Click handler.',
      required: true
    },
    { name: 'type', type: 'Type', description: 'Color variant.', default: 'Type.PRIMARY' },
    {
      name: 'variant',
      type: 'FilledVariant',
      description: 'Filled or unfilled background.',
      default: 'FilledVariant.FILLED'
    },
    { name: 'tooltip', type: 'string | JSX.Element', description: 'Tooltip shown on hover.' },
    { name: 'disabled', type: 'boolean', description: 'Disables the button.' }
  ]
};

const CheckboxDoc: ComponentDoc = {
  slug: 'checkbox',
  title: 'Checkbox',
  category: 'Inputs',
  description: 'A checkbox with checked, indeterminate, error, and disabled states.',
  importStatement: "import { Checkbox } from 'krill';",
  examples: [
    {
      title: 'Controlled checkbox',
      code: `const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onClick={() => setChecked((c) => !c)} />`,
      Component: () => {
        const [checked, setChecked] = React.useState(false);
        return <Checkbox checked={checked} onClick={() => setChecked((c) => !c)} />;
      }
    }
  ],
  props: [
    { name: 'onClick', type: '(e: React.MouseEvent) => void', description: 'Click handler.', required: true },
    { name: 'checked', type: 'boolean', description: 'Checked state.' },
    { name: 'indeterminate', type: 'boolean', description: 'Indeterminate state; takes priority over checked.' },
    { name: 'error', type: 'boolean', description: 'Shows a destructive color when unchecked.' },
    { name: 'checkedColor', type: 'IconColor', description: 'Overrides the checked icon color.', default: "'orange'" },
    { name: 'disabled', type: 'boolean', description: 'Disables the checkbox.' },
    { name: 'padding', type: 'boolean', description: "Widens the clickable area without changing the icon's size." }
  ]
};

const RadioButtonDoc: ComponentDoc = {
  slug: 'radio-button',
  title: 'RadioButton',
  category: 'Inputs',
  description: 'A selectable row with a label, optional description, and a radio indicator.',
  importStatement: "import { RadioButton } from 'krill';",
  examples: [
    {
      title: 'Radio group',
      code: `const [value, setValue] = useState('a');
<RadioButton checked={value === 'a'} label="Option A" onClick={() => setValue('a')} />
<RadioButton checked={value === 'b'} label="Option B" description="With a description" onClick={() => setValue('b')} />`,
      Component: () => {
        const [value, setValue] = React.useState('a');
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <RadioButton checked={value === 'a'} label='Option A' onClick={() => setValue('a')} />
            <RadioButton
              checked={value === 'b'}
              description='With a description'
              label='Option B'
              onClick={() => setValue('b')}
            />
          </div>
        );
      }
    }
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'Checked state.', required: true },
    { name: 'label', type: 'string', description: 'Primary text.', required: true },
    { name: 'onClick', type: '() => void', description: 'Click handler.' },
    { name: 'description', type: 'string', description: 'Secondary text rendered below the label.' },
    { name: 'disabled', type: 'boolean', description: 'Disables hover/click interactions.' }
  ]
};

const ToggleDoc: ComponentDoc = {
  slug: 'toggle',
  title: 'Toggle',
  category: 'Inputs',
  description: 'An on/off switch.',
  importStatement: "import { Toggle } from 'krill';",
  examples: [
    {
      title: 'Controlled toggle',
      code: `const [checked, setChecked] = useState(false);
<Toggle checked={checked} onChange={() => setChecked((c) => !c)} />`,
      Component: () => {
        const [checked, setChecked] = React.useState(false);
        return <Toggle checked={checked} onChange={() => setChecked((c) => !c)} />;
      }
    }
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'On/off state.', required: true },
    { name: 'onChange', type: '() => void', description: 'Called when the toggle is clicked.', required: true }
  ]
};

const InputFieldDoc: ComponentDoc = {
  slug: 'input-field',
  title: 'InputField',
  category: 'Inputs',
  description: 'A single-line text input with optional icon, error state, and helper text.',
  importStatement: "import { InputField } from 'krill';",
  examples: [
    {
      title: 'Controlled input',
      code: `const [value, setValue] = useState('');
<InputField placeholder="Type something" value={value} onChange={(e) => setValue(e.target.value)} />`,
      Component: () => {
        const [value, setValue] = React.useState('');
        return <InputField placeholder='Type something' value={value} onChange={(e) => setValue(e.target.value)} />;
      }
    }
  ],
  props: [
    { name: 'value', type: 'string', description: 'Controlled value.' },
    { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', description: 'Change handler.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'icon', type: 'Icon', description: 'Leading icon.' },
    { name: 'error', type: 'boolean | string', description: 'Error state or message.' },
    { name: 'disabled', type: 'boolean', description: 'Disables editing.' },
    { name: 'size', type: 'InputFieldSize', description: 'Field size.', default: 'Size.MEDIUM' }
  ]
};

const SelectDoc: ComponentDoc = {
  slug: 'select',
  title: 'Select',
  category: 'Inputs',
  description: 'A dropdown select built from DropdownItem children.',
  importStatement: "import { Select, DropdownItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [value, setValue] = useState('a');
<Select value={value} onChange={setValue} placeholder="Choose one">
  <DropdownItem label="Option A" value="a" />
  <DropdownItem label="Option B" value="b" />
</Select>`,
      Component: () => {
        const [value, setValue] = React.useState('a');
        return (
          <Select placeholder='Choose one' value={value} onChange={setValue}>
            <DropdownItem label='Option A' value='a' />
            <DropdownItem label='Option B' value='b' />
          </Select>
        );
      }
    }
  ],
  props: [
    { name: 'children', type: 'DropdownItemComponent[]', description: 'DropdownItem options.', required: true },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called when an option is selected.',
      required: true
    },
    { name: 'value', type: 'string', description: 'Currently selected value.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text when nothing is selected.' },
    {
      name: 'variant',
      type: 'FilledVariant',
      description: 'Filled or ghost field.',
      default: 'FilledVariant.UNFILLED'
    },
    {
      name: 'searchProps',
      type: '{ enableSearch: boolean }',
      description: 'Enables a search input inside the dropdown.'
    }
  ]
};

const ChipInputDoc: ComponentDoc = {
  slug: 'chip-input',
  title: 'ChipInput',
  category: 'Inputs',
  description: 'A text input that turns entries into removable chips, e.g. for email recipients or tags.',
  importStatement: "import { ChipInput } from 'krill';",
  examples: [
    {
      title: 'Email recipients',
      code: `const [items, setItems] = useState(['design-system', 'react']);
<ChipInput items={items} onItemsChange={setItems} placeholder="Add a tag..." />`,
      Component: () => {
        const [items, setItems] = React.useState(['design-system', 'react']);
        return <ChipInput items={items} placeholder='Add a tag...' onItemsChange={setItems} />;
      }
    }
  ],
  props: [
    { name: 'items', type: 'string[]', description: 'Current chip values.', required: true },
    {
      name: 'onItemsChange',
      type: '(items: string[]) => void',
      description: 'Called when items are added or removed.',
      required: true
    },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    {
      name: 'validate',
      type: '(value: string) => boolean',
      description: 'Validates an entry before it becomes a chip.'
    }
  ]
};

const TextAreaDoc: ComponentDoc = {
  slug: 'text-area',
  title: 'TextArea',
  category: 'Inputs',
  description: 'A multi-line text input.',
  importStatement: "import { TextArea } from 'krill';",
  examples: [
    {
      title: 'Controlled textarea',
      code: `const [value, setValue] = useState('');
<TextArea rows={4} placeholder="Write your message..." value={value} onChange={(e) => setValue(e.target.value)} />`,
      Component: () => {
        const [value, setValue] = React.useState('');
        return (
          <TextArea
            placeholder='Write your message...'
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      }
    }
  ],
  props: [
    { name: 'value', type: 'string', description: 'Controlled value.' },
    { name: 'onChange', type: '(e: React.ChangeEvent<HTMLTextAreaElement>) => void', description: 'Change handler.' },
    { name: 'rows', type: 'number', description: 'Visible row count.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', description: 'Disables editing.' }
  ]
};

const CodeInputDoc: ComponentDoc = {
  slug: 'code-input',
  title: 'CodeInput',
  category: 'Inputs',
  description: 'A row of single-character boxes for entering a verification code.',
  importStatement: "import { CodeInput } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [value, setValue] = useState('');
<CodeInput codeLength={6} value={value} onChange={setValue} onSubmit={() => {}} />`,
      Component: () => {
        const [value, setValue] = React.useState('');
        return <CodeInput codeLength={6} value={value} onChange={setValue} onSubmit={() => {}} />;
      }
    }
  ],
  props: [
    { name: 'value', type: 'string', description: 'Controlled value.', required: true },
    { name: 'onChange', type: '(value: string) => void', description: 'Called as digits are entered.', required: true },
    { name: 'codeLength', type: 'number', description: 'Number of character boxes.', required: true },
    { name: 'onSubmit', type: '() => void', description: 'Called once all boxes are filled.' },
    { name: 'type', type: 'CodeInputType', description: 'Numeric or alphanumeric keyboard.' }
  ]
};

const RadioCheckboxDoc: ComponentDoc = {
  slug: 'radio-checkbox',
  title: 'RadioCheckbox',
  category: 'Inputs',
  description: 'The bare radio indicator icon used inside RadioButton; usable standalone for custom radio rows.',
  importStatement: "import { RadioCheckbox } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<RadioCheckbox checked />
<RadioCheckbox checked={false} />`,
      Component: () => (
        <>
          <RadioCheckbox checked />
          <RadioCheckbox checked={false} />
        </>
      )
    }
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'Checked state.' },
    { name: 'disabled', type: 'boolean', description: 'Disables the radio.' },
    { name: 'size', type: 'Size', description: 'Icon size.', default: 'Size.X_MEDIUM' },
    { name: 'onClick', type: '(e: React.MouseEvent) => void', description: 'Click handler.' }
  ]
};

const ColorSelectorDoc: ComponentDoc = {
  slug: 'color-selector',
  title: 'ColorSelector',
  category: 'Inputs',
  description: 'A row of accent-color swatches, with an optional custom-color picker swatch.',
  importStatement: "import { ColorSelector, accentColorToPrimaryColor } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [value, setValue] = useState('orange');
<ColorSelector colorToStyling={accentColorToPrimaryColor} value={value} handleChange={setValue} />`,
      Component: () => {
        const [value, setValue] = React.useState('orange');
        return <ColorSelector colorToStyling={accentColorToPrimaryColor} value={value} handleChange={setValue} />;
      }
    }
  ],
  props: [
    {
      name: 'colorToStyling',
      type: 'Record<AccentColor, string>',
      description: 'Maps each accent color to its CSS value.',
      required: true
    },
    { name: 'value', type: 'string', description: 'Currently selected color.', required: true },
    {
      name: 'handleChange',
      type: '(value: string) => void',
      description: 'Called when a swatch is clicked.',
      required: true
    },
    {
      name: 'handlePickerChange',
      type: '(value: string) => void',
      description: 'If set, adds a custom-color swatch that opens a hex picker.'
    },
    { name: 'hideSelected', type: 'boolean', description: 'Hides the selected-state border.' }
  ]
};

const InputFieldEndActionDoc: ComponentDoc = {
  slug: 'input-field-end-action',
  title: 'InputFieldEndAction',
  category: 'Inputs',
  description:
    'A small icon button meant to sit inside an InputField via its endAdornment prop, e.g. a clear or show-password action.',
  importStatement: "import { InputFieldEndAction } from 'krill';",
  examples: [
    {
      title: 'Inside an InputField',
      code: `<InputField
  placeholder="Search"
  endAdornment={<InputFieldEndAction icon={Icon.Close} tooltip="Clear" onClick={() => {}} />}
/>`,
      Component: () => (
        <InputField
          endAdornment={<InputFieldEndAction icon={Icon.Close} tooltip='Clear' onClick={() => {}} />}
          placeholder='Search'
        />
      )
    }
  ],
  props: [
    { name: 'icon', type: 'Icon', description: 'The icon to render.', required: true },
    { name: 'onClick', type: '() => void', description: 'Click handler.', required: true },
    { name: 'tooltip', type: 'string', description: 'Tooltip label.' },
    { name: 'size', type: 'Size', description: 'Icon size.' }
  ]
};

const PasswordFieldDoc: ComponentDoc = {
  slug: 'password-field',
  title: 'PasswordField',
  category: 'Inputs',
  description: 'A password input with a show/hide toggle and an optional strength meter.',
  importStatement: "import { PasswordField } from 'krill';",
  examples: [
    {
      title: 'With a strength meter',
      code: `const [value, setValue] = useState('');
<PasswordField value={value} onChange={(e) => setValue(e.target.value)} showStrength />`,
      Component: () => {
        const [value, setValue] = React.useState('');
        return <PasswordField showStrength value={value} onChange={(e) => setValue(e.target.value)} />;
      }
    }
  ],
  props: [
    { name: 'value', type: 'string', description: 'Controlled value.', required: true },
    {
      name: 'onChange',
      type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
      description: 'Change handler.',
      required: true
    },
    {
      name: 'showStrength',
      type: 'boolean',
      description:
        'Shows a strength meter below the field, based on a simple length/variety heuristic (not a real entropy estimate).'
    },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.', default: "'Password'" },
    { name: 'error', type: 'boolean | string', description: 'Error state or message.' },
    { name: 'disabled', type: 'boolean', description: 'Disables editing.' }
  ]
};

const SelectFieldDoc: ComponentDoc = {
  slug: 'select-field',
  title: 'SelectField',
  category: 'Inputs',
  description:
    'A responsive Select: renders the desktop Select on desktop and a drawer-based picker (MobileSelect) on mobile devices.',
  importStatement: "import { SelectField, DropdownItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [value, setValue] = useState('a');
<SelectField value={value} onChange={setValue} placeholder="Choose one">
  <DropdownItem label="Option A" value="a" />
  <DropdownItem label="Option B" value="b" />
</SelectField>`,
      Component: () => {
        const [value, setValue] = React.useState('a');
        return (
          <SelectField placeholder='Choose one' value={value} onChange={setValue}>
            <DropdownItem label='Option A' value='a' />
            <DropdownItem label='Option B' value='b' />
          </SelectField>
        );
      }
    }
  ],
  props: [
    { name: 'children', type: 'DropdownItemComponent[]', description: 'DropdownItem options.', required: true },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called when an option is selected.',
      required: true
    },
    { name: 'value', type: 'string', description: 'Currently selected value.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' }
  ]
};

const MobileSelectDoc: ComponentDoc = {
  slug: 'mobile-select',
  title: 'MobileSelect',
  category: 'Inputs',
  description:
    'The drawer-based select variant SelectField renders on mobile devices; usable directly to force the mobile UI on any device.',
  importStatement: "import { MobileSelect, DropdownItem } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [value, setValue] = useState('a');
<MobileSelect value={value} onChange={setValue} placeholder="Choose one">
  <DropdownItem label="Option A" value="a" />
  <DropdownItem label="Option B" value="b" />
</MobileSelect>`,
      Component: () => {
        const [value, setValue] = React.useState('a');
        return (
          <MobileSelect placeholder='Choose one' value={value} onChange={setValue}>
            <DropdownItem label='Option A' value='a' />
            <DropdownItem label='Option B' value='b' />
          </MobileSelect>
        );
      }
    }
  ],
  props: [
    { name: 'children', type: 'DropdownItemComponent[]', description: 'DropdownItem options.', required: true },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called when an option is selected.',
      required: true
    },
    {
      name: 'menuControls',
      type: '{ isOpen: boolean; setIsOpen: (open: boolean) => void }',
      description: 'Externally controls the drawer instead of internal state.'
    }
  ]
};

const SelectBoxDoc: ComponentDoc = {
  slug: 'select-box',
  title: 'SelectBox',
  category: 'Inputs',
  description:
    'A large selectable card with a background illustration and a radio indicator, e.g. for theme or plan pickers.',
  importStatement: "import { SelectBox, Illustration, Illustrations } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `<SelectBox
  checked
  label="Light"
  illustration={<Illustration illustration={Illustrations.LightMode} />}
  onClick={() => {}}
/>`,
      Component: () => (
        <div style={{ width: 200 }}>
          <SelectBox
            checked
            illustration={<Illustration illustration={Illustrations.LightMode} />}
            label='Light'
            onClick={() => {}}
          />
        </div>
      )
    }
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'Checked state.', required: true },
    { name: 'label', type: 'string', description: 'Card label.', required: true },
    {
      name: 'illustration',
      type: 'React.ReactNode',
      description: 'Background visual, e.g. an Illustration element.',
      required: true
    },
    { name: 'onClick', type: '() => void', description: 'Click handler.', required: true },
    { name: 'description', type: 'string', description: 'Secondary text below the label.' },
    { name: 'size', type: "'small' | 'large'", description: 'Card size.' }
  ]
};

const FilterSelectDoc: ComponentDoc = {
  slug: 'filter-select',
  title: 'FilterSelect',
  category: 'Inputs',
  description: 'A searchable dropdown of filter labels with multi-select checkmarks and a clear-all action.',
  importStatement: "import { FilterSelect } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [open, setOpen] = useState(false);
const [activeFilters, setActiveFilters] = useState<string[]>([]);
const filterLabels = ['Unread', 'Starred', 'Has attachment'];

<Button onClick={() => setOpen(true)}>Filter</Button>
<FilterSelect
  open={open}
  buttonRef={buttonRef}
  filterLabels={filterLabels}
  isFilterActive={(f) => activeFilters.includes(f)}
  numActiveFilters={activeFilters.length}
  onClose={() => setOpen(false)}
  onSelectFilter={(f) => setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f])}
  clearAllFilters={() => setActiveFilters([])}
/>`,
      Component: () => {
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
      }
    }
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Opened / closed state.', required: true },
    { name: 'buttonRef', type: 'RefObject<HTMLDivElement>', description: 'Anchor element ref.', required: true },
    { name: 'filterLabels', type: 'string[]', description: 'All available filter labels.', required: true },
    {
      name: 'isFilterActive',
      type: '(filter: string) => boolean',
      description: 'Whether a given filter is currently active.',
      required: true
    },
    { name: 'onSelectFilter', type: '(filter: string) => void', description: 'Toggles a filter.', required: true },
    { name: 'clearAllFilters', type: '() => void', description: 'Clears every active filter.', required: true },
    { name: 'onClose', type: '() => void', description: 'Closes the dropdown.', required: true },
    { name: 'numActiveFilters', type: 'number', description: 'Shown in the footer with a clear-all link.' }
  ]
};

const SliderDoc: ComponentDoc = {
  slug: 'slider',
  title: 'Slider',
  category: 'Inputs',
  description: 'A themed range input for picking a numeric value along a track.',
  importStatement: "import { Slider } from 'krill';",
  examples: [
    {
      title: 'Controlled slider',
      code: `const [value, setValue] = useState(40);
<Slider value={value} onChange={setValue} />`,
      Component: () => {
        const [value, setValue] = React.useState(40);
        return (
          <div style={{ width: 240 }}>
            <Slider value={value} onChange={setValue} />
          </div>
        );
      }
    }
  ],
  props: [
    { name: 'value', type: 'number', description: 'Current value.', required: true },
    { name: 'onChange', type: '(value: number) => void', description: 'Called as the user drags.', required: true },
    { name: 'min', type: 'number', description: 'Minimum value.', default: '0' },
    { name: 'max', type: 'number', description: 'Maximum value.', default: '100' },
    { name: 'step', type: 'number', description: 'Increment per step.', default: '1' },
    {
      name: 'color',
      type: 'AccentColor',
      description: 'Accent color for the filled track and thumb.',
      default: "'blue'"
    },
    { name: 'disabled', type: 'boolean', description: 'Disabled state.' }
  ]
};

const NumberInputDoc: ComponentDoc = {
  slug: 'number-input',
  title: 'NumberInput',
  category: 'Inputs',
  description: 'A quantity input with increment/decrement buttons, clamped to a min/max range.',
  importStatement: "import { NumberInput } from 'krill';",
  examples: [
    {
      title: 'Controlled usage',
      code: `const [value, setValue] = useState(1);
<NumberInput value={value} onChange={setValue} min={0} max={10} />`,
      Component: () => {
        const [value, setValue] = React.useState(1);
        return <NumberInput max={10} min={0} value={value} onChange={setValue} />;
      }
    }
  ],
  props: [
    { name: 'value', type: 'number', description: 'Current value.', required: true },
    {
      name: 'onChange',
      type: '(value: number) => void',
      description: 'Called with the clamped next value.',
      required: true
    },
    { name: 'min', type: 'number', description: 'Minimum value.', default: '-Infinity' },
    { name: 'max', type: 'number', description: 'Maximum value.', default: 'Infinity' },
    { name: 'step', type: 'number', description: 'Increment per click.', default: '1' },
    { name: 'disabled', type: 'boolean', description: 'Disables both buttons.' }
  ]
};

const RichTextEditorDoc: ComponentDoc = {
  slug: 'rich-text-editor',
  title: 'RichTextEditor',
  category: 'Inputs',
  description:
    'A controlled rich-text compose editor with a formatting toolbar (bold, italic, underline, strikethrough, lists, links). Built on TipTap.',
  importStatement: "import { RichTextEditor } from 'krill';",
  examples: [
    {
      title: 'Controlled editor',
      code: `const [value, setValue] = useState('<p>Hey team, quick update...</p>');
<RichTextEditor value={value} onChange={setValue} />`,
      Component: () => {
        const [value, setValue] = React.useState('<p>Hey team, quick update on the launch timeline...</p>');
        return (
          <div style={{ width: 420 }}>
            <RichTextEditor value={value} onChange={setValue} />
          </div>
        );
      }
    }
  ],
  props: [
    { name: 'value', type: 'string', description: 'Controlled HTML content.', required: true },
    {
      name: 'onChange',
      type: '(html: string) => void',
      description: 'Called with the updated HTML on every edit.',
      required: true
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Placeholder text shown when empty.',
      default: "'Write something...'"
    },
    {
      name: 'editable',
      type: 'boolean',
      description: 'Disables editing while still rendering content.',
      default: 'true'
    },
    { name: 'showToolbar', type: 'boolean', description: 'Shows the formatting toolbar.', default: 'true' },
    { name: 'autoFocus', type: 'boolean', description: 'Focuses the editor on mount.' },
    { name: 'minHeight', type: 'number | string', description: 'Minimum height of the editable area.', default: '120' }
  ]
};

const MobileSearchDoc: ComponentDoc = {
  slug: 'mobile-search',
  title: 'MobileSearch',
  category: 'Inputs',
  description: 'A search input styled for mobile, with a cancel button and a resettable query.',
  importStatement: "import { MobileSearch } from 'krill';",
  examples: [
    {
      title: 'Basic usage',
      code: `const [query, setQuery] = useState('');
<MobileSearch setSearchQuery={setQuery} />
<Typography color="secondary">Query: {query || '(empty)'}</Typography>`,
      Component: () => {
        const [query, setQuery] = React.useState('');
        return (
          <div style={{ width: 280 }}>
            <MobileSearch setSearchQuery={setQuery} />
            <Typography color='secondary'>Query: {query || '(empty)'}</Typography>
          </div>
        );
      }
    }
  ],
  props: [
    {
      name: 'setSearchQuery',
      type: '(query: string) => void',
      description: 'Called as the user types.',
      required: true
    },
    { name: 'initialValue', type: 'string', description: 'Initial query value.' },
    { name: 'placeHolder', type: 'string', description: 'Placeholder text.' },
    { name: 'onCancel', type: '() => void', description: 'Called when the cancel button is pressed.' },
    { name: 'disableCancelButton', type: 'boolean', description: 'Hides the cancel button.' },
    { name: 'disabled', type: 'boolean', description: 'Disabled state.' },
    {
      name: 'resetKey',
      type: 'string | number',
      description: 'Changing this value clears the search, e.g. when the consumer navigates to a different view.'
    },
    { name: 'showBorder', type: 'boolean', description: 'Shows a border around the input.' }
  ]
};

export const INPUT_DOCS: ComponentDoc[] = [
  ButtonDoc,
  IconButtonDoc,
  CheckboxDoc,
  RadioButtonDoc,
  RadioCheckboxDoc,
  ToggleDoc,
  InputFieldDoc,
  InputFieldEndActionDoc,
  TextAreaDoc,
  CodeInputDoc,
  ColorSelectorDoc,
  PasswordFieldDoc,
  SelectDoc,
  SelectFieldDoc,
  MobileSelectDoc,
  SelectBoxDoc,
  FilterSelectDoc,
  ChipInputDoc,
  SliderDoc,
  NumberInputDoc,
  RichTextEditorDoc,
  MobileSearchDoc
];
