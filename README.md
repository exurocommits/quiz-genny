# Quiz Genny - AI-Assisted Quiz Generation Tool

An agentic workflow tool that assists quiz hosts in generating professional, balanced, and verified quiz content. The system uses LLM-powered generation with human-in-the-loop curation at each stage. Final output is a downloadable PowerPoint presentation ready for live hosting.

## 🎯 Key Features

- **Smart Generation**: AI generates quiz candidates, humans curate through intuitive accept/reject actions
- **Difficulty Balancing**: Questions scored across four dimensions to ensure engaging score distributions
- **Verification by Default**: All answers fact-checked via web search before final output
- **Progressive Refinement**: Each "Generate more" action incorporates prior feedback and difficulty gap awareness
- **Duplicate Prevention**: System actively prevents duplicate or highly similar questions
- **Professional Output**: Final PPTX is presentation-ready with consistent theming and curated imagery

## 📐 Project Structure

This is a monorepo using pnpm workspaces and Turborepo:

```
quiz-genny/
├── packages/
│   ├── frontend/     # React + Vite + TypeScript + Tailwind
│   ├── backend/      # Express + TypeScript API
│   └── shared/       # Shared TypeScript types
├── .env.example      # Environment variables template
└── README.md
```

## 🛠️ Tech Stack

### Frontend

- **React 18.3+** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Zustand** for state management
- **React Query** for server state
- **React Router** for navigation
- **Framer Motion** for animations

### Backend

- **Node.js 20+** with TypeScript
- **Express.js** for REST API
- **Anthropic Claude API** for LLM generation
- **PptxGenJS** for PowerPoint generation
- **Zod** for runtime validation

### Development Tools

- **Turborepo** for monorepo build orchestration
- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for git hooks
- **TypeScript strict mode** enabled

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (install with `npm install -g pnpm`)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quiz-genny
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env and add your API keys
   ```

4. **Build all packages**

   ```bash
   pnpm run build
   ```

5. **Start development servers**

   ```bash
   pnpm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure the following:

### Required API Keys

```bash
# Anthropic Claude API (required for AI generation)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Image APIs (at least one recommended)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
PEXELS_API_KEY=your_pexels_api_key_here
PIXABAY_API_KEY=your_pixabay_api_key_here

# Web Search (required for verification)
TAVILY_API_KEY=your_tavily_api_key_here
```

### Getting API Keys

- **Anthropic**: https://console.anthropic.com/
- **Unsplash**: https://unsplash.com/developers
- **Pexels**: https://www.pexels.com/api/
- **Pixabay**: https://pixabay.com/api/docs/
- **Tavily**: https://tavily.com/

## 📦 Available Commands

### Root Commands

```bash
# Development
pnpm run dev          # Start all dev servers
pnpm run build        # Build all packages
pnpm run type-check   # Type check all packages
pnpm run lint         # Lint all packages
pnpm run format       # Format all files with Prettier
```

### Package-Specific Commands

```bash
# Frontend only
cd packages/frontend
pnpm run dev
pnpm run build
pnpm run preview      # Preview production build

# Backend only
cd packages/backend
pnpm run dev
pnpm run build
pnpm run start        # Run production build

# Shared types only
cd packages/shared
pnpm run build
pnpm run dev          # Watch mode for type changes
```

## 🏗️ Development Workflow

### Phase 0: Foundation ✅ COMPLETE

- ✅ Monorepo setup with pnpm + Turborepo
- ✅ Frontend scaffold (Vite + React + TypeScript + Tailwind)
- ✅ Backend scaffold (Express + TypeScript)
- ✅ Shared types package
- ✅ All builds passing
- ✅ Dev servers working

### Phase 1: Core Flow (Next)

- Setup screen with all inputs
- Mock section selection
- Mock question curation
- Basic PPTX export

### Phase 2: AI Integration

- Claude API integration
- Section generation
- Question generation

### Phase 3: Intelligence Layer

- 4-dimension difficulty scoring
- Live difficulty distribution tracker
- "Generate more" with context
- Duplicate detection

### Phase 4: Verification & Images

- Web search integration
- Verification flow
- Image API integration
- Image selection

### Phase 5: Polish & Export

- Host notes generation
- Theme customization
- Full PPTX generation

## 🧪 Testing

```bash
# Run all tests (when implemented)
pnpm run test

# Type checking
pnpm run type-check
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Clean all node_modules and reinstall
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### Port Already in Use

```bash
# Frontend (port 5173)
# Change port in packages/frontend/vite.config.ts

# Backend (port 3001)
# Change PORT in .env
```

### TypeScript Errors

```bash
# Ensure all packages are built
pnpm run build

# Check for type errors
pnpm run type-check
```

## 📝 Project Documentation

- Full specification: `context dump for quiz-genny.txt`
- Phase 0 prompt: `.claude/PHASE_0_PROMPT.md`

## 🤝 Contributing

This is a prototype/MVP project. Development follows the RALPH LOOP methodology for iterative improvement.

## 📄 License

Private project - All rights reserved

## 🚧 Current Status

**Phase 0: Foundation** - ✅ COMPLETE

All validation criteria met:

- ✅ All three packages exist with proper structure
- ✅ `pnpm install` completes without errors
- ✅ `pnpm run build` succeeds for all packages
- ✅ Frontend and backend configured correctly
- ✅ TypeScript strict mode enabled
- ✅ Git repository initialized
- ✅ All configuration files present

Next: Phase 1 - Core Flow implementation

---

Built with ❤️ using Claude Code and RALPH LOOP
