```markdown
# properganda Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill provides a comprehensive guide to the development patterns, coding conventions, and common workflows used in the `properganda` repository—a Next.js project written in TypeScript. It covers file organization, code style, commit practices, and step-by-step instructions for frequent tasks such as adding features, updating animations, managing assets, and handling responsive design. Use this skill to quickly onboard, maintain consistency, and streamline collaboration within the codebase.

## Coding Conventions

### File Naming

- Use **camelCase** for file names.
  - Example: `aboutUs.tsx`, `heroSection.tsx`

### Import Style

- Use **alias imports** for modules.
  - Example:
    ```typescript
    import Button from '@/components/ui/button';
    import { revealAnimation } from '@/lib/gsap-reveal';
    ```

### Export Style

- Use **default exports** for components and modules.
  - Example:
    ```typescript
    // app/components/Hero.tsx
    const Hero = () => { /* ... */ };
    export default Hero;
    ```

### Commit Messages

- Follow **Conventional Commits** with prefixes such as:
  - `feat`: New features
  - `chore`: Maintenance or tooling
  - `style`: Styling changes
  - `refactor`: Code refactoring
  - `perf`: Performance improvements
- Keep commit messages concise (average ~63 characters).
  - Example: `feat: add GSAP reveal animation to Hero component`

## Workflows

### Feature or Style Update Across Multiple Components

**Trigger:** When introducing a new animation, visual style, or feature that spans multiple UI components.

**Command:** `/feature-multi-component`

1. Edit relevant files in `app/components/` (e.g., `AboutUs.tsx`, `Hero.tsx`, `Footer.tsx`).
2. Update `app/globals.css` for global style or animation changes.
3. Optionally update assets in `public/images/svg/` or `public/videos/`.
4. Optionally update `package.json` or lock files if dependencies change.

**Example:**
```typescript
// app/components/Hero.tsx
import styles from '@/app/globals.css';
import Logo from '@/public/images/svg/newLogo.svg';

export default function Hero() {
  // ...
}
```

---

### Add or Update Animation

**Trigger:** When adding a new animation effect or refining existing animation logic in a component.

**Command:** `/add-animation`

1. Edit one or more files in `app/components/` to add or refine animation logic.
2. Optionally update or create files in `lib/` (e.g., `gsap-reveal.ts`) or `components/ui/` for reusable animation utilities.
3. Update `app/globals.css` for animation-related styles.

**Example:**
```typescript
// app/components/AboutUs.tsx
import { revealAnimation } from '@/lib/gsap-reveal';

useEffect(() => {
  revealAnimation('.about-section');
}, []);
```

---

### Add or Update SVG or Media Assets

**Trigger:** When adding a new logo, updating an SVG, or introducing new media assets.

**Command:** `/add-asset`

1. Add or update files in `public/images/svg/` or `public/videos/`.
2. Edit relevant component(s) in `app/components/` to reference the new or updated asset.

**Example:**
```typescript
// app/components/ClientLogos.tsx
import NewLogo from '@/public/images/svg/newClient.svg';

export default function ClientLogos() {
  return <img src={NewLogo} alt="New Client" />;
}
```

---

### Responsive Design or Layout Refactor

**Trigger:** When enhancing site responsiveness, refactoring for maintainability, or improving layout across breakpoints.

**Command:** `/responsive-refactor`

1. Edit multiple files in `app/components/` for layout and responsive changes.
2. Update `app/globals.css` for global style adjustments.
3. Optionally add or update utility components (e.g., `BreakpointIndicator`).

**Example:**
```css
/* app/globals.css */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
  }
}
```

---

### Merge Feature Branch with Multi-Component Changes

**Trigger:** When merging a feature branch that introduces changes across many components, assets, and possibly dependencies.

**Command:** `/merge-feature-branch`

1. Merge the feature branch into `main` or another target branch.
2. Resolve conflicts across files in `app/components/`, `app/globals.css`, and `public/assets`.
3. Update `package.json` or lock files if dependencies changed.

**Example:**
```bash
git checkout main
git merge feature/large-redesign
# Resolve conflicts in multiple files as needed
```

## Testing Patterns

- **Test file pattern:** `*.test.*` (e.g., `hero.test.tsx`)
- **Testing framework:** Not explicitly detected; follow standard Next.js/TypeScript testing practices (e.g., Jest, React Testing Library).
- **Test location:** Place test files alongside components or in a `__tests__` directory.

**Example:**
```typescript
// app/components/__tests__/hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

test('renders hero section', () => {
  render(<Hero />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
```

## Commands

| Command                   | Purpose                                                      |
|---------------------------|--------------------------------------------------------------|
| /feature-multi-component  | Start a feature or style update spanning multiple components  |
| /add-animation            | Add or update animation logic in components                  |
| /add-asset                | Add or update SVG or media assets                            |
| /responsive-refactor      | Refactor for responsive design or layout improvements        |
| /merge-feature-branch     | Merge a feature branch with multi-component changes          |
```