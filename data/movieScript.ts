import { 
  Terminal, 
  Trash2, 
  Skull, 
  LayoutTemplate, 
  Compass, 
  Zap, 
  Construction, 
  ShieldAlert, 
  Cpu, 
  Coffee,
  Network,
  Bug,
  AlertTriangle,
  FileQuestion,
  GitPullRequest,
  Microscope,
  Box,
  Hash,
  Scissors,
  Layers,
  Unplug,
  Container,
  BellOff,
  Lock,
  Server,
  Trophy
} from 'lucide-react';
import { Scene, SceneType } from '../types';

export const movieScript: Scene[] = [
  {
    id: 'intro',
    type: SceneType.INTRO,
    title: "PROTOCOL: CLEAN_KITCHEN",
    subtitle: "Why We Lose Control of Code",
    content: "Initialize sequence to identify root causes of software decay. Accessing developer logs...",
    speaker: "JARVIS",
    backgroundEffect: 'glitch',
    icon: Terminal
  },
  {
    id: 's1',
    type: SceneType.NARRATIVE,
    title: "THE BROKEN WINDOW",
    content: "It starts with one knife left in the sink. One hacked function. One ignored test. \n\nDisorder isn't just ugly—it's a permission slip to lower the standard of care.",
    speaker: "THE ROT",
    icon: Trash2,
    backgroundEffect: 'rain'
  },
  {
    id: 'b1',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "SIGNAL DETECTION",
    subtitle: "legacy_user_controller.ts",
    content: "",
    question: "You open a legacy file to add a simple email check. The existing code is a disaster. What is your immediate move?",
    codeContext: `class UserController {
  update(req, res) {
    // TODO: Fix this later
    if (req.body.type == 'admin') {
       db.query('UPDATE users SET role = ?', ['admin']);
    }
    
    // Validation mixed with logic
    if (req.body.email.indexOf('@') === -1) {
       return res.status(400).send('Bad email');
    }

    // Directmailer call
    const mailer = new Mailer('smtp.sendgrid.net');
    mailer.send(req.body.email, 'Updated');
    
    return res.json({ status: 'ok' });
  }
}`,
    language: 'typescript',
    options: [
      {
        id: 'opt_match',
        label: "Match the Pattern",
        code: "// It's already broken. Just add the check inline.",
        isCorrect: false,
        explanation: "You've signaled that quality doesn't matter here. The rot spreads.",
        debtImpact: 30
      },
      {
        id: 'opt_refactor_all',
        label: "The Hero Rewrite",
        code: "// I will refactor the entire class before starting.",
        isCorrect: false,
        explanation: "You'll spend 3 days on a 1-hour task, get blocked, and likely introduce regressions. Willpower runs out.",
        debtImpact: 20
      },
      {
        id: 'opt_golden',
        label: "The Golden Pocket",
        code: "validateEmail(email); // Extract to a pure function. Clean the spot you touch.",
        isCorrect: true,
        explanation: "You leave the campsite cleaner than you found it. But entropy is relentless.",
        debtImpact: -5
      }
    ],
    icon: AlertTriangle,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b_debug_auth',
    type: SceneType.BATTLE,
    battleType: 'DEBUG',
    title: "THE OPEN DOOR",
    subtitle: "auth_middleware.ts",
    content: "",
    question: "A security audit flagged a critical vulnerability in this new middleware. Find the bug by clicking the incorrect line.",
    codeContext: `export function checkAuth(user: User) {
  if (!user) {
    return false;
  }
  
  // Grant admin access
  if (user.role = 'admin') {
    return true;
  }

  return user.permissions.includes('read');
}`,
    language: 'typescript',
    bugLine: 6, // 0-indexed: "if (user.role = 'admin') {"
    icon: Lock,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b_dry_coupling',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "THE DRY FALLACY",
    subtitle: "billing_service.ts vs shipping_service.ts",
    content: "",
    question: "You notice the Billing logic and Shipping logic share 5 lines of similar address validation code. What do you do?",
    codeContext: `// Billing
if (!addr.zip || addr.zip.length < 5) throw new Error();

// Shipping
if (!addr.zip || addr.zip.length < 5) throw new Error();`,
    language: 'typescript',
    options: [
      {
        id: 'opt_abstract',
        label: "Create Shared Abstraction",
        code: "import { validate } from '@shared/utils'; validate(addr);",
        isCorrect: false,
        explanation: "You just coupled Billing and Shipping. When Shipping needs international zips but Billing doesn't, you'll add flags. Entropy rises.",
        debtImpact: 25
      },
      {
        id: 'opt_duplicate',
        label: "Leave it (WET)",
        code: "// Write Everything Twice",
        isCorrect: true,
        explanation: "Duplication is cheaper than the wrong abstraction. A small win against chaos.",
        debtImpact: -5
      }
    ],
    icon: Layers,
    speaker: "THE ARCHITECT"
  },
  {
    id: 's2',
    type: SceneType.NARRATIVE,
    title: "STRUCTURE > AESTHETICS",
    content: "We confuse 'Clean' with 'Structured'. You can have Prettier formatting on a disaster.\n\nTrue structure means predictability. I should know where code lives without searching.",
    speaker: "THE ARCHITECT",
    icon: LayoutTemplate,
    backgroundEffect: 'clean'
  },
  {
    id: 'b2',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "ARCHITECTURAL DRIFT",
    subtitle: "Project File Structure",
    content: "",
    question: "You need to add a new 'Invoice' feature. Where do you place the business logic?",
    codeContext: `├── controllers
│   ├── AuthController.ts
│   └── UserController.ts
├── helpers
│   ├── DateHelper.ts
│   └── UserHelper.ts // Contains 3000 lines of mixed logic
├── models
│   └── User.ts
├── services
│   └── EmailService.ts`,
    language: 'tree',
    options: [
      {
        id: 'opt_helper',
        label: "Add to Helper",
        code: "// Create InvoiceHelper.ts or add to generic Helper",
        isCorrect: false,
        explanation: "'Helper' is a junk drawer name. It hides intent and encourages dumping random logic.",
        debtImpact: 25
      },
      {
        id: 'opt_service',
        label: "Domain Slicing",
        code: "// Create /modules/Billing/InvoiceService.ts",
        isCorrect: true,
        explanation: "Grouping by Domain (Billing) rather than technical layer (Helper) makes the system predictable.",
        debtImpact: -10
      }
    ],
    icon: Compass,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b_terminal_process',
    type: SceneType.BATTLE,
    battleType: 'TERMINAL',
    title: "RUNAWAY PROCESS",
    subtitle: "server_shell",
    content: "",
    question: "A zombie node process is consuming 100% CPU. Terminate it immediately.",
    terminalContext: `PID   USER     PR  NI  VIRT   RES   SHR S  %CPU %MEM    TIME+  COMMAND
9402  root     20   0  982m  42m   8m R  100.0  0.4   12:14  node-worker`,
    validCommands: ["kill 9402", "kill -9 9402", "sudo kill 9402", "sudo kill -9 9402"],
    successMessage: "Process 9402 terminated. CPU usage stabilizing.",
    failMessage: "Command failed. Process still active. Check syntax or PID.",
    icon: Server,
    speaker: "JARVIS"
  },
  {
    id: 'b_dx_laundry',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "THE LAUNDRY BASKET",
    subtitle: "Developer Experience (DX)",
    content: "",
    question: "New developers take 2 days to set up their local environment. They often 'hack' config files just to get it running.",
    codeContext: `// README.md
Step 45: "Make sure you have exactly PostgreSQL 12.4 installed."
Step 46: "If the build fails, try deleting node_modules..."
Step 47: "Ask Dave for the .env file."`,
    language: 'typescript',
    options: [
      {
        id: 'opt_wiki',
        label: "Improve the Wiki",
        code: "// Add 'Troubleshooting' section to docs.",
        isCorrect: false,
        explanation: "You are relying on willpower and memory. People will still throw dirty clothes on the floor because the basket is too far away.",
        debtImpact: 20
      },
      {
        id: 'opt_container',
        label: "Move the Basket",
        code: "// Dockerize / DevContainers. 'npm start' just works.",
        isCorrect: true,
        explanation: "You made the right thing (a consistent env) the easiest thing. Entropy pauses briefly.",
        debtImpact: -10
      }
    ],
    icon: Container,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b_locality',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "RAVIOLI CODE",
    subtitle: "order_processor.ts",
    content: "",
    question: "You are reviewing a PR. The developer has split a simple 20-line function into 6 tiny private functions to make it 'Clean'.",
    codeContext: `processOrder() {
  this.validate();
  this.checkStock();
  this.calcTax();
  this.notify();
}
// ... 6 files down ...
private calcTax() { return x * 0.1; }`,
    language: 'typescript',
    options: [
      {
        id: 'opt_clean',
        label: "Approve (It's Clean)",
        code: "// Small functions are good!",
        isCorrect: false,
        explanation: "You increased Cognitive Load. Now I have to jump 6 times to understand what 'processOrder' actually does.",
        debtImpact: 30
      },
      {
        id: 'opt_inline',
        label: "Request Inlining",
        code: "// Keep related logic together (Locality of Behavior)",
        isCorrect: true,
        explanation: "Code that changes together should stay together. Don't abstract until complexity demands it.",
        debtImpact: -5
      }
    ],
    icon: Unplug,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b2_testing',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "THE FRAGILE TEST",
    subtitle: "InvoiceService.test.ts",
    content: "",
    question: "You are testing the 'Create Invoice' flow. Which test is more robust?",
    codeContext: `// Context: The Service saves to DB and calls Stripe`,
    language: 'typescript',
    options: [
      {
        id: 'opt_implementation',
        label: "Test Implementation Details",
        code: "expect(db.save).toHaveBeenCalledWith('INSERT INTO...')",
        isCorrect: false,
        explanation: "Refactoring the SQL query will break this test even if the logic works. This discourages refactoring.",
        debtImpact: 25
      },
      {
        id: 'opt_behavior',
        label: "Test Public Behavior",
        code: "expect(stripeAdapter.charge).toHaveBeenCalled();",
        isCorrect: true,
        explanation: "Test the 'What', not the 'How'. Stability improves slightly.",
        debtImpact: -5
      }
    ],
    icon: Microscope,
    speaker: "THE ARCHITECT"
  },
  {
    id: 's3',
    type: SceneType.REVELATION,
    title: "WORKFLOW OVER WILLPOWER",
    content: "Willpower is a finite resource. If you rely on discipline to keep code clean, you will fail.\n\nThe system must make the *right* action the *easiest* action.",
    speaker: "JARVIS",
    icon: Zap,
    backgroundEffect: 'fire'
  },
  {
    id: 'b3',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "AUTOMATING DISCIPLINE",
    subtitle: "Team Process Config",
    content: "",
    question: "The team keeps writing 'Fat Controllers' despite agreeing not to. How do we solve this?",
    codeContext: `// Current process:
// 1. Copy-paste an old controller
// 2. Delete the body
// 3. Write new spaghetti code
// 4. Hope code review catches it`,
    language: 'typescript',
    options: [
      {
        id: 'opt_docs',
        label: "Update the Wiki",
        code: "Docs: 'Please keep controllers thin'",
        isCorrect: false,
        explanation: "No one reads the wiki when they are in a rush. Debt continues to mount.",
        debtImpact: 20
      },
      {
        id: 'opt_scaffold',
        label: "Build a Generator",
        code: "$ npm run create:controller <Name>",
        isCorrect: true,
        explanation: "Generates a file that is ALREADY structured correctly. The easiest path is now the clean path.",
        debtImpact: -10
      }
    ],
    icon: Construction,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b_signal_noise',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "THE BOY WHO CRIED WOLF",
    subtitle: "console & linter logs",
    content: "",
    question: "The build outputs 400 warnings. Developers ignore the output completely. A critical deprecation warning is buried in the noise.",
    codeContext: `WARNING: 'any' type used (line 40)
WARNING: 'any' type used (line 42)
... [390 more lines] ...
WARNING: Database connection is insecure
WARNING: 'any' type used (line 440)`,
    language: 'bash',
    options: [
      {
        id: 'opt_warn',
        label: "Keep Warnings",
        code: "// It's better to know than to not know.",
        isCorrect: false,
        explanation: "If everything is a warning, nothing is a warning. This trains the team to ignore the dashboard.",
        debtImpact: 25
      },
      {
        id: 'opt_strict',
        label: "Zero Tolerance",
        code: "// Fix them or turn them off. Empty the noise.",
        isCorrect: true,
        explanation: "Order creates order. A clean dashboard means a new warning stands out like a flare.",
        debtImpact: -5
      }
    ],
    icon: BellOff,
    speaker: "THE ARCHITECT"
  },
  {
    id: 'b_defensive',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "THE SILENT FAILURE",
    subtitle: "payment_gateway.ts",
    content: "",
    question: "An external API call fails. How should the system handle the error?",
    codeContext: `try {
  await api.chargeCard(token);
} catch (e) {
  // ???
}`,
    language: 'typescript',
    options: [
      {
        id: 'opt_null',
        label: "Return Null / False",
        code: "return null; // Handle it gracefully",
        isCorrect: false,
        explanation: "Returning null swallows the 'Why'. The caller won't know if it was a network error or declined card. Debugging will be hell.",
        debtImpact: 35
      },
      {
        id: 'opt_throw',
        label: "Bubble the Exception",
        code: "throw new PaymentFailedException(e.message);",
        isCorrect: true,
        explanation: "Fail fast and explicitly. Convert low-level errors to Domain Exceptions.",
        debtImpact: -5
      }
    ],
    icon: Bug,
    speaker: "THE ARCHITECT"
  },
  {
    id: 's4',
    type: SceneType.NARRATIVE,
    title: "CONSISTENCY IS FREEDOM",
    content: "Senior devs hate 'micromanagement'. But true consistency isn't control—it's Clarity.\n\nWhen I don't have to guess *how* to write the code, I can focus on *what* the code does.",
    speaker: "THE ARCHITECT",
    icon: ShieldAlert,
    backgroundEffect: 'clean'
  },
  {
    id: 'b_heroic_refactor',
    type: SceneType.BATTLE,
    battleType: 'QUIZ',
    title: "THE SECOND SYSTEM EFFECT",
    subtitle: "The 'Big Rewrite'",
    content: "",
    question: "The authentication module is messy but stable. A Senior Dev proposes rewriting it from scratch to use a 'cleaner' framework.",
    codeContext: `// Current Auth: 
// 5 years old. 
// Ugly code. 
// But handles 50 edge cases correctly.`,
    language: 'typescript',
    options: [
      {
        id: 'opt_rewrite',
        label: "Approve Rewrite",
        code: "// Let's modernize it! It will be so clean.",
        isCorrect: false,
        explanation: "You will miss edge cases. You will pause feature work for months. You will likely build a worse version of the old system.",
        debtImpact: 50
      },
      {
        id: 'opt_strangler',
        label: "Strangler Pattern",
        code: "// Refactor piece by piece behind an interface.",
        isCorrect: true,
        explanation: "Incremental improvement allows you to validate changes without risking the entire platform.",
        debtImpact: -10
      }
    ],
    icon: GitPullRequest,
    speaker: "THE ARCHITECT"
  },
  {
    id: 's5',
    type: SceneType.NARRATIVE,
    title: "THE GOLDEN FILE",
    content: "Don't fix the whole world. Pick one file. Make it perfect. \n\nLet it stand as the reference. Humans mimic their environment. Change the environment.",
    speaker: "JARVIS",
    icon: Cpu,
    backgroundEffect: 'clean'
  },
  {
    id: 'end',
    type: SceneType.ENDING,
    title: "ORDER CREATES ORDER",
    content: "We improve quality not by trying harder, but by designing systems where the right choice is the easiest choice.\n\nPlace the laundry basket where the clothes fall.",
    speaker: "THE ARCHITECT",
    icon: Coffee,
    backgroundEffect: 'clean'
  },
  {
    id: 'results',
    type: SceneType.RESULTS,
    title: "DEPLOYMENT REPORT",
    content: "Analyzing final system metrics and calculating developer efficiency score...",
    speaker: "SYSTEM",
    icon: Trophy,
    backgroundEffect: 'clean'
  }
];