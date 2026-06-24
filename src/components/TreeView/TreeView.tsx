import * as React from 'react';

import { Container } from './TreeView.styles';
import { TreeViewProps } from './TreeView.types';
import TreeViewItem from './TreeViewItem';

const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  className,
  defaultExpandedKeys,
  forceTheme,
  onSelectNode,
  selectedKey,
  style
}) => {
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>(defaultExpandedKeys ?? []);

  const toggleKey = (key: string) => {
    setExpandedKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <Container className={className} style={style}>
      {nodes.map((node) => (
        <TreeViewItem
          depth={0}
          expandedKeys={expandedKeys}
          forceTheme={forceTheme}
          key={node.key}
          node={node}
          onSelectNode={onSelectNode}
          onToggle={toggleKey}
          selectedKey={selectedKey}
        />
      ))}
    </Container>
  );
};

export default TreeView;
