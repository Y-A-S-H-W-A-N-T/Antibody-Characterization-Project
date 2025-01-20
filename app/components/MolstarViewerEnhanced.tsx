'use client'

import { useEffect, useRef, useState } from 'react'
import { MolstarWrapper, Polymer } from '../lib/MostarWrapper'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const colorThemes = [
  { value: 'uniform', label: 'Uniform' },
  { value: 'chain-id', label: 'Chain ID' },
  { value: 'residue-type', label: 'Residue Type' },
  { value: 'sequence-id', label: 'Sequence ID' },
  { value: 'secondary-structure', label: 'Secondary Structure' },
  { value: 'molecule-type', label: 'Molecule Type' },
  { value: 'hydrophobicity', label: 'Hydrophobicity' },
  { value: 'electrostatic-potential', label: 'Electrostatic Potential' }
];

export type Polymer = 'ball-and-stick' | 'cartoon' | 'backbone' | 'carbohydrate' | 'ellipsoid' | 'gaussian-surface' | 'gaussian-volume' | 'label' | 'line' | 'molecular-surface' | 'orientation' | 'point' | 'putty' | 'spacefill'

interface MolstarViewerProps {
  pdbId?: string
  localPdbPath?: string
  height?: string | number
  width?: string | number
  polymer?: Polymer
}

export default function MolstarViewer({
  pdbId,
  localPdbPath,
  height = 480,
  width = '100%',
  polymer = 'molecular-surface'
}: MolstarViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<MolstarWrapper | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('chain-id');
  const [selectedPolymer, setSelectedPolymer] = useState('molecular-surface');
  const initializingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!containerRef.current || initializingRef.current || wrapperRef.current) return;
      
      initializingRef.current = true;
      const wrapper = new MolstarWrapper();
      
      try {
        setError(null);
        wrapper.setTarget(containerRef.current);
        await wrapper.init();
        
        if (mounted) {
          wrapperRef.current = wrapper;
          if (pdbId || localPdbPath) {
            await wrapper.loadPdb(pdbId || localPdbPath!, !!localPdbPath, polymer);
            await wrapper.updateColorTheme(selectedTheme);
          }
        }
      } catch (error) {
        console.error('Failed to initialize viewer:', error);
        if (mounted) {
          setError('Failed to initialize molecular viewer');
        }
      } finally {
        if (mounted) {
          setLoading(false);
          initializingRef.current = false;
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (wrapperRef.current) {
        wrapperRef.current.dispose();
        wrapperRef.current = null;
      }
      initializingRef.current = false;
    };
  }, [pdbId, localPdbPath]);

  const handleThemeChange = async (theme: string) => {
    setSelectedTheme(theme);
    if (wrapperRef.current && !loading) {
      try {
        await wrapperRef.current.updateColorTheme(theme);
      } catch (error) {
        console.error('Failed to update color theme:', error);
        setError('Failed to update color theme');
      }
    }
  };

  const handlePolymerChange = async (polymer: Polymer) => {
    setSelectedPolymer(polymer);
    if (wrapperRef.current && !loading) {
      try {
        await wrapperRef.current.loadPdb(pdbId || localPdbPath!, !!localPdbPath, polymer);
      } catch (error) {
        console.error('Failed to update color theme:', error);
        setError('Failed to update color theme');
      }
    }
  };

  return (
    <Card className="w-full h-full">
      <CardContent className="relative flex flex-col h-full p-0">
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="relative flex-1 min-h-[400px] overflow-hidden">
          <div
            ref={containerRef}
            className="absolute inset-0 bg-white"
            // style={{
            //   '& .msp-viewport-controls': {
            //     display: 'none !important'
            //   },
            //   '& .msp-layout-expanded': {
            //     position: 'absolute !important',
            //     inset: '0 !important'
            //   },
            //   '& .msp-layout-region': {
            //     display: 'none !important'
            //   },
            // }}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 p-4 border-t bg-white">
          <Label htmlFor="color-theme" className="text-sm font-medium">
            Color Theme
          </Label>
          <Select
            value={selectedTheme}
            onValueChange={handleThemeChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {colorThemes.map(theme => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex items-center gap-4 p-4 border-t bg-white">
          <Label htmlFor="color-theme" className="text-sm font-medium">
            Polymer Style
          </Label>
          <Select
            value={selectedPolymer}
            onValueChange={handlePolymerChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {Polymer.map(polymer => (
                <SelectItem key={polymer} value={polymer}>
                  {polymer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </CardContent>
    </Card>
  );
}