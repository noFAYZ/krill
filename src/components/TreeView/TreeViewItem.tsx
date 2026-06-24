import * as React from 'react';

import { ThemeMode } from '../../types';
import Icons, { Icon } from '../Icons';
import Typography from '../Typography';

import { ChevronSpacer, Label, Row } from './TreeView.styles';
import { TreeViewNode } from './TreeView.types';

interface TreeViewItemProps {
  depth: number;
  expandedKeys: string[];
  forceTheme?: ThemeMode;
  node: TreeViewNode;
  onSelectNode?: (node: TreeViewNode) => void;
  onToggle: (key: string) => void;
  selectedKey?: string;
}

const TreeViewItem: React.FC<TreeViewItemProps> = ({
  depth,
  expandedKeys,
  forceTheme,
  node,
  onSelectNode,
  onToggle,
  selectedKey
}) => {
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedKeys.includes(node.key);
  const isSelected = selectedKey === node.key;

  return (
    <>
      <Row
        $depth={depth}
        $disabled={node.disabled}
        $forceTheme={forceTheme}
        $selected={isSelected}
        onClick={
          node.disabled
            ? undefined
            : () => {
                if (hasChildren) onToggle(node.key);
                onSelectNode?.(node);
              }
        }
      >
        {hasChildren ? (
          <Icons
            color='secondary'
            forceTheme={forceTheme}
            icon={Icon.ChevronDown}
            rotate={isExpanded ? 0 : -90}
            size={16}
          />
        ) : (
          <ChevronSpacer />
        )}
        {node.icon && <Icons color='secondary' forceTheme={forceTheme} icon={node.icon} size={16} />}
        <Label>
          <Typography forceTheme={forceTheme}>{node.label}</Typography>
        </Label>
      </Row>
      {hasChildren &&
        isExpanded &&
        node.children?.map((child) => (
          <TreeViewItem
            depth={depth + 1}
            expandedKeys={expandedKeys}
            forceTheme={forceTheme}
            key={child.key}
            node={child}
            onSelectNode={onSelectNode}
            onToggle={onToggle}
            selectedKey={selectedKey}
          />
        ))}
    </>
  );
};

export default TreeViewItem;
