"use client"
import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, ChevronDown, ChevronUp } from "lucide-react"
import Papa from "papaparse"
import MolstarViewer from "../../components/molstar"
import type { MolstarWrapper, Property, Polymer } from "../../lib/MostarWrapper"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import MolstarInfo from "@/app/components/Molstar-info"

interface AntibodyData {
  Antibody: string
  "Isoelectric point": number
  "Fv net charge": number
  Hydrophobicity: number
  "Extinction coeff": number
  BSA: number
  "Hydrodynamic radius": number
  "Helix ratio": number
  "Sheet ratio": number
  PSH: number
  PPC: number
  PNC: number
  PPA: number
  "Solvation energy": number
  "Binding energy": number
  "Dipole moment": number
  "Hydrophobic moment": number
  Amphipathicity: number
  "SAP score": number
}

const PROPERTY_RANGES: Record<keyof Omit<AntibodyData, "Antibody">, { low: number; high: number }> = {
  "Isoelectric point": { low: 6, high: 8 },
  Hydrophobicity: { low: -0.3, high: -0.2 },
  "SAP score": { low: 80, high: 100 },
  "Binding energy": { low: 20, high: 50 },
  "Fv net charge": { low: 0, high: 4 },
  BSA: { low: 700, high: 800 },
  "Hydrodynamic radius": { low: 23.5, high: 24 },
  "Helix ratio": { low: 0.03, high: 0.04 },
  "Sheet ratio": { low: 0.48, high: 0.52 },
  PSH: { low: 65, high: 75 },
  PPC: { low: 0.4, high: 0.6 },
  PNC: { low: 0.1, high: 0.3 },
  PPA: { low: 1800, high: 2200 },
  "Solvation energy": { low: -8500, high: -7500 },
  "Dipole moment": { low: 90, high: 120 },
  "Hydrophobic moment": { low: 60000, high: 75000 },
  Amphipathicity: { low: 0.8, high: 1.2 },
  "Extinction coeff": { low: 45000, high: 55000 },
}

interface PropertySelectorProps {
  onPropertyChange: (property: Property) => void
}

interface PolymerSelectorProps {
  onPolymerChange: (polymer: Polymer) => void
}

