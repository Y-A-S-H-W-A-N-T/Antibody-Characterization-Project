"use client"
// import { useState } from 'react';
// import PdbStructureViewer from './component/TableViewer';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/Hero-section';
// import Documentation from './pages/Documentation'; 

export default function Home() {
  // const [isDocumentationVisible, setDocumentationVisible] = useState(false);

  // const toggleDocumentation = () => {
  //   setDocumentationVisible(!isDocumentationVisible);
  // };

  return (
    <main className="min-h-screen" suppressHydrationWarning>
      <Header />
       
        <HeroSection/>
{/* <Documentation /> */}
      {/* <PdbStructureViewer /> */}
      <Footer />
    </main>
  );
}
