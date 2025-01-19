import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18';
import { DefaultPluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { StateTransform } from 'molstar/lib/mol-state';
import { Asset } from 'molstar/lib/mol-util/assets';
import 'molstar/lib/mol-plugin-ui/skin/light.scss';

export class MolstarWrapper {
  private resolveInit!: () => void;
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
    if (this.disposed) throw new Error('Cannot set target on disposed wrapper');
    this.target = element;
  }

  async init() {
    if (this.initCalled || !this.target || this.disposed) return;
    this.initCalled = true;

    try {
      const spec = {
        ...DefaultPluginUISpec(),
        layout: {
          initial: {
            isExpanded: false,
            showControls: false,
            regionState: {
              left: 'hidden',
              right: 'hidden',
              bottom: 'hidden',
              top: 'hidden'
            }
          }
        },
        components: {
          remoteState: 'none',
          controls: { left: 'none', right: 'none', top: 'none', bottom: 'none' }
        },
        config: [
          [PluginConfig.VolumeStreaming.Enabled, false],
          [PluginConfig.Viewport.ShowAnimation, true],
          [PluginConfig.Viewport.ShowSelectionMode, true],
          [PluginConfig.Viewport.ShowControls, true],
          [PluginConfig.Viewport.ShowAnimation, false],
        ]
      };

      this.plugin = await createPluginUI({
        target: this.target,
        
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

  async loadPdb(source: string, isLocal: boolean = false, polymer: string) {
    if (!this.plugin || this.disposed) return;

    try {
      await this.plugin.clear();

      const url = isLocal ? source : `https://files.rcsb.org/download/${source}.pdb`;
      
      // Create a data object with proper asset handling
      const data = await this.plugin.builders.data.download({ 
        url: Asset.Url(url),
        isBinary: false,
        label: 'PDB File'
      });

      // Parse the data into a trajectory
      const trajectory = await this.plugin.builders.structure.parseTrajectory(data, 'pdb');
      
      // Create a model from the trajectory
      const model = await this.plugin.builders.structure.createModel(trajectory);
      
      // Create a structure from the model
      const structure = await this.plugin.builders.structure.createStructure(model);

      // Add cartoon representation
      await this.plugin.builders.structure.representation.addRepresentation(structure, {
        type: polymer,
        color: 'chain-id',
        size: 'uniform',
      });

      // Add ball-and-stick representation
      await this.plugin.builders.structure.representation.addRepresentation(structure, {
        type: polymer,
        color: 'element-symbol',
        size: 'uniform'
      });

      // Reset camera and update viewport
      // await this.plugin.canvas3d?;
      // this.plugin.canvas3d?.setProps({
      //   postprocessing: {
      //     occlusion: { name: 'on', params: { samples: 32, radius: 6, bias: 1.4 } },
      //     outline: { name: 'on', params: { scale: 1, threshold: 0.33 } }
      //   }
      // });
      
      // Ensure proper sizing
      this.plugin.canvas3d?.requestResize();
      
      return structure;
    } catch (error) {
      console.error('Error loading PDB:', error);
      throw error;
    }
  }

  async updateColorTheme(theme: string) {
    if (!this.plugin || this.disposed) return;

    try {
      const update = this.plugin.state.data.build();
      const representations = this.plugin.managers.structure.hierarchy.current.structures[0]?.components;
      
      if (!representations) return;

      for (const repr of representations) {
        update.to(repr.cell.transform.ref).update({
          colorTheme: { name: theme }
        });
      }

      await this.plugin.state.data.updateTree(update);
      this.plugin.canvas3d?.requestDraw();
    } catch (error) {
      console.error('Error updating color theme:', error);
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
