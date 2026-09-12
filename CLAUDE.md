# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Project overview

Working repository for Konstantinos Michaelides (Partner, Impactus Private
Equity Group; CEO, Vertu Projects Ltd). It holds Claude Code skills and
supporting material used across the Impactus fund platform and Vertu's
fiduciary, tax and licensing practice.

It is not an application. There is no build, no test suite and no runtime - the
deliverables are skills and documents that Claude Code reads.

## Repository structure

```
.claude/skills/origination/   Origination and targeting pipeline skill
├── SKILL.md                  The eight-stage pipeline, Stage 0 to Stage 7
├── references/
│   ├── compliance-gate.md    AIFMD, GDPR and ePrivacy gate - read before any outreach
│   ├── data-sources.md       Registry path (free) and Apollo path (paid), tool routing
│   └── icp-library.md        Standing ICPs per book, with disqualifiers
└── assets/
    ├── dossier-template.md   Per-target research output
    └── targets-template.csv  Target universe row schema
```

Pipeline runs are written to `runs/YYYY-MM-DD-<book>-<slug>/` and are the audit
trail for how any contact list was built.

## Tech stack

Markdown and CSV. No dependencies, no toolchain.

## Development workflow

Nothing to install, build or run. Edit the Markdown, commit, push.

Skills are loaded by Claude Code from `.claude/skills/`. To validate a change to
the origination skill, invoke it on a real request and check that Stage 0 picks
the right book and that Stage 6 blocks fund-related outreach.

## Conventions

- Currency as €x with a letter suffix: €2.5m, €140m, €1.2b.
- Hyphens, not em dashes.
- Tables for comparisons and economics.
- Any document referencing the funds carries the AIFMD Art.23 disclaimer.
- Legal and regulatory citations are given so they can be checked. Anything
  unconfirmed is marked **[verify]** rather than asserted - the skills are used
  in a regulated context and a confident wrong citation is worse than a flagged
  gap.
- Default jurisdiction: Cyprus, Greece, EU.

## Git workflow

- Default branch: `main`.
- Do not commit secrets, credentials, or large binaries.
- Do not commit target lists, contact data, or dossiers containing personal
  data. `runs/` is working output and is git-ignored - contact data belongs in
  the firm's own systems under its retention policy, not in a repository.
- Write clear, descriptive commit messages.
