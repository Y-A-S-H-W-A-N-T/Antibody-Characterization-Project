import React from 'react';

const AntibodyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10 dark:opacity-5"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${10 + i * 1.5}s infinite ease-in-out ${i * 1.5}s`, // Faster movement
          }}
        >
          <svg
            width="180" // Increased size
            height="180" // Increased size
            viewBox="0 0 120 120"
            className="transform rotate-45"
          >
            {/* Y-shaped antibody structure */}
            <path
              d="M60 20 L60 60 L30 90 M60 60 L90 90"
              className="stroke-blue-600 dark:stroke-blue-400"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              style={{
                animation: `pulse ${2 + i}s infinite ease-in-out ${i * 0.5}s`, // Faster pulse effect
              }}
            />
            {/* Binding sites (circles at the ends) */}
            <circle
              cx="30"
              cy="90"
              r="10" // Slightly larger binding site
              className="fill-blue-500 dark:fill-blue-400"
            />
            <circle
              cx="90"
              cy="90"
              r="8" // Slightly larger binding site
              className="fill-blue-500 dark:fill-blue-400"
            />
            <circle
              cx="60"
              cy="20"
              r="8" // Slightly larger binding site
              className="fill-blue-500 dark:fill-blue-400"
            />
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-40px) translateX(20px); // Bigger movement
          }
          75% {
            transform: translateY(40px) translateX(-20px); // Bigger movement
          }
        }
        @keyframes pulse {
          0%, 100% {
            stroke-width: 4;
          }
          50% {
            stroke-width: 6;
          }
        }
      `}</style>
    </div>
  );
};

export default AntibodyBackground;
