# Phase 1: Core Flow (No AI) - Agentic Quiz Generator

## Objective

Build the complete user workflow from setup to PPTX export using MOCK DATA only. No AI integration yet - this phase validates UX, navigation, state management, and data flow before connecting expensive APIs.

## Context

Phase 0 (Foundation) is complete. You now have a working monorepo with React frontend, Express backend, and shared types. The full specification is in `context dump for quiz-genny.txt`.

**THIS PHASE: Mock data only. Hard-code everything. Prove the flow works.**

## What to Build

### 1. Setup Screen (`packages/frontend/src/components/setup/`)

Create a comprehensive setup form with:

- **AudiencePresetSelector** - Card/button selector for 5 presets (casual_social, competitive_league, corporate, international, family_friendly)
- **AudienceTagCloud** - Clickable tags (50+ tags from spec section 2.1.3) with multi-select
- **ToneSelector** - Radio buttons for 4 tones (casual_witty, formal_professional, family_friendly, pub_banter)
- **QuizStructureInputs** - Number inputs for rounds (1-12, default 5) and questions per round (5-20, default 10)
- **DifficultyDistributionSelector** - Preset selector (Accessible, Balanced, Challenging) OR custom sliders
- **AnswerRevealSelector** - Radio for when answers are shown
- **ContextNotesTextarea** - Optional free text (500 char limit)
- **StartButton** - Validates inputs and transitions to sections phase

**Integration:**

- Save all to Zustand store `config` state
- Navigate to `/sections` on completion

### 2. Section Selection Screen (`packages/frontend/src/components/sections/`)

Display and select quiz round themes:

- **SectionGrid** - Responsive grid of SectionCard components
- **SectionCard** - Shows: name, description, difficulty badge, category tag, selectable
- **SelectionCounter** - "3 of 5 rounds selected" with progress dots
- **SurpriseMeButton** - Auto-selects random balanced sections (mock algorithm)
- **GenerateMoreButton** - Adds more mock sections to grid (disabled for now, just show UI)
- **ContinueButton** - Enabled when selection count = round count, goes to `/questions/0`

**Mock Data:**

- Hard-code 30 section objects with variety (sports, music, history, geography, etc.)
- Mock difficulty estimates (tends_easy, tends_medium, tends_hard, mixed)

**Integration:**

- Save selected section IDs to Zustand `sections.selected` array
- Initialize `rounds` array with empty question lists

### 3. Question Curation Screen (`packages/frontend/src/components/questions/`)

The heart of the app - curate questions per round:

**Layout:**

- Split panel: Candidates (left 60%) | Accepted (right 40%)
- Round indicator header with navigation dots
- Live difficulty distribution bar

**Components:**

- **QuestionCard** (candidates) - Shows question, answer, difficulty badge, Accept/Reject buttons
- **AcceptedQuestionList** - Shows accepted questions with number, truncated text, difficulty
- **DifficultyDistributionBar** - Stacked bar showing current vs target (easy/medium/hard)
- **GapAnalysisText** - "You need 2 more easy questions and 1 hard"
- **GenerateMoreButton** - Disabled for now (show UI only)
- **NextRoundButton** - Go to next round when complete
- **PreviousRoundButton** - Go back to previous round

**Mock Data:**

- Hard-code 15 question objects per round with variety
- Include realistic difficulty scores (1-5 on each dimension)
- Calculate difficulty band based on spec formula

**Logic:**

- Accept moves from candidates → accepted
- Reject removes from view
- Round complete when accepted count = questions per round
- Navigate between rounds with state preservation
- After all rounds: go to `/preview`

**Integration:**

- Save accepted questions to Zustand `rounds[currentRoundIndex].accepted`
- Track difficulty distribution per round
- Mark rounds as complete

### 4. Preview & Export Screen (`packages/frontend/src/components/preview/`)

Final review before export:

**Components:**

- **QuizOverviewSection** - Shows title (editable), total questions, rounds, difficulty breakdown
- **RoundsAccordion** - Expandable sections showing all rounds
- **QuestionPreviewRow** - Shows question number, text, answer, difficulty badge
- **RuntimeCalculator** - Displays estimated time (use formula from spec)
- **ThemeSelector** - Dropdown with preset themes (Classic, Modern, Vibrant)
- **ExportButton** - Primary CTA "Export PowerPoint"

