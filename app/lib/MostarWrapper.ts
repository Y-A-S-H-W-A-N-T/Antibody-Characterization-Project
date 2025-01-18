// lib/MolstarWrapper.ts
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context'
import { createPluginUI } from 'molstar/lib/mol-plugin-ui'
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18'
import { PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { PluginConfig } from 'molstar/lib/mol-plugin/config'
import { 
  StructureRepresentationPresetProvider, 
} from 'molstar/lib/mol-plugin-state/builder/structure/representation-preset'

export class MolstarWrapper {
  private resolveInit!: () => void
  initialized: Promise<boolean>;
  private initCalled = false;
  plugin!: PluginUIContext;
  private target: HTMLDivElement | null = null;
  private disposed = false;

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
          [PluginConfig.VolumeStreaming.Enabled, false],
          [PluginConfig.Viewport.ShowAnimation, false],
          [PluginConfig.Viewport.ShowSelectionMode, false],
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

  async loadPdb(source: string, isLocal: boolean = false) {
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

      // Apply molecular surface representation
      await this.plugin.builders.structure.representation.addRepresentation(structure, {
        type: 'molecular-surface' as const,
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

      // Reset view to focus on the structure
      // if (this.plugin.canvas3d) {
      //   // Wait for a frame to ensure the structure is loaded
      //   await new Promise(resolve => setTimeout(resolve, 0));
        
      //   // Update state and trigger render
      //   await this.plugin.state.updateBehavior();
        
      //   // Adjust viewport
      //   const canvas = this.plugin.canvas3d;
      //   canvas.setPerspectiveCamera();
        
      //   // Reset camera position
      //   if (this.plugin.state.data.select('3d-view')) {
      //     await this.plugin.state.updateBehavior('camera.reset');
      //   }
      // }

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