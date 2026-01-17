import React, { useState, useEffect, useRef } from 'react';
import { GameState, Scene } from '../types';
import { 
  Activity, 
  Database, 
  Wifi, 
  ChevronLeft, 
  ChevronRight, 
  Binary, 
  Code2, 
  Hash, 
  Cpu, 
  Hexagon, 
  Triangle, 
  FileCode, 
  Globe,
  Github,
  ClipboardList
} from 'lucide-react';

interface TechHUDProps {
  gameState: GameState;
  script: Scene[];
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  onJump: (index: number) => void;
}

const TechHUD: React.FC<TechHUDProps> = ({ 
  gameState, 
  script, 
  children, 
  onNext, 
  onPrev, 
  onJump 
}) => {
  const debtPercentage = gameState.techDebtLevel;
  const currentIndex = gameState.currentSceneIndex;
  const currentScene = script[currentIndex];
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top smoothly when scene changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);
  
  // Mouse position state for parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine parallax intensity based on scene background effect
  let intensityMultiplier = 1;
  if (currentScene.backgroundEffect === 'glitch') intensityMultiplier = 2.5;
  if (currentScene.backgroundEffect === 'fire') intensityMultiplier = 1.5;
  if (currentScene.backgroundEffect === 'rain') intensityMultiplier = 1.2;

  // Color changes based on Debt level
  let debtColor = 'bg-stark-blue';
  if (debtPercentage > 50) debtColor = 'bg-yellow-500';
  if (debtPercentage > 80) debtColor = 'bg-rot-red';

  return (
    <div className="relative w-full h-screen h-[100dvh] bg-stark-dark text-stark-blue font-hud overflow-hidden flex flex-col select-none">
      
      {/* --- PARALLAX BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         {/* Layer 1: Deep Background (Slowest) */}
         <div 
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={{ 
              transform: `translate(${mousePos.x * -10 * intensityMultiplier}px, ${mousePos.y * -10 * intensityMultiplier}px)` 
            }}
         >
            <div className="absolute top-[10%] left-[10%] opacity-[0.03] text-stark-blue rotate-12">
               <Binary size={300} />
            </div>
            <div className="absolute bottom-[10%] right-[10%] opacity-[0.03] text-stark-blue -rotate-12">
               <Code2 size={400} />
            </div>
         </div>

         {/* Layer 2: Mid Background (Medium Speed) */}
         <div 
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={{ 
              transform: `translate(${mousePos.x * -25 * intensityMultiplier}px, ${mousePos.y * -25 * intensityMultiplier}px)` 
            }}
         >
            <Hexagon className="absolute top-[20%] right-[25%] opacity-[0.05] text-white animate-pulse-slow" size={80} strokeWidth={1} />
            <Triangle className="absolute bottom-[30%] left-[20%] opacity-[0.05] text-rot-red rotate-45" size={120} strokeWidth={1} />
            <Cpu className="absolute top-[15%] left-[40%] opacity-[0.04] text-stark-blue" size={60} />
         </div>

         {/* Layer 3: Near Background (Fastest) */}
         <div 
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={{ 
              transform: `translate(${mousePos.x * -40 * intensityMultiplier}px, ${mousePos.y * -40 * intensityMultiplier}px)` 
            }}
         >
            <div className="absolute top-[40%] left-[5%] opacity-[0.08] text-stark-blue font-code text-xs">
              0x45F2A9
            </div>
            <div className="absolute bottom-[20%] right-[30%] opacity-[0.08] text-rot-red font-code text-xs">
              ERR_CONNECTION_REFUSED
            </div>
            <Hash className="absolute top-[60%] right-[10%] opacity-[0.06] text-shield-gold" size={150} />
            <Globe className="absolute top-[5%] right-[5%] opacity-[0.05] text-stark-blue" size={200} />
         </div>

         {/* Dynamic "Rain" or "Particles" overlay based on effect */}
         {currentScene.backgroundEffect === 'rain' && (
           <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png')] opacity-0">
             {/* Simple CSS rain placeholder logic or just a overlay color */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 mix-blend-overlay"></div>
           </div>
         )}
      </div>

      {/* --- FILM GRAIN & SCANLINES --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-transparent via-[rgba(0,243,255,0.03)] to-transparent h-full w-full animate-scanline"></div>
      <div className="absolute inset-0 z-40 pointer-events-none bg-vignette"></div>

      {/* --- FIXED OVERLAY ELEMENTS (CORNERS) --- */}
      <div className="absolute inset-0 z-40 pointer-events-none hidden md:block">
        <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-stark-blue/30"></div>
        <div className="absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-stark-blue/30"></div>
        <div className="absolute bottom-24 left-8 w-16 h-16 border-l-2 border-b-2 border-stark-blue/30"></div>
        <div className="absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2 border-stark-blue/30"></div>
      </div>

      {/* --- TOP HUD BAR --- */}
      <div className="flex justify-between items-center p-4 md:p-6 z-50 border-b border-stark-blue/20 bg-stark-dark/80 backdrop-blur-sm shadow-lg shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
             <Activity className="animate-pulse text-stark-blue" />
             <div className="absolute inset-0 blur-sm text-stark-blue opacity-50"><Activity /></div>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="tracking-[0.2em] font-bold text-lg leading-none">SYS.ONLINE</span>
            <span className="text-[10px] text-stark-blue/50 font-code">SECURE CONNECTION</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
           {/* Tech Debt Meter */}
           <div className="flex flex-col items-end w-48 md:w-64">
              <div className="flex justify-between w-full text-xs mb-1 uppercase tracking-wider font-code">
                <span>Entropy</span>
                <span className={debtPercentage > 80 ? 'text-rot-red animate-pulse' : ''}>{debtPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-900 border border-gray-700 relative overflow-hidden group">
                {/* Background warning stripes if high debt */}
                {debtPercentage > 80 && (
                   <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ff0000_10px,#ff0000_20px)] opacity-20 animate-pulse"></div>
                )}
                <div 
                  className={`h-full ${debtColor} transition-all duration-1000 ease-out relative`} 
                  style={{ width: `${debtPercentage}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_white]"></div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div ref={contentRef} className="flex-1 relative z-30 overflow-y-auto custom-scrollbar">
         {/* Wrapper to center content but allow scroll if it overflows */}
         <div className="min-h-full w-full flex items-center justify-center p-4 md:p-12">
            {children}
         </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="z-50 bg-stark-dark/90 backdrop-blur-md border-t border-stark-blue/20 shrink-0">
        
        {/* Timeline Scrubber */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-end justify-between text-[10px] text-stark-blue/40 font-code mb-1 uppercase">
            <span>Mission Timeline</span>
            <span>{currentIndex + 1} / {script.length}</span>
          </div>
          <div className="flex h-8 items-center space-x-1">
            {script.map((scene, idx) => {
              const isActive = idx === currentIndex;
              const isPast = idx < currentIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => onJump(idx)}
                  className={`
                    group relative flex-1 rounded-sm transition-all duration-500 ease-out
                    ${isActive 
                        ? 'h-4 bg-white shadow-[0_0_15px_white] z-10' 
                        : isPast 
                            ? 'h-2 bg-stark-blue shadow-[0_0_8px_rgba(0,243,255,0.6)] hover:h-3 hover:bg-stark-blue/80' 
                            : 'h-1 bg-gray-800 hover:h-2 hover:bg-gray-700'
                    }
                  `}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[150px] hidden group-hover:block z-50">
                     <div className="bg-black border border-stark-blue p-2 text-xs text-white font-hud uppercase tracking-widest shadow-lg">
                        {scene.title}
                     </div>
                     <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-stark-blue mx-auto"></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Control Deck */}
        <div className="flex justify-between items-center px-6 py-4">
           {/* Left: System Stats */}
           <div className="flex space-x-6 text-xs text-stark-blue/60 font-code hidden md:flex">
             <div className="flex items-center gap-2">
               <Database size={14} />
               <span>CORE: CONNECTED</span>
             </div>
             <div className="flex items-center gap-2">
               <Wifi size={14} />
               <span>LATENCY: 12ms</span>
             </div>
             <a 
               href="https://github.com/voku/CodebaseKitchen" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-stark-blue transition-colors"
             >
               <Github size={14} />
               <span>CONTRIBUTE</span>
             </a>
           </div>

           {/* Center/Right: Navigation Controls */}
           <div className="flex items-center space-x-4 ml-auto w-full md:w-auto justify-between md:justify-end">
              
              <button 
                onClick={onPrev}
                disabled={currentIndex === 0}
                className={`
                  flex items-center px-4 py-2 border border-stark-blue/30 rounded
                  hover:bg-stark-blue/10 hover:border-stark-blue transition-all
                  ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}
                `}
              >
                <ChevronLeft size={16} className="mr-2" />
                <span className="font-hud uppercase tracking-wider text-sm">Prev</span>
              </button>

              <div className="h-6 w-[1px] bg-stark-blue/20 hidden md:block"></div>

              <button 
                onClick={() => onJump(script.length - 1)}
                className={`
                  flex items-center px-4 py-2 border border-stark-blue/30 rounded
                  hover:bg-stark-blue/10 hover:border-stark-blue transition-all
                `}
              >
                <ClipboardList size={16} className="mr-2" />
                <span className="font-hud uppercase tracking-wider text-sm">Overview</span>
              </button>

              <div className="h-6 w-[1px] bg-stark-blue/20 hidden md:block"></div>

              <button 
                onClick={onNext}
                disabled={currentIndex === script.length - 1}
                className={`
                   flex items-center px-6 py-2 bg-stark-blue/10 border border-stark-blue/50 rounded
                   hover:bg-stark-blue hover:text-black transition-all group
                   ${currentIndex === script.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}
                `}
              >
                <span className="font-hud uppercase tracking-wider text-sm font-bold mr-2">Next</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

    </div>
  );
};

export default TechHUD;