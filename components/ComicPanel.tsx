import React from 'react';
import { StoryPanel, PanelType, BubbleType, Character } from '../types';
import { 
  User, 
  Ghost, 
  Monitor, 
  BookOpen, 
  AlertTriangle 
} from 'lucide-react';

interface ComicPanelProps {
  panel: StoryPanel;
  isActive: boolean;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ panel, isActive }) => {
  const Icon = panel.visualConfig.icon || User;
  const SecondaryIcon = panel.visualConfig.secondaryIcon || Ghost;

  // Background Styles
  const bgGradient = `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`;
  const bgClasses = `${panel.visualConfig.bgFrom || 'bg-gray-800'} ${panel.visualConfig.bgTo || 'bg-black'}`;

  // Container Animation
  const containerClasses = `
    transition-all duration-700 ease-in-out absolute inset-0 
    flex flex-col overflow-hidden border-4 border-black
    ${isActive ? 'opacity-100 translate-x-0 z-10 scale-100' : 'opacity-0 translate-x-12 -z-10 scale-95'}
    ${panel.visualConfig.intensity === 'high' ? 'comic-shadow' : 'shadow-2xl'}
  `;

  // Helper to render bubbles
  const renderBubble = (d: any, idx: number) => {
    let bubbleClass = '';
    let textClass = 'font-sans text-lg md:text-xl text-black leading-tight';
    let containerClass = 'z-20 max-w-[80%] md:max-w-[60%] animate-fade-in-up';
    
    // Position logic
    const pos = d.position || 'center';
    let posStyles: React.CSSProperties = {};
    if (pos === 'top') posStyles = { alignSelf: 'center', marginBottom: 'auto' };
    if (pos === 'bottom') posStyles = { alignSelf: 'center', marginTop: 'auto' };
    if (pos === 'left') posStyles = { alignSelf: 'flex-start', marginRight: 'auto' };
    if (pos === 'right') posStyles = { alignSelf: 'flex-end', marginLeft: 'auto' };
    if (pos === 'center') posStyles = { alignSelf: 'center', margin: 'auto' };

    // Styling based on type
    switch (d.type) {
      case BubbleType.SPEECH:
        bubbleClass = pos === 'right' ? 'speech-bubble-right p-4 md:p-6' : 'speech-bubble p-4 md:p-6';
        break;
      case BubbleType.THOUGHT:
        bubbleClass = 'thought-bubble p-6 md:p-8';
        textClass += ' italic text-gray-600';
        break;
      case BubbleType.SHOUT:
        bubbleClass = 'shout-bubble p-8 md:p-10 bg-white border-4 border-black font-comic tracking-widest uppercase transform rotate-1';
        textClass = 'font-comic text-2xl md:text-4xl text-marvel-red text-center';
        break;
      case BubbleType.CAPTION:
        bubbleClass = 'caption-box p-3 md:p-4 w-full md:w-auto self-stretch mx-4 md:mx-0';
        textClass = 'font-sans font-bold uppercase tracking-wider text-sm md:text-base';
        posStyles = { ...posStyles, alignSelf: 'stretch' }; // Captions stretch
        break;
      case BubbleType.SYSTEM:
        bubbleClass = 'bg-black border-2 border-green-500 p-4 font-mono shadow-[0_0_10px_rgba(34,197,94,0.5)]';
        textClass = 'text-green-500 font-mono text-sm md:text-base';
        break;
      default:
        bubbleClass = 'bg-white p-4 rounded';
    }

    return (
      <div 
        key={d.id} 
        className={`${containerClass} my-2 transition-all duration-500 delay-${idx * 200}`}
        style={posStyles}
      >
        <div className={bubbleClass}>
           {d.type === BubbleType.CAPTION && <span className="block text-[10px] text-gray-600 mb-1">NARRATION</span>}
           <div className={textClass}>{d.text}</div>
        </div>
      </div>
    );
  };

  const renderVisuals = () => {
    // Dynamic Icon Rendering based on Character prescence in dialogue could be cool
    // For now, use the panel config
    
    if (panel.type === PanelType.SPLASH) {
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <Icon size={400} className="text-white animate-pulse" strokeWidth={1} />
        </div>
      );
    }
    
    if (panel.type === PanelType.VS_MODE) {
       return (
         <div className="absolute inset-0 flex items-center justify-between px-12 opacity-30 pointer-events-none">
            <Icon size={200} className="text-white" />
            <div className="h-full w-2 bg-white transform rotate-12"></div>
            <SecondaryIcon size={200} className="text-marvel-red" />
         </div>
       );
    }

    return (
      <div className="absolute bottom-[-20px] right-[-20px] opacity-10 pointer-events-none transform rotate-12">
        <Icon size={300} className="text-white" />
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${bgClasses}`}>
      
      {/* Halftone Overlay */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none"></div>
      
      {/* Background Visuals */}
      {renderVisuals()}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full p-4 md:p-8">
        
        {/* Title for Splash/Lessons */}
        {panel.title && (
          <div className="bg-marvel-red text-white font-comic text-3xl md:text-5xl px-4 py-2 self-start transform -rotate-2 shadow-[4px_4px_0px_#000] border-2 border-black mb-6 z-30">
            {panel.title}
          </div>
        )}

        {/* Dialogues */}
        <div className="flex-1 flex flex-col justify-center relative">
          {panel.dialogues.map((d, i) => renderBubble(d, i))}
          
          {/* Code Snippet */}
          {panel.codeSnippet && (
            <div className="mt-4 self-center w-full max-w-2xl bg-gray-900 border-2 border-gray-500 rounded p-4 shadow-lg transform rotate-1 z-20">
              <div className="flex items-center space-x-2 border-b border-gray-700 pb-2 mb-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <span className="text-xs text-gray-400 font-mono ml-2">terminal</span>
              </div>
              <pre className="font-mono text-green-400 text-sm whitespace-pre-wrap">{panel.codeSnippet}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Panel Border Effects */}
      <div className="absolute inset-0 border-[12px] border-white opacity-10 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

export default ComicPanel;