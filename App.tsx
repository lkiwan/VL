
import React, { useState, useEffect, useRef } from 'react';
import CinematicIntro from './components/CinematicIntro';
import MainContent from './components/MainContent';
import { CONFIG } from './config';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(CONFIG.INTRO_ENABLED);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required):", e));
    }
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src={CONFIG.BACKGROUND_MUSIC} loop />
      
      {showIntro ? (
        <CinematicIntro onComplete={handleIntroComplete} />
      ) : (
        <MainContent startAudio={startAudio} />
      )}
    </div>
  );
};

export default App;
