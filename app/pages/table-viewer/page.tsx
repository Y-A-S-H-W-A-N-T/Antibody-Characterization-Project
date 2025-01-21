"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"
import Papa from "papaparse"
import MolstarViewer from "../../components/molstar"
import type { MolstarWrapper, Property, Polymer } from "../../lib/MostarWrapper"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import MolstarInfo from "@/app/components/Molstar-info"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
    "atom-id",
    "carbohydrate-symbol",
    "cartoon",
    "chain-id",
    "element-index",
    "element-symbol",
    "entity-id",
    "entity-source",
    "external-volume",
    "formal-charge",
    "hydrophobicity",
    "illustrative",
    "model-index",
    "molecule-type",
    "occupancy",
    "operator-hkl",
    "operator-name",
    "partial-charge",
    "polymer-id",
    "polymer-index",
    "residue-name",
    "secondary-structure",
    "sequence-id",
    "shape-group",
    "structure-index",
    "trajectory-index",
    "uncertainty",
    "uniform",
    "unit-index",
    "volume-segment",
    "volume-value",
  ]

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
            // Remove the last row (null data)
            const filteredData = results.data.filter((row) => row.Antibody !== null)
            setData(filteredData)
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

    if (value < range.low) return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
    if (value > range.high) return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
    return "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
  }

  const sortedData = data

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <MolstarInfo />

      <div className="flex flex-col lg:flex-row flex-1 w-full gap-8 p-4 md:p-8">
        <div className={`flex-1 ${selectedAntibody ? "lg:w-2/3" : "w-full"}`}>
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white p-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-center">Antibody Properties Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 dark:text-red-400 text-center">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100 dark:bg-gray-700">
                        {allColumns.map((column) => (
                          <TableHead
                            key={column}
                            className={`text-gray-700 dark:text-gray-200 font-semibold ${
                              column === "Antibody" ? "sticky left-0 bg-gray-100 dark:bg-gray-700 z-10" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{column}</span>
                              {column !== "Antibody" && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400"></span>
                                        <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400"></span>
                                        <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="flex flex-col gap-1">
                                        <p className="font-medium">
                                          Range: {PROPERTY_RANGES[column].low} - {PROPERTY_RANGES[column].high}
                                        </p>
                                        <div className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                          <span>Below {PROPERTY_RANGES[column].low}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                          <span>Within range</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                          <span>Above {PROPERTY_RANGES[column].high}</span>
                                        </div>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </TableHead>
                        ))}
                        <TableHead className="sticky right-0 bg-gray-100 dark:bg-gray-700 z-10 text-gray-900 dark:text-gray-100">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.map((antibody, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          {allColumns.map((column) => (
                            <TableCell
                              key={column}
                              className={`${
                                column === "Antibody" ? "sticky left-0 bg-white dark:bg-gray-800 z-10" : ""
                              } ${getCellColor(column, antibody[column])} transition-colors duration-200`}
                            >
                              {typeof antibody[column] === "number"
                                ? Number(antibody[column]).toFixed(2)
                                : antibody[column]}
                            </TableCell>
                          ))}
                          <TableCell className="sticky right-0 bg-white dark:bg-gray-800 z-10">
                            <Button
                              variant={selectedAntibody === antibody.Antibody ? "default" : "outline"}
                              size="sm"
                              className="flex items-center gap-2 transition-colors duration-200"
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
          <div className="w-full lg:w-[600px] mt-8 lg:mt-0">
            <Card className="shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white p-6">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl md:text-2xl font-bold">{selectedAntibody} Structure</span>
                  <Button
                    className="bg-white text-blue-800 hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-200 dark:hover:bg-gray-700"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAntibody(null)}
                  >
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <PropertySelector onPropertyChange={handlePropertyChange} />
                <PolymerSelector onPolymerChange={handlePolymerChange} />
                <div className="h-[600px] lg:h-[800px] overflow-y-auto mt-4 rounded-lg shadow-inner">
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

