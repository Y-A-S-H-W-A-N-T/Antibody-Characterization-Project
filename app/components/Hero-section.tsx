"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContentSection from "./content-section"; // Import ContentSection
import MolstarContent from "./Molstar-content";

const HeroSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 text-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500" />

      {/* Animated Antibody Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 dark:opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + i * 2}s infinite ease-in-out ${i * 2}s`,
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="transform rotate-45"
            >
              <path
                d="M60 20 L60 60 L30 90 M60 60 L90 90"
                className="stroke-blue-600 dark:stroke-blue-400"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{
                  animation: `pulse ${3 + i}s infinite ease-in-out ${i * 0.5}s`,
                }}
              />
              <circle cx="30" cy="90" r="6" className="fill-blue-500 dark:fill-blue-400" />
              <circle cx="90" cy="90" r="6" className="fill-blue-500 dark:fill-blue-400" />
              <circle cx="60" cy="20" r="6" className="fill-blue-500 dark:fill-blue-400" />
            </svg>
          </div>
        ))}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            75% { transform: translateY(20px) translateX(-10px); }
          }
          @keyframes pulse {
            0%, 100% { stroke-width: 4; }
            50% { stroke-width: 6; }
          }
        `}</style>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
      <motion.h1 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-5xl md:text-7xl mt-20 font-bold text-black p-3 font-inter dark:text-white"
>
  Antibody Characterization
</motion.h1>


        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
        >
          Antibodies are Y-shaped proteins that help identify and neutralize foreign invaders like bacteria and viruses. Explore their essential properties including hydrophobicity, polarity, and chain values.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link href="/pages/table-viewer">
            <Button className="px-8 py-4 text-lg font-semibold bg-black hover:bg-gray-700 text-white rounded-lg transform transition-all hover:scale-105 hover:shadow-lg">
              Explore Dashboard
            </Button>
          </Link>
          <Link href="/pages/documentation">
            <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 rounded-lg transform transition-all hover:scale-105">
              View Documentation
            </Button>
          </Link>
        </motion.div>

        {/* Info Cards with Enhanced Horizontal Scrolling */}
        <div className="relative mx-auto px-12 mb-12 max-w-full"> {/* Increased width of the container */}
          {/* Navigation Buttons */}
          <Button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black dark:bg-gray-800 shadow-lg hover:bg-gray-500 dark:hover:bg-gray-700 dark:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black dark:bg-gray-800 shadow-lg hover:bg-gray-500 dark:hover:bg-gray-700 dark:text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Scrolling Container */}
          <div 
            ref={scrollRef}
            className="overflow-x-auto flex gap-12 pb-8 pt-4 scrollbar-hide scroll-smooth"
          >
            {[
              { title: "Hydrophobicity", content: "Hydrophobicity measures how much an antibody repels water, influencing its stability and interactions.", bgColor: "bg-green-100 dark:bg-green-800" },
              { title: "Polarity", content: "Polarity affects an antibody's ability to dissolve in water and interact with different molecules.", bgColor: "bg-blue-100 dark:bg-blue-800" },
              { title: "H-chain (Heavy Chain)", content: "The heavy chain determines the antibody's class and function, such as IgG, IgA, or IgM.", bgColor: "bg-yellow-100 dark:bg-yellow-800" },
              { title: "L-chain (Light Chain)", content: "Light chains contribute to antigen binding and can be classified as kappa or lambda.", bgColor: "bg-purple-100 dark:bg-purple-800" },
              { title: "Isoelectric Point (pI)", content: "The isoelectric point is the pH at which a protein has no net charge, crucial for understanding protein solubility and purification.", bgColor: "bg-red-100 dark:bg-red-800" },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`flex-shrink-0 p-8 ${item.bgColor} dark:bg-opacity-70 rounded-xl shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 w-96 h-96 relative`}
              >
                <motion.h3
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
                >
                  {item.title}
                </motion.h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">{item.content}</p>
                <Button variant="outline" className="absolute bottom-8 left-8 right-8">
                  Know More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Add Content Section Below Hero Section */}
        <ContentSection />
        <MolstarContent />

        {/* Additional Content as Normal Text */}
        <div className="mt-8 text-gray-700 dark:text-gray-300 text-left space-y-6 leading-relaxed">
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
