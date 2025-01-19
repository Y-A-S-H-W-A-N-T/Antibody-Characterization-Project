import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      className="w-full transition-colors duration-300"
      style={{
        background: 'linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)',
        filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#000328", endColorstr="#00458e", GradientType=1 )',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About</h3>
            <p className="text-gray-100 dark:text-gray-300 leading-relaxed">
              Our platform provides comprehensive tools for analyzing and visualizing antibody structures, enabling breakthrough discoveries in immunology research.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'API Reference', 'Tutorials', 'Research Papers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-100 dark:text-gray-300 hover:text-pink-200 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Data Usage', 'Licenses'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-100 dark:text-gray-300 hover:text-pink-200 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 dark:text-gray-300 hover:text-pink-200 transition-colors transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 dark:text-gray-300 hover:text-pink-200 transition-colors transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-100 dark:text-gray-300 hover:text-pink-200 transition-colors transform hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-100 dark:text-gray-300">
              © {new Date().getFullYear()} Antibody Analysis Platform
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
