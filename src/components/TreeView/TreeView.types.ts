import { ThemeMode } from '../../types';
import { Icon } from '../Icons';

export interface TreeViewNode {
  /** Unique key for the node, must be unique across the whole tree */
  key: string;
  /** Row label */
  label: string;
  /** Leading icon shown before the label */
  icon?: Icon;
  /** Nested nodes; presence of this key (even an empty array) renders the row as expandable */
  children?: TreeViewNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  nodes: TreeViewNode[];
  /** For styled components */
  className?: string;
  /** Node keys expanded on first render */
  defaultExpandedKeys?: string[];
  forceTheme?: ThemeMode;
  /** Called when a row is clicked */
  onSelectNode?: (node: TreeViewNode) => void;
  /** Currently selected node key */
  selectedKey?: string;
  /** For customization */
  style?: React.CSSProperties;
}
