'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import Papa from 'papaparse';
import MolstarViewer from './molstar';

interface AntibodyData {
  Antibody: string;
  'Isoelectric point': number;
  'Fv net charge': number;
  Hydrophobicity: number;
  'Extinction coeff': number;
  BSA: number;
  'Hydrodynamic radius': number;
  'Helix ratio': number;
  'Sheet ratio': number;
  PSH: number;
  PPC: number;
  PNC: number;
  PPA: number;
  'Solvation energy': number;
  'Binding energy': number;
  'Dipole moment': number;
  'Hydrophobic moment': number;
  Amphipathicity: number;
  'SAP score': number;
}

const PROPERTY_RANGES: Record<keyof Omit<AntibodyData, 'Antibody'>, { low: number; high: number }> = {
  'Isoelectric point': { low: 6, high: 8 },
  'Hydrophobicity': { low: -0.3, high: -0.2 },
  'SAP score': { low: 80, high: 100 },
  'Binding energy': { low: 20, high: 50 },
  'Fv net charge': { low: 0, high: 4 },
  'BSA': { low: 700, high: 800 },
  'Hydrodynamic radius': { low: 23.5, high: 24 },
  'Helix ratio': { low: 0.03, high: 0.04 },
  'Sheet ratio': { low: 0.48, high: 0.52 },
  'PSH': { low: 65, high: 75 },
  'PPC': { low: 0.4, high: 0.6 },
  'PNC': { low: 0.1, high: 0.3 },
  'PPA': { low: 1800, high: 2200 },
  'Solvation energy': { low: -8500, high: -7500 },
  'Dipole moment': { low: 90, high: 120 },
  'Hydrophobic moment': { low: 60000, high: 75000 },
  'Amphipathicity': { low: 0.8, high: 1.2 },
  'Extinction coeff': { low: 45000, high: 55000 }
};

const AntibodyAnalysis = () => {
  const [data, setData] = useState<AntibodyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AntibodyData | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [selectedAntibody, setSelectedAntibody] = useState<string | null>(null);

  // Get all columns excluding 'Antibody' for initial display
  const allColumns: (keyof AntibodyData)[] = ['Antibody', ...Object.keys(PROPERTY_RANGES) as (keyof AntibodyData)[]];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/agan_prop.csv');
        const csvText = await response.text();
        
        Papa.parse<AntibodyData>(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (error: { message: React.SetStateAction<string | null>; }) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (error) {
        setError('Failed to load antibody data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCellColor = (property: keyof AntibodyData, value: string | number) => {
    if (property === 'Antibody' || typeof value !== 'number') return '';
    
    const range = PROPERTY_RANGES[property as keyof typeof PROPERTY_RANGES];
    if (!range) return '';

    if (value < range.low) return 'bg-red-100 transition-colors duration-200';
    if (value > range.high) return 'bg-green-100 transition-colors duration-200';
    return 'bg-amber-100 transition-colors duration-200';
  };

  const handleSort = (key: keyof AntibodyData) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof AntibodyData];
      const bValue = b[sortConfig.key as keyof AntibodyData];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleViewStructure = (antibodyId: string) => {
    setSelectedAntibody(selectedAntibody === antibodyId ? null : antibodyId);
  };

  return (
    <div className="flex w-full gap-4">
      <div className={`flex-1 ${selectedAntibody ? 'w-2/3' : 'w-full'}`}>
        <Card className="bg-white bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] bg-[size:40px_40px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Antibody Properties Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {allColumns.map((column) => (
                        <TableHead 
                          key={column}
                          className={`text-gray-700 font-semibold cursor-pointer hover:bg-gray-50 ${
                            column === 'Antibody' ? 'sticky left-0 bg-white' : ''
                          }`}
                          onClick={() => handleSort(column)}
                        >
                          <div className="flex items-center gap-1">
                            {column}
                            {sortConfig.key === column && (
                              sortConfig.direction === 'asc' 
                                ? <ChevronUp className="w-4 h-4" /> 
                                : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="sticky right-0 bg-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.map((antibody, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        {allColumns.map((column) => (
                          <TableCell
                            key={column}
                            className={`${
                              column === 'Antibody' ? 'sticky left-0 bg-white' : ''
                            } ${getCellColor(column, antibody[column])}`}
                          >
                            {typeof antibody[column] === 'number'
                              ? Number(antibody[column]).toFixed(2)
                              : antibody[column]}
                          </TableCell>
                        ))}
                        <TableCell className="sticky right-0 bg-white">
                          <Button
                            variant={selectedAntibody === antibody.Antibody ? "default" : "outline"}
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleViewStructure(antibody.Antibody)}
                          >
                            <Eye className="w-4 h-4" />
                            {selectedAntibody === antibody.Antibody ? 'Hide Structure' : 'View Structure'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedAntibody && (
        <div className="w-[600px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{selectedAntibody} Structure</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAntibody(null)}
                >
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)]">
              <MolstarViewer
                key={selectedAntibody}
                localPdbPath={`/pdb/${selectedAntibody}.pdb`}
                height="100%"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AntibodyAnalysis;