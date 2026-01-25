# Phase 0: Foundation Setup - Agentic Quiz Generator

## Objective
Set up the complete monorepo foundation for the Agentic Quiz Generator with all necessary tooling, scaffolding, and initial configuration. This is a greenfield TypeScript project using modern best practices.

## Context
You are building an AI-assisted quiz generation tool that helps quiz hosts create professional PowerPoint presentations. The full specification is in `context dump for quiz-genny.txt`. This phase focuses ONLY on project scaffolding - no feature implementation yet.

## Tech Stack Requirements

### Monorepo
- **pnpm workspaces** with Turborepo
- Three packages: `frontend`, `backend`, `shared`

### Frontend Package
- **Vite** + React 18.3+ + TypeScript 5.x
- **Tailwind CSS 4.x**
- **shadcn/ui** components (install setup only)
- **Zustand** for state management
- **React Query** for server state
- **React Router** for navigation
- **Framer Motion** for animations (install only)

### Backend Package
- **Express.js** + TypeScript
- **Anthropic SDK** (@anthropic-ai/sdk)
- **PptxGenJS** for PowerPoint generation
- **Zod** for validation
- **CORS** enabled for frontend
- **dotenv** for environment variables

### Shared Package
- TypeScript types shared between frontend/backend
- Export all interfaces from the spec (QuizState, Question, Section, etc.)

### Development Tools
- **ESLint** + **Prettier** configured
- **Husky** + **lint-staged** for git hooks
- **TypeScript** configured for strict mode
- **.env.example** with all required API keys listed

## Tasks to Complete

### 1. Initialize Monorepo
```bash
# Root package.json with pnpm workspace
# turbo.json for build orchestration
# .gitignore for node_modules, dist, .env
# pnpm-workspace.yaml
```

### 2. Create Frontend Package (`packages/frontend/`)
```
- Vite + React + TypeScript template
- Tailwind CSS configured with shadcn/ui
- Folder structure: components/{setup,sections,questions,verification,images,preview,shared}
- Basic App.tsx with React Router
- Zustand store skeleton
- API client setup with React Query
```

### 3. Create Backend Package (`packages/backend/`)
```
- Express + TypeScript setup
- Routes structure: /api/generate, /api/verify, /api/images, /api/export
- Services structure: llm.service.ts, verification.service.ts, images.service.ts, pptx.service.ts
- Prompts folder for LLM templates
- CORS configured for localhost:5173
- Health check endpoint
```

### 4. Create Shared Package (`packages/shared/`)
```
- All TypeScript interfaces from spec section 3.2
- Export types: QuizState, Question, Section, Round, etc.
- Proper index.ts with named exports
```

### 5. Configuration Files
```
- Root: package.json, turbo.json, .gitignore, .prettierrc, .eslintrc.js
- Frontend: vite.config.ts, tailwind.config.ts, tsconfig.json
- Backend: tsconfig.json, nodemon.json (for dev)
- .env.example with all API keys needed
```

### 6. Install All Dependencies
```bash
# Root and all workspaces
# Verify builds work: turbo run build
# Verify dev servers start: turbo run dev
```

### 7. Documentation
```
- Root README.md with:
  - Project overview
  - Setup instructions
  - Development commands
  - Environment variables guide
  - Tech stack summary
```

## Validation Criteria

Before outputting completion promise, verify:

✅ All three packages exist with proper structure
✅ `pnpm install` completes without errors
✅ `pnpm run build` (or `turbo run build`) succeeds for all packages
✅ `pnpm run dev` starts both frontend (port 5173) and backend (port 3001)
✅ Frontend shows a basic "Quiz Generator" page
✅ Backend `/health` endpoint returns 200
✅ No TypeScript errors in any package
✅ Git repository initialized with initial commit
✅ All configuration files present and valid

## Important Notes

- **DO NOT** implement any quiz features yet - scaffolding only
- **DO NOT** add API integrations yet - just structure
- **USE** exact folder structure from the spec
- **ENSURE** TypeScript strict mode enabled
- **VERIFY** all builds pass before completion
- **CREATE** a simple landing page in frontend (just text, no features)
- **ADD** basic Express routes (empty handlers, just return 200)

## Completion Signal

When ALL validation criteria are met and the foundation is completely ready for Phase 1 development, output:

```
<promise>FOUNDATION COMPLETE</promise>
```

## Common Pitfalls to Avoid

❌ Don't install wrong package versions (check latest stable)
❌ Don't forget to configure TypeScript path aliases (@/* for imports)
❌ Don't skip .env.example (critical for onboarding)
❌ Don't leave broken builds
❌ Don't commit node_modules or .env files
❌ Don't create circular dependencies between packages
❌ Don't configure Tailwind without JIT mode
❌ Don't forget CORS configuration on backend

## Progress Tracking

As you work, create tasks for major milestones and mark them complete when done. This helps track progress across iterations.

---

**Remember**: This is Phase 0 only. Focus on a rock-solid foundation. Quality over speed. When done, we'll move to Phase 1 (Core Flow) in the next RALPH loop.
