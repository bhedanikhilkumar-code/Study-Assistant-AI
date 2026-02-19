# Study Assistant AI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](#tech-stack)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](#tech-stack)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-2ea44f)](./CONTRIBUTING.md)
[![Security Policy](https://img.shields.io/badge/Security-Policy-informational)](./SECURITY.md)

**Your AI-powered learning command center — plan smarter, revise faster, and stay consistent.**

Study Assistant AI is a modern, local-first study platform that combines planning, AI guidance, active recall, and performance tracking in one focused workspace. It is built for students, self-learners, and educators who want a reliable system instead of scattered tools.

---

## Why Study Assistant AI

Most students juggle notes apps, task boards, flashcards, and random AI tabs. That creates friction, context-switching, and weaker retention. Study Assistant AI solves this by unifying your entire study workflow:

- **Capture and organize knowledge** from notes and PDFs.
- **Convert knowledge into action** with plans, tasks, flashcards, and quizzes.
- **Improve consistency** through reminders, analytics, and review loops.
- **Stay in control** with local-first storage and configurable AI settings.

---

## Big Features

### 🤖 AI Chat Tutor
- Ask concept-level questions and get structured answers.
- Optional **Citations Mode** to include internal note-based sources.
- Built for study-safe responses that prioritize clarity and learning flow.

### 📅 Study Planner
- Build and manage tasks across subjects.
- Create practical, day-by-day study execution plans.
- Keep long-term goals tied to weekly action.

### 📝 Notes + PDF Import
- Create and maintain rich text notes in-app.
- Import PDF notes and extract text client-side.
- Keep all study material centralized for quick retrieval and quiz generation.

### 🧠 Flashcards + Spaced Repetition (SM-2)
- Create decks by subject and add front/back cards.
- Review due cards with **SM-2** scheduling.
- Optimize memory retention with interval-based repetition.

### ❓ Quiz Generator
- Generate quizzes from notes or custom input.
- Supports offline heuristic generation when AI key is absent.
- Includes interactive answer checks and scoring.

### 📊 Analytics Dashboard
- Observe trends in study behavior and completion patterns.
- Use insights to adjust workload and timing.
- Stay accountable with measurable progress signals.

### 🛠️ Admin Panel
- Lightweight telemetry/event visibility for local admin workflows.
- Useful for debugging behavior and validating usage patterns.

### ⚙️ Settings & Control Center
- Configure AI provider, base URL, model, and API key.
- Enable or disable **Citations Mode**.
- Export/import app data for backup and portability.
- Manage notifications with browser + in-app fallback behavior.

### 💾 Offline-First, Local Storage by Design
- Core workflows continue without backend dependency.
- Data persists in local browser storage.
- Designed for privacy-conscious usage and resilient offline study.

---

## How It Works

At a high level, Study Assistant AI uses a modular frontend architecture:

1. **UI layer** (React + reusable components) renders pages and sections.
2. **Feature hooks** encapsulate stateful workflows (flashcards, quiz, notifications, storage).
3. **Domain libraries** implement deterministic logic (SM-2 scheduling, retrieval, export/import).
4. **Routing layer** maps feature modules to clear paths (`/notes`, `/planner`, `/flashcards`, `/quiz`, etc.).
5. **Persistence layer** keeps data local-first in browser storage with migration support.

This structure keeps the app maintainable, testable, and feature-friendly.

---

## Tech Stack

- **React + TypeScript (strict)**: predictable UI and safer refactors.
- **Vite**: fast local development and optimized builds.
- **Tailwind CSS + shadcn-style component patterns**: consistent design velocity.
- **React Router**: clear route-driven app shell and feature navigation.
- **Vitest + Testing Library**: practical tests for logic and UI behavior.
- **vite-plugin-pwa**: progressive web app support with text-only manifest setup.
- **pdfjs-dist**: client-side PDF text extraction (CDN worker reference).

---

## Screenshots

> Text-only placeholders (no embedded images in repository docs flow):

```md
![Dashboard Overview](screenshots/dashboard-overview.png)
![AI Chat Tutor](screenshots/ai-chat.png)
![Planner + Tasks](screenshots/planner.png)
![Flashcards Review](screenshots/flashcards-review.png)
![Quiz Generator](screenshots/quiz-generator.png)
![Settings Control Center](screenshots/settings.png)
```

---

## Quick Start

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/study-assistant-ai.git
cd study-assistant-ai
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

### 4) Run quality checks

```bash
npm run lint
npm run test
npm run build
```

---

## Environment Variables

Create a local environment file from `.env.example` and set only what you need.

```bash
cp .env.example .env
```

Typical variables:

```env
VITE_AI_API_KEY=
VITE_AI_BASE_URL=
VITE_AI_MODEL=
VITE_AI_PROVIDER=
```

If no AI key is present, fallback generation paths (e.g., quiz heuristics) still work.

---

## Folder Structure

```text
study-assistant-ai/
├── public/
│   ├── manifest.webmanifest
│   └── PWA_ASSETS.md
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── notes/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   ├── ai/
│   │   ├── notifications/
│   │   ├── pdf/
│   │   ├── quiz/
│   │   ├── spacedRepetition/
│   │   └── storage/
│   ├── pages/
│   ├── sections/
│   │   ├── flashcards/
│   │   ├── quiz/
│   │   └── settings/
│   ├── types/
│   └── __tests__/
├── .github/workflows/ci.yml
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── README.md
```

---

## Data Privacy

Study Assistant AI is designed with a **local-first mindset**:

- Core data (notes, tasks, cards, settings) is stored in-browser.
- API keys are configured locally by the user and should not be committed.
- Export/import is explicit and user-controlled.
- No hidden telemetry pipelines are required for app functionality.

You remain in control of your learning data.

---

## Roadmap

- [ ] Enhanced citations ranking (semantic + keyword hybrid).
- [ ] Rich note editor with tags and backlinks.
- [ ] Daily streaks and revision consistency metrics.
- [ ] Improved planner suggestions by exam timeline.
- [ ] Optional cloud sync adapters (self-host friendly).
- [ ] Accessibility pass (keyboard-first + ARIA audit).
- [ ] More robust test coverage for core flows.
- [ ] Internationalization starter support.

---

## FAQ

### 1) Is this production-ready?
It is actively structured like a production-grade frontend with modular features, typed models, and CI checks. You should still review and harden for your deployment needs.

### 2) Do I need an AI API key to use the app?
No. Several features provide offline/local fallback behavior. AI-specific quality improves when a valid key is configured.

### 3) Where is my data stored?
By default, in browser local storage (local-first model).

### 4) Can I back up my data?
Yes. Use Settings → Export JSON, then import later when needed.

### 5) Does flashcard scheduling use a known algorithm?
Yes. It uses SM-2 style interval updates with ease factor adjustments.

### 6) Is PDF text extraction server-side?
No. Extraction is client-side using `pdfjs-dist`, with worker referenced via CDN.

### 7) Is this mobile-friendly?
The app is responsive and includes PWA wiring, but final install icons must be manually added as documented.

### 8) How can I contribute?
Start with [CONTRIBUTING.md](./CONTRIBUTING.md), pick an issue, and open a focused PR.

### 9) Is there a security disclosure process?
Yes. Please follow [SECURITY.md](./SECURITY.md) for private reporting instructions.

---

## Contributing

Contributions are welcome and appreciated. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for standards on code quality, branch strategy, testing, and PR expectations.

## Security

For vulnerability reporting and disclosure expectations, please read [SECURITY.md](./SECURITY.md).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
