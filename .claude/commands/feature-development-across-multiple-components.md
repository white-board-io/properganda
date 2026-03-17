---
name: feature-development-across-multiple-components
description: Workflow command scaffold for feature-development-across-multiple-components in properganda.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-development-across-multiple-components

Use this workflow when working on **feature-development-across-multiple-components** in `properganda`.

## Goal

Implements a new feature or major UI update that affects several React components, updates global styles, and sometimes adds images or assets.

## Common Files

- `app/components/*.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `public/images/*`
- `public/images/svg/*`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or create multiple files in app/components/ (e.g., AboutUs.tsx, Hero.tsx, Footer.tsx, etc.)
- Update app/globals.css for global style changes
- Modify app/layout.tsx or app/page.tsx if layout or routing is affected
- Add or update assets in public/images/ or public/images/svg/ if needed

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.