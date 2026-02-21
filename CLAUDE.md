# CLAUDE.md — AI Assistant Guide for mathcoach

This file provides context, conventions, and workflow guidance for AI assistants (Claude and others) working in this repository.

---

## Project Overview

**mathcoach** is a math coaching application. The project is in its initial stage — no technology stack, source code, or configuration has been added yet. Only the repository and a minimal README exist.

When contributing, update this file to reflect the actual architecture once it is established.

---

## Current Repository State

```
mathcoach/
├── .git/
├── CLAUDE.md        ← this file
└── README.md        ← project title only
```

- No source code yet
- No dependency manifests (package.json, requirements.txt, etc.)
- No configuration files
- No tests
- No CI/CD

---

## Git Workflow

### Branch convention

Feature branches for AI-assisted work follow this pattern:

```
claude/<task-slug>-<session-id>
```

Example: `claude/claude-md-mlwac6w783bsvj61-LblOp`

### Standard flow

1. Work on the designated feature branch — never commit directly to `master`.
2. Make focused, descriptive commits as you complete logical units of work.
3. Push with tracking: `git push -u origin <branch-name>`
4. Open a pull request into `master` when the work is ready for review.

### Commit message style

Use short imperative present-tense subject lines (≤72 chars):

```
Add user authentication module
Fix division-by-zero error in fraction simplifier
Refactor quiz engine to support adaptive difficulty
```

---

## Development Setup

> This section will be filled in once a technology stack is chosen.

Placeholder checklist for future contributors:

- [ ] Install runtime/language (Node.js / Python / etc.)
- [ ] Install dependencies (`npm install` / `pip install -r requirements.txt` / etc.)
- [ ] Copy `.env.example` to `.env` and populate required values
- [ ] Run database migrations if applicable
- [ ] Start development server

---

## Commands

> Update this section once build tooling is configured.

| Purpose | Command |
|---|---|
| Install deps | _TBD_ |
| Start dev server | _TBD_ |
| Run tests | _TBD_ |
| Run linter | _TBD_ |
| Build for production | _TBD_ |

---

## Environment Variables

> Populate this section with actual variables as the project grows.

| Variable | Required | Description |
|---|---|---|
| _TBD_ | — | — |

Document every environment variable here when added. Provide an `.env.example` file with safe placeholder values.

---

## Architecture & Key Conventions

> This section will be filled in once an architecture is decided.

When the project is set up, document:

- **Entry point** — where execution begins
- **Directory layout** — what lives in each top-level folder
- **Data models** — core entities and their relationships
- **API layer** — routes, request/response shape, authentication
- **Frontend** — component structure, state management, routing
- **Database** — schema, migrations, ORM/query patterns

---

## Testing

> Update once a test framework is chosen.

Guidelines to follow when adding tests:

- Write tests for every new public function or API endpoint.
- Co-locate unit tests with the code they test (e.g., `foo.test.ts` beside `foo.ts`), or use a dedicated `tests/` directory — be consistent.
- Integration and end-to-end tests live in a separate top-level directory.
- Tests must pass before merging to `master`.
- Aim for meaningful coverage of edge cases, not just the happy path.

---

## Code Style

> Finalize once tooling is chosen. Until then, follow these general principles.

- **Clarity over cleverness** — write code that is obvious to a future reader.
- **Small functions** — each function does one thing.
- **Consistent naming** — match the naming conventions already present in the file you are editing.
- **No dead code** — remove unused variables, imports, and commented-out blocks.
- **No unnecessary abstractions** — don't create helpers or utilities for one-off operations.
- Run the linter and formatter before committing once they are configured.

---

## Working with AI Assistants

When using Claude Code or another AI assistant in this repo:

- **Read before editing** — always read a file fully before modifying it.
- **Minimal changes** — make only the changes required; do not refactor unrelated code.
- **Explain intent** — leave a brief comment when non-obvious logic is introduced, but avoid redundant comments that restate what the code clearly says.
- **Update this file** — when the stack, architecture, or commands change, update the relevant sections in CLAUDE.md.
- **Update README.md** — keep the public-facing README in sync with major project changes.

---

## Security

- Never commit secrets, credentials, API keys, or tokens.
- Use environment variables for all sensitive configuration.
- Follow OWASP Top 10 guidelines when implementing user-facing features.
- Validate and sanitize all user input at system boundaries.

---

_Last updated: 2026-02-21. Regenerate or revise this file as the project evolves._
