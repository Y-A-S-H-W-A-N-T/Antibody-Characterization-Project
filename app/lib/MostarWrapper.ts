// lib/MolstarWrapper.ts
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context'
import { createPluginUI } from 'molstar/lib/mol-plugin-ui'
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18'
import { PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { PluginConfig } from 'molstar/lib/mol-plugin/config'

export class MolstarWrapper {
  private resolveInit!: () => void
  initialized: Promise<boolean>;
  private initCalled = false;
  plugin!: PluginUIContext;
  private target: HTMLDivElement | null = null;

  constructor() {
    this.initialized = new Promise<boolean>(res => {
      this.resolveInit = () => res(true);
    });
  }

  setTarget(element: HTMLDivElement) {
    this.target = element;
  }

  async init() {
    if (this.initCalled || !this.target) return;
    this.initCalled = true;

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
  }

  async loadPdb(source: string, isLocal: boolean = false) {
    if (!this.plugin) return;

    try {
      const url = isLocal ? source : `https://files.rcsb.org/download/${source}.pdb`;
      const data = await this.plugin.builders.data.download(
        { url },
        { state: { isGhost: true } }
      );
      const trajectory = await this.plugin.builders.structure.parseTrajectory(data, 'pdb');
      await this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
    } catch (error) {
      console.error('Error loading PDB:', error);
    }
  }

  dispose() {
    if (this.plugin) {
      this.plugin.dispose();
    }
    this.initCalled = false;
  }
}