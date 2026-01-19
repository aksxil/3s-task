import React, { useRef, useEffect, useState } from 'react';
import { HierarchyNode } from '../../types';
import { getNodeTheme, defaultTreeTheme, TreeTheme } from '../../theme/treeTheme';
import './TreeNode.css';

interface TreeNodeProps {
  node: HierarchyNode;
  level: number;
  isExpanded: boolean;
  expandedSet: Set<string>;
  onToggle: (id: string) => void;
  searchQuery: string;
  theme?: TreeTheme;
}

interface LinePath {
  d: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  isExpanded,
  expandedSet,
  onToggle,
  searchQuery,
  theme = defaultTreeTheme,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const showExpandIcon = hasChildren;
  const nodeRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [linePaths, setLinePaths] = useState<LinePath[]>([]);

  // Get theme for this node
  const nodeTheme = getNodeTheme(node.type, node.id, theme);

  // Get node style based on theme
  const getNodeStyle = () => ({
    backgroundColor: nodeTheme.backgroundColor,
    color: nodeTheme.color,
    borderColor: nodeTheme.borderColor,
  });

  // Get expand button style based on theme
  const getExpandButtonStyle = () => ({
    color: nodeTheme.expandButton.color,
    borderColor: nodeTheme.expandButton.borderColor,
    backgroundColor: nodeTheme.expandButton.backgroundColor,
  });

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
      return text;
    }

    // Escape special regex characters in query
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark 
          key={index} 
          className="highlight"
          style={{
            backgroundColor: theme.highlight.backgroundColor,
            padding: theme.highlight.padding,
            borderRadius: theme.highlight.borderRadius,
            fontWeight: theme.highlight.fontWeight,
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (hasChildren && isExpanded && nodeRef.current && childrenRef.current) {
      const calculateLines = () => {
        const parentNode = nodeRef.current!;
        const childrenContainer = childrenRef.current!;
        
        // Only get direct children (not nested)
        const childWrappers = Array.from(childrenContainer.children).filter(
          (child) => child.classList.contains('tree-child-wrapper')
        ) as HTMLElement[];
        
        // Use the children container as reference for SVG positioning
        const containerRect = childrenContainer.getBoundingClientRect();
        const parentRect = parentNode.getBoundingClientRect();
        
        const paths: LinePath[] = [];
        // Calculate relative to children container
        const parentX = parentRect.right - containerRect.left;
        const parentY = parentRect.top + parentRect.height / 2 - containerRect.top;
        
        // Get all direct child positions only
        const childPositions: { x: number; y: number }[] = [];
        childWrappers.forEach((wrapper) => {
          // Get the first .tree-node that is a direct child of this wrapper's TreeNode
          // The structure is: wrapper > TreeNode > tree-node-wrapper > tree-node-container > tree-node
          const treeNodeWrapper = wrapper.firstElementChild as HTMLElement;
          if (treeNodeWrapper) {
            const treeNodeContainer = treeNodeWrapper.querySelector('.tree-node-container') as HTMLElement;
            if (treeNodeContainer) {
              const childNode = treeNodeContainer.querySelector('.tree-node') as HTMLElement;
              if (childNode) {
                const childRect = childNode.getBoundingClientRect();
                const childX = childRect.left - containerRect.left;
                const childY = childRect.top + childRect.height / 2 - containerRect.top;
                childPositions.push({ x: childX, y: childY });
              }
            }
          }
        });
        
        if (childPositions.length > 0) {
          // Calculate the horizontal line position (extend from parent)
          const firstChildX = childPositions[0].x;
          const horizontalDistance = firstChildX - parentX;
          const horizontalEndX = parentX + horizontalDistance * 0.4; // Extend 40% of the way
          
          // Radius for rounded corners (from theme)
          const cornerRadius = theme.cornerRadius;
          
          // Draw horizontal line from parent (stop before the corner)
          paths.push({
            d: `M ${parentX} ${parentY} L ${horizontalEndX - cornerRadius} ${parentY}`
          });
          
          // Draw individual vertical branches with rounded corners to each child
          childPositions.forEach((childPos) => {
            const verticalX = horizontalEndX;
            const verticalStartY = parentY;
            const verticalEndY = childPos.y;
            const childX = childPos.x;
            const childY = childPos.y;
            
            // Create path with rounded 90-degree corners
            // First rounded corner: horizontal to vertical (at horizontalEndX, parentY)
            // Second rounded corner: vertical to horizontal to child (at verticalX, verticalEndY)
            const d = `M ${horizontalEndX - cornerRadius} ${verticalStartY} 
                       Q ${horizontalEndX} ${verticalStartY}, ${verticalX} ${verticalStartY + cornerRadius}
                       L ${verticalX} ${verticalEndY - cornerRadius}
                       Q ${verticalX} ${verticalEndY}, ${verticalX + cornerRadius} ${verticalEndY}
                       L ${childX} ${childY}`;
            paths.push({ d: d.replace(/\s+/g, ' ').trim() });
          });
        }
        
        setLinePaths(paths);
      };

      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        setTimeout(calculateLines, 0);
      });

      const handleResize = () => {
        requestAnimationFrame(() => {
          setTimeout(calculateLines, 0);
        });
      };

      window.addEventListener('resize', handleResize);
      const scrollContainer = containerRef.current?.closest('.tree-content');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleResize);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleResize);
        }
      };
    } else {
      setLinePaths([]);
    }
  }, [hasChildren, isExpanded, node.children, expandedSet]);

  return (
    <div ref={containerRef} className="tree-node-wrapper">
      <div className="tree-node-container">
        <div 
          ref={nodeRef}
          className={`tree-node ${hasChildren ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}`}
          style={getNodeStyle()}
        >
          <div className="tree-node-content">
            <span className="tree-node-label">
              {highlightText(node.name, searchQuery)}
            </span>
            {showExpandIcon && (
              <button
                className="expand-button"
                style={getExpandButtonStyle()}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(node.id);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && (
          <>
            <div ref={childrenRef} className="tree-node-children">
              {linePaths.length > 0 && (
                <svg 
                  className="tree-node-lines" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    overflow: 'visible'
                  }}
                >
                  {linePaths.map((path, index) => (
                    <path
                      key={index}
                      d={path.d}
                      stroke={theme.lineColor}
                      strokeWidth={theme.lineWidth}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </svg>
              )}
              {node.children!.map((child, index) => (
                <div key={child.id} className="tree-child-wrapper" data-child-index={index}>
                  <TreeNode
                    node={child}
                    level={level + 1}
                    isExpanded={expandedSet.has(child.id)}
                    expandedSet={expandedSet}
                    onToggle={onToggle}
                    searchQuery={searchQuery}
                    theme={theme}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TreeNode;

