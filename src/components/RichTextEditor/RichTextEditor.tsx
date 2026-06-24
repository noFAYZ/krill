import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';

import { Type } from '../../types';
import { IconButton } from '../Button';

import { TOOLBAR_ACTIONS } from './RichTextEditor.constants';
import { EditorContainer, EditorScrollArea, Toolbar } from './RichTextEditor.styles';
import { RichTextEditorProps } from './RichTextEditor.types';

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  autoFocus = false,
  className,
  editable = true,
  forceTheme,
  minHeight,
  placeholder = 'Write something...',
  showToolbar = true
}) => {
  const editor = useEditor({
    autofocus: autoFocus,
    editable,
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false }), Placeholder.configure({ placeholder })],
    content: value,
    onUpdate: ({ editor: updatedEditor }) => onChange(updatedEditor.getHTML())
  });

  React.useEffect(() => {
    if (!editor || editor.getHTML() === value) return;
    editor.commands.setContent(value, false);
  }, [editor, value]);

  return (
    <EditorContainer className={className} forceTheme={forceTheme}>
      {showToolbar && (
        <Toolbar forceTheme={forceTheme}>
          {TOOLBAR_ACTIONS.map((action) => (
            <IconButton
              active={!!editor && action.isActive(editor)}
              disabled={!editor}
              forceTheme={forceTheme}
              icon={action.icon}
              key={action.key}
              tooltip={action.tooltip}
              type={Type.SECONDARY}
              onClick={() => {
                if (editor) action.onClick(editor);
              }}
            />
          ))}
        </Toolbar>
      )}
      <EditorScrollArea $minHeight={minHeight} forceTheme={forceTheme}>
        <EditorContent editor={editor} />
      </EditorScrollArea>
    </EditorContainer>
  );
};

export default RichTextEditor;
