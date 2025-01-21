"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/Hero-section";

export default function Home() {


  return (
    <main className="min-h-screen" suppressHydrationWarning>
      <Header />

      <HeroSection />
   
      <Footer />
    </main>
  );
}
