---
name: add-or-update-component-animation
description: Workflow command scaffold for add-or-update-component-animation in properganda.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-component-animation

Use this workflow when working on **add-or-update-component-animation** in `properganda`.

## Goal

Adds or updates animation effects (often GSAP-powered) to UI components, such as text reveals, typing animations, or scroll-triggered effects.

## Common Files

- `app/components/AboutUs.tsx`
- `app/components/Hero.tsx`
- `app/components/Commandments.tsx`
- `app/components/Manifesto.tsx`
- `app/components/Footer.tsx`
- `app/components/Header.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or create animation logic in a component file (e.g., AboutUs.tsx, Hero.tsx, Commandments.tsx).
- Optionally update or add supporting animation utility files (e.g., lib/gsap-reveal.ts).
- Adjust or add related CSS in globals.css if needed.
- Test animation in the browser.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.