export type NodeType = 'equipment_type' | 'equipment' | 'assembly' | 'component';

export interface HierarchyNode {
  id: string;
  name: string;
  type: NodeType;
  children?: HierarchyNode[];
}

export interface TreeState {
  expanded: Set<string>;
}

