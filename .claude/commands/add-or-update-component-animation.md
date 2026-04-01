---
name: add-or-update-component-animation
description: Workflow command scaffold for add-or-update-component-animation in properganda.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-component-animation

Use this workflow when working on **add-or-update-component-animation** in `properganda`.

## Goal

Adds or updates animation effects (GSAP, typing, text reveal, etc.) to UI components for enhanced interactivity and visual appeal.

## Common Files

- `app/components/*.tsx`
- `lib/gsap-reveal.ts`
- `components/ui/*.tsx`
- `app/globals.css`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit one or more component files in app/components/ (e.g., AboutUs.tsx, Hero.tsx, Commandments.tsx, etc.) to add or update animation logic.
- Optionally update or add animation utility files in lib/ (e.g., lib/gsap-reveal.ts) or components/ui/ (e.g., blur-text-reveal.tsx, text-reveal-animation.tsx).
- Optionally update global styles in app/globals.css to support animation effects.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.