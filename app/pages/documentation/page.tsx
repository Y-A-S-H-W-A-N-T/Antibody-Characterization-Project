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
      className={`min-h-screen transition-all duration-300 dark:bg-gray-900 ${
        isDarkMode ? "dark:bg-gray-900 dark:text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header />

      {/* Introduction Section */}
      <article className="max-w-7xl mx-auto bg-white dark:bg-gray-800 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden my-8">
        <header className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-6 text-center leading-tight">
            Antibody Analysis Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            A cutting-edge platform combining molecular visualization with actionable insights for efficient antibody research
          </p>
        </header>

        <section className="p-8">
          <div className="space-y-8">
            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Existing Problem</h2>
              <p className="text-gray-700 dark:text-gray-300">
              Scientists face significant challenges when analyzing complex antibody structures and their properties. Traditional methods rely heavily on physical lab tests, which are time-consuming, expensive, and often require multiple iterations to validate findings. Visualizing molecular structures and understanding their behavior at a detailed level can be cumbersome without an efficient digital tool.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Our Solution</h2>
              <p className="text-gray-700 dark:text-gray-300">
              Our project leverages (Molstar), a powerful 3D molecular visualization tool, to provide scientists with a detailed and interactive view of antibody structures. By enabling a virtual exploration of properties such as polymer views, color coding based on properties, and real-time adjustments, the app reduces the need for excessive lab tests and accelerates the decision-making process.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">What is This App About?
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
              The app provides a comprehensive platform for visualizing antibodies in 3D using Molstar, tailored to scientists' needs. Features include:
Interactive molecular structure visualization.
Property-based adjustments, such as polymer views and color coding.
Real-time data integration and property analysis.
A streamlined interface with a table listing all antibodies, and a "View Structure" button for instant 3D visualization.
This tool eliminates the dependency on repetitive lab testing and enhances the accuracy of molecular analysis.              </p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">What Scientists (Users) Can Do in Our App
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
              Scientists using the app can:
Visualize Antibody Structures: Open and explore detailed 3D structures of antibodies with Molstar.
Customize Views: Adjust polymer views, toggle visibility, and apply color coding based on molecular properties.
Analyze Properties: Add and view various properties directly within the visualization.
Compare Data: Use the property table to sort and filter entries, then visualize individual structures instantly.
Optimize Research: Gain insights and make data-driven decisions without relying on extensive lab testing.
This app empowers scientists to conduct precise and efficient research, accelerating breakthroughs in antibody studies.             </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4"> Our Idea
              </h2>
              {/* <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-900 flex items-center justify-center mr-3 mt-1">
                    1
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Interactive molecular structure visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-900 flex items-center justify-center mr-3 mt-1">
                    2
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Property-based adjustments and color coding</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-900 flex items-center justify-center mr-3 mt-1">
                    3
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Real-time data integration and analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-purple-200 dark:bg-purple-900 flex items-center justify-center mr-3 mt-1">
                    4
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">Streamlined interface with instant 3D visualization</span>
                </li>
              </ul> */}
              <p>We aim to create a cutting-edge platform that combines molecular visualization with actionable insights. Our app bridges the gap between computational modeling and hands-on lab work by enabling scientists to visualize, interact, and analyze antibody structures in a dynamic 3D environment. This allows for a more efficient and cost-effective research process.</p>
            </div>

            <div className="bg-amber-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4">User Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-amber-200 dark:bg-amber-900 flex items-center justify-center mr-4">
                      <span className="text-amber-800 dark:text-amber-300">🔬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">Visualize Structures</h3>
                      <p className="text-gray-600 dark:text-gray-400">Explore detailed 3D structures with Molstar</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-amber-200 dark:bg-amber-900 flex items-center justify-center mr-4">
                      <span className="text-amber-800 dark:text-amber-300">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">Real-time Analysis</h3>
                      <p className="text-gray-600 dark:text-gray-400">Instant property analysis and visualization</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-amber-200 dark:bg-amber-900 flex items-center justify-center mr-4">
                      <span className="text-amber-800 dark:text-amber-300">🎨</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">Customize Views</h3>
                      <p className="text-gray-600 dark:text-gray-400">Adjust polymer views and color coding</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-amber-200 dark:bg-amber-900 flex items-center justify-center mr-4">
                      <span className="text-amber-800 dark:text-amber-300">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">Compare Data</h3>
                      <p className="text-gray-600 dark:text-gray-400">visualize multiple structures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Original Documentation Content */}
      <article className="max-w-7xl mx-auto bg-white dark:bg-gray-800 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden my-8">
        <header className="p-8">
          <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-8 text-center leading-tight">
            Technical Documentation
          </h1>
        </header>

        <section className="px-8 py-6 space-y-8">
          {/* Original content sections... */}
          <div className="prose dark:prose-invert max-w-none">
  <p className="mb-4 font-semibold"> We are tasked with designing a web application to visualize antibody data. </p> <ul className="list-disc pl-6 mb-4"> <li> A table to display antibody scores, with color-coded scores and a "View Structure" button for each antibody. </li> <li> A 3D protein viewer that loads and displays the 3D structure of the antibody when the button is clicked. </li> <li> Dynamic property coloring of the protein structure, based on properties such as charge and hydrophobicity. </li> </ul> <h3 className="text-2xl font-semibold mb-2">Process of Solving the Problem:</h3> <ol className="list-decimal pl-6 mb-4"> <li> <strong>Requirement Analysis and API Integration:</strong> We started by understanding the core requirements: fetching antibody data, rendering a table, integrating a 3D protein viewer, and applying dynamic coloring. API endpoints were defined for various purposes like fetching antibody data, PDB files, and residue-wise properties. </li> <li> <strong>Frontend Design:</strong> The first step in the frontend workflow was to create the table displaying the antibody data, with color-coded scores and "View Structure" buttons. </li> <li> <strong>Integrating Mol* Viewer:</strong> The Mol* viewer was integrated into the right panel for rendering the 3D structure when the user clicked the button. </li> <li> <strong>Dynamic Property Coloring:</strong> Property data was fetched and used to apply dynamic coloring to the protein structure based on charge, hydrophobicity, and polarity. </li> <li> <strong>User Interaction Flow:</strong> The flow was designed to fetch antibody data, display it in a table, and allow users to view the 3D structure with dynamic coloring. </li> </ol> <h3 className="text-2xl font-semibold mb-2">Resources Used:</h3> <ul className="list-disc pl-6 mb-4"> <li> <strong>Molstar Documentation:</strong> Essential for understanding how to load and manipulate the 3D structure in the viewer. </li> <li> <strong>Molstar Viewer:</strong> Used for rendering the 3D protein structures and applying dynamic coloring. </li> </ul> <h3 className="text-2xl font-semibold mb-2">Challenges Faced:</h3> <p>Developing an intuitive and fully functional app using Molstar came with several challenges:</p> <ul className="list-disc pl-6 mb-4"> <li> <strong>Molstar Implementation:</strong> Understanding the integration of Molstar into our application was a complex task due to the lack of comprehensive examples and its advanced functionality. </li> <li> <strong>Rendering the Structure:</strong> Rendering 3D structures dynamically and ensuring smooth transitions in the UI required significant effort to optimize performance and maintain accuracy. </li> <li> <strong>Changing Properties and Polymer Views:</strong> Identifying how to modify molecular properties and switch between polymer views programmatically was challenging due to the intricate and less-documented API. </li> <li> <strong>Dynamic UI Updates:</strong> Implementing real-time adjustments to polymers and properties while reflecting these changes in the user interface demanded careful design and testing. </li> <li> <strong>Placement of Range Labels:</strong> Deciding where and how to display range labels for clarity without overcrowding the UI required iterative design improvements. </li> <li> <strong>UI Errors:</strong> Handling UI issues, such as ensuring compatibility with dark mode and addressing browser-specific errors, added complexity to the development process. </li> </ul>
  <h3 className="text-2xl font-semibold mb-2">How We Overcame These Issues</h3> <p>We addressed these challenges through a systematic approach:</p> <ul className="list-disc pl-6 mb-4"> <li> <strong>Documentation Study:</strong> <ul className="list-disc pl-6"> <li> We thoroughly studied the Molstar Viewer and Developer documentation to understand the tool’s capabilities and implementation details. </li> <li> We reviewed the documentation of the specific Molstar package integrated into our project to explore its API and features. </li> </ul> </li> <li> <strong>Code Exploration:</strong> <ul className="list-disc pl-6"> <li> Analyzed the Molstar package's GitHub repository to understand its internal workings and find practical usage examples. </li> <li> Referenced example implementations and community-contributed code to troubleshoot and enhance our application. </li> </ul> </li> <li> <strong>Leverage of LLMs:</strong> <ul className="list-disc pl-6"> <li> Used Large Language Models (LLMs) like v0, Claude, and ChatGPT to clarify concepts, debug issues, and generate solutions for implementation challenges. </li> </ul> </li> <li> <strong>Iterative Debugging and Testing:</strong> <ul className="list-disc pl-6"> <li> Performed iterative debugging to resolve rendering and UI errors. </li> <li> Continuously tested across different browsers and modes (including dark mode) to ensure compatibility and seamless performance. </li> </ul> </li> <li> <strong>Collaborative Problem Solving:</strong> <ul className="list-disc pl-6"> <li> Collaborated within the team to brainstorm and refine design and implementation strategies. </li> </ul> </li> </ul> <p>This multi-faceted approach enabled us to overcome the challenges effectively and deliver a robust application that meets scientists' needs for antibody visualization and analysis.</p>


            {/* Rest of the original content... */}
          </div>
        </section>
      </article>

      {/* Team Distribution Section */}
      <article className="max-w-7xl mx-auto bg-white dark:bg-gray-800 dark:text-gray-300 shadow-lg rounded-lg overflow-hidden my-8 mb-16">
        <header className="p-8">
          <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-8 text-center leading-tight">
            Work Distribution
          </h1>
        </header>

        <section className="px-8 py-6 space-y-8">
          {/* Original team distribution content... */}
        </section>
      </article>

      <Footer />
    </main>
  );
};

export default Documentation;