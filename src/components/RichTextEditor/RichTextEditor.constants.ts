import { Editor } from '@tiptap/core';

import { Icon } from '../Icons';

export interface ToolbarAction {
  key: string;
  icon: Icon;
  tooltip: string;
  isActive: (editor: Editor) => boolean;
  onClick: (editor: Editor) => void;
}

export const TOOLBAR_ACTIONS: ToolbarAction[] = [
  {
    key: 'bold',
    icon: Icon.Bold,
    tooltip: 'Bold',
    isActive: (editor) => editor.isActive('bold'),
    onClick: (editor) => editor.chain().focus().toggleBold().run()
  },
  {
    key: 'italic',
    icon: Icon.Italic,
    tooltip: 'Italic',
    isActive: (editor) => editor.isActive('italic'),
    onClick: (editor) => editor.chain().focus().toggleItalic().run()
  },
  {
    key: 'underline',
    icon: Icon.Underline,
    tooltip: 'Underline',
    isActive: (editor) => editor.isActive('underline'),
    onClick: (editor) => editor.chain().focus().toggleUnderline().run()
  },
  {
    key: 'strike',
    icon: Icon.Strikethrough,
    tooltip: 'Strikethrough',
    isActive: (editor) => editor.isActive('strike'),
    onClick: (editor) => editor.chain().focus().toggleStrike().run()
  },
  {
    key: 'bulletList',
    icon: Icon.BulletList,
    tooltip: 'Bullet list',
    isActive: (editor) => editor.isActive('bulletList'),
    onClick: (editor) => editor.chain().focus().toggleBulletList().run()
  },
  {
    key: 'orderedList',
    icon: Icon.NumberList,
    tooltip: 'Numbered list',
    isActive: (editor) => editor.isActive('orderedList'),
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run()
  },
  {
    key: 'link',
    icon: Icon.Link,
    tooltip: 'Link',
    isActive: (editor) => editor.isActive('link'),
    onClick: (editor) => {
      // ponytail: window.prompt for v1; swap for a Popover + InputField if link entry needs richer UX
      const url = window.prompt('Enter a URL');
      if (url) editor.chain().focus().setLink({ href: url }).run();
      else if (url === '') editor.chain().focus().unsetLink().run();
    }
  },
  {
    key: 'clearFormatting',
    icon: Icon.ClearFormatting,
    tooltip: 'Clear formatting',
    isActive: () => false,
    onClick: (editor) => editor.chain().focus().unsetAllMarks().clearNodes().run()
  }
];
