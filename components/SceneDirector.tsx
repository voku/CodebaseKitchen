import React, { useState, useEffect, useRef } from 'react';
import { Scene, SceneType, CodeOption, BattleType } from '../types';
import { 
  Play, 
  Terminal, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Code2, 
  Cpu, 
  ChevronRight, 
  Hash, 
  RotateCcw,
  Trophy,
  Skull,
  ClipboardList,
  ExternalLink
} from 'lucide-react';

interface SceneDirectorProps {
  scene: Scene;
  onNext: () => void;
  onQuizAnswer: (impact: number, sceneId?: string) => void;
  techDebtLevel: number;
  completedSceneIds: string[];
  allScenes: Scene[];
  onJump: (index: number) => void;
}

const SceneDirector: React.FC<SceneDirectorProps> = ({ 
  scene, 
  onNext, 
  onQuizAnswer, 
  techDebtLevel,
  completedSceneIds,
  allScenes,
  onJump
}) => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  
  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalFeedback, setTerminalFeedback] = useState<{msg: string, success: boolean} | null>(null);

  // Debug State
  const [debugSelectedLine, setDebugSelectedLine] = useState<number | null>(null);
  const [debugFeedback, setDebugFeedback] = useState<{msg: string, success: boolean} | null>(null);

  // Shake State
  const [isShaking, setIsShaking] = useState(false);
  
  // Parallax Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Reset state when scene changes
  useEffect(() => {
    setAnswered(false);
    setSelectedOptionId(null);
    setIsShaking(false);
    setTerminalInput('');
    setTerminalFeedback(null);
    setDebugSelectedLine(null);
    setDebugFeedback(null);
  }, [scene.id]);

  // Focus terminal input when needed
  useEffect(() => {
    if (scene.battleType === 'TERMINAL' && terminalInputRef.current && !answered) {
      terminalInputRef.current.focus();
    }
  }, [scene.battleType, scene.id, answered]);

  // Track mouse for 3D tilt effect on the card/content
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 40; // Reduced sensitivity
      const y = (e.clientY - innerHeight / 2) / 40;
      
      setTilt({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerShake = (impact: number) => {
    // Only shake if impact is positive (increasing debt/bad outcome)
    // A winning/correct answer usually reduces debt (negative impact)
    if (impact > 0 && Math.abs(impact) >= 10) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); 
    }
  };

  const handleOptionClick = (option: CodeOption) => {
    if (answered) return;
    triggerShake(option.debtImpact);
    setSelectedOptionId(option.id);
    setAnswered(true);
    // Explicitly pass the current scene ID to ensure it is marked as completed
    onQuizAnswer(option.debtImpact, scene.id);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answered) return;

    const trimmed = terminalInput.trim();
    const isCorrect = scene.validCommands?.includes(trimmed) || false;

    if (isCorrect) {
      setTerminalFeedback({ msg: scene.successMessage || 'COMMAND EXECUTED SUCCESSFULLY.', success: true });
      triggerShake(-10);
      onQuizAnswer(-10, scene.id); // Reward
      setAnswered(true);
    } else {
      setTerminalFeedback({ msg: scene.failMessage || `ERROR: Command '${trimmed}' not recognized or ineffective.`, success: false });
      setTerminalInput(''); 
      triggerShake(15);
      onQuizAnswer(15, scene.id); // Penalty
      setAnswered(true); 
    }
  };

  const handleDebugLineClick = (lineIndex: number) => {
    if (answered) return;

    if (lineIndex === scene.bugLine) {
      setDebugSelectedLine(lineIndex);
      setDebugFeedback({ msg: "BUG IDENTIFIED: Accidental assignment detected.", success: true });
      triggerShake(-10);
      onQuizAnswer(-10, scene.id);
      setAnswered(true);
    } else {
      setDebugSelectedLine(lineIndex);
      setDebugFeedback({ msg: "INCORRECT: This line is functional. Logic error persists.", success: false });
      triggerShake(20);
      onQuizAnswer(20, scene.id);
      setAnswered(true);
    }
  };

  const getRating = (debt: number) => {
    if (debt <= 35) return { 
        title: "10x Engineer", 
        message: "You see the Matrix. The code bends to your will. You clean up messes before they exist.", 
        color: "text-stark-blue", 
        icon: Trophy 
    };
    if (debt <= 55) return { 
        title: "Senior Architect", 
        message: "Solid work. You know when to cut corners and when to build castles. The project survives.", 
        color: "text-green-400", 
        icon: CheckCircle2 
    };
    if (debt <= 85) return { 
        title: "Spaghetti Chef", 
        message: "It works... mostly. But God help the person who has to touch `legacy_utils.ts`.", 
        color: "text-yellow-500", 
        icon: AlertCircle 
    };
    return { 
        title: "Chaos Agent", 
        message: "You are the reason we have trust issues. The rot consumes all. The project is doomed.", 
        color: "text-rot-red", 
        icon: Skull 
    };
  };

  const Icon = scene.icon || Terminal;

  // Render Code Helper (Updated for Debug interaction and styling)
  const renderCode = (code: string, isDebugMode: boolean = false) => {
    return code.split('\n').map((line, i) => {
      let className = "text-gray-300";
      const trimmed = line.trim();
      
      // Basic Syntax Highlighting Logic
      if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*')) {
        className = "text-gray-500 italic";
      } else if (scene.language === 'tree') {
        if (trimmed.includes('├──') || trimmed.includes('└──')) className = "text-stark-blue/60";
        if (trimmed.endsWith('.ts')) className = "text-blue-300";
      } else {
        if (trimmed.match(/^(import|export|from|return|if|else|switch|case|break|const|let|var|function|class|interface|type)\b/)) {
          className = "text-purple-400 font-bold";
        } else if (trimmed.match(/('.*?'|".*?")/)) {
           // This is a naive regex for strings, good enough for demo
           className = "text-green-400";
        } else if (trimmed.match(/\b(true|false|null|undefined)\b/)) {
           className = "text-orange-400";
        } else if (trimmed.match(/\b([A-Z][a-zA-Z0-9]*)\b/)) {
           // Likely a class or type
           className = "text-yellow-300";
        }
      }

      // Interaction classes for Debug Mode
      const interactionClass = isDebugMode && !answered 
        ? "cursor-pointer hover:bg-white/5 transition-colors group relative" 
        : "";
      
      let bgClass = "";
      let indicator = null;

      if (isDebugMode && answered) {
        if (i === scene.bugLine) {
           bgClass = "bg-green-500/10 border-l-2 border-green-500"; 
           indicator = <span className="absolute right-2 text-green-500 text-xs font-bold">[BUG]</span>;
        } else if (i === debugSelectedLine && i !== scene.bugLine) {
           bgClass = "bg-red-500/10 border-l-2 border-red-500";
           indicator = <span className="absolute right-2 text-red-500 text-xs font-bold">[SAFE]</span>;
        }
      } else if (isDebugMode && !answered) {
         // Hover effect helper
         bgClass = "hover:border-l-2 hover:border-stark-blue/50";
      }

      return (
        <div 
          key={i} 
          className={`flex ${interactionClass} ${bgClass} px-2 py-0.5 leading-6`}
          onClick={() => isDebugMode ? handleDebugLineClick(i) : undefined}
        >
          <span className="text-gray-700 select-none text-[10px] w-8 text-right pr-3 pt-0.5 font-mono opacity-50">{i + 1}</span>
          <span className={`font-code text-xs md:text-sm whitespace-pre-wrap flex-1 ${className}`}>
             {line}
          </span>
          {indicator}
        </div>
      );
    });
  };

  // --- RENDERERS ---

  if (scene.type === SceneType.RESULTS) {
    const battleScenes = allScenes.filter(s => s.type === SceneType.BATTLE);
    const missingBattles = battleScenes.filter(s => !completedSceneIds.includes(s.id));
    const isComplete = missingBattles.length === 0;

    if (!isComplete) {
       return (
        <div 
          ref={containerRef}
          className="max-w-4xl w-full space-y-8 animate-fade-in flex flex-col items-center perspective-1000"
          style={{ transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
        >
            <div className="mb-4 text-rot-red animate-pulse">
               <AlertCircle size={80} />
            </div>

            <h1 className="text-4xl md:text-5xl font-hero text-white tracking-widest uppercase text-glow-red">
               ANALYSIS INCOMPLETE
            </h1>
            
            <p className="text-lg text-gray-400 font-hud uppercase tracking-wide">
               Static Analysis Report: <span className="text-rot-red">{missingBattles.length} Modules Skipped</span>
            </p>

            <div className="w-full max-w-2xl bg-black/50 border border-rot-red/30 rounded-lg p-6 shadow-2xl backdrop-blur-md">
               <div className="flex items-center gap-2 text-rot-red mb-4 border-b border-rot-red/20 pb-2">
                  <ClipboardList size={20} />
                  <span className="font-code font-bold uppercase">Pending Tasks</span>
               </div>
               <ul className="space-y-3">
                  {missingBattles.map((missing) => (
                    <li key={missing.id}>
                       <button 
                         onClick={() => {
                            const idx = allScenes.findIndex(s => s.id === missing.id);
                            onJump(idx);
                         }}
                         className="w-full text-left flex items-center justify-between group p-3 rounded bg-rot-red/5 hover:bg-rot-red/10 border border-transparent hover:border-rot-red/40 transition-all"
                       >
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-rot-red"></div>
                             <span className="font-code text-sm text-gray-300 group-hover:text-white uppercase truncate">
                               {missing.title}
                             </span>
                          </div>
                          <div className="flex items-center text-rot-red/50 group-hover:text-rot-red text-xs font-bold uppercase gap-1">
                             <span>Debug</span>
                             <ExternalLink size={12} />
                          </div>
                       </button>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="mt-8 text-xs font-mono text-gray-600">
               // ERROR: Cannot generate deployment rating until all modules are verified.
            </div>
        </div>
       )
    }

    // WINNING STATE
    const rating = getRating(techDebtLevel);
    const RatingIcon = rating.icon;

    return (
      <div 
        ref={containerRef}
        className="text-center max-w-4xl w-full space-y-8 animate-fade-in flex flex-col items-center perspective-1000"
        style={{ transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
      >
        <div className="mb-4">
          <div className={`
             w-32 h-32 rounded-full border-4 ${techDebtLevel > 80 ? 'border-rot-red bg-rot-red/10' : 'border-stark-blue bg-stark-blue/10'} 
             flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)]
          `}>
             <RatingIcon size={64} className={rating.color} />
             <div className={`absolute inset-0 rounded-full border-2 ${rating.color} opacity-20 animate-ping`}></div>
          </div>
        </div>
        
        <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-hero text-white tracking-widest uppercase text-glow">
              {rating.title}
            </h1>
            <p className="text-xl md:text-2xl font-hud text-stark-blue/80 tracking-widest uppercase">
              FINAL ENTROPY LEVEL: <span className={techDebtLevel > 50 ? 'text-rot-red' : 'text-green-400'}>{techDebtLevel}%</span>
            </p>
        </div>

        <div className="max-w-2xl p-6 border border-white/10 bg-black/40 backdrop-blur-sm rounded-lg shadow-2xl">
           <p className={`font-code text-lg md:text-xl italic ${rating.color}`}>
              "{rating.message}"
           </p>
        </div>

        <div className="pt-8">
           <button 
             onClick={onNext}
             className="flex items-center gap-2 px-8 py-4 bg-stark-blue text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded shadow-[0_0_20px_rgba(0,243,255,0.4)]"
           >
             <RotateCcw size={20} />
             <span>Initialize New Sprint</span>
           </button>
        </div>
      </div>
    );
  }

  if (scene.type === SceneType.INTRO) {
    return (
      <div 
        ref={containerRef}
        className="text-center max-w-4xl space-y-8 animate-fade-in flex flex-col items-center perspective-1000"
        style={{ transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
      >
        <div className="mb-8">
          <button 
            onClick={onNext}
            className="group relative p-8 rounded-full bg-stark-dark/50 border border-stark-blue/30 hover:border-stark-blue hover:bg-stark-blue/10 transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full border border-stark-blue animate-ping opacity-20"></div>
            <Play className="w-16 h-16 text-stark-blue group-hover:scale-110 transition-transform" fill="currentColor" />
          </button>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-hero text-transparent bg-clip-text bg-gradient-to-b from-white to-stark-blue text-glow tracking-tighter drop-shadow-lg">
          {scene.title}
        </h1>
        <p className="text-xl md:text-2xl font-hud text-stark-blue/80 tracking-widest uppercase">
          {scene.subtitle}
        </p>
        
        <div className="max-w-xl p-4 border-l-2 border-stark-blue/50 bg-stark-blue/5 text-left font-code text-sm text-stark-blue/70 backdrop-blur-sm">
           <span className="block mb-2 text-xs opacity-50">// SYSTEM_MESSAGE</span>
           {scene.content}
        </div>
      </div>
    );
  }

  if (scene.type === SceneType.BATTLE) {
    const battleType = scene.battleType || 'QUIZ';

    return (
      <div className={`w-full max-w-7xl flex flex-col lg:h-full animate-fade-in pb-4 ${isShaking ? 'animate-shake' : ''}`}>
        {/* Battle Header */}
        <div className="flex items-center space-x-4 mb-6 border-l-4 border-rot-red pl-6 py-2">
          <div className="bg-rot-red/10 p-3 rounded text-rot-red animate-pulse border border-rot-red/20">
            <Icon size={32} />
          </div>
          <div>
             <h2 className="text-2xl md:text-3xl font-hero text-white text-glow-red uppercase tracking-wide">{scene.title}</h2>
             <div className="text-rot-red font-code text-xs flex items-center gap-2 uppercase tracking-widest mt-1">
               <AlertCircle size={12} />
               <span>Anomaly Detected // Intervention Required // TYPE: {battleType}</span>
             </div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-full lg:overflow-hidden">
          
          {/* LEFT: Context (IDE or Terminal Output) */}
          <div className="lg:w-3/5 flex flex-col lg:h-full min-h-[300px] perspective-1000">
            <div 
              className="flex flex-col h-full shadow-2xl transition-transform duration-100 ease-out"
              style={{ transform: `rotateY(${tilt.x * 0.5}deg) rotateX(${-tilt.y * 0.5}deg)` }}
            >
              <div className="bg-stark-dark border border-stark-blue/20 rounded-t-lg flex items-center px-4 py-2 space-x-2 select-none">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="ml-4 font-code text-xs text-stark-blue/40 flex items-center">
                  <Code2 size={12} className="mr-2" />
                  {scene.subtitle || 'module.ts'} 
                </div>
              </div>
              <div className="flex-1 bg-black/80 backdrop-blur border-x border-b border-stark-blue/20 rounded-b-lg p-0 overflow-auto font-code shadow-inner custom-scrollbar relative">
                {/* TERMINAL BATTLE DISPLAY */}
                {battleType === 'TERMINAL' && (
                  <div className="p-4 text-gray-300 font-mono whitespace-pre-wrap text-xs md:text-sm">
                    <div className="text-stark-blue/50 mb-2 border-b border-stark-blue/10 pb-2">Last Login: {new Date().toUTCString()} on ttys001</div>
                    {scene.terminalContext}
                    <div className="mt-4 flex items-center text-white">
                      <span className="text-green-500 mr-2">➜</span>
                      <span className="text-blue-400 mr-2">~</span>
                      {answered ? (
                        <span>{terminalInput}</span>
                      ) : (
                        <form onSubmit={handleTerminalSubmit} className="flex-1">
                          <input 
                            ref={terminalInputRef}
                            type="text" 
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            className="bg-transparent border-none outline-none text-white w-full animate-pulse focus:animate-none"
                            autoFocus
                          />
                        </form>
                      )}
                    </div>
                    {/* TERMINAL FEEDBACK */}
                    {terminalFeedback && (
                      <div className={`mt-2 ${terminalFeedback.success ? 'text-green-400' : 'text-red-400'}`}>
                        {terminalFeedback.msg}
                        {terminalFeedback.success && <div className="mt-1 text-[10px] text-stark-blue">DEBT IMPACT: -10%</div>}
                        {!terminalFeedback.success && <div className="mt-1 text-[10px] text-rot-red">DEBT IMPACT: +15%</div>}
                      </div>
                    )}
                  </div>
                )}

                {/* DEBUG & QUIZ CODE DISPLAY */}
                {(battleType === 'DEBUG' || battleType === 'QUIZ') && (
                  scene.codeContext ? (
                    <div className="w-full py-4">
                      {renderCode(scene.codeContext, battleType === 'DEBUG')}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-stark-blue/30">
                      NO SOURCE CODE DETECTED
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Interaction Panel */}
          <div className="lg:w-2/5 flex flex-col space-y-6">
            
            {/* The Question */}
            <div className="bg-stark-blue/5 border border-stark-blue/20 p-5 rounded-lg relative shadow-lg">
              <div className="absolute -top-3 -left-3 bg-stark-dark border border-stark-blue text-stark-blue px-2 py-0.5 text-[10px] font-hud uppercase tracking-widest">
                Mission Objective
              </div>
              <p className="font-hud text-lg md:text-xl text-white leading-relaxed">
                {scene.question}
              </p>
            </div>

            {/* Battle Specific Interaction */}
            <div className="flex-1 flex flex-col space-y-3 lg:overflow-y-auto pr-2">
              
              {/* QUIZ OPTIONS */}
              {battleType === 'QUIZ' && scene.options?.map((option) => {
                let statusClass = "border-stark-blue/30 bg-stark-dark/50 hover:bg-stark-blue/10 hover:border-stark-blue";
                if (answered) {
                  if (option.id === selectedOptionId) {
                     statusClass = option.isCorrect 
                       ? "border-green-500 bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
                       : "border-rot-red bg-red-900/20 shadow-[0_0_15px_rgba(255,42,42,0.2)]";
                  } else if (option.isCorrect) {
                     statusClass = "border-green-500/50 bg-green-900/10 opacity-70";
                  } else {
                     statusClass = "opacity-30 border-gray-700 grayscale";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    disabled={answered}
                    className={`
                      relative p-4 rounded border text-left transition-all duration-300 group
                      flex flex-col gap-2 transform hover:translate-x-1
                      ${statusClass}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-hud font-bold text-sm md:text-base text-white tracking-wide">
                        {option.label}
                      </span>
                      {answered && option.id === selectedOptionId && (
                         option.isCorrect ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-rot-red" />
                      )}
                    </div>
                    {option.code && (
                       <div className="font-code text-[10px] md:text-xs text-gray-400 bg-black/50 p-2 rounded border border-white/5 truncate w-full">
                         {option.code}
                       </div>
                    )}
                    {answered && (option.id === selectedOptionId || option.isCorrect) && (
                      <div className={`mt-2 text-xs border-t pt-2 ${option.isCorrect ? 'text-green-300 border-green-500/30' : 'text-red-300 border-red-500/30'}`}>
                        <span className="font-bold uppercase mr-2">{option.isCorrect ? 'Analysis:' : 'Warning:'}</span>
                        {option.explanation}
                        <div className="mt-1 font-code font-bold">
                          DEBT IMPACT: {option.debtImpact > 0 ? `+${option.debtImpact}%` : `${option.debtImpact}%`}
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}

              {/* TERMINAL INFO */}
              {battleType === 'TERMINAL' && (
                <div className="text-sm text-stark-blue/70 bg-stark-dark/50 p-4 rounded border border-stark-blue/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash size={16} />
                    <span className="font-bold">INSTRUCTIONS</span>
                  </div>
                  <p>Type the correct command in the terminal window to the left and press Enter.</p>
                  <p className="mt-2 text-xs opacity-70">Syntax matters. Failure will increase entropy.</p>
                </div>
              )}

              {/* DEBUG INFO */}
              {battleType === 'DEBUG' && (
                <div className="space-y-4">
                  <div className="text-sm text-stark-blue/70 bg-stark-dark/50 p-4 rounded border border-stark-blue/20">
                     <div className="flex items-center gap-2 mb-2">
                      <Cpu size={16} />
                      <span className="font-bold">DEBUGGER ACTIVE</span>
                    </div>
                    <p>Analyze the code on the left. Click on the line that contains the logic error.</p>
                  </div>
                  
                  {debugFeedback && (
                     <div className={`p-4 rounded border ${debugFeedback.success ? 'border-green-500 bg-green-900/20 text-green-400' : 'border-rot-red bg-red-900/20 text-red-400'} animate-fade-in`}>
                        <div className="font-bold flex items-center gap-2">
                           {debugFeedback.success ? <CheckCircle2 /> : <XCircle />}
                           {debugFeedback.success ? "SUCCESS" : "FAILURE"}
                        </div>
                        <p className="mt-1 text-sm">{debugFeedback.msg}</p>
                        <div className="mt-2 font-code text-xs font-bold border-t border-white/10 pt-2">
                          DEBT IMPACT: {debugFeedback.success ? '-10%' : '+20%'}
                        </div>
                     </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for generic narrative scenes (NARRATIVE, REVELATION, etc)
  const isGood = scene.backgroundEffect === 'clean' || scene.backgroundEffect === 'fire';
  const borderColor = isGood ? 'border-stark-blue' : 'border-rot-red';
  const textColor = isGood ? 'text-stark-blue' : 'text-rot-red';

  return (
    <div 
      ref={containerRef}
      className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-fade-in p-4 md:p-8 perspective-1000"
      style={{ transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)` }}
    >
      {/* Avatar / Icon */}
      <div className={`
        w-24 h-24 md:w-48 md:h-48 flex-shrink-0 rounded-full border-4 ${borderColor} 
        flex items-center justify-center bg-black shadow-2xl relative
        transition-transform duration-200 ease-out
      `}
      style={{ transform: `translateZ(30px)` }}
      >
         <div className={`absolute inset-0 rounded-full border-2 ${borderColor} opacity-50 animate-pulse`}></div>
         <Icon className={`w-12 h-12 md:w-24 md:h-24 ${textColor}`} />
         {scene.speaker && (
           <div className={`absolute -bottom-4 bg-black border ${borderColor} px-3 py-1 text-xs font-code ${textColor} tracking-widest uppercase shadow-lg`}>
             {scene.speaker}
           </div>
         )}
      </div>

      {/* Text Content */}
      <div 
        className="flex-1 space-y-6 text-center md:text-left bg-black/40 p-6 rounded-lg backdrop-blur-sm border border-white/5 shadow-xl"
        style={{ transform: `translateZ(20px)` }}
      >
         <h2 className="text-3xl md:text-5xl font-hero text-white tracking-wide uppercase drop-shadow-md">
           {scene.title}
         </h2>
         <div className="font-hud text-lg md:text-2xl text-gray-300 leading-relaxed whitespace-pre-line">
           {scene.content}
         </div>
      </div>
    </div>
  );
};

export default SceneDirector;