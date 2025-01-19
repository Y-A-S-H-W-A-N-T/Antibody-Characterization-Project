import React from 'react';

const ContentSection = () => {
  const items = [
    {
      title: "SAP Score",
      description: "The SAP score (Score for Alignment of Sequences) is a numerical value used to assess the quality of alignment between two biological sequences, such as DNA, RNA, or protein sequences.",
      link: "Search sap-score",
      bgColor: "bg-white"
    },
    {
      title: "Binding Energy",
      description: "Binding energy refers to the energy released when two molecules form a stable complex. The magnitude of binding energy indicates the strength of the interaction.",
      link: "Search Binding Energy",
      bgColor: "bg-white"
    },
    {
      title: "Fv Net Charge",
      description: "The Fv region is the part of an antibody responsible for binding to the antigen. Its net charge depends on the amino acid composition and pH.",
      link: "Search Fv Net Charge",
      bgColor: "bg-white"
    },
    {
      title: "BSA (Bovine Serum Albumin)",
      description: "Bovine Serum Albumin (BSA) is a protein used in laboratory experiments as a standard for protein quantification or as a stabilizer for enzymes.",
      link: "Search BSA",
      bgColor: "bg-white"
    },
    {
      title: "Hydrodynamic Radius",
      description: "The hydrodynamic radius measures the size of a molecule in solution, reflecting its effective radius considering shape and solvent interactions.",
      link: "Search Hydrodynamic Radius",
      bgColor: "bg-white"
    },
    {
      title: "Helix Ratio",
      description: "The helix ratio refers to the proportion of a protein’s secondary structure in an alpha-helix conformation, important for protein folding and stability.",
      link: "Search Helix Ratio",
      bgColor: "bg-white"
    },
    {
      title: "Sheet Ratio",
      description: "The sheet ratio refers to the proportion of a protein's secondary structure in a beta-sheet conformation, which is key to stability and function.",
      link: "Search Sheet Ratio",
      bgColor: "bg-white"
    },
    {
      title: "PSH (Protein Surface Hydrophobicity)",
      description: "Protein Surface Hydrophobicity (PSH) is a measure of how hydrophobic or hydrophilic the surface of a protein is.",
      link: "Search PSH",
      bgColor: "bg-white"
    },
    {
      title: "PPC (Protein-Protein Complex)",
      description: "A Protein-Protein Complex (PPC) is the interaction between two or more proteins forming a functional unit.",
      link: "Search PPC",
      bgColor: "bg-white"
    },
    {
      title: "PNC (Protein-Nucleic Acid Complex)",
      description: "A Protein-Nucleic Acid Complex (PNC) is formed when a protein interacts with DNA or RNA, vital for processes like transcription.",
      link: "Search PNC",
      bgColor: "bg-white"
    },
    {
      title: "PPA (Protein-Protein Association)",
      description: "Protein-Protein Association (PPA) refers to the process by which two or more proteins come together to form a functional complex.",
      link: "Search PPA",
      bgColor: "bg-white"
    },
    {
      title: "Solvation Energy",
      description: "Solvation energy is the energy change when a molecule dissolves in a solvent, including interactions like hydrogen bonding.",
      link: "Search Solvation Energy",
      bgColor: "bg-white"
    },
    {
      title: "Dipole Moment",
      description: "The dipole moment is a measure of the separation of positive and negative charges in a molecule, indicating its polarity.",
      link: "Search Dipole Moment",
      bgColor: "bg-white"
    },
    {
      title: "Hydrophobic Moment",
      description: "The hydrophobic moment is a measure of the directional arrangement of hydrophobic residues, influencing protein folding and stability.",
      link: "Search Hydrophobic Moment",
      bgColor: "bg-white"
    },
    {
      title: "Amphipathicity",
      description: "Amphipathicity refers to a molecule having both hydrophilic and hydrophobic regions, commonly seen in membrane proteins.",
      link: "Search Amphipathicity",
      bgColor: "bg-white"
    },
    {
      title: "Extinction Coefficient",
      description: "The extinction coefficient measures how much light a substance absorbs at a specific wavelength, important in spectrophotometry.",
      link: "Search Extinction Coefficient",
      bgColor: "bg-white"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-blue-100 dark:bg-[#05042a] rounded-3xl">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 bg-clip-text mb-4">
          Explore Biochemical & Biophysical Mysteries
        </h2>
        {/* <p className="text-lg text-gray-900 dark:text-white opacity-80 max-w-3xl mx-auto">
          Search across the most complete life science research reagent database, covering 18 key biochemical & biophysical topics.
        </p> */}
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 duration-300"
            style={{ minWidth: "250px" }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 font-medium flex items-center"
            >
              {item.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default ContentSection;