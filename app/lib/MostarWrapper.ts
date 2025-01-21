import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context'
import { createPluginUI } from 'molstar/lib/mol-plugin-ui'
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18'
import { PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { PluginConfig } from 'molstar/lib/mol-plugin/config'
import { 
  StructureRepresentationPresetProvider,
} from 'molstar/lib/mol-plugin-state/builder/structure/representation-preset'

export type Property = 'atom-id' | 'carbohydrate-symbol' | 'cartoon' | 'chain-id' | 'element-index' | 'element-symbol' | 'entity-id' | 'entity-source' | 'external-volume' | 'formal-charge'
 | 'hydrophobicity' | 'illustrative'| 'model-index' | 'molecule-type' | 'occupancy' | 'operator-hkl' | 'operator-name' | 'partial-charge' | 'polymer-id' | 'polymer-index' | 'residue-name' 
 | 'secondary-structure' | 'sequence-id' | 'shape-group' | 'structure-index' | 'trajectory-index' | 'uncertainty' | 'uniform' | 'unit-index' | 'volume-segment' | 'volume-value';


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

  async loadPdb(source: string, isLocal: boolean = false, polymer: Polymer, property: Property)
{
  if (!this.plugin || this.disposed) return;

  try {
    const url = isLocal ? source : `https://files.rcsb.org/download/${source}.pdb`
    const data = await this.plugin.builders.data.download({ url }, { state: { isGhost: true } })
    const trajectory = await this.plugin.builders.structure.parseTrajectory(data, "pdb")
    const model = await this.plugin.builders.structure.createModel(trajectory)
    const structure = await this.plugin.builders.structure.createStructure(model)

    this.currentStructure = structure

    await this.plugin.builders.structure.representation.addRepresentation(structure, {
      type: polymer,
      typeParams: {
        alpha: 1,
        smoothness: 1,
        probeRadius: 1.4,
        ignoreHydrogens: true,
        quality: "custom",
        resolution: 1,
        includeParent: false
      },
      color: property
    })
  } catch (error) {
    console.error("Error loading PDB:", error)
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