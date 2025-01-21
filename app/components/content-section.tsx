import React from "react"

const ContentSection = () => {
  const items = [
    {
      title: "SAP Score",
      description:
        "The SAP score (Score for Alignment of Sequences) is a numerical value used to assess the quality of alignment between two biological sequences, such as DNA, RNA, or protein sequences.",
      link: "Search sap-score",
    },
    {
      title: "Binding Energy",
      description:
        "Binding energy refers to the energy released when two molecules form a stable complex. The magnitude of binding energy indicates the strength of the interaction.",
      link: "Search Binding Energy",
    },
    {
      title: "Fv Net Charge",
      description:
        "The Fv region is the part of an antibody responsible for binding to the antigen. Its net charge depends on the amino acid composition and pH.",
      link: "Search Fv Net Charge",
    },
    {
      title: "BSA ",
      description:
        "Bovine Serum Albumin (BSA) is a protein used in laboratory experiments as a standard for protein quantification or as a stabilizer for enzymes.",
      link: "Search BSA",
    },
    {
      title: "Hydrodynamic Radius",
      description:
        "The hydrodynamic radius measures the size of a molecule in solution, reflecting its effective radius considering shape and solvent interactions.",
      link: "Search Hydrodynamic Radius",
    },
    {
      title: "Helix Ratio",
      description:
        "The helix ratio refers to the proportion of a protein's secondary structure in an alpha-helix conformation, important for protein folding and stability.",
      link: "Search Helix Ratio",
    },
    {
      title: "Sheet Ratio",
      description:
        "The sheet ratio refers to the proportion of a protein's secondary structure in a beta-sheet conformation, which is key to stability and function.",
      link: "Search Sheet Ratio",
    },
    {
      title: "PSH ",
      description:
        "Protein Surface Hydrophobicity (PSH) is a measure of how hydrophobic or hydrophilic the surface of a protein is.",
      link: "Search PSH",
    },
    {
      title: "PPC ",
      description:
        "A Protein-Protein Complex (PPC) is the interaction between two or more proteins forming a functional unit.",
      link: "Search PPC",
    },
    {
      title: "PNC ",
      description:
        "A Protein-Nucleic Acid Complex (PNC) is formed when a protein interacts with DNA or RNA, vital for processes like transcription.",
      link: "Search PNC",
    },
    {
      title: "PPA ",
      description:
        "Protein-Protein Association (PPA) refers to the process by which two or more proteins come together to form a functional complex.",
      link: "Search PPA",
    },
    {
      title: "Solvation Energy",
      description:
        "Solvation energy is the energy change when a molecule dissolves in a solvent, including interactions like hydrogen bonding.",
      link: "Search Solvation Energy",
    },
    {
      title: "Dipole Moment",
      description:
        "The dipole moment is a measure of the separation of positive and negative charges in a molecule, indicating its polarity.",
      link: "Search Dipole Moment",
    },
    {
      title: "Hydrophobic Moment",
      description:
        "The hydrophobic moment is a measure of the directional arrangement of hydrophobic residues, influencing protein folding and stability.",
      link: "Search Hydrophobic Moment",
    },
    {
      title: "Amphipathicity",
      description:
        "Amphipathicity refers to a molecule having both hydrophilic and hydrophobic regions, commonly seen in membrane proteins.",
      link: "Search Amphipathicity",
    },
    {
      title: "Extinction Coefficient",
      description:
        "The extinction coefficient measures how much light a substance absorbs at a specific wavelength, important in spectrophotometry.",
      link: "Search Extinction Coefficient",
    },
  ]

  return (
    <div className="relative w-full min-h-screen  rounded-3xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
  <h2 className="text-5xl text-black dark:text-white font-extrabold mb-4 p-10 rounded-3xl bg-blue-200 dark:bg-[#05042a]  ">
    Explore Biochemical & Biophysical Mysteries
  </h2>
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 duration-300 flex flex-col justify-between"
              style={{ minWidth: "250px", minHeight: "250px" }}
            >
              <div>
                <h3 className="text-left text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-left text-gray-700 dark:text-gray-300 mb-4 text-sm">{item.description}</p>
              </div>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium flex items-center mt-4"
              >
                {item.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentSection

