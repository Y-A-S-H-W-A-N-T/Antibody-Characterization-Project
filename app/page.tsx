"use client"
// import { useState } from 'react';
// import PdbStructureViewer from './component/TableViewer';
import Header from './component/Header';
import Footer from './component/Footer';
import HeroSection from './component/Hero-section';
// import Documentation from './pages/Documentation'; 

export default function Home() {
  // const [isDocumentationVisible, setDocumentationVisible] = useState(false);

  // const toggleDocumentation = () => {
  //   setDocumentationVisible(!isDocumentationVisible);
  // };

  return (
    <main className="min-h-screen">
      <Header />
       
        <HeroSection/>
{/* <Documentation /> */}
      {/* <PdbStructureViewer /> */}
      <Footer />
    </main>
  );
}
