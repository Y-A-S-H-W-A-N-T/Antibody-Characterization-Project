import PdbStructureViewer from '../../components/TableViewer'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        PDB Structure Viewer
      </h1>
      <PdbStructureViewer />
    </main>
  )
}