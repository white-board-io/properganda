---
name: add-or-update-sitewide-animations
description: Workflow command scaffold for add-or-update-sitewide-animations in properganda.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-sitewide-animations

Use this workflow when working on **add-or-update-sitewide-animations** in `properganda`.

## Goal

Add or update animation effects across multiple UI components and global styles.

## Common Files

- `app/components/AboutUs.tsx`
- `app/components/Hero.tsx`
- `app/components/Commandments.tsx`
- `app/components/Manifesto.tsx`
- `app/components/CTA.tsx`
- `app/components/Header.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or add animation logic in multiple component files (e.g., AboutUs.tsx, Hero.tsx, Commandments.tsx, Manifesto.tsx).
- Update or add animation utility files (e.g., lib/gsap-reveal.ts, components/ui/...).
- Adjust global styles in app/globals.css to support new or changed animations.
- Optionally update or add related SVG/image assets in public/images/svg.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.