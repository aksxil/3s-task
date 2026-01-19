import { HierarchyNode } from '../types';

export const hierarchyData: HierarchyNode = {
  id: "root",
  name: "Equipments",
  type: "equipment_type",
  children: [
    {
      id: "engine",
      name: "Engine",
      type: "equipment",
      children: [
        {
          id: "main-engine-propulsion",
          name: "Main Engine & Propulsion",
          type: "equipment",
          children: [
            {
              id: "main-engine",
              name: "Main Engine",
              type: "equipment",
              children: [
                {
                  id: "air-exhaust-system",
                  name: "Air and Exhaust System",
                  type: "assembly",
                  children: [
                    {
                      id: "me-turbocharger",
                      name: "ME Turbocharger",
                      type: "component",
                      children: [
                        { id: "spare-parts-box", name: "Spare Parts Box", type: "component", children: [] },
                        { id: "seal", name: "Seal", type: "component", children: [] },
                        { id: "o-ring", name: "O-Ring", type: "component", children: [] },
                        { id: "seal-turbine-side", name: "Seal Turbine Side", type: "component", children: [] },
                        { id: "seal-compressor-side", name: "Seal Compressor Side", type: "component", children: [] },
                        { id: "seal-engine-mount", name: "Seal Engine Mount", type: "component", children: [] },
                        { id: "seal-exhaust-flange", name: "Seal Exhaust Flange", type: "component", children: [] },
                        { id: "seal-oil-pan", name: "Seal Oil Pan", type: "component", children: [] },
                        { id: "seal-intake-manifold", name: "Seal Intake Manifold", type: "component", children: [] },
                        { id: "seal-transmission-case", name: "Seal Transmission Case", type: "component", children: [] }
                      ]
                    },
                    { id: "aux-blower", name: "Aux Blower", type: "component", children: [] },
                    { id: "aux-blower-2", name: "Aux Blower 2", type: "component", children: [] },
                    { id: "charge-air-cooler", name: "Charge Air Cooler", type: "component", children: [] },
                    { id: "exhaust-valve-complete", name: "Exhaust Valve Complete", type: "component", children: [] }
                  ]
                },
                { id: "fuel-system", name: "Fuel System", type: "assembly", children: [] },
                { id: "cooling-water-system", name: "Cooling Water System", type: "assembly", children: [] },
                { id: "cylinder-liner-lubrication", name: "Cylinder Liner & Lubrication", type: "assembly", children: [] }
              ]
            },
            { id: "propeller", name: "Propeller", type: "assembly", children: [] },
            { id: "shafting", name: "Shafting", type: "assembly", children: [] }
          ]
        },
        { id: "power-generation", name: "Power Generation", type: "assembly", children: [] },
        { id: "aux-boiler", name: "Aux Boiler", type: "assembly", children: [] },
        { id: "aux-machinery", name: "Aux Machinery", type: "assembly", children: [] },
        { id: "electrical-automation", name: "Electrical & Automation", type: "assembly", children: [] },
        { id: "tank-systems", name: "Tank Systems", type: "assembly", children: [] },
        { id: "dp-system", name: "DP System", type: "assembly", children: [] },
        { id: "others", name: "Others", type: "assembly", children: [] }
      ]
    },

    { id: "deck", name: "Deck", type: "assembly", children: [] },
    { id: "accommodation", name: "Accommodation", type: "assembly", children: [] },
    { id: "misc", name: "Misc.", type: "assembly", children: [] }
  ]
};
