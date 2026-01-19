export interface NodeTheme {
  backgroundColor: string;
  color: string;
  borderColor: string;
  expandButton: {
    color: string;
    borderColor: string;
    backgroundColor: string;
  };
}

export interface TreeTheme {
  nodeTypes: Record<string, NodeTheme>;
  nodeOverrides?: Record<string, Partial<NodeTheme>>; // For specific node IDs
  sectionColors?: Record<string, string>; // Section-based color mapping by node ID
  lineColor: string;
  lineWidth: number;
  cornerRadius: number;
  highlight: {
    backgroundColor: string;
    padding: string;
    borderRadius: string;
    fontWeight: string;
  };
}

// Helper function to create a theme from a background color
const createThemeFromColor = (backgroundColor: string): NodeTheme => {
  // All backgrounds are dark enough to use white text
  const textColor = '#ffffff';

  // Determine border color - darker shade of background or black
  let borderColor = '#000000';
  if (backgroundColor === '#5583F7') {
    borderColor = '#3d5fc7'; // Darker blue
  } else if (backgroundColor === '#EA5050') {
    borderColor = '#c43d3d'; // Darker red
  } else if (backgroundColor === '#003366') {
    borderColor = '#002244'; // Darker navy
  } else if (backgroundColor === '#929090') {
    borderColor = '#6b6969'; // Darker gray
  } else if (backgroundColor === '#34882D') {
    borderColor = '#25661f'; // Darker green
  }

  return {
    backgroundColor,
    color: textColor,
    borderColor,
    expandButton: {
      color: '#000000',
      borderColor: '#000000',
      backgroundColor: '#ffffff',
    },
  };
};

export const defaultTreeTheme: TreeTheme = {
  nodeTypes: {
    equipment_type: createThemeFromColor('#5583F7'),
    equipment: createThemeFromColor('#5583F7'),
    assembly: createThemeFromColor('#5583F7'),
    component: createThemeFromColor('#5583F7'),
  },
  // Section-based color mapping
  sectionColors: {
    // Equipment (root)
    'root': '#5583F7',

    // Engine group (Engine, Deck, Accommodation, Misc)
    'engine': '#5583F7',
    'deck': '#5583F7',
    'accommodation': '#5583F7',
    'misc': '#5583F7',

    // Main Engine & Propulsion section (includes all children of Engine except Main Engine, Propeller, Shafting)
    'main-engine-propulsion': '#EA5050',
    'power-generation': '#EA5050',
    'aux-boiler': '#EA5050',
    'aux-machinery': '#EA5050',
    'electrical-automation': '#EA5050',
    'tank-systems': '#EA5050',
    'dp-system': '#EA5050',
    'others': '#EA5050',

    // Main Engine section (Main Engine, Propeller, Shafting)
    'main-engine': '#003366',
    'propeller': '#003366',
    'shafting': '#003366',

    // Air & Exhaust section
    'air-exhaust-system': '#929090',
    'aux-blower': '#929090',
    'aux-blower-2': '#929090',
    'charge-air-cooler': '#929090',
    'exhaust-valve-complete': '#929090',
    'fuel-system': '#929090',
    'cooling-water-system': '#929090',
    'cylinder-liner-lubrication': '#929090',

    // ME Turbocharger
    'me-turbocharger': '#929090',

    // Last section (children of ME Turbocharger - Spare Parts Box, seals, etc.)
    'spare-parts-box': '#34882D',
    'seal': '#34882D',
    'o-ring': '#34882D',
    'seal-turbine-side': '#34882D',
    'seal-compressor-side': '#34882D',
    'seal-engine-mount': '#34882D',
    'seal-exhaust-flange': '#34882D',
    'seal-oil-pan': '#34882D',
    'seal-intake-manifold': '#34882D',
    'seal-transmission-case': '#34882D',


  },
  lineColor: '#94a3b8',
  lineWidth: 2,
  cornerRadius: 8,
  highlight: {
    backgroundColor: '#ffeb3b',
    padding: '1px 2px',
    borderRadius: '2px',
    fontWeight: '600',
  },
};

/**
 * Get theme for a specific node
 * Priority: sectionColors > nodeOverrides > nodeTypes
 */
export const getNodeTheme = (
  nodeType: string,
  nodeId: string,
  theme: TreeTheme = defaultTreeTheme
): NodeTheme => {
  // Check for section-based color first (highest priority)
  if (theme.sectionColors && theme.sectionColors[nodeId]) {
    const sectionColor = theme.sectionColors[nodeId];
    return createThemeFromColor(sectionColor);
  }

  // Check for node-specific override
  if (theme.nodeOverrides && theme.nodeOverrides[nodeId]) {
    const override = theme.nodeOverrides[nodeId];
    const baseTheme = theme.nodeTypes[nodeType] || theme.nodeTypes.equipment;
    return {
      ...baseTheme,
      ...override,
      expandButton: {
        ...baseTheme.expandButton,
        ...(override.expandButton || {}),
      },
    };
  }

  // Return theme for node type (default)
  return theme.nodeTypes[nodeType] || theme.nodeTypes.equipment;
};

