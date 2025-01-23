import React, { useState } from "react";

const MolStarView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    {
      title: "Introduction to MolStar View",
      content:
        "The MolStar view refers to the graphical interface and visualization features provided by MolStar, designed to display molecular models and data in a way that is both scientifically accurate and easily interpretable by researchers, educators, and students. MolStar allows for the 3D visualization of molecular structures such as proteins, DNA, RNA, and small molecules, enabling users to rotate, zoom, and interact with these structures to examine them from different angles.",
    },
    {
      title: "Visualization Types in MolStar",
      content:
        "The visualization types in MolStar include cartoon representation, where the backbone is shown as a ribbon or stick model, emphasizing structural elements like helices and sheets; space-filling models, which depict atoms as spheres that fill the space in a molecular structure; and ball-and-stick models, which show atoms as spheres and bonds as sticks, providing a clear view of the atomic connections. MolStar can open molecular structures from various file formats like PDB (Protein Data Bank) files, CIF, and others, containing the 3D coordinates of atoms in the molecule.",
    },
    {
      title: "Interactive Tools in MolStar",
      content:
        "MolStar offers interactive tools that allow users to engage with the structure in real-time, such as rotating the molecule, zooming in or out, and highlighting specific regions. Users can select specific residues, chains, or regions of the structure to examine in more detail and add labels and annotations to clarify specific features. Additionally, users can display different parts of the structure simultaneously, which is useful for comparing multiple models or highlighting changes, such as in drug design.",
    },
    {
      title: "Color Schemes in MolStar",
      content:
        "The software also provides various color schemes to represent different aspects of the structure. Chain coloring allows each chain in a multi-chain protein to be displayed in different colors, while secondary structure coloring distinguishes helices, sheets, and loops. Atom-based coloring helps in understanding the molecular composition by coloring atoms according to their type, such as carbon, oxygen, or nitrogen.",
    },
    {
      title: "MolStar View in Scientific Research",
      content:
        "In scientific research, MolStar is frequently used in bioinformatics and molecular biology to visualize protein structures, enabling researchers to examine the arrangement of amino acids, active sites, and interactions between molecules. The ability to interact with the molecular structure aids in analyzing structural dynamics, understanding protein-ligand interactions, and modeling the effects of mutations. In drug discovery, MolStar is particularly useful for visualizing the binding of small molecules or drugs to target proteins, supporting the development of new pharmaceutical compounds.",
    },
  ];

  // const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div suppressHydrationWarning
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "dark bg-[#05042a]" : ""
      }`}
    >
      <div suppressHydrationWarning className="max-w-full mx-auto bg-white dark:bg-[#242f40] rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            What is MolStar View
            <div className="w-20 h-1 bg-blue-800 mx-auto mt-4 "></div>
          </h1>
          {sections.map((section, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <h2 className="text-2xl text-left leading-relaxed  pl-11 dark:text-white mb-4 flex items-center">
                {section.title}
              </h2>
              <p className="text-gray-700 text-left leading-relaxed mb-6 pl-11 dark:text-white">
                {section.content}
              </p>
              {index !== sections.length - 1 && (
                <div className="w-full h-px bg-purple-200 mx-auto my-8 dark:bg-gray-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MolStarView;
