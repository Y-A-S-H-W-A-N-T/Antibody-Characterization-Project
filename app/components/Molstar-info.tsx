import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dna, Microscope, Settings2 } from 'lucide-react';

const MolstarInfo = () => {
  return (
    <div className="min-h-screen bg-blue-50 rounded-2xl m-11  p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-gray-900">            Advanced visualization tool for molecular structures
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* File Support */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="text-blue-600" />
                File Format Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Load molecular files in various formats including PDB, CIF, and SMILES through direct 
                uploads or structure-specific IDs. Our versatile platform supports comprehensive 
                analysis of proteins, DNA, RNA, and small molecules.
              </p>
            </CardContent>
          </Card>

          {/* Visualization Styles */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Microscope className="text-purple-600" />
                Visualization Styles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose from multiple visualization styles including cartoon, ball-and-stick, 
                space-filling, and surface representations. Each style is optimized for specific 
                analytical needs and scientific accuracy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Features */}
        {/* <Card className="p-8 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl mb-6">
              <Maximize2 className="text-indigo-600" />
              Interactive Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
                <ul className="space-y-2 text-gray-600 list-none">
                  <li>Rotate structures for multi-angle viewing</li>
                  <li>Zoom in/out for detailed examination</li>
                  <li>Pan across the structure</li>
                  <li>• Advanced clipping plane controls</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Analysis Tools</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Measure distances between atoms</li>
                  <li>• Calculate bond angles</li>
                  <li>• Analyze dihedral angles</li>
                  <li>• Select and annotate residues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Research Applications */}
        <Card className="p-8 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl mb-6">
              <Settings2 className="text-green-600" />
              Research Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                MolStar View serves as a versatile platform for visualizing and understanding complex 
                biomolecular systems. The tools comprehensive features make it particularly valuable 
                in:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Drug Discovery</h4>
                  <p>
                    Analyze molecular interactions and binding sites with precision, supporting 
                    structure-based drug design and optimization.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Structural Biology</h4>
                  <p>
                    Study protein structures, conformational changes, and molecular dynamics with 
                    advanced visualization capabilities.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MolstarInfo;