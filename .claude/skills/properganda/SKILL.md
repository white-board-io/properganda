```markdown
# properganda Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you how to contribute effectively to the `properganda` codebase, a TypeScript project built on Next.js. You'll learn the project's coding conventions, commit patterns, and the main workflows for adding features, updating styles, managing assets, handling API endpoints, and creating landing pages. This guide also covers how to write and structure tests, and provides handy slash commands for common tasks.

## Coding Conventions

- **File Naming:** Use `camelCase` for files, e.g., `aboutUs.tsx`, `gsapReveal.ts`.
- **Import Style:** Use path aliases for imports.
  ```typescript
  import gsapReveal from '@/lib/gsap-reveal'
  import BlurTextReveal from '@/components/ui/blur-text-reveal'
  ```
- **Export Style:** Default exports are preferred.
  ```typescript
  // Example: app/components/Hero.tsx
  export default function Hero() { ... }
  ```
- **Commit Messages:** Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - Types: `feat`, `chore`, `style`, `refactor`, `perf`
  - Example: `feat: add GSAP text reveal animation to Hero component`

## Workflows

### Add or Update Component Animation
**Trigger:** When you want to introduce or refine animations in a UI component  
**Command:** `/add-animation`

1. Edit one or more files in `app/components/` (e.g., `AboutUs.tsx`, `Hero.tsx`, `Commandments.tsx`) to add or update animation logic.
2. Optionally update or add animation utilities in `lib/` (e.g., `lib/gsap-reveal.ts`) or `components/ui/` (e.g., `blur-text-reveal.tsx`).
3. Optionally update global styles in `app/globals.css` to support new animation effects.

**Example:**
```typescript
// app/components/Hero.tsx
import gsapReveal from '@/lib/gsap-reveal'

export default function Hero() {
  useEffect(() => {
    gsapReveal('.hero-title')
  }, [])
  return <h1 className="hero-title">Welcome</h1>
}
```

---

### Multi-Component Style and Layout Refactor
**Trigger:** When you want to improve the look, feel, or responsiveness of several UI components at once  
**Command:** `/refactor-style`

1. Edit multiple files in `app/components/` (e.g., `Footer.tsx`, `Header.tsx`, `Manifesto.tsx`, `Services.tsx`) to adjust styles, layout, or responsive behavior.
2. Update `app/globals.css` for global style changes.
3. Optionally update `app/layout.tsx` or `app/page.tsx` for layout-wide changes.

**Example:**
```css
/* app/globals.css */
:root {
  --primary-color: #222;
}
```
```typescript
// app/components/Footer.tsx
export default function Footer() {
  return <footer className="footer">...</footer>
}
```

---

### Add or Update Asset Files
**Trigger:** When you want to introduce new client logos, update branding, or add media assets  
**Command:** `/add-asset`

1. Add or update files in `public/images/svg/` or `public/videos/`.
2. Edit relevant component files in `app/components/` (e.g., `LogoBar.tsx`, `Header.tsx`) to reference new or updated assets.
3. Optionally update favicon or other global assets.

**Example:**
```typescript
// app/components/LogoBar.tsx
export default function LogoBar() {
  return <img src="/images/svg/client-logo.svg" alt="Client Logo" />
}
```

---

### Add or Update API Endpoint or Config
**Trigger:** When you want to introduce or modify an API endpoint or update environment/configuration files  
**Command:** `/add-api-endpoint`

1. Edit or create files in `app/api/` (e.g., `contact/route.ts`).
2. Update `.env`, `.env.example`, or `.gitignore` as needed.
3. Optionally update `package.json` or lock files if dependencies change.

**Example:**
```typescript
// app/api/contact/route.ts
export default async function handler(req, res) {
  // handle contact form submission
}
```

---

### Add or Update Temporary or Landing Page
**Trigger:** When you want to display a temporary homepage or update the coming soon experience  
**Command:** `/add-coming-soon`

1. Edit or create `app/components/ComingSoon.tsx`.
2. Update `app/page.tsx` to route to or include the temporary component.
3. Update `app/globals.css` for any new styles.

**Example:**
```typescript
// app/components/ComingSoon.tsx
export default function ComingSoon() {
  return <div className="coming-soon">Coming Soon!</div>
}
```
```typescript
// app/page.tsx
import ComingSoon from './components/ComingSoon'
export default function Page() {
  return <ComingSoon />
}
```

## Testing Patterns

- **Test Files:** Use the pattern `*.test.*` (e.g., `Hero.test.tsx`).
- **Framework:** Not explicitly detected; use standard Next.js/TypeScript testing tools (e.g., Jest, React Testing Library).
- **Example:**
  ```typescript
  // app/components/Hero.test.tsx
  import { render, screen } from '@testing-library/react'
  import Hero from './Hero'

  test('renders hero title', () => {
    render(<Hero />)
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })
  ```

## Commands

| Command            | Purpose                                                         |
|--------------------|-----------------------------------------------------------------|
| /add-animation     | Add or update animation effects in UI components                |
| /refactor-style    | Refactor styles/layout across multiple components               |
| /add-asset         | Add or update static assets (SVG, images, videos)               |
| /add-api-endpoint  | Add or update API endpoints or related configuration            |
| /add-coming-soon   | Add or update a temporary or landing "Coming Soon" page         |
```