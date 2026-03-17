---
name: properganda-conventions
description: Development conventions and patterns for properganda. TypeScript Next.js project with conventional commits.
---

# Properganda Conventions

> Generated from [white-board-io/properganda](https://github.com/white-board-io/properganda) on 2026-03-17

## Overview

This skill teaches Claude the development patterns and conventions used in properganda.

## Tech Stack

- **Primary Language**: TypeScript
- **Framework**: Next.js
- **Architecture**: hybrid module organization
- **Test Location**: separate

## When to Use This Skill

Activate this skill when:
- Making changes to this repository
- Adding new features following established patterns
- Writing tests that match project conventions
- Creating commits with proper message format

## Commit Conventions

Follow these commit message conventions based on 8 analyzed commits.

### Commit Style: Conventional Commits

### Prefixes Used

- `feat`
- `style`
- `chore`
- `perf`

### Message Guidelines

- Average message length: ~73 characters
- Keep first line concise and descriptive
- Use imperative mood ("Add feature" not "Added feature")


*Commit message example*

```text
feat: Implement mobile accordion for services, add new black logo, update global fonts, and refine component styling.
```

*Commit message example*

```text
style: adjust TorriStatementGraphic viewBox and AboutUs layout spacing
```

*Commit message example*

```text
perf(Hero): optimize animation performance for default variant
```

*Commit message example*

```text
chore: update project configuration and refactor type definitions
```

*Commit message example*

```text
Merge pull request #2 from white-board-io/arun/seo-audit
```

*Commit message example*

```text
feat(ui): add animated comet orbit to commandments link
```

*Commit message example*

```text
feat: add responsive design improvements and component refactoring
```

*Commit message example*

```text
style(Hero): update text styling and improve readability
```

## Architecture

### Project Structure: Single Package

This project uses **hybrid** module organization.

### Entry Points

- `app/layout.tsx`

### Configuration Files

- `package.json`
- `tsconfig.json`

### Guidelines

- This project uses a hybrid organization
- Follow existing patterns when adding new code

## Code Style

### Language: TypeScript

### Naming Conventions

| Element | Convention |
|---------|------------|
| Files | camelCase |
| Functions | camelCase |
| Classes | PascalCase |
| Constants | SCREAMING_SNAKE_CASE |

### Import Style: Path Aliases (@/, ~/)

### Export Style: Default Exports


*Preferred import style*

```typescript
// Use path aliases for imports
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
```

*Preferred export style*

```typescript
// Use default exports for main component/function
export default function UserProfile() { ... }
```

## Common Workflows

These workflows were detected from analyzing commit patterns.

### Feature Development

Standard feature implementation workflow

**Frequency**: ~20 times per month

**Steps**:
1. Add feature implementation
2. Add tests for feature
3. Update documentation

**Files typically involved**:
- `app/components/*`
- `app/*`
- `components/ui/*`

**Example commit sequence**:
```
feat: Redesign Hero section with a background image and interactive badge, and update LogoBar to use new SVG image logos.
feat: add new case study images and update related UI components.
feat: Implement new layout, styling, and content updates across components, including a new "Canopy" link and a redesigned "Creative Collective" section.
```

### Refactoring

Code refactoring and cleanup workflow

**Frequency**: ~7 times per month

**Steps**:
1. Ensure tests pass before refactor
2. Refactor code structure
3. Verify tests still pass

**Files typically involved**:
- `src/**/*`

**Example commit sequence**:
```
feat: Introduce a new Commandments page, utilizing dedicated data and a refactored CreativeCollective component.
feat: Designed launch page
feat(seo): add sitemap, robots and metadata configuration
```

### Feature Development Across Multiple Components

Implements a new feature or major UI update that affects several React components, updates global styles, and sometimes adds images or assets.

**Frequency**: ~4 times per month

**Steps**:
1. Edit or create multiple files in app/components/ (e.g., AboutUs.tsx, Hero.tsx, Footer.tsx, etc.)
2. Update app/globals.css for global style changes
3. Modify app/layout.tsx or app/page.tsx if layout or routing is affected
4. Add or update assets in public/images/ or public/images/svg/ if needed

**Files typically involved**:
- `app/components/*.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `public/images/*`
- `public/images/svg/*`

**Example commit sequence**:
```
Edit or create multiple files in app/components/ (e.g., AboutUs.tsx, Hero.tsx, Footer.tsx, etc.)
Update app/globals.css for global style changes
Modify app/layout.tsx or app/page.tsx if layout or routing is affected
Add or update assets in public/images/ or public/images/svg/ if needed
```

### Component Refactor And Splitting

Refactors an existing component into smaller, more maintainable components, often splitting a large component into several files and updating imports/usages.

**Frequency**: ~2 times per month

**Steps**:
1. Split an existing file in app/components/ into multiple new files (e.g., CreativeCollective.tsx → AboutUs.tsx, Commandments.tsx)
2. Update references in other components or pages to use the new components
3. Adjust layout or page files if necessary

**Files typically involved**:
- `app/components/*.tsx`
- `app/layout.tsx`
- `app/page.tsx`

**Example commit sequence**:
```
Split an existing file in app/components/ into multiple new files (e.g., CreativeCollective.tsx → AboutUs.tsx, Commandments.tsx)
Update references in other components or pages to use the new components
Adjust layout or page files if necessary
```

### Seo And Metadata Configuration

Adds or updates SEO-related files and metadata, such as sitemap, robots.txt, and centralized SEO config. Also updates page metadata.

**Frequency**: ~2 times per month

**Steps**:
1. Create or update app/robots.ts and app/sitemap.ts
2. Edit or add lib/seo.ts for centralized SEO configuration
3. Update metadata in app/layout.tsx and relevant page files (e.g., app/page.tsx, app/commandments/page.tsx)

**Files typically involved**:
- `app/robots.ts`
- `app/sitemap.ts`
- `lib/seo.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/commandments/page.tsx`

**Example commit sequence**:
```
Create or update app/robots.ts and app/sitemap.ts
Edit or add lib/seo.ts for centralized SEO configuration
Update metadata in app/layout.tsx and relevant page files (e.g., app/page.tsx, app/commandments/page.tsx)
```

### Add Or Update Shared Ui Components

Adds new reusable UI components or updates existing ones in the shared components/ui/ directory.

**Frequency**: ~2 times per month

**Steps**:
1. Create or edit files in components/ui/ (e.g., dropdown-menu.tsx, button.tsx, card.tsx, etc.)
2. Update usages in app/components/ as needed

**Files typically involved**:
- `components/ui/*.tsx`
- `app/components/*.tsx`

**Example commit sequence**:
```
Create or edit files in components/ui/ (e.g., dropdown-menu.tsx, button.tsx, card.tsx, etc.)
Update usages in app/components/ as needed
```

### Global Style And Font Updates

Updates global CSS styles and/or font configuration, often to improve consistency or introduce new design tokens.

**Frequency**: ~2 times per month

**Steps**:
1. Edit app/globals.css to update global styles or font variables
2. Update font usage in app/components/*.tsx as needed

**Files typically involved**:
- `app/globals.css`
- `app/components/*.tsx`

**Example commit sequence**:
```
Edit app/globals.css to update global styles or font variables
Update font usage in app/components/*.tsx as needed
```


## Best Practices

Based on analysis of the codebase, follow these practices:

### Do

- Use conventional commit format (feat:, fix:, etc.)
- Use camelCase for file names
- Prefer default exports

### Don't

- Don't use long relative imports (use aliases)
- Don't write vague commit messages
- Don't deviate from established patterns without discussion

---

*This skill was auto-generated by [ECC Tools](https://ecc.tools). Review and customize as needed for your team.*