const PropertySelector: React.FC<PropertySelectorProps> = ({ onPropertyChange }) => {
  const properties = [
    'atom-id',
    'carbohydrate-symbol',
    'cartoon',
    'chain-id',
    'element-index',
    'element-symbol',
    'entity-id',
    'entity-source',
    'external-volume',
    'formal-charge',
    'hydrophobicity',
    'illustrative',
    'model-index',
    'molecule-type',
    'occupancy',
    'operator-hkl',
    'operator-name',
    'partial-charge',
    'polymer-id',
    'polymer-index',
    'residue-name',
    'secondary-structure',
    'sequence-id',
    'shape-group',
    'structure-index',
    'trajectory-index',
    'uncertainty',
    'uniform',
    'unit-index',
    'volume-segment',
    'volume-value'
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Property</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value: string) => onPropertyChange(value as Property)}>
          <SelectTrigger>
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            {properties.map((prop) => (
              <SelectItem key={prop} value={prop}>
                {prop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}

const PolymerSelector: React.FC<PolymerSelectorProps> = ({ onPolymerChange }) => {
  const Polymer = [
    "ball-and-stick",
    "cartoon",
    "backbone",
    "carbohydrate",
    "ellipsoid",
    "gaussian-surface",
    "gaussian-volume",
    "label",
    "line",
    "molecular-surface",
    "orientation",
    "point",
    "putty",
    "spacefill",
  ]

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Polymer</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value: string) => onPolymerChange(value as Polymer)}>
          <SelectTrigger>
            <SelectValue placeholder="Select polymer" />
          </SelectTrigger>
          <SelectContent>
            {Polymer.map((prop) => (
              <SelectItem key={prop} value={prop}>
                {prop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}

const AntibodyAnalysis = () => {
  const [data, setData] = useState<AntibodyData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AntibodyData | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })
  const [selectedAntibody, setSelectedAntibody] = useState<string | null>(null)
  const [molstarWrapper, setMolstarWrapper] = useState<MolstarWrapper | null>(null)
  const [polymerType, setPolymerType] = useState<Polymer>("molecular-surface")
  const [propertyType, setPropertyType] = useState<Property>("formal-charge")

  // Get all columns excluding 'Antibody' for initial display
  const allColumns: (keyof AntibodyData)[] = ["Antibody", ...(Object.keys(PROPERTY_RANGES) as (keyof AntibodyData)[])]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/agan_prop.csv")
        const csvText = await response.text()

        Papa.parse<AntibodyData>(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data)
            setLoading(false)
          },
          error: (error: { message: React.SetStateAction<string | null> }) => {
            setError(error.message)
            setLoading(false)
          },
        })
      } catch (error) {
        setError("Failed to load antibody data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getCellColor = (property: keyof AntibodyData, value: string | number) => {
    if (property === "Antibody" || typeof value !== "number") return ""

    const range = PROPERTY_RANGES[property as keyof typeof PROPERTY_RANGES]
    if (!range) return ""

    if (value < range.low) return "bg-red-100 transition-colors duration-200"
    if (value > range.high) return "bg-green-100 transition-colors duration-200"
    return "bg-amber-100 transition-colors duration-200"
  }

  const handleSort = (key: keyof AntibodyData) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof AntibodyData]
      const bValue = b[sortConfig.key as keyof AntibodyData]

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const handleViewStructure = (antibodyId: string) => {
    setSelectedAntibody(selectedAntibody === antibodyId ? null : antibodyId)
  }

  const handlePropertyChange = (property: Property) => {
    setPropertyType(property)
    console.log(property)
  }

  const handlePolymerChange = (polymer: Polymer) => {
    setPolymerType(polymer)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MolstarInfo/>

      <div className="flex flex-1 w-full gap-4 p-12">
        <div className={`flex-1 ${selectedAntibody ? "w-2/3" : "w-full"}`}>
          <Card className="bg-white    bg-[size:40px_40px]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-blue-950 rounded-xl p-5 m-2 text-white  text-center">Antibody Properties Analysis</CardTitle>
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
                            className={`text-gray-700 font-semibold cursor-pointer hover:bg-gray-50  ${
                              column === "Antibody" ? "sticky left-0 bg-white" : ""
                            }`}
                            onClick={() => handleSort(column)}
                          >
                            <div className="flex items-center gap-1">
                              {column}
                              {sortConfig.key === column &&
                                (sortConfig.direction === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                ))}
                            </div>
                          </TableHead>
                        ))}
                        <TableHead className="sticky right-0 bg-white text-black">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.map((antibody, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 ">
                          {allColumns.map((column) => (
                            <TableCell
                              key={column}
                              className={`${
                                column === "Antibody" ? "sticky left-0 bg-white" : ""
                              } ${getCellColor(column, antibody[column])}`}
                            >
                              {typeof antibody[column] === "number"
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
                              {selectedAntibody === antibody.Antibody ? "Hide Structure" : "View Structure"}
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
            <Card>
              <CardHeader className="border-b p-4 m-2 bg-blue-950 rounded-xl text-white">
                <CardTitle className="flex justify-between items-center">
                  <span>{selectedAntibody} Structure</span>
                  <Button className="text-black dark:text-white" variant="outline" size="sm" onClick={() => setSelectedAntibody(null)}>
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <PropertySelector onPropertyChange={handlePropertyChange} />
              <PolymerSelector onPolymerChange={handlePolymerChange} />
                <div className="h-[800px] overflow-y-auto">
                  <MolstarViewer
                    key={selectedAntibody}
                    localPdbPath={`/pdb/${selectedAntibody}.pdb`}
                    height="100%"
                    onWrapperReady={setMolstarWrapper}
                    polymer={polymerType}
                    property={propertyType}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

        )}
      </div>
      <Footer />
    </div>
  )
}

export default AntibodyAnalysis