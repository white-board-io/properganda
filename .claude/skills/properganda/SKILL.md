```markdown
# properganda Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides a comprehensive guide to contributing to the `properganda` codebase, a Next.js project written in TypeScript. It covers established coding conventions, common workflows for updating UI animations, content, assets, API endpoints, and landing pages, as well as testing patterns. Use this guide to ensure consistency and efficiency when making changes or adding features.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `aboutUs.tsx`, `logoBar.tsx`

### Import Style
- Use **alias imports** for modules.
  - Example:
    ```typescript
    import AnimationUtils from '@/lib/gsap-reveal';
    import LogoBar from '@/components/LogoBar';
    ```

### Export Style
- Use **default exports** for components and utilities.
  - Example:
    ```typescript
    // app/components/AboutUs.tsx
    const AboutUs = () => { /* ... */ };
    export default AboutUs;
    ```

### Commit Messages
- Follow **conventional commit** patterns.
  - Prefixes: `feat`, `chore`, `style`, `refactor`, `perf`
  - Example: `feat: add GSAP reveal animation to Hero section`

## Workflows

### Add or Update Sitewide Animations
**Trigger:** When introducing new animations or refining existing ones across the site.  
**Command:** `/add-animation`

1. Edit or add animation logic in relevant component files (e.g., `AboutUs.tsx`, `Hero.tsx`).
2. Update or add animation utility files (e.g., `lib/gsap-reveal.ts`).
3. Adjust global styles in `app/globals.css` to support new or changed animations.
4. Optionally update or add related SVG/image assets in `public/images/svg`.

**Example:**
```typescript
// In app/components/Hero.tsx
import gsapReveal from '@/lib/gsap-reveal';

useEffect(() => {
  gsapReveal('.hero-title');
}, []);
```

### Sitewide Content and Style Refresh
**Trigger:** When refreshing site content, updating styles, or adding new assets/logos globally.  
**Command:** `/refresh-site-content`

1. Edit text, layout, or style in multiple component files (e.g., `AboutUs.tsx`, `Footer.tsx`).
2. Update or add new SVG/image/video assets in `public/images/svg` or `public/videos`.
3. Update global CSS (`app/globals.css`) for style consistency.
4. Update `package.json` and `package-lock.json` if dependencies or assets require it.

**Example:**
```typescript
// In app/components/Footer.tsx
export default function Footer() {
  return <footer>© 2024 Properganda. All rights reserved.</footer>;
}
```

### Add or Update Client Logo Assets
**Trigger:** When adding a new client logo or updating an existing one.  
**Command:** `/add-client-logo`

1. Add or update SVG/image files in `public/images/svg`.
2. Update `LogoBar.tsx` or other relevant components to reference new/updated logos.
3. Optionally update favicon or related assets.

**Example:**
```typescript
// In app/components/LogoBar.tsx
import NewClientLogo from '@/public/images/svg/new-client.svg';

const logos = [NewClientLogo, /* ...other logos */];
```

### Add or Update API Endpoint
**Trigger:** When adding a new API route or updating an existing one (e.g., contact form).  
**Command:** `/add-api-endpoint`

1. Create or update route file in `app/api/[endpoint]/route.ts`.
2. Update related UI components to use the new/updated endpoint.
3. Update configuration files (`.env.example`, `.gitignore`) if needed.

**Example:**
```typescript
// app/api/contact/route.ts
export default async function handler(req, res) {
  // Handle POST request for contact form
}
```

### Add or Update Coming Soon Page
**Trigger:** When showing/hiding or updating the Coming Soon page.  
**Command:** `/coming-soon`

1. Edit or create `app/components/ComingSoon.tsx`.
2. Update `app/page.tsx` to render the `ComingSoon` component.
3. Adjust global styles in `app/globals.css` if needed.

**Example:**
```typescript
// app/page.tsx
import ComingSoon from './components/ComingSoon';

export default function Home() {
  return <ComingSoon />;
}
```

## Testing Patterns

- **Test files** follow the `*.test.*` pattern (e.g., `aboutUs.test.tsx`).
- **Testing framework** is not specified; check for test setup in the repository.
- Place test files alongside the components or in a dedicated `__tests__` directory.

**Example:**
```typescript
// aboutUs.test.tsx
import { render } from '@testing-library/react';
import AboutUs from './aboutUs';

test('renders AboutUs component', () => {
  render(<AboutUs />);
  // assertions...
});
```

## Commands

| Command              | Purpose                                                        |
|----------------------|----------------------------------------------------------------|
| /add-animation       | Add or update animation effects across UI components           |
| /refresh-site-content| Refresh site content, styles, and global assets                |
| /add-client-logo     | Add or update client logo SVG/image assets                     |
| /add-api-endpoint    | Add or update an API endpoint and connect to UI components     |
| /coming-soon         | Add or update the Coming Soon landing page                     |
```