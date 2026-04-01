```markdown
# properganda Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you the core development patterns, coding conventions, and common workflows used in the `properganda` repository—a Next.js project written in TypeScript. You'll learn how to structure code, manage assets, implement animations, refactor styles, and handle feature branch merges according to the team's established practices.

---

## Coding Conventions

### File Naming

- Use **camelCase** for file names, e.g.:
  - `aboutUs.tsx`
  - `gsapReveal.ts`
  - `commandmentsPageClient.tsx`

### Import Style

- Use **alias imports** for modules:
  ```typescript
  import AboutUs from '@/components/AboutUs';
  import gsapReveal from '@/lib/gsap-reveal';
  ```

### Export Style

- Use **default exports** for components and utilities:
  ```typescript
  // app/components/AboutUs.tsx
  const AboutUs = () => { /* ... */ };
  export default AboutUs;
  ```

### Commit Messages

- Follow **conventional commit** format:
  - Prefixes: `feat`, `chore`, `style`, `refactor`, `perf`
  - Example:
    ```
    feat: add GSAP text reveal animation to Hero section
    ```

---

## Workflows

### Add or Update Component Animation

**Trigger:** When enhancing a component with animation or updating existing animation logic  
**Command:** `/add-animation`

1. Edit or create animation logic in a component file (e.g., `AboutUs.tsx`, `Hero.tsx`).
2. Optionally update or add supporting animation utility files (e.g., `lib/gsap-reveal.ts`).
3. Adjust or add related CSS in `globals.css` if needed.
4. Test the animation in the browser.

**Example:**
```typescript
// app/components/Hero.tsx
import gsapReveal from '@/lib/gsap-reveal';

useEffect(() => {
  gsapReveal('.hero-title');
}, []);
```

---

### Multi-Component Style and Layout Refactor

**Trigger:** When improving visual consistency, responsive design, or updating styles across several components  
**Command:** `/refactor-style`

1. Edit multiple component files to adjust layout or styling (e.g., `Footer.tsx`, `Header.tsx`).
2. Update global styles in `app/globals.css` as needed.
3. Optionally update SVG/image assets for visual changes.
4. Test across breakpoints and browsers.

**Example:**
```css
/* app/globals.css */
.header {
  padding: 2rem 1rem;
  background: var(--primary-bg);
}
```

---

### Add or Update Image or SVG Assets

**Trigger:** When adding a new client logo, icon, or updating an existing image asset  
**Command:** `/add-asset`

1. Add or update SVG/image files in `public/images/svg/` or `public/images/fav-icon/`.
2. Reference new or updated assets in component files (e.g., `LogoBar.tsx`, `Footer.tsx`).
3. Test asset rendering in the app.

**Example:**
```typescript
// app/components/LogoBar.tsx
<img src="/images/svg/new-client-logo.svg" alt="New Client Logo" />
```

---

### Add or Update Coming Soon Page

**Trigger:** When showing or updating a coming soon landing page  
**Command:** `/coming-soon`

1. Edit or create `app/components/ComingSoon.tsx`.
2. Update `app/page.tsx` to render the `ComingSoon` component.
3. Adjust global styles in `app/globals.css` as needed.
4. Test the coming soon page in the browser.

**Example:**
```typescript
// app/page.tsx
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon />;
}
```

---

### Merge Feature Branch with Multi-Component Changes

**Trigger:** When merging a feature branch with wide-ranging updates (e.g., mobile view, SEO audit, content refresh)  
**Command:** `/merge-feature`

1. Resolve merge conflicts across multiple component and asset files.
2. Update `package.json` and lock files if dependencies changed.
3. Test the integrated changes across the app.

---

## Testing Patterns

- **File Pattern:** Test files use the `*.test.*` naming convention (e.g., `aboutUs.test.tsx`).
- **Framework:** The specific testing framework is not detected, but typical Next.js/TypeScript projects use [Jest](https://jestjs.io/) or [React Testing Library](https://testing-library.com/).
- **Example:**
  ```typescript
  // app/components/__tests__/aboutUs.test.tsx
  import { render, screen } from '@testing-library/react';
  import AboutUs from '../AboutUs';

  test('renders AboutUs section', () => {
    render(<AboutUs />);
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
  ```

---

## Commands

| Command         | Purpose                                                      |
|-----------------|-------------------------------------------------------------|
| /add-animation  | Add or update animation effects in UI components             |
| /refactor-style | Refactor or update styles/layout across multiple components  |
| /add-asset      | Add or update image or SVG assets and integrate them         |
| /coming-soon    | Create or update the Coming Soon landing page                |
| /merge-feature  | Merge a feature branch with broad, multi-component changes   |
```
