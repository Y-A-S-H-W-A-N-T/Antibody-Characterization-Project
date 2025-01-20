import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context'
import { createPluginUI } from 'molstar/lib/mol-plugin-ui'
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18'
import { PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { PluginConfig } from 'molstar/lib/mol-plugin/config'
import { 
  StructureRepresentationPresetProvider,
} from 'molstar/lib/mol-plugin-state/builder/structure/representation-preset'

export type ResidueProperty = 'hydrophobicity' | 'sequence' | 'secondary-structure' | 'chain-id' | 'b-factor';
export type Polymer = 'ball-and-stick' | 'cartoon' | 'backbone' | 'carbohydrate' | 'ellipsoid' | 'gaussian-surface' | 'gaussian-volume' | 'label' | 'line' | 'molecular-surface' | 'orientation' | 'point' | 'putty' | 'spacefill'


export class MolstarWrapper {
  private resolveInit!: () => void
  initialized: Promise<boolean>;
  private initCalled = false;
  plugin!: PluginUIContext;
  private target: HTMLDivElement | null = null;
  private disposed = false;
  private currentStructure: any = null;

  constructor() {
    this.initialized = new Promise<boolean>(res => {
      this.resolveInit = () => res(true);
    });
  }

  setTarget(element: HTMLDivElement) {
    if (this.disposed) {
      throw new Error('Cannot set target on disposed wrapper');
    }
    this.target = element;
  }

  async init() {
    if (this.initCalled || !this.target || this.disposed) return;
    this.initCalled = true;

    try {
      const spec: PluginUISpec = {
        config: [
          [PluginConfig.VolumeStreaming.Enabled, true],
          [PluginConfig.Viewport.ShowAnimation, true],
          [PluginConfig.Viewport.ShowSelectionMode, true],
          [PluginConfig.Viewport.ShowControls, true],
        ],
        layout: {
          initial: {
            isExpanded: false,
            showControls: true,
          }
        },
        behaviors: []
      };

      this.plugin = await createPluginUI({
        target: this.target,
        spec,
        render: renderReact18
      });

      await this.plugin.init();
      this.resolveInit();
    } catch (error) {
      console.error('Error initializing plugin:', error);
      this.initCalled = false;
      throw error;
    }
  }

  async setColorTheme(property: ResidueProperty) {
    if (!this.plugin || !this.currentStructure) return;

    const themeMap = {
      'hydrophobicity': 'hydrophobicity',
      'sequence': 'sequence-id',
      'secondary-structure': 'secondary-structure',
      'chain-id': 'chain-id',
      'b-factor': 'b-factor'
    };

    const theme = themeMap[property];
    
    try {
      // Get the current state tree
      const state = this.plugin.state.data;
      const update = state.build();

      // Find all structure component refs
      const structures = state.select(state.root.obj.type === 'Structure');
      
      if (structures.length === 0) return;

      // Update the color theme for each structure
      for (const structure of structures) {
        const components = structure.obj?.data.representation?.components;
        if (!components) continue;

        for (const c of components) {
          if (!c.cell.transform.params) continue;
          
          // Update the color theme parameter
          update.to(c.cell.transform.ref).update((old: any) => ({
            ...old,
            colorTheme: { name: theme }
          }));
        }
      }

      // Apply the updates
      await state.updateTree(update);
      
      // Commit the changes and trigger a render
      await this.plugin.canvas3d?.requestDraw();
      
    } catch (error) {
      console.error('Error updating color theme:', error);
    }
  }

  async loadPdb(source: string, isLocal: boolean = false, polymer: Polymer) {
    if (!this.plugin || this.disposed) return;

    try {
      const url = isLocal ? source : `https://files.rcsb.org/download/${source}.pdb`;
      const data = await this.plugin.builders.data.download(
        { url },
        { state: { isGhost: true } }
      );
      const trajectory = await this.plugin.builders.structure.parseTrajectory(data, 'pdb');
      const model = await this.plugin.builders.structure.createModel(trajectory);
      const structure = await this.plugin.builders.structure.createStructure(model);
      
      this.currentStructure = structure;

      await this.plugin.builders.structure.representation.addRepresentation(structure, {
        type: polymer,
        typeParams: { 
          alpha: 1,
          smoothness: 1,
          probeRadius: 1.4,
          ignoreHydrogens: true,
          quality: 'custom',
          resolution: 1,
          includeParent: false
        }
      });

    } catch (error) {
      console.error('Error loading PDB:', error);
    }
  }

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