**Mock Data:**

- Use all accepted questions from state
- Default title: "Quiz Night"

**Integration:**

- Read from Zustand state (all accepted questions)
- On export, call backend `/api/export/pptx` endpoint

### 5. Backend PPTX Generation (`packages/backend/src/services/pptx.service.ts`)

Implement basic PowerPoint generation:

**Endpoint:** `POST /api/export/pptx`

- Receives: QuizState object
- Returns: Binary PPTX file

**Implementation:**

- Use PptxGenJS to create presentation
- Title slide with quiz title
- For each round:
  - Round intro slide
  - Question slides (text only, no images)
  - Answer slides (after questions based on reveal frequency)
- Closing slide

**No images, no verification, no host notes** - just basic text slides

### 6. Navigation & Routing

Implement React Router routes:

```
/ → Setup screen
/sections → Section selection
/questions/:roundIndex → Question curation
/preview → Preview & export
```

Add navigation guards (can't skip to /preview without completing setup/sections/questions)

## Mock Data Guidelines

### Example Section:

```typescript
{
  id: "90s-pop",
  name: "90s Pop Music",
  description: "Chart-toppers, one-hit wonders, and iconic albums from the 1990s",
  estimatedDifficulty: "tends_easy",
  category: "entertainment"
}
```

### Example Question:

```typescript
{
  id: "q-001",
  question: "Which British band had a 1997 hit with 'Bittersweet Symphony'?",
  answer: "The Verve",
  difficultyScores: {
    knowledgeAccessibility: 2,
    cognitiveLoad: 1,
    culturalLinguistic: 3,
    temporalRelevance: 2
  },
  overallDifficulty: 2.0,
  difficultyBand: "easy",
  verification: {
    status: "pending",
    sources: []
  }
}
```

Create 30 sections and 15 questions per section with variety!

## Validation Criteria

Before outputting completion promise, verify:

✅ All 4 screens implemented and navigable
✅ Setup form saves to Zustand store
✅ Section selection works (select, deselect, counter, surprise me)
✅ Question curation works (accept, reject, round navigation)
✅ Difficulty distribution tracker shows accurate counts
✅ Can navigate between all rounds
✅ Preview shows all accepted questions
✅ Export button calls backend endpoint
✅ Backend generates valid PPTX file
✅ PPTX downloads in browser
✅ No TypeScript errors
✅ No console errors
✅ Responsive design works on mobile/desktop
✅ End-to-end flow: Setup → Sections → Questions (all rounds) → Preview → Export works

## Important Notes

- **NO API INTEGRATIONS** - everything is mock data
- **NO AI CALLS** - hard-code all generation
- **NO IMAGE SEARCH** - skip images entirely
- **NO VERIFICATION** - skip fact-checking
- **FOCUS ON UX** - make the flow smooth and intuitive
- **USE TAILWIND** - style everything nicely
- **USE ZUSTAND** - all state goes through the store
- **MOBILE FIRST** - responsive at all breakpoints

## Styling Guidelines

- Use Tailwind utility classes
- Match the design aesthetic from the HomePage (gradients, rounded corners, shadows)
- Color-code difficulty: green (easy), amber (medium), red (hard)
- Use hover states and transitions
- Cards should have subtle shadows and lift on hover
- Buttons should have clear states (default, hover, disabled, loading)

## Completion Signal

When ALL validation criteria are met and you can complete a full quiz from setup to PPTX download, output:

```
<promise>PHASE 1 COMPLETE</promise>
```

## Common Pitfalls to Avoid

❌ Don't try to integrate Claude API (that's Phase 2)
❌ Don't skip mock data - hard-code everything
❌ Don't leave navigation broken
❌ Don't forget to persist state (use Zustand persist middleware)
❌ Don't skip the difficulty calculation logic
❌ Don't create PPTX with animations (use two-slide approach from spec)
❌ Don't forget CORS on the export endpoint
❌ Don't skip responsive design

## Progress Tracking

Create tasks for major screens and mark complete as you finish them.

---

**Remember**: This phase is about proving the FLOW works. Speed matters less than getting the UX right. When a user can go from setup to downloaded PPTX with mock data, we're done.
