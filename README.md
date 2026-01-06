# Codebase Kitchen Comic

An interactive graphic novel adaptation of "Why Codebases Rot Like Kitchens", designed for senior developers. Experience a cinematic journey through the challenges of maintaining code quality while racing against technical debt.

## Features

- 🎮 Interactive storytelling with decision points that affect technical debt levels
- 📊 Real-time technical debt monitoring system
- 🎨 Cinematic UI with retro-futuristic design
- ⚡ Built with React, TypeScript, and Vite
- 🚀 Fully static - no backend required

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Key Files Detector

When working on this codebase, here are the critical files to understand:

### Core Application
- **`App.tsx`** - Main application component, game state management, and entropy system
- **`types.ts`** - TypeScript interfaces and enums for the application
- **`data/movieScript.ts`** - Story content, scenes, and quiz questions
- **`vite.config.ts`** - Vite configuration and build settings

### Components
- **`components/SceneDirector.tsx`** - Scene rendering logic and scene type handling
- **`components/TechHUD.tsx`** - Technical debt display and navigation controls
- **`components/ComicPanel.tsx`** - Comic panel rendering with visual effects
- **`components/SystemModal.tsx`** - Game over and exit intent modal dialogs

### Styling & Assets
- **`index.html`** - HTML template with Tailwind CSS configuration and custom styles

## Project Structure

```
CodebaseKitchen/
├── components/          # React components
│   ├── ComicPanel.tsx  # Panel rendering
│   ├── SceneDirector.tsx # Scene logic
│   ├── SystemModal.tsx  # Modal dialogs
│   └── TechHUD.tsx     # HUD interface
├── data/               # Content data
│   └── movieScript.ts  # Story and scenes
├── App.tsx             # Main app component
├── index.tsx           # App entry point
├── types.ts            # TypeScript types
└── vite.config.ts      # Build configuration
```

## Contributing

This is an interactive educational project demonstrating software quality principles through storytelling. Contributions that improve the user experience, fix bugs, or enhance the story are welcome.

## License

MIT License - See LICENSE file for details
