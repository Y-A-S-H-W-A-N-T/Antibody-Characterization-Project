'use client'
import { useEffect, useRef, useState } from 'react'
import { MolstarWrapper } from '../lib/MostarWrapper'
import 'molstar/lib/mol-plugin-ui/skin/light.scss'

interface MolstarViewerProps {
  pdbId?: string
  localPdbPath?: string
  height?: string | number
  width?: string | number
  onWrapperReady?: (wrapper: MolstarWrapper) => void
}

export default function MolstarViewer({
  pdbId,
  localPdbPath,
  height = 480,
  width = '100%',
  onWrapperReady,
}: MolstarViewerProps) {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<MolstarWrapper | null>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!containerRef.current || initializingRef.current || wrapperRef.current) return;
      
      initializingRef.current = true;
      const wrapper = new MolstarWrapper();
      
      try {
        wrapper.setTarget(containerRef.current);
        await wrapper.init();
        
        if (mounted) {
          wrapperRef.current = wrapper;
          if (onWrapperReady) {
            onWrapperReady(wrapper);
          }
          if (pdbId) {
            await wrapper.loadPdb(pdbId, false);
          } else if (localPdbPath) {
            await wrapper.loadPdb(localPdbPath, true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize viewer:', error);
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
  }, [onWrapperReady]);

  useEffect(() => {
    const loadStructure = async () => {
      if (!loading && wrapperRef.current && !initializingRef.current) {
        if (pdbId || localPdbPath) {
          setLoading(true);
          try {
            await wrapperRef.current.loadPdb(pdbId || localPdbPath || '', !!localPdbPath);
          } catch (error) {
            console.error('Error loading structure:', error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    loadStructure();
  }, [pdbId, localPdbPath]);

  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '1rem',
          borderRadius: '0.5rem'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}
