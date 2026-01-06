import React, { useEffect, useState } from 'react';
import { AlertTriangle, Terminal, XCircle, ShieldAlert, GitPullRequest } from 'lucide-react';

interface SystemModalProps {
  isOpen: boolean;
  type: 'EXIT_INTENT' | 'GAME_OVER' | 'VICTORY';
  onClose: () => void;
  onConfirm?: () => void;
}

const DEV_JOKES = [
  "Are you sure? You have uncommitted changes in your soul.",
  "Leaving now triggers a NullReferenceException in your career path.",
  "Warning: This action equates to deploying on a Friday.",
  "You're just going to leave that dangling pointer?",
  "Abort? That's a SIGKILL to my heart, dev.",
  "Documentation says: 'Users who finish the game write 10x cleaner code.'"
];

const GAME_OVER_JOKES = [
  "Stack Overflow is down. You are on your own.",
  "Error: Success is undefined. ReferenceError: Hope not found.",
  "Your code is so spaghetti, Mario is trying to eat it.",
  "A bug in the code is worth two in the documentation.",
  "It works on my machine... but not here.",
  "You broke production on a Friday. Security is escorting you out.",
  "Critical Process Died. Have you tried turning it off and on again?",
  "418 I'm a teapot. (And your architecture is a disaster)",
  "Merge Conflict: Your Reality vs The Compiler."
];

const SystemModal: React.FC<SystemModalProps> = ({ isOpen, type, onClose, onConfirm }) => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (type === 'EXIT_INTENT') {
        const randomJoke = DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)];
        setJoke(randomJoke);
      } else if (type === 'GAME_OVER') {
        const randomJoke = GAME_OVER_JOKES[Math.floor(Math.random() * GAME_OVER_JOKES.length)];
        setJoke(randomJoke);
      }
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const isExit = type === 'EXIT_INTENT';
  const isGameOver = type === 'GAME_OVER';
  
  const borderColor = isExit ? 'border-shield-gold' : isGameOver ? 'border-rot-red' : 'border-stark-blue';
  const bgColor = isExit ? 'bg-yellow-900/90' : isGameOver ? 'bg-rot-dark/95' : 'bg-blue-950/90';
  const Icon = isExit ? AlertTriangle : isGameOver ? XCircle : ShieldAlert;
  const title = isExit ? "UNSAVED CONTEXT DETECTED" : isGameOver ? "SYSTEM FAILURE" : "DEPLOYMENT SUCCESSFUL";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className={`
        relative max-w-lg w-full mx-4 p-1 ${bgColor} 
        border-2 ${borderColor} shadow-[0_0_50px_rgba(0,0,0,0.8)]
        transform transition-all duration-300 scale-100
      `}>
        {/* Header */}
        <div className={`flex items-center gap-3 p-4 border-b ${borderColor} bg-black/40`}>
          <Icon className={isExit ? "text-shield-gold animate-bounce" : isGameOver ? "text-rot-red animate-pulse" : "text-white"} size={24} />
          <h2 className="font-hero text-xl tracking-widest text-white uppercase">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-8 text-center space-y-4">
          {isExit ? (
            <>
              <p className="font-code text-shield-gold text-lg">
                {joke}
              </p>
              <div className="font-hud text-xs text-white/50 mt-4 uppercase tracking-widest">
                // Entropy will continue to rise while you are gone
              </div>
            </>
          ) : isGameOver ? (
            <>
               <div className="text-rot-red mb-4">
                 <Terminal className="inline-block mb-2 w-12 h-12" />
               </div>
               <p className="font-hud text-xl text-white font-bold">
                 ENTROPY CRITICAL (100%)
               </p>
               <p className="font-code text-rot-red text-sm italic border-t border-rot-red/30 pt-4 mt-4">
                 "{joke}"
               </p>
               <p className="text-xs text-white/40 mt-2">The codebase has collapsed under its own weight.</p>
            </>
          ) : (
             <p className="font-hud text-xl text-stark-blue">
               You have successfully refactored the legacy core.
             </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex border-t border-white/10">
          <button 
            onClick={onClose}
            className={`flex-1 p-4 font-hud font-bold uppercase hover:bg-white/10 transition-colors ${isExit ? 'text-white' : 'text-gray-400'}`}
          >
            {isExit ? "Git Stash & Stay" : "Reboot System"}
          </button>
          {isExit && (
            <button 
              onClick={() => window.location.reload()} // Actual exit simulation
              className="flex-1 p-4 font-hud font-bold uppercase text-red-500 hover:bg-red-500/10 transition-colors border-l border-white/10"
            >
              Force Quit
            </button>
          )}
        </div>
        
        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white"></div>
      </div>
    </div>
  );
};

export default SystemModal;