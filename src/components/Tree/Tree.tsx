import React, { useState, useEffect, useRef } from 'react';
import { HierarchyNode } from '../../types';
import TreeNode from '../TreeNode/TreeNode';
import { filterTree, getExpandedIdsForSearch } from '../../utils/treeUtils';
import { defaultTreeTheme, TreeTheme } from '../../theme/treeTheme';
import './Tree.css';

interface TreeProps {
  data: HierarchyNode;
  theme?: TreeTheme;
}

const Tree: React.FC<TreeProps> = ({ data, theme = defaultTreeTheme }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<HierarchyNode>(data);
  const [zoom, setZoom] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = filterTree(data, searchQuery);
      if (filtered) {
        setFilteredData(filtered);
        // Expand all nodes in the original tree that lead to matches
        const expandedIds = new Set<string>();
        getExpandedIdsForSearch(data, searchQuery, expandedIds);
        setExpanded(expandedIds);
      } else {
        setFilteredData(data);
        setExpanded(new Set());
      }
    } else {
      setFilteredData(data);
      setExpanded(new Set());
    }
  }, [searchQuery, data]);

  const handleToggle = (id: string) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  // Handle touchpad/mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prev) => Math.max(0.5, Math.min(2, prev + delta)));
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        contentElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  const renderTree = (node: HierarchyNode, level: number = 0): React.ReactNode => {
    const isExpanded = expanded.has(node.id);
    return (
      <TreeNode
        key={node.id}
        node={node}
        level={level}
        isExpanded={isExpanded}
        expandedSet={expanded}
        onToggle={handleToggle}
        searchQuery={searchQuery}
        theme={theme}
      />
    );
  };

  return (
    <div className="tree-container">
      <div className="tree-header">
        <div className="breadcrumbs">
          Fleet management / Sagar Kanya / <span className="active">Vessel Hierarchy Tree</span>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className="tree-content"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
      >
        <div className="tree-wrapper">
          {renderTree(filteredData, 0)}
        </div>
      </div>
      <div className="tree-footer">
        <div className="copyright">3S Smart Ship Solutions © 2025</div>
        <div className="zoom-controls">
          <button className="zoom-button" onClick={handleZoomIn} aria-label="Zoom in">
            +
          </button>
          <button className="zoom-button" onClick={handleZoomOut} aria-label="Zoom out">
            −
          </button>
          <button
            className="zoom-button"
            onClick={handleResetZoom}
            aria-label="Reset zoom"
          >
            ⬜
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tree;

