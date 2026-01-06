import { 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Swords,
  Trash2,
  Anchor,
  Search,
  AlertTriangle,
  Flame,
  Construction,
  Bug,
  Ghost,
  Fingerprint
} from 'lucide-react';
import { StoryPanel, PanelType, BubbleType, Character } from '../types';

export const storyData: StoryPanel[] = [
  {
    id: 1,
    type: PanelType.SPLASH,
    title: "THE ARCHITECT VS. THE ROT",
    visualConfig: {
      bgFrom: 'bg-marvel-red',
      bgTo: 'bg-red-900',
      icon: Swords,
      intensity: 'high'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "In the sprawling metropolis of PRODUCTION...",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "A silent enemy grows. It doesn't break the build. It doesn't fail the tests. But it kills the soul.",
        position: 'bottom'
      }
    ]
  },
  {
    id: 2,
    type: PanelType.ACTION,
    visualConfig: {
      bgFrom: 'bg-gray-800',
      bgTo: 'bg-black',
      icon: Terminal,
      intensity: 'low'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "FRIDAY. 4:55 PM. The Legacy Module.",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ARCHITECT,
        type: BubbleType.SPEECH,
        text: "Just one quick fix. A hardcoded string here. A missing test there. No one will notice.",
        position: 'left'
      },
      {
        id: 'd3',
        character: Character.ROT,
        type: BubbleType.THOUGHT,
        text: "Excellent...",
        position: 'right'
      }
    ]
  },
  {
    id: 3,
    type: PanelType.DIALOGUE,
    visualConfig: {
      bgFrom: 'bg-yellow-100',
      bgTo: 'bg-orange-100',
      icon: AlertTriangle,
      intensity: 'low'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "THE KITCHEN ANALOGY",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ARCHITECT,
        type: BubbleType.THOUGHT,
        text: "It's just one dirty knife in the sink. The rest of the kitchen is clean. What's the harm?",
        position: 'left'
      },
      {
        id: 'd3',
        character: Character.ROT,
        type: BubbleType.SHOUT,
        text: "MESS INVITES MESS!",
        position: 'right'
      }
    ]
  },
  {
    id: 4,
    type: PanelType.VS_MODE,
    title: "THE SPREAD",
    visualConfig: {
      bgFrom: 'bg-gray-900',
      bgTo: 'bg-slate-800',
      icon: Bug,
      secondaryIcon: Ghost,
      intensity: 'medium'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "Disorder isn't an event. It's a signal.",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ROT,
        type: BubbleType.SPEECH,
        text: "A spoon follows the knife. Then a pan. Soon, no one wipes the counter.",
        position: 'right'
      },
      {
        id: 'd3',
        character: Character.SYSTEM,
        type: BubbleType.SYSTEM,
        text: "WARNING: Standard of care decreasing. Disorder becoming default.",
        position: 'bottom'
      }
    ]
  },
  {
    id: 5,
    type: PanelType.ACTION,
    visualConfig: {
      bgFrom: 'bg-blue-900',
      bgTo: 'bg-slate-900',
      icon: Fingerprint,
      intensity: 'medium'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.ARCHITECT,
        type: BubbleType.SPEECH,
        text: "Wait... why does this Controller talk to the Database directly?",
        position: 'left'
      },
      {
        id: 'd2',
        character: Character.ROT,
        type: BubbleType.SPEECH,
        text: "Because the file before it did! I am everywhere! I am the 'Broken Window'!",
        position: 'right'
      }
    ]
  },
  {
    id: 6,
    type: PanelType.LESSON,
    title: "BEHAVIORAL BASELINE",
    visualConfig: {
      bgFrom: 'bg-emerald-800',
      bgTo: 'bg-emerald-950',
      icon: Anchor,
      intensity: 'low'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "Environmental Priming",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ARCHITECT,
        type: BubbleType.THOUGHT,
        text: "If the code looks messy, I write messy code. If it looks structured...",
        position: 'left'
      },
      {
        id: 'd3',
        character: Character.ARCHITECT,
        type: BubbleType.SHOUT,
        text: "I MATCH THE STANDARD!",
        position: 'center'
      }
    ]
  },
  {
    id: 7,
    type: PanelType.VS_MODE,
    title: "STRUCTURE VS STYLE",
    visualConfig: {
      bgFrom: 'bg-purple-900',
      bgTo: 'bg-indigo-950',
      icon: ShieldCheck,
      secondaryIcon: Trash2,
      intensity: 'medium'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.ARCHITECT,
        type: BubbleType.SPEECH,
        text: "We have Prettier! We have Linter rules! We are safe!",
        position: 'left'
      },
      {
        id: 'd2',
        character: Character.ROT,
        type: BubbleType.SPEECH,
        text: "Fools! You have clean indentation but rotten architecture! Three can openers in the drawer!",
        position: 'right'
      }
    ]
  },
  {
    id: 8,
    type: PanelType.SPLASH,
    title: "COGNITIVE OVERLOAD",
    visualConfig: {
      bgFrom: 'bg-red-600',
      bgTo: 'bg-orange-600',
      icon: Zap,
      intensity: 'high'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.SYSTEM,
        type: BubbleType.SYSTEM,
        text: "MEMORY OVERFLOW. Context switching required.",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ROT,
        type: BubbleType.SHOUT,
        text: "GUESS! GUESS WHERE THE LOGIC LIVES!",
        position: 'center'
      },
      {
        id: 'd3',
        character: Character.ARCHITECT,
        type: BubbleType.THOUGHT,
        text: "I... I can't think. Every file is a new puzzle.",
        position: 'bottom'
      }
    ]
  },
  {
    id: 9,
    type: PanelType.LESSON,
    title: "THE REMEDY",
    visualConfig: {
      bgFrom: 'bg-sky-700',
      bgTo: 'bg-blue-900',
      icon: Construction,
      intensity: 'low'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "Willpower is not enough. You need Systems.",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ARCHITECT,
        type: BubbleType.SPEECH,
        text: "I don't need to try harder. I need to make the right choice the EASIEST choice.",
        position: 'center'
      }
    ],
    codeSnippet: `make create:service UserBilling

# Generates a clean, typed service
# with tests pre-scaffolded.
# No guessing.`
  },
  {
    id: 10,
    type: PanelType.ACTION,
    visualConfig: {
      bgFrom: 'bg-yellow-500',
      bgTo: 'bg-yellow-600',
      icon: Flame,
      intensity: 'medium'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.ARCHITECT,
        type: BubbleType.SHOUT,
        text: "BEGONE, AMBIGUITY!",
        position: 'left'
      },
      {
        id: 'd2',
        character: Character.ROT,
        type: BubbleType.SHOUT,
        text: "NO! NOT THE GOLDEN FILE!",
        position: 'right'
      },
      {
        id: 'd3',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "The Architect deploys a scaffold. Structure becomes predictable.",
        position: 'bottom'
      }
    ]
  },
  {
    id: 11,
    type: PanelType.SPLASH,
    title: "ORDER RESTORED",
    visualConfig: {
      bgFrom: 'bg-green-600',
      bgTo: 'bg-emerald-800',
      icon: ShieldCheck,
      intensity: 'low'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "The kitchen is clean. Not because of fear, but because the bin is right next to the prep station.",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ARCHITECT,
        type: BubbleType.SPEECH,
        text: "Clarity makes creativity possible. Predictability enables flow.",
        position: 'center'
      }
    ]
  },
  {
    id: 12,
    type: PanelType.LESSON,
    title: "START TODAY",
    visualConfig: {
      bgFrom: 'bg-marvel-dark',
      bgTo: 'bg-black',
      icon: Search,
      intensity: 'low'
    },
    dialogues: [
      {
        id: 'd1',
        character: Character.NARRATOR,
        type: BubbleType.CAPTION,
        text: "Your Mission:",
        position: 'top'
      },
      {
        id: 'd2',
        character: Character.ARCHITECT,
        type: BubbleType.SPEECH,
        text: "Don't fix the whole app. Just fix one file. Make it the Golden File.",
        position: 'center'
      },
      {
        id: 'd3',
        character: Character.SYSTEM,
        type: BubbleType.SYSTEM,
        text: "STATUS: ORDER RESTORED.",
        position: 'bottom'
      }
    ]
  }
];