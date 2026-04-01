---
name: feature-or-style-update-multiple-components
description: Workflow command scaffold for feature-or-style-update-multiple-components in properganda.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-or-style-update-multiple-components

Use this workflow when working on **feature-or-style-update-multiple-components** in `properganda`.

## Goal

Implements a new feature or style update that affects several React components and global styles, often for site-wide UI/UX improvements or new animations.

## Common Files

- `app/components/*.tsx`
- `app/globals.css`
- `public/images/svg/*.svg`
- `public/videos/*.mp4`
- `package.json`
- `package-lock.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit multiple files in app/components/ (e.g., AboutUs.tsx, Hero.tsx, Footer.tsx, etc.)
- Update app/globals.css for global style changes or animation classes
- Optionally update assets in public/images/svg/ or public/videos/
- Optionally update package.json or lock files if dependencies are changed

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.