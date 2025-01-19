"use client";
import React, { useState, useEffect } from "react";
import { Database, Github, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header
      className="w-full sticky top-0 z-50 transition-all duration-300"
      style={{
        background:
          "linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-4 cursor-pointer">
                <Database className="w-8 h-8 text-white animate-pulse" />
                <h1 className="text-xl font-bold text-white">
                  Antibody Characterization
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link href="/pages/table-viewer">
                <Button
                  variant="ghost"
                  className="text-white hover:text-pink-200 transition-all duration-300 transform hover:scale-105"
                >
                  Dashboard Analysis
                </Button>
              </Link>
              <Link href="/pages/documentation">
                <Button
                  variant="ghost"
                  className="text-white hover:text-pink-200 transition-all duration-300 transform hover:scale-105"
                >
                  Documentation
                </Button>
              </Link>
            </nav>

            <Button
              onClick={toggleTheme}
              variant="ghost"
              className="text-white hover:text-pink-200 transition-all duration-300 transform hover:scale-105"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </Button>

            <a
              href="https://github.com/Y-A-S-H-W-A-N-T/Antibody-Characterization-Project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-200 transition-all duration-300 transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;