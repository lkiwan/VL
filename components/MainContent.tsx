
import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import RunawayButton from './RunawayButton';
import confetti from 'canvas-confetti';

interface MainContentProps {
  startAudio: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ startAudio }) => {
  const [started, setStarted] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  const [flippedReasons, setFlippedReasons] = useState<number[]>([]);
  const [bigQuestionAnswered, setBigQuestionAnswered] = useState(false);
  const [picnicHearts, setPicnicHearts] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  // Combine memory images with captions
  const memories = [
    { ...CONFIG.MEMORY_CAPTIONS[0], image: CONFIG.IMAGES.MEMORY_PHOTO_1 },
    { ...CONFIG.MEMORY_CAPTIONS[1], image: CONFIG.IMAGES.MEMORY_PHOTO_2 },
    { ...CONFIG.MEMORY_CAPTIONS[2], image: CONFIG.IMAGES.MEMORY_PHOTO_3 },
    { ...CONFIG.MEMORY_CAPTIONS[3], image: CONFIG.IMAGES.MEMORY_PHOTO_4 },
    { ...CONFIG.MEMORY_CAPTIONS[4], image: CONFIG.IMAGES.MEMORY_PHOTO_5 },
    { ...CONFIG.MEMORY_CAPTIONS[5], image: CONFIG.IMAGES.MEMORY_PHOTO_6 },
  ];

  const handleStart = () => {
    setStarted(true);
    startAudio();
    // Scroll to welcome
    document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Carousel Auto-advance
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setCurrentMemory((prev) => (prev + 1) % memories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [started, memories.length]);

  const toggleFlip = (index: number) => {
    if (flippedReasons.includes(index)) {
      setFlippedReasons(flippedReasons.filter(i => i !== index));
    } else {
      setFlippedReasons([...flippedReasons, index]);
    }
  };

  const handleYes = () => {
    setBigQuestionAnswered(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff0000', '#ffffff']
    });
    
    // Fireworks effect loop
    const end = Date.now() + 5000;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ff0000']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ff0000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handlePicnicClick = () => {
    // Create heart animation
    const heartsArray = [];
    for (let i = 0; i < 20; i++) {
      heartsArray.push({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50
      });
    }
    setPicnicHearts(heartsArray);
    
    // Clear hearts after animation
    setTimeout(() => setPicnicHearts([]), 2000);
    
    // Open game in new tab
    window.open('/game/index.html', '_blank');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 overflow-x-hidden ${started ? '' : 'h-screen overflow-hidden'}`}>
      
      {/* SECTION 1: Landing Page */}
      <section className="h-screen relative flex flex-col items-center justify-center text-center px-4">
        {/* Floating Hearts BG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
             <div key={i} className="absolute text-pink-300 opacity-50 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 2 + 1}rem`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 4}s`
                  }}>
               ❤️
             </div>
          ))}
        </div>

        <h1 className="font-serif-display text-5xl md:text-7xl text-pink-600 mb-8 animate-fade-in-up">
           Our Journey Begins
        </h1>
        
        {!started && (
          <button 
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl rounded-full shadow-lg hover:scale-105 transition-transform animate-bounce"
          >
            Click to Start ❤️
          </button>
        )}
      </section>

      {/* Content only visible after start */}
      <div className={`transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* SECTION 2: Welcome Message */}
        <section id="welcome" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
               <img src={CONFIG.IMAGES.COUPLE_AVATAR} alt="Us" className="w-full h-full object-cover" />
             </div>
             <h2 className="font-serif-display text-4xl text-gray-800 mb-6">
               Happy Valentine's Day, {CONFIG.GIRLFRIEND_NAME}
             </h2>
             <p className="font-serif-body text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
               Welcome to a little page I made just for you. Scroll down to take a walk through our memories.
             </p>
          </div>
        </section>

        {/* SECTION 3: How We Met */}
        <section className="py-20 bg-pink-50">
           <h2 className="text-center font-serif-display text-4xl text-pink-600 mb-16">How It All Started</h2>
           <div className="max-w-5xl mx-auto px-4 relative">
             {/* Vertical Line */}
             <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 top-0 hidden md:block"></div>
             
             {/* Story Items */}
             <div className="space-y-12 md:space-y-24">
               {/* Item 1 */}
               <div className="flex flex-col md:flex-row items-center gap-8 relative">
                 <div className="flex-1 text-right order-2 md:order-1 pr-8">
                   <p className="font-serif-body text-lg text-gray-700 italic">{CONFIG.STORY_PARAGRAPHS[0]}</p>
                 </div>
                 <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-500 rounded-full border-4 border-white z-10 hidden md:block"></div>
                  <div className="flex-1 order-1 md:order-2 pl-8">
                    <video 
                      src={CONFIG.IMAGES.STORY_VIDEO_1} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 w-full md:w-80"
                    />
                  </div>
               </div>

               {/* Item 2 */}
               <div className="flex flex-col md:flex-row items-center gap-8 relative">
                 <div className="flex-1 text-right order-2 md:order-1 pr-8">
                    <img src={CONFIG.IMAGES.STORY_PHOTO_2} className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 w-full md:w-80 ml-auto" alt="Story 2"/>
                 </div>
                 <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-500 rounded-full border-4 border-white z-10 hidden md:block"></div>
                 <div className="flex-1 order-1 md:order-2 pl-8">
                    <p className="font-serif-body text-lg text-gray-700 italic">{CONFIG.STORY_PARAGRAPHS[1]}</p>
                 </div>
               </div>

                {/* Item 3 */}
               <div className="flex flex-col md:flex-row items-center gap-8 relative">
                 <div className="flex-1 text-right order-2 md:order-1 pr-8">
                   <p className="font-serif-body text-lg text-gray-700 italic">{CONFIG.STORY_PARAGRAPHS[2]}</p>
                 </div>
                 <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-500 rounded-full border-4 border-white z-10 hidden md:block"></div>
                 <div className="flex-1 order-1 md:order-2 pl-8">
                   <img src={CONFIG.IMAGES.STORY_PHOTO_3} className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 w-full md:w-80" alt="Story 3"/>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* SECTION 4: Memories Carousel */}
        <section className="py-20 bg-white">
          <h2 className="text-center font-serif-display text-4xl text-pink-600 mb-12">Our Favorite Memories</h2>
          <div className="max-w-4xl mx-auto px-4 relative group">
             <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                {memories.map((mem, index) => (
                  <div key={index} 
                       className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentMemory ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={mem.image} alt={mem.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                      <h3 className="text-2xl font-serif-display font-bold mb-2">{mem.title}</h3>
                      <p className="font-serif-body">{mem.description}</p>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Controls */}
             <button onClick={() => setCurrentMemory((prev) => (prev - 1 + memories.length) % memories.length)} 
                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full text-white backdrop-blur-sm transition-colors">
               ←
             </button>
             <button onClick={() => setCurrentMemory((prev) => (prev + 1) % memories.length)}
                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full text-white backdrop-blur-sm transition-colors">
               →
             </button>
             
             {/* Indicators */}
             <div className="flex justify-center gap-2 mt-4">
               {memories.map((_, idx) => (
                 <button key={idx} 
                         onClick={() => setCurrentMemory(idx)}
                         className={`w-3 h-3 rounded-full transition-all ${idx === currentMemory ? 'bg-pink-600 w-6' : 'bg-pink-300'}`} />
               ))}
             </div>
          </div>
        </section>

        {/* SECTION 5: Reasons I Love You */}
        <section className="py-20 bg-pink-50">
          <h2 className="text-center font-serif-display text-4xl text-pink-600 mb-4">Reasons I Love You</h2>
          <p className="text-center text-gray-500 mb-12">Tap a card to reveal ❤️ ({flippedReasons.length}/{CONFIG.LOVE_REASONS.length})</p>
          
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CONFIG.LOVE_REASONS.map((reason, idx) => (
              <div key={idx} className="h-40 perspective-1000 cursor-pointer" onClick={() => toggleFlip(idx)}>
                <div className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${flippedReasons.includes(idx) ? 'rotate-y-180' : ''}`}>
                  
                  {/* Front */}
                  <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-pink-100 group hover:border-pink-300 transition-colors">
                    <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">❤️</span>
                    <span className="absolute bottom-2 text-xs text-gray-400">Card #{idx + 1}</span>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-xl rotate-y-180 flex items-center justify-center p-4 text-center">
                    <p className="text-white font-serif-body font-bold text-lg">{reason}</p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Future Dreams */}
        <section className="py-20 bg-white">
          <h2 className="text-center font-serif-display text-4xl text-pink-600 mb-16">Our Future Together</h2>
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
            {CONFIG.FUTURE_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-xl hover:bg-pink-50 transition-colors duration-300">
                <span className="text-5xl">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: The BIG Question */}
        <section className="py-32 bg-pink-100 relative overflow-hidden text-center px-4">
           {!bigQuestionAnswered ? (
             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-serif-display text-5xl md:text-6xl text-pink-600 mb-8 animate-heartbeat">
                  Will You Be My Valentine?
                </h2>
                <p className="text-xl text-gray-600 mb-12 font-serif-body italic">
                  (There's only one right answer...)
                </p>
                <RunawayButton onYes={handleYes} />
             </div>
           ) : (
             <div className="relative z-10 animate-fade-in-up">
                <h2 className="font-serif-display text-6xl text-pink-600 mb-6">YAY! I Love You! 💖</h2>
                <p className="text-2xl text-gray-700">Best decision ever.</p>
             </div>
           )}
        </section>

        {/* SECTION 8: Love Letter */}
        <section className="py-20 bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${CONFIG.IMAGES.LETTER_BG_1})` }}>
           <div className="absolute inset-0 bg-black/60"></div>
           <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 bg-white/90 backdrop-blur-sm shadow-2xl rounded-sm md:transform md:rotate-1">
             <div className="font-serif-body text-gray-800 leading-loose text-lg">
               <h3 className="font-serif-display text-3xl mb-8 border-b-2 border-pink-200 pb-4">
                 {CONFIG.LOVE_LETTER.greeting}
               </h3>
               {CONFIG.LOVE_LETTER.paragraphs.map((para, idx) => (
                 <p key={idx} className="mb-6 indent-8">{para}</p>
               ))}
               <div className="mt-12 text-right">
                 <p className="font-script text-4xl text-pink-600">{CONFIG.LOVE_LETTER.signature}</p>
                 <p className="font-serif-display text-xl mt-2">{CONFIG.YOUR_NAME}</p>
               </div>
             </div>
           </div>
        </section>
        
        {/* SECTION 9: Picnic Button */}
        <section className="py-20 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center px-4 relative z-10">
            <h2 className="font-serif-display text-4xl text-pink-600 mb-8">Ready for Our Adventure?</h2>
            <p className="font-serif-body text-xl text-gray-700 mb-12">Let's create more beautiful memories together...</p>
            
            <div className="relative inline-block">
              <button
                onClick={handlePicnicClick}
                className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-2xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  🧺 let's start our picnic 💕
                </span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
              
              {/* Animated hearts */}
              {picnicHearts.map((heart) => (
                <div
                  key={heart.id}
                  className="absolute text-4xl pointer-events-none animate-heart-float"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(${heart.x}px, ${heart.y}px)`,
                    animation: 'heartFloat 2s ease-out forwards'
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
          </div>
          
          {/* Background decorative hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute text-pink-400 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 3 + 1}rem`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 4 + 5}s`
                }}
              >
                💕
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 bg-pink-900 text-pink-200 text-center text-sm">
          <p>Made with all my love for {CONFIG.GIRLFRIEND_NAME} ❤️</p>
        </footer>

      </div>
    </div>
  );
};

export default MainContent;
