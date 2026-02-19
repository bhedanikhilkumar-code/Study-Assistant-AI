# Contributing to Study Assistant AI

Thank you for your interest in contributing to Study Assistant AI! We welcome pull requests, bug reports, and feature suggestions.

## 1. Forking Process

1. Fork the repository to your own GitHub account.
2. Clone your fork locally.
3. Add the upstream remote:

```bash
git remote add upstream https://github.com/<original-owner>/study-assistant-ai.git
```

4. Sync before starting new work:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## 2. Branch Naming

Create focused branches from `main` using the following conventions:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `chore/<short-description>`

Examples:

- `feature/ai-chat-memory`
- `fix/planner-date-validation`
- `docs/readme-improvements`

## 3. Commit Standards

Use clear, imperative commit messages. Conventional Commits are encouraged:

- `feat: add notes tagging support`
- `fix: resolve planner timezone bug`
- `docs: update setup instructions`
- `chore: refine lint config`

Tips:

- Keep commits small and scoped.
- Explain *why* in the body when context is needed.
- Avoid mixing refactor, feature, and formatting-only changes in one commit.

## 4. Pull Request Process

Before opening a PR:

1. Rebase or merge latest `main`.
2. Run local checks (build/tests/lint) and ensure they pass.
3. Update documentation for behavioral or configuration changes.

When opening a PR:

- Use a descriptive title.
- Include a clear summary of changes.
- Link related issues (e.g., `Closes #12`).
- Add screenshots/GIFs for UI changes when applicable.
- Request review from maintainers.

## 5. Code Quality Expectations

All contributions should:

- Follow existing code style and architecture patterns.
- Use TypeScript types thoughtfully; avoid unnecessary `any`.
- Keep components modular and reusable.
- Include tests for new logic and regressions where practical.
- Preserve accessibility and responsive design standards.

By contributing, you agree that your submissions will be licensed under the MIT License.
