"use client";

// Import necessary dependencies for the MolStar viewer component
import { useEffect, useRef, useState } from "react";
import { MolstarWrapper } from "../lib/MostarWrapper";
import "molstar/lib/mol-plugin-ui/skin/light.scss";

// Define props interface for the MolstarViewer component
interface MolstarViewerProps {
  pdbId?: string; // Optional PDB ID for fetching structure from PDB
  localPdbPath?: string; // Optional path to local PDB file
  height?: string | number; // Height of the viewer container
  width?: string | number; // Width of the viewer container
  onWrapperReady?: (wrapper: MolstarWrapper) => void; // Callback when viewer is initialized
  polymer: any; // Polymer representation type
  property: any; // Property to visualize
}

export default function MolstarViewer({
  pdbId,
  localPdbPath,
  height = 480,
  width = "100%",
  onWrapperReady,
  polymer,
  property,
}: MolstarViewerProps) {
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Refs for DOM container and MolStar wrapper instance
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container div
  const wrapperRef = useRef<MolstarWrapper | null>(null); // Reference to MolStar wrapper instance
  const initializingRef = useRef(false); // Flag to prevent multiple initializations

  // Effect for initializing the MolStar viewer
  useEffect(() => {
    let mounted = true; // Flag to handle component unmounting

    const init = async () => {
      // Skip initialization if conditions aren't met
      if (
        !containerRef.current ||
        initializingRef.current ||
        wrapperRef.current
      )
        return;

      initializingRef.current = true;
      const wrapper = new MolstarWrapper();

      try {
        // Initialize the viewer
        wrapper.setTarget(containerRef.current);
        await wrapper.init();

        if (mounted) {
          wrapperRef.current = wrapper;
          // Notify parent component when wrapper is ready
          if (onWrapperReady) {
            onWrapperReady(wrapper);
          }
          // Load structure based on provided source
          if (pdbId) {
            await wrapper.loadPdb(pdbId, false, polymer, property);
          } else if (localPdbPath) {
            await wrapper.loadPdb(localPdbPath, true, polymer, property);
          }
        }
      } catch (error) {
        console.error("Failed to initialize viewer:", error);
      } finally {
        // Reset loading and initialization states
        if (mounted) {
          setLoading(false);
          initializingRef.current = false;
        }
      }
    };

    init();

    // Cleanup function to handle component unmounting
    return () => {
      mounted = false;
      if (wrapperRef.current) {
        wrapperRef.current.dispose();
        wrapperRef.current = null;
      }
      initializingRef.current = false;
    };
  }, [onWrapperReady, polymer, property]);

  // Effect for handling structure loading and visualization updates
  useEffect(() => {
    const loadStructure = async () => {
      // Only load if viewer is ready and not currently initializing
      if (!loading && wrapperRef.current && !initializingRef.current) {
        if (pdbId || localPdbPath) {
          setLoading(true);
          try {
            // Load new structure or update visualization
            await wrapperRef.current.loadPdb(
              pdbId || localPdbPath || "",
              !!localPdbPath,
              polymer,
              property
            );
          } catch (error) {
            console.error("Error loading structure:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    loadStructure();
  }, [pdbId, localPdbPath, polymer, property]);

  // Render the viewer container and loading indicator
  return (
    <div style={{ position: "relative", width, height }}>
      {/* Container for the MolStar viewer */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      {/* Loading overlay */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}
