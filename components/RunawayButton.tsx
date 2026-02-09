
import React, { useState } from 'react';

interface RunawayButtonProps {
  onYes: () => void;
}

const RunawayButton: React.FC<RunawayButtonProps> = ({ onYes }) => {
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);

  const moveButton = () => {
    // Calculate safe area within viewport (keeping padding)
    const maxX = window.innerWidth - 100; // button width approx
    const maxY = window.innerHeight - 50; // button height approx
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setPosition({ top: `${newY}px`, left: `${newX}px` });
  };

  return (
    <div className="relative flex justify-center items-center gap-8 mt-12 h-20 w-full">
      <button
        onClick={onYes}
        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-xl shadow-lg transform hover:scale-110 transition-all z-20"
      >
        YES ❤️
      </button>

      <button
        onMouseEnter={moveButton}
        onTouchStart={moveButton} // For mobile
        style={position ? { position: 'fixed', top: position.top, left: position.left, transition: 'all 0.2s ease-out' } : {}}
        className="px-8 py-3 bg-gray-500 text-white font-bold rounded-full text-xl shadow-lg z-20"
      >
        NO 💔
      </button>
    </div>
  );
};

export default RunawayButton;
