import React from 'react';

interface SpiderWebProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: 'corner' | 'radial' | 'divider';
}

export const SpiderWebSvg: React.FC<SpiderWebProps> = ({
  className = '',
  size = 180,
  color = '#e2252b',
  variant = 'corner',
}) => {
  if (variant === 'divider') {
    return (
      <svg
        className={`w-full h-8 overflow-visible opacity-30 ${className}`}
        preserveAspectRatio="none"
        viewBox="0 0 1000 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20 Q 250 38, 500 20 T 1000 20"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M0 20 L 500 20 L 1000 20"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.75"
        />
        <circle cx="500" cy="20" r="3" fill={color} />
      </svg>
    );
  }

  if (variant === 'radial') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-500 ${className}`}
      >
        {/* Radiating Spoke Lines */}
        <line x1="100" y1="100" x2="100" y2="10" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="165" y2="35" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="190" y2="100" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="165" y2="165" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="100" y2="190" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="35" y2="165" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="10" y2="100" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="35" y2="35" stroke={color} strokeWidth="1" strokeOpacity="0.6" />

        {/* Concentric Spiral Strands */}
        <path
          d="M100 80 Q 120 85, 125 100 Q 120 115, 100 120 Q 80 115, 75 100 Q 80 85, 100 80 Z"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <path
          d="M100 60 Q 140 68, 145 100 Q 140 132, 100 140 Q 60 132, 55 100 Q 60 68, 100 60 Z"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M100 35 Q 165 48, 170 100 Q 165 152, 100 165 Q 35 152, 30 100 Q 35 48, 100 35 Z"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />
        <circle cx="100" cy="100" r="2.5" fill={color} />
      </svg>
    );
  }

  // Corner variant
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
    >
      {/* Corner Radiating Strands */}
      <line x1="0" y1="0" x2="200" y2="30" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="0" y1="0" x2="160" y2="90" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="0" y1="0" x2="110" y2="150" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="0" y1="0" x2="30" y2="200" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />

      {/* Cross web threads */}
      <path
        d="M60 9 Q 50 28, 35 48 Q 22 55, 9 60"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <path
        d="M110 16 Q 92 52, 65 90 Q 42 102, 16 110"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <path
        d="M160 24 Q 134 75, 95 130 Q 60 148, 24 160"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.35"
      />
      <path
        d="M200 30 Q 168 95, 118 162 Q 76 186, 30 200"
        stroke={color}
        strokeWidth="1.4"
        strokeOpacity="0.3"
      />
    </svg>
  );
};
