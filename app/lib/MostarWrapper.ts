// Import core MolStar UI components and utilities
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
import { PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { StructureRepresentationPresetProvider } from "molstar/lib/mol-plugin-state/builder/structure/representation-preset";

// Define allowed property types for molecular visualization
export type Property =
  | "atom-id"
  | "carbohydrate-symbol"
  | "cartoon"
  | "chain-id"
  | "element-index"
  | "element-symbol"
  | "entity-id"
  | "entity-source"
  | "external-volume"
  | "formal-charge"
  | "hydrophobicity"
  | "illustrative"
  | "model-index"
  | "molecule-type"
  | "occupancy"
  | "operator-hkl"
  | "operator-name"
  | "partial-charge"
  | "polymer-id"
  | "polymer-index"
  | "residue-name"
  | "secondary-structure"
  | "sequence-id"
  | "shape-group"
  | "structure-index"
  | "trajectory-index"
  | "uncertainty"
  | "uniform"
  | "unit-index"
  | "volume-segment"
  | "volume-value";

// Define allowed polymer representation types
export type Polymer =
  | "ball-and-stick"
  | "cartoon"
  | "backbone"
  | "carbohydrate"
  | "ellipsoid"
  | "gaussian-surface"
  | "gaussian-volume"
  | "label"
  | "line"
  | "molecular-surface"
  | "orientation"
  | "point"
  | "putty"
  | "spacefill";

// Wrapper class for MolStar functionality
export class MolstarWrapper {
  // Promise resolution function for initialization
  private resolveInit!: () => void;
  // Promise to track initialization status
  initialized: Promise<boolean>;
  // Flag to prevent multiple initialization calls
  private initCalled = false;
  // Reference to the MolStar plugin instance
  plugin!: PluginUIContext;
  // DOM element where MolStar will be rendered
  private target: HTMLDivElement | null = null;
  // Flag to track if wrapper has been disposed
  private disposed = false;
  // Reference to current loaded structure
  private currentStructure: any = null;

  constructor() {
    // Initialize the promise that will resolve when setup is complete
    this.initialized = new Promise<boolean>((res) => {
      this.resolveInit = () => res(true);
    });
  }

  // Set the DOM element where MolStar will be rendered
  setTarget(element: HTMLDivElement) {
    if (this.disposed) {
      throw new Error("Cannot set target on disposed wrapper");
    }
    this.target = element;
  }

  // Initialize the MolStar plugin with configuration
  async init() {
    if (this.initCalled || !this.target || this.disposed) return;
    this.initCalled = true;

    try {
      // Configure plugin UI specifications
      const spec: PluginUISpec = {
        config: [
          [PluginConfig.VolumeStreaming.Enabled, true], // Enable volume streaming
          [PluginConfig.Viewport.ShowAnimation, true], // Show animation controls
          [PluginConfig.Viewport.ShowSelectionMode, true], // Show selection mode
          [PluginConfig.Viewport.ShowControls, true], // Show viewport controls
        ],
        layout: {
          initial: {
            isExpanded: false,
            showControls: true,
          },
        },
        behaviors: [],
      };

      // Create and initialize the plugin instance
      this.plugin = await createPluginUI({
        target: this.target,
        spec,
        render: renderReact18,
      });

      await this.plugin.init();
      this.resolveInit();
    } catch (error) {
      console.error("Error initializing plugin:", error);
      this.initCalled = false;
      throw error;
    }
  }

  // Load and display a PDB structure with specified visualization parameters
  async loadPdb(
    source: string,
    isLocal: boolean = false,
    polymer: Polymer,
    property: Property
  ) {
    if (!this.plugin || this.disposed) return;

    try {
      // Determine source URL based on whether it's local or from RCSB
      const url = isLocal
        ? source
        : `https://files.rcsb.org/download/${source}.pdb`;
      // Download the structure data
      const data = await this.plugin.builders.data.download(
        { url },
        { state: { isGhost: true } }
      );
      // Parse the trajectory from PDB format
      const trajectory = await this.plugin.builders.structure.parseTrajectory(
        data,
        "pdb"
      );
      // Create a molecular model from the trajectory
      const model = await this.plugin.builders.structure.createModel(
        trajectory
      );
      // Create a structure from the model
      const structure = await this.plugin.builders.structure.createStructure(
        model
      );

      this.currentStructure = structure;

      // Add visual representation with specified polymer type and property coloring
      await this.plugin.builders.structure.representation.addRepresentation(
        structure,
        {
          type: polymer,
          typeParams: {
            alpha: 1, // Opacity
            smoothness: 1, // Surface smoothness
            probeRadius: 1.4, // Probe radius for surface calculation
            ignoreHydrogens: true, // Skip hydrogen atoms
            quality: "custom", // Custom quality setting
            resolution: 1, // Resolution level
            includeParent: false, // Don't include parent structure
          },
          color: property, // Color scheme based on specified property
        }
      );
    } catch (error) {
      console.error("Error loading PDB:", error);
    }
  }

  // Clean up resources and dispose of the plugin
  dispose() {
    if (this.disposed) return;
    if (this.plugin) {
      this.plugin.dispose();
    }
    this.disposed = true;
    this.initCalled = false;
    this.target = null;
  }
}
