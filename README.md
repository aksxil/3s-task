# Vessel Hierarchy Tree - 3S Smart Ship Solutions

A React TypeScript application that displays a hierarchical tree view of vessel equipment, systems, assemblies, and components.

## Features

- ✅ **Hierarchical Tree View**: Visual representation of vessel hierarchy
- ✅ **Expand/Collapse**: Interactive nodes with expand/collapse functionality
- ✅ **Node Type Styling**: Different colors and styles based on node types (Equipment Type, Equipment, Assembly, Component)
- ✅ **Search Functionality**: Filter nodes by name with highlight matching
- ✅ **Zoom Controls**: Zoom in, zoom out, and reset zoom
- ✅ **Responsive Design**: Clean, modern UI matching the Figma design
- ✅ **TypeScript**: Full type safety throughout the application

## Project Structure

```
src/
├── components/
│   ├── Tree/
│   │   ├── Tree.tsx          # Main tree container component
│   │   └── Tree.css          # Tree styling
│   └── TreeNode/
│       ├── TreeNode.tsx      # Individual tree node component
│       └── TreeNode.css      # Node styling
├── data/
│   └── hierarchyData.ts      # Sample hierarchy data
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── treeUtils.ts          # Utility functions for tree operations
├── App.tsx                   # Main app component
└── index.tsx                 # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Component Architecture

### Tree Component
- Manages the overall tree state (expanded nodes, search query, zoom level)
- Handles search filtering and expansion logic
- Renders the tree header (breadcrumbs, search) and footer (zoom controls, copyright)

### TreeNode Component
- Recursive component that renders individual nodes
- Handles expand/collapse UI
- Applies node styling based on type
- Highlights search matches in node labels

### Data Structure

Each node in the hierarchy follows this structure:

```typescript
interface HierarchyNode {
  id: string;
  name: string;
  type: NodeType;  // 'equipment_type' | 'equipment' | 'assembly' | 'component'
  children?: HierarchyNode[];
}
```

## Node Types and Styling

- **Equipment Type**: Light blue background (#e3f2fd) with blue text
- **Equipment**: Dark blue background (#1565c0) with white text
- **Assembly**: Light red/pink background (#ffebee) with red text
- **Component**: Light green background (#c8e6c9) with dark green text

## Features in Detail

### Expand/Collapse
- Click the `+` button to expand a node and show its children
- Click the `−` button to collapse a node and hide its children
- Expanded state is maintained per node

### Search
- Type in the search box to filter visible nodes
- Matching nodes remain visible with their parent path
- Search matches are highlighted in yellow
- Parent nodes are automatically expanded to show matching children

### Zoom
- Use `+` button to zoom in
- Use `−` button to zoom out
- Use `⬜` button to reset zoom to 100%

## Trade-offs and Assumptions

1. **Vertical Tree Layout**: The current implementation uses a vertical tree layout rather than a mind map/radial layout shown in some designs. This was chosen for:
   - Simplicity and maintainability
   - Better performance with large datasets
   - Easier to implement expand/collapse functionality
   - More accessible for screen readers

2. **Search Implementation**: The search filters the tree and automatically expands matching nodes. This ensures users can always see matching results even in deeply nested hierarchies.

3. **State Management**: Using React hooks (useState) for state management. For larger applications, consider Context API or state management libraries like Redux or Zustand.

4. **Styling**: Using CSS modules for component-scoped styling. The design closely matches the Figma specifications while maintaining flexibility for future enhancements.

## Future Enhancements (Bonus Features)

- [ ] Smooth expand/collapse animations
- [ ] Mind map/radial layout option
- [ ] Keyboard navigation (arrow keys, enter to expand)
- [ ] Drag and drop to reorganize nodes
- [ ] Virtual scrolling for very large trees
- [ ] Export/import hierarchy data
- [ ] Node editing capabilities
- [ ] Performance optimization with React.memo for large datasets

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **CSS Modules**: Component-scoped styling
- **React Scripts**: Build tooling (create-react-app)


