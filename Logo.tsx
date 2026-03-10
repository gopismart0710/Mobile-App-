
import React from 'react';

import { Logo } from '../Logo';<{ className?: string; size?: number }> = ({ className = "", size = 120 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The Main 'K' - Navy Blue Base */}
        <path
          d="M40 30V170H85V100L130 170H185L120 85L180 30H125L85 85V30H40Z"
          fill="#1e3a8a" 
          className="opacity-100"
        />
        
        {/* The Cyan Highlight Overlay */}
        <path
          d="M85 85L125 30H105L75 75V30H60V170H75V100L115 170H135L85 85Z"
          fill="#22d3ee"
          className="opacity-90"
        />

        {/* The Graph Wave Line */}
        <path
          d="M20 100H60L75 60L95 140L115 80L135 120L150 100H180"
          stroke="#22d3ee"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The Vertical Bar on the right (Plus-like feature) - Navy Blue */}
        <rect x="165" y="80" width="7" height="40" fill="#1e3a8a" rx="3" />

        {/* The Rising Arrow */}
        <path
          d="M150 100L185 45"
          stroke="#22d3ee"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M170 45H185V60"
          stroke="#22d3ee"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
