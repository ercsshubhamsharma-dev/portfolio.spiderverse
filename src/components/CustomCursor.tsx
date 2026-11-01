import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  primaryColor = '#e2252b',
  secondaryColor = '#00d4ff',
}) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom reticle cursor on mouse devices with hover
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
        setIsPointer(!!clickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Outer reticle ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 flex items-center justify-center ${
          isPointer
            ? 'w-10 h-10 border-white/80 bg-white/10 scale-125'
            : 'w-6 h-6 border-[#00d4ff]/60'
        }`}
        style={{
          borderColor: isPointer ? primaryColor : secondaryColor,
        }}
      >
        {/* Center dot */}
        <div
          className={`rounded-full transition-all duration-100 ${
            isPointer ? 'w-2 h-2' : 'w-1.5 h-1.5'
          }`}
          style={{ backgroundColor: isPointer ? secondaryColor : primaryColor }}
        />
      </div>
    </div>
  );
};
