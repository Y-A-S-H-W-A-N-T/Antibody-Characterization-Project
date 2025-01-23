"use client";
import React, { useState, useEffect } from "react";
import { Database, Github, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the dark mode state from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    // Add or remove the dark class on the root element
    document.documentElement.classList.toggle("dark", isDarkMode);
    // Persist the dark mode state in localStorage
    // localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <motion.header
      // className={`sticky top-0   transition-all duration-300 ${
      //   isScrolled
      //     ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md"
      //     : "bg-transparent"
      // } ${
      //   isFullScreen
      //     ? "h-12 bg-transparent shadow-none flex justify-center items-center"
      //     : ""
      // }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 ${
          isFullScreen ? "hidden" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Antibody Analysis Platform
              </span>
            </Link>
          </motion.div>
          <motion.nav
            className={`hidden md:flex items-center space-x-6 ${
              isFullScreen ? "hidden" : ""
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/pages/table-viewer">
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
              >
                Dashboard Analysis
              </Button>
            </Link>
            <Link href="/pages/documentation">
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
              >
                Documentation
              </Button>
            </Link>
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="ghost"
              size="icon"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors ${
                isFullScreen ? "hidden" : ""
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            
              <a href="https://github.com/Y-A-S-H-W-A-N-T/Antibody-Characterization-Project"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground transition-colors ${
                isFullScreen ? "hidden" : ""
              }`}
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;