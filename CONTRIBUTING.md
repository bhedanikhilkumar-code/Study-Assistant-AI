# Contributing to Study Assistant AI

Thanks for your interest in contributing to **Study Assistant AI**. We welcome thoughtful contributions that improve product quality, developer experience, performance, reliability, and security.

This guide explains how to contribute effectively and how to keep changes consistent with project standards.

---

## Code of Conduct (Short Version)

Be respectful, constructive, and collaborative.

- Discuss ideas, not people.
- Assume good intent, but prioritize user impact.
- Keep communication professional in issues, PRs, and reviews.
- Harassment, abuse, or hostile behavior is not tolerated.

Maintainers may moderate threads and reject contributions that violate these expectations.

---

## Getting Started

## 1) Prerequisites

- **Node.js**: 18+ recommended
- **npm**: current stable
- **Git**: latest stable

## 2) Fork & Clone

```bash
git clone https://github.com/<your-username>/study-assistant-ai.git
cd study-assistant-ai
```

## 3) Install Dependencies

```bash
npm install
```

## 4) Run Development Server

```bash
npm run dev
```

## 5) Run Tests

```bash
npm run test
```

## 6) Lint and Build

```bash
npm run lint
npm run build
```

If any check fails, fix locally before opening a pull request.

---

## Branch Naming Conventions

Create focused branches from `main`.

- `feature/<short-topic>`
- `fix/<short-topic>`
- `refactor/<short-topic>`
- `docs/<short-topic>`
- `chore/<short-topic>`
- `test/<short-topic>`

Examples:

- `feature/flashcard-stats-panel`
- `fix/quiz-score-calculation`
- `docs/security-policy-refresh`

---

## Commit Message Conventions

Use **Conventional Commits** whenever possible:

- `feat:` new user-facing capability
- `fix:` bug fix
- `refactor:` code restructuring without behavior change
- `docs:` documentation-only changes
- `test:` tests added/updated
- `chore:` tooling/build/maintenance

Examples:

- `feat: add quiz review summary panel`
- `fix: handle empty citation result safely`
- `docs: expand README architecture section`

Keep commits atomic. One logical purpose per commit.

---

## Pull Request Checklist

Before requesting review, confirm all items:

- [ ] Branch is up to date with `main`
- [ ] Change scope is focused and clearly described
- [ ] Lint, tests, and build pass locally
- [ ] No secrets, API keys, or sensitive data committed
- [ ] Docs updated when behavior/config changes
- [ ] Screenshots added for meaningful UI changes (when possible)
- [ ] PR description explains **what**, **why**, and **how tested**

---

## How to Add a New Feature Module

Use this repeatable workflow:

1. **Define the feature boundary**
   - Route/page scope
   - State ownership
   - Input/output types
2. **Create typed models first** in `src/types/*`.
3. **Implement core logic** in `src/lib/*` (pure functions where possible).
4. **Add hook orchestration** in `src/hooks/*`.
5. **Build modular UI** in `src/sections/<feature>/*`.
6. **Wire route + navigation** in app shell/sidebar.
7. **Add tests** for critical logic and user flow.
8. **Update docs** (README or feature notes).

Example pattern:

- `src/types/quiz.ts`
- `src/lib/quiz/generator.ts`
- `src/hooks/useQuiz.ts`
- `src/sections/quiz/QuizPage.tsx`

---

## UI Guidelines

- Prefer shared components from `src/components/ui/*`.
- Keep design consistent with existing Tailwind tokens and spacing scale.
- Use shadcn-style primitives and composable section components.
- Avoid ad-hoc styling drift; reuse utility classes and layout patterns.
- Ensure accessibility basics:
  - semantic HTML
  - keyboard navigability
  - readable focus states

---

## TypeScript Rules

- Strict typing is expected.
- Avoid `any` unless absolutely unavoidable and justified.
- Model domain data in `src/types/*`.
- Keep utility logic typed and deterministic.
- Export clear function signatures and stable return types.

If a type is uncertain, define it explicitly instead of inferring from fragile runtime assumptions.

---

## Testing Guidelines

Use **Vitest + Testing Library**.

Focus on:

- Critical business logic (e.g., SM-2 scheduling, scoring)
- High-value rendering behavior (navigation, key flows)
- Regression cases for bug fixes

Good tests are:

- deterministic
- fast
- readable
- scoped to behavior, not implementation trivia

Suggested command:

```bash
npm run test -- --run
```

---

## Issues: Bug Report vs Feature Request

When opening an issue, choose the correct intent.

### Bug report should include
- What happened
- Expected behavior
- Reproduction steps
- Environment details (OS/browser/node)
- Relevant logs/screenshots

### Feature request should include
- Problem statement (who/why)
- Proposed solution
- Alternatives considered
- UX impact and acceptance criteria

Clear issues lead to faster implementation and fewer review cycles.

---

## Review Process Expectations

Maintainers review for:

- Product impact and user clarity
- Architectural fit
- Type safety and maintainability
- Test quality
- Security hygiene

You may receive requested changes. Please treat review as collaborative quality improvement.

PRs that are too large, unfocused, or missing validation may be deferred.

---

## Security Note (Important)

Never expose secrets in commits, issues, or pull requests.

- Do not commit `.env` files.
- Do not post API keys in screenshots/logs.
- Sanitize stack traces if they include sensitive content.
- Use private reporting for vulnerabilities (see `SECURITY.md`).

---

## Final Tips for Fast Merges

- Keep PRs small and single-purpose.
- Include clear test evidence.
- Update docs as part of the same PR.
- Be responsive to review comments.

Thanks for helping make **Study Assistant AI** sharper, safer, and more valuable for every learner.
