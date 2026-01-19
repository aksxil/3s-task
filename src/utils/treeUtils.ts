import { HierarchyNode } from '../types';

/**
 * Filter tree nodes based on search query
 * Returns nodes that match or have matching children
 */
export const filterTree = (node: HierarchyNode, searchQuery: string): HierarchyNode | null => {
  if (!searchQuery.trim()) {
    return node;
  }

  const query = searchQuery.toLowerCase();
  const nodeMatches = node.name.toLowerCase().includes(query);

  // If node matches, include it with all children
  if (nodeMatches) {
    return node;
  }

  // Otherwise, filter children recursively
  if (node.children && node.children.length > 0) {
    const filteredChildren = node.children
      .map(child => filterTree(child, searchQuery))
      .filter((child): child is HierarchyNode => child !== null);

    if (filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }
  }

  return null;
};

/**
 * Get all node IDs that should be expanded to show matching nodes
 * This expands all parent nodes that lead to matching nodes
 */
export const getExpandedIdsForSearch = (
  node: HierarchyNode,
  searchQuery: string,
  expandedIds: Set<string> = new Set()
): boolean => {
  if (!searchQuery.trim()) {
    return false;
  }

  const query = searchQuery.toLowerCase();
  const nodeMatches = node.name.toLowerCase().includes(query);
  let hasMatchingDescendant = nodeMatches;

  // Check if any children match
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      const childHasMatch = getExpandedIdsForSearch(child, searchQuery, expandedIds);
      if (childHasMatch) {
        hasMatchingDescendant = true;
      }
    });
  }

  // If this node matches or has matching descendants, expand it
  if (hasMatchingDescendant && node.children && node.children.length > 0) {
    expandedIds.add(node.id);
  }

  return hasMatchingDescendant;
};

