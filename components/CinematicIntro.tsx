
import React, { useEffect, useState } from 'react';
import { CONFIG } from '../config';

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<
    'dark' | 'text-fade' | 'light-reveal' | 'flower-transform' | 'transition'
  >('dark');
  
  const [petals, setPetals] = useState<{ char: string; tx: string; ty: string; rot: string; left: string; top: string; color: string }[]>([]);

  // Split text into characters for the flower effect
  const line1Chars = CONFIG.INTRO_TEXT_LINE1.split('');
  const line2Chars = CONFIG.GIRLFRIEND_NAME.split('');

  useEffect(() => {
    // Phase 1: Darkness (0-2s) -> Text Fade (start at 2s)
    const t1 = setTimeout(() => setPhase('text-fade'), 2000);
    
    // Phase 2: Light Reveal (start at 5s)
    const t2 = setTimeout(() => setPhase('light-reveal'), 5000);
    
    // Phase 3: Flower Transform (start at 8s)
    const t3 = setTimeout(() => {
        // Generate random physics for each character
        const generatePetals = (chars: string[], offsetTop: number) => {
            return chars.map((char, i) => ({
                char,
                tx: `${(Math.random() - 0.5) * 800}px`,
                ty: `${-Math.random() * 800}px`,
                rot: `${Math.random() * 720}deg`,
                left: 'auto', // Handled by flexbox layout usually, but for absolute we need coords. 
                              // Simplified: We keep them in flow then transform.
                top: 'auto',
                color: Math.random() > 0.5 ? '#ff6b9d' : (Math.random() > 0.5 ? '#c44569' : '#fff')
            }));
        };
        // Just triggering the phase change, the render logic handles the styles
        setPhase('flower-transform');
    }, 8000);

    // Phase 4: Transition to Main (start at 11s)
    const t4 = setTimeout(() => setPhase('transition'), 11000);

    // Complete (13s)
    const t5 = setTimeout(() => onComplete(), 13000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Helper to render text that explodes
  const renderExplodingText = (text: string, baseClass: string) => {
    return text.split('').map((char, i) => {
        const isSpace = char === ' ';
        // Random values for the flower effect
        const tx = `${(Math.random() - 0.5) * 100}vw`;
        const ty = `${-Math.random() * 100}vh`;
        const rot = `${Math.random() * 720}deg`;
        const delay = `${Math.random() * 0.5}s`;
        const color = Math.random() > 0.6 ? '#fda4af' : (Math.random() > 0.5 ? '#be123c' : '#ffffff');

        if (isSpace) return <span key={i} className="mx-2"></span>;

        return (
            <span
                key={i}
                className={`inline-block transition-all duration-1000 ${baseClass} ${phase === 'flower-transform' ? 'petal-anim' : ''}`}
                style={{
                    // @ts-ignore custom properties for css animation
                    '--tx': tx,
                    '--ty': ty,
                    '--rot': rot,
                    animationDelay: phase === 'flower-transform' ? delay : '0s',
                    color: phase === 'flower-transform' ? color : undefined,
                    textShadow: phase === 'flower-transform' ? 'none' : undefined
                }}
            >
                {/* When transforming, we can replace char with a petal shape or keep char fading out. 
                    The prompt asks for letters to break apart into petals. 
                    Visual trick: change character to a petal unicode or shape? 
                    Let's keep the character but style it like a petal. */}
                {char}
            </span>
        );
    });
  };

  if (phase === 'transition') {
      return (
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-2000 opacity-0 pointer-events-none">
              {/* Fading out */}
          </div>
      )
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden transition-colors duration-[3000ms] ${phase === 'light-reveal' || phase === 'flower-transform' ? 'bg-gradient-to-br from-black via-[#1a0505] to-[#2d0a12]' : ''}`}>
      
      {/* Light Source / Glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-[100px] transition-all duration-[3000ms] ease-out ${phase === 'light-reveal' || phase === 'flower-transform' ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}`}
      ></div>

      {/* Particle Effects (Simple CSS Stars) */}
      {(phase === 'light-reveal' || phase === 'flower-transform') && (
         <div className="absolute inset-0 overflow-hidden">
             {[...Array(20)].map((_, i) => (
                 <div key={i} 
                      className="absolute bg-white rounded-full animate-pulse"
                      style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 3 + 1}px`,
                          height: `${Math.random() * 3 + 1}px`,
                          animationDelay: `${Math.random() * 2}s`
                      }}
                 />
             ))}
         </div>
      )}

      {/* Main Text Area */}
      <div className={`relative z-10 text-center transition-opacity duration-[2000ms] ${phase === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Line 1 */}
        <h1 className="font-serif-display text-4xl md:text-6xl text-white/90 mb-4 tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
            {renderExplodingText(CONFIG.INTRO_TEXT_LINE1, "text-amber-100")}
        </h1>

        {/* Line 2 (Name) */}
        <h2 className="font-script text-6xl md:text-8xl text-pink-500 mt-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            {renderExplodingText(CONFIG.GIRLFRIEND_NAME, "text-pink-400")}
        </h2>

      </div>
      
    </div>
  );
};

export default CinematicIntro;
