"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const Documentation: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  return (
    <main
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "dark:bg-gray-900 dark:text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header  />

      <article className="max-w-full mx-16 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden m-10">
        <header className="p-6">
          <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-8 text-center leading-tight">
            Antibody Characterization - Documentation
          </h1>
        </header>

        <section className="px-6 py-4 text-lg ">
          <h2 className="text-3xl font-semibold mb-4">Problem Solving Process</h2>
          <p className="mb-4">
            We are tasked with designing a web application to visualize antibody data. The key features include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>A table to display antibody scores, with color-coded scores and a &quot;View Structure&quot; button for each antibody.</li>
            <li>A 3D protein viewer that loads and displays the 3D structure of the antibody when the button is clicked.</li>
            <li>Dynamic property coloring of the protein structure, based on properties such as charge and hydrophobicity.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Process of Solving the Problem:</h3>
          <ol className="list-decimal pl-6 mb-4">
            <li><strong>Requirement Analysis and API Integration:</strong> We started by understanding the core requirements: fetching antibody data, rendering a table, integrating a 3D protein viewer, and applying dynamic coloring. API endpoints were defined for various purposes like fetching antibody data, PDB files, and residue-wise properties.</li>
            <li><strong>Frontend Design:</strong> The first step in the frontend workflow was to create the table displaying the antibody data, with color-coded scores and &quot;View Structure&quot; buttons.</li>
            <li><strong>Integrating Mol* Viewer:</strong> The Mol* viewer was integrated into the right panel for rendering the 3D structure when the user clicked the button.</li>
            <li><strong>Dynamic Property Coloring:</strong> Property data was fetched and used to apply dynamic coloring to the protein structure based on charge, hydrophobicity, and polarity.</li>
            <li><strong>User Interaction Flow:</strong> The flow was designed to fetch antibody data, display it in a table, and allow users to view the 3D structure with dynamic coloring.</li>
          </ol>

          <h3 className="text-2xl font-semibold mb-2">Resources Used:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Molstar Documentation:</strong> Essential for understanding how to load and manipulate the 3D structure in the viewer.</li>
            <li><strong>Molstar Viewer:</strong> Used for rendering the 3D protein structures and applying dynamic coloring.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Challenges Faced:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Dynamic Loading and Rendering:</strong> Ensuring smooth loading and rendering of the 3D structure, especially for larger structures.</li>
            <li><strong>Property Data Integration:</strong> Fetching and applying property data correctly, mapping residues to properties, and handling different property scales.</li>
            <li><strong>Cross-Component Communication:</strong> Managing communication between the table and the 3D viewer to ensure correct data flow.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Existing Problem vs. New Features:</h3>
          <p className="mb-4">
            <strong>Existing Problem:</strong> While protein structure visualization and basic property-based coloring are common in biological research applications, the integration of a dynamically updating scorecard with immediate 3D visualization was not common in simple web applications.
          </p>
          <p className="mb-4">
            <strong>New Features Added:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Integration of Mol* viewer for protein structure visualization in a web environment.</li>
            <li>Dynamic coloring of protein structures based on fetched property data.</li>
            <li>The table with color-coded scores, directly linked to protein structures, enhancing user experience with immediate visualization.</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2">Conclusion:</h3>
          <p className="mb-4">
            By combining a well-structured table, interactive 3D protein visualization, and dynamic coloring, we created a comprehensive and user-friendly antibody characterization web application. The integration of Mol* and careful handling of API data provided a smooth, interactive experience for users to analyze antibody properties and their associated 3D structures.
          </p>
        </section>
      </article>
      <article className="max-w-full mx-16 bg-white dark:bg-gray-800 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden m-10">
        <header className="p-6">
          <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-8 text-center leading-tight">
          Work Distribution Among Team Members
          </h1>
        </header>

        <section className="px-6 py-4 text-lg ">
          <h2 className="text-3xl font-semibold mb-4">3D Protein Viewer Integration - Rohan</h2>
          <p className="mb-4">I was responsible for integrating the Mol* viewer into the web application, ensuring that the 3D protein structure of the antibodies was rendered accurately in the right panel of the interface. My role involved setting up the viewer to load and display the PDB files associated with each antibody, ensuring that the structure was properly visualized for users.</p>
          <p className="mb-4">In addition, I focused on optimizing the viewer&apos;s performance, particularly when handling larger antibody structures. This included troubleshooting any performance issues related to slow loading or rendering, ensuring that the application could handle large datasets without lag or crashes. I also fine-tuned the viewer&apos;s configuration to ensure smooth and responsive interaction with the 3D model, allowing users to rotate, zoom, and explore the structure seamlessly.</p>
          <p className="mb-4">Overall, my work ensured that users could view the 3D structures in real-time, with the viewer functioning efficiently even when dealing with complex antibody structures. This contributed to a smooth, interactive experience for users analyzing the protein data.</p>
          



        </section>
        <section className="px-6 py-4 text-lg ">
          <h2 className="text-3xl font-semibold mb-4">Dynamic Property Coloring - Yashwant</h2>
          <p className="mb-4"> I worked on fetching property data and applying dynamic coloring to the 3D structure. This involved researching various techniques for residue-based coloring and experimenting with different approaches to implement dynamic coloring. I focused on applying gradient scales for continuous properties such as charge and hydrophobicity, where the coloring would change smoothly based on the property values. For properties with discrete values, I used distinct colors to represent different categories, making it easier for users to visually interpret the data.
</p>
          <p className="mb-4">Although I couldn&apos;t fully implement a seamless, real-time coloring solution, I made significant progress by integrating the property data into the 3D viewer. I developed the foundation for dynamic coloring and gained valuable insights into optimizing the process for better visual clarity and interaction. My work contributed to enhancing the user experience by providing a more informative and visually appealing representation of the protein&apos;s properties.
</p>

          <h2 className="text-3xl font-semibold mb-4">Frontend Development - Sonia </h2>
          <p className="mb-4">
          I have created a landing page with a user-friendly layout, incorporating a header and footer for easy navigation. My focus was on frontend design, where I worked on developing an intuitive and interactive user interface for the antibody characterization web application. To enhance the user experience, I added easy navigation buttons, making it simple for users to access different sections of the application. This design aimed to ensure that users can seamlessly interact with the application, quickly access relevant data, and navigate the web application efficiently.   In addition, I added &quot;View Structure&quot; buttons to each row, enabling users to fetch and view the 3D structure of the antibody with a simple click.         </p>



        </section>
      </article>

      <Footer />
    </main>
  );
};

export default Documentation;
