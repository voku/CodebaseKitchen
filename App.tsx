import React, { useState, useEffect, useCallback } from 'react';
import TechHUD from './components/TechHUD';
import SceneDirector from './components/SceneDirector';
import SystemModal from './components/SystemModal';
import { movieScript } from './data/movieScript';
import { GameState, SceneType } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneIndex: 0,
    techDebtLevel: 20,
    isMovieStarted: false,
    gameStatus: 'PLAYING',
    completedSceneIds: []
  });

  const [showExitModal, setShowExitModal] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  const currentScene = movieScript[gameState.currentSceneIndex];

  // --- ENTROPY SYSTEM (Tech Debt Timer) ---
  useEffect(() => {
    // Timer starts only after the intro (Scene Index > 0) and pauses if Game Over/Results
    if (
      gameState.currentSceneIndex > 0 && 
      gameState.gameStatus === 'PLAYING' &&
      currentScene.type !== SceneType.RESULTS
    ) {
      
      // Story Trigger: Initial Entropy Warning
      if (gameState.currentSceneIndex === 1 && gameState.techDebtLevel === 20) {
        setSystemMessage("WARNING: BACKGROUND ENTROPY INITIATED. CODEBASE DECAYING...");
        setTimeout(() => setSystemMessage(null), 5000);
      }

      const decayInterval = setInterval(() => {
        setGameState(prev => {
          // If debt hits 100, game over
          if (prev.techDebtLevel >= 100) {
             clearInterval(decayInterval);
             return { ...prev, techDebtLevel: 100, gameStatus: 'GAME_OVER' };
          }
          // Increase debt by 1 every 3 seconds (was 6s) to simulate faster "Rot"
          return { ...prev, techDebtLevel: prev.techDebtLevel + 1 };
        });
      }, 3000); // 3 seconds per tick - One step forward, two steps back.

      return () => clearInterval(decayInterval);
    }
  }, [gameState.currentSceneIndex, gameState.gameStatus, currentScene.type]);


  // --- EXIT INTENT LISTENER ---
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves the top of the viewport (intending to close tab/url bar)
      if (e.clientY <= 0 && gameState.gameStatus === 'PLAYING') {
        setShowExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [gameState.gameStatus]);


  const handleNext = useCallback(() => {
    setGameState(prev => {
      if (prev.gameStatus !== 'PLAYING') return prev;

      if (prev.currentSceneIndex < movieScript.length - 1) {
        return { ...prev, currentSceneIndex: prev.currentSceneIndex + 1 };
      } else if (movieScript[prev.currentSceneIndex].type === SceneType.RESULTS) {
        // Loop back to start
        return { 
          ...prev, 
          currentSceneIndex: 0, 
          techDebtLevel: 20,
          completedSceneIds: [] // Reset completions on restart
        };
      }
      return prev;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setGameState(prev => {
      if (prev.gameStatus !== 'PLAYING') return prev;
      if (prev.currentSceneIndex > 0) {
        return { ...prev, currentSceneIndex: prev.currentSceneIndex - 1 };
      }
      return prev;
    });
  }, []);

  const handleJump = useCallback((index: number) => {
    if (gameState.gameStatus !== 'PLAYING') return;
    if (index >= 0 && index < movieScript.length) {
      setGameState(prev => ({ ...prev, currentSceneIndex: index }));
    }
  }, [gameState.gameStatus]);

  const handleQuizAnswer = (impact: number, explicitSceneId?: string) => {
    setGameState(prev => {
      // Use the explicit ID if provided (safer), otherwise fallback to current index
      const sceneId = explicitSceneId || movieScript[prev.currentSceneIndex].id;
      
      const newDebt = Math.max(0, Math.min(100, prev.techDebtLevel + impact));
      
      // Track completion
      const alreadyCompleted = prev.completedSceneIds.includes(sceneId);
      const newCompleted = alreadyCompleted ? prev.completedSceneIds : [...prev.completedSceneIds, sceneId];
      
      // Check for instant failure on answer
      if (newDebt >= 100) {
        return { ...prev, techDebtLevel: 100, gameStatus: 'GAME_OVER' };
      }

      return {
        ...prev,
        techDebtLevel: newDebt,
        completedSceneIds: newCompleted
      };
    });
  };

  const handleRestart = () => {
    setGameState({
      currentSceneIndex: 0,
      techDebtLevel: 20,
      isMovieStarted: false,
      gameStatus: 'PLAYING',
      completedSceneIds: []
    });
    setShowExitModal(false);
  };

  return (
    <>
      {/* System Modal Overlay */}
      <SystemModal 
        isOpen={showExitModal || gameState.gameStatus === 'GAME_OVER'} 
        type={gameState.gameStatus === 'GAME_OVER' ? 'GAME_OVER' : 'EXIT_INTENT'}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleRestart}
      />

      {/* System Toast Message */}
      {systemMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none animate-bounce">
          <div className="bg-rot-dark border border-rot-red text-rot-red px-6 py-2 font-code text-xs md:text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.5)]">
             {systemMessage}
          </div>
        </div>
      )}

      <TechHUD 
        gameState={gameState} 
        script={movieScript}
        onNext={handleNext}
        onPrev={handlePrev}
        onJump={handleJump}
      >
        <SceneDirector 
          scene={currentScene} 
          onNext={handleNext}
          onQuizAnswer={handleQuizAnswer}
          techDebtLevel={gameState.techDebtLevel}
          completedSceneIds={gameState.completedSceneIds}
          allScenes={movieScript}
          onJump={handleJump}
        />
      </TechHUD>
    </>
  );
};

export default App